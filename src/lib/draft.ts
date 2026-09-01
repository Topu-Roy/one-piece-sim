import type { Character, Race, Rarity, DraftState, DraftPick, StatBlock, RoundType } from "./types";
import { Characters } from "../data/characters";
import { getRaceStats, getAllRaces } from "../data/races";

/** Max characters per race in the Round 1 pool */
const MAX_PER_RACE = 3;

/** Rarity roll probabilities: 50% basic, 30% epic, 20% legend */
function rollRarity(): Rarity {
  const roll = Math.random() * 100;
  if (roll < 20) return "legend";
  if (roll < 50) return "epic";
  return "basic";
}

/** Shuffle array in place (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Get a random item from an array */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Build Round 1 pool: max 3 characters per race, grouped by race */
function buildRacePool(): Map<Race, Character[]> {
  const pool = new Map<Race, Character[]>();

  for (const race of getAllRaces()) {
    const raceChars = shuffle(Characters.filter((c) => c.race === race)).slice(0, MAX_PER_RACE);
    pool.set(race, raceChars);
  }

  return pool;
}

/** Get 4 unique random races from the pool */
function pick4UniqueRaces(pool: Map<Race, Character[]>): Race[] {
  const available = Array.from(pool.keys()).filter((race) => (pool.get(race)?.length ?? 0) > 0);
  return shuffle(available).slice(0, 4);
}

/** Get characters filtered by rarity */
function getCharactersByRarity(rarity: Rarity): Character[] {
  return Characters.filter((c) => c.rarity === rarity);
}

/** Get DF user characters filtered by rarity */
function getDFUsersByRarity(rarity: Rarity): Character[] {
  return Characters.filter((c) => c.devilFruit.type !== "none" && c.rarity === rarity);
}

/** Get weapon user characters filtered by rarity */
function getWeaponUsersByRarity(rarity: Rarity): Character[] {
  return Characters.filter((c) => c.weapon.type !== "none" && c.rarity === rarity);
}

/** Generate 4 options for a round */
function generateRoundOptions(roundType: RoundType, racePool?: Map<Race, Character[]>): Character[] {
  // Round 1: race selection — unique races, 1 character each
  if (roundType === "race" && racePool) {
    const races = pick4UniqueRaces(racePool);
    return races.map((race) => {
      const chars = racePool.get(race) ?? [];
      return pickRandom(chars);
    });
  }

  // All other rounds: rarity roll per option
  const options: Character[] = [];

  for (let i = 0; i < 4; i++) {
    const rarity = rollRarity();
    let pool: Character[];

    switch (roundType) {
      case "devil_fruit":
        pool = getDFUsersByRarity(rarity);
        break;
      case "weapon": {
        // At least 3 of 4 must be weapon users
        pool = getWeaponUsersByRarity(rarity);
        break;
      }
      default:
        pool = getCharactersByRarity(rarity);
        break;
    }

    // Fallback: if pool is empty for this rarity, use any rarity
    if (pool.length === 0) {
      switch (roundType) {
        case "devil_fruit":
          pool = Characters.filter((c) => c.devilFruit.type !== "none");
          break;
        case "weapon":
          pool = Characters.filter((c) => c.weapon.type !== "none");
          break;
        default:
          pool = Characters;
          break;
      }
    }

    options.push(pickRandom(pool));
  }

  // For weapon round: ensure at least 3 weapon users
  if (roundType === "weapon") {
    const weaponUsers = options.filter((c) => c.weapon.type !== "none");
    if (weaponUsers.length < 3) {
      // Replace non-weapon users with weapon users
      const nonWeapon = options.filter((c) => c.weapon.type === "none");
      for (const nw of nonWeapon) {
        if (weaponUsers.length >= 3) break;
        const idx = options.indexOf(nw);
        const replacement = pickRandom(Characters.filter((c) => c.weapon.type !== "none" && !options.includes(c)));
        if (replacement) {
          options[idx] = replacement;
          weaponUsers.push(replacement);
        }
      }
    }
  }

  return options;
}

/** Get the round type for a given round number */
export function getRoundType(round: number): RoundType {
  const types: RoundType[] = [
    "race",
    "armament",
    "observation",
    "conqueror",
    "devil_fruit",
    "weapon",
    "intelligence",
    "battle_iq",
    "appearance",
  ];
  return types[round - 1] ?? "appearance";
}

/** Get the display label for a round type */
export function getRoundLabel(round: number): string {
  const labels: Record<number, string> = {
    1: "Choose Your Race",
    2: "Armament Haki",
    3: "Observation Haki",
    4: "Conqueror's Haki",
    5: "Devil Fruit",
    6: "Weapon",
    7: "Intelligence",
    8: "Battle IQ",
    9: "Appearance",
  };
  return labels[round] ?? "Unknown";
}

/** Initialize a new draft */
export function initDraft(): DraftState {
  const racePool = buildRacePool();
  const options = generateRoundOptions("race", racePool);

  return {
    currentRound: 1,
    rerollsLeft: 2,
    picks: [],
    baseStats: null,
    roundOptions: options,
    isComplete: false,
  };
}

/** Reroll: generate new options for the current round */
export function rerollOptions(state: DraftState): DraftState {
  if (state.rerollsLeft <= 0) return state;

  const roundType = getRoundType(state.currentRound);
  const racePool = roundType === "race" ? buildRacePool() : undefined;
  const options = generateRoundOptions(roundType, racePool);

  return {
    ...state,
    rerollsLeft: state.rerollsLeft - 1,
    roundOptions: options,
  };
}

/** Pick an option and advance to the next round */
export function pickOption(state: DraftState, characterIndex: number): DraftState {
  const character = state.roundOptions[characterIndex];
  if (!character) return state;

  const roundType = getRoundType(state.currentRound);

  const pick: DraftPick = {
    round: state.currentRound,
    roundType,
    characterId: character.id,
    characterName: character.displayName,
    rarity: character.rarity,
  };

  const newPicks = [...state.picks, pick];

  // Set base stats from race pick (Round 1)
  let baseStats = state.baseStats;
  if (roundType === "race") {
    baseStats = getRaceStats(character.race);
  }

  const nextRound = state.currentRound + 1;
  const isComplete = nextRound > 9;

  // Generate options for next round if not complete
  const nextOptions = isComplete ? [] : generateRoundOptions(getRoundType(nextRound));

  return {
    currentRound: nextRound,
    rerollsLeft: state.rerollsLeft,
    picks: newPicks,
    baseStats,
    roundOptions: nextOptions,
    isComplete,
  };
}

/** Resolve a DraftPick to its Character */
function resolveChar(pick: DraftPick | undefined): Character | null {
  if (!pick) return null;
  return Characters.find((c) => c.id === pick.characterId) ?? null;
}

/** Calculate final stats from all picks */
export function calculateFinalStats(picks: DraftPick[]): {
  stats: StatBlock;
  breakdown: { label: string; modifier: string }[];
} {
  const breakdown: { label: string; modifier: string }[] = [];
  const get = (type: RoundType) => resolveChar(picks.find((p) => p.roundType === type));

  // Step 1: Get base stats from race pick
  const raceChar = get("race");
  const stats: StatBlock = raceChar
    ? getRaceStats(raceChar.race)
    : { strength: 100, durability: 100, speed: 100, awareness: 100, stamina: 100 };

  breakdown.push({
    label: `Race (${raceChar?.race ?? "human"})`,
    modifier: `STR:${stats.strength} DEF:${stats.durability} SPD:${stats.speed} AWR:${stats.awareness} STA:${stats.stamina}`,
  });

  // Step 2: Apply haki multipliers
  const hakiConfig = [
    { type: "armament" as const, affects: ["strength", "durability"] as const, getMultiplier: (c: Character) => c.haki.armament },
    { type: "observation" as const, affects: ["speed", "awareness"] as const, getMultiplier: (c: Character) => c.haki.observation },
    { type: "conqueror" as const, affects: ["strength", "durability", "stamina"] as const, getMultiplier: (c: Character) => c.haki.conqueror },
  ];

  for (const { type, affects, getMultiplier } of hakiConfig) {
    const char = get(type);
    if (!char) continue;
    const haki = getMultiplier(char);
    for (const stat of affects) stats[stat] *= haki.multiplier;
    breakdown.push({ label: `${type} (${haki.tier})`, modifier: `×${haki.multiplier} on ${affects.join(", ")}` });
  }

  // Step 3: Apply DF multipliers
  const dfChar = get("devil_fruit");
  if (dfChar && dfChar.devilFruit.type !== "none") {
    const df = dfChar.devilFruit;
    stats.strength *= df.attackMultiplier;
    stats.durability *= df.durabilityMultiplier;
    stats.speed *= df.speedMultiplier;
    stats.awareness *= df.awarenessMultiplier;
    stats.stamina *= df.staminaMultiplier;
    breakdown.push({
      label: `DF (${df.englishName})`,
      modifier: `STR×${df.attackMultiplier} DEF×${df.durabilityMultiplier} SPD×${df.speedMultiplier} AWR×${df.awarenessMultiplier} STA×${df.staminaMultiplier}`,
    });
    if (df.state.awakened) {
      for (const stat of df.state.target) stats[stat] *= df.state.awakenedMultiplier;
      breakdown.push({ label: "Awakened", modifier: `×${df.state.awakenedMultiplier} on ${df.state.target.join(", ")}` });
    }
  }

  // Step 4: Apply weapon multipliers
  const weaponChar = get("weapon");
  if (weaponChar && weaponChar.weapon.type !== "none") {
    const w = weaponChar.weapon;
    stats.strength *= w.attackMultiplier;
    stats.durability *= w.durabilityMultiplier;
    stats.speed *= w.speedMultiplier;
    stats.awareness *= w.awarenessMultiplier;
    stats.stamina *= w.staminaMultiplier;
    breakdown.push({
      label: `Weapon (${w.name})`,
      modifier: `STR×${w.attackMultiplier} DEF×${w.durabilityMultiplier} SPD×${w.speedMultiplier} AWR×${w.awarenessMultiplier} STA×${w.staminaMultiplier}`,
    });
  }

  // Step 5: Intelligence boosts awareness, Battle IQ boosts strength
  const intChar = get("intelligence");
  if (intChar) {
    const bonus = intChar.intelligence / 100;
    stats.awareness *= 1 + bonus * 0.3;
    breakdown.push({ label: `Intelligence (${intChar.intelligence})`, modifier: `+${(bonus * 30).toFixed(0)}% Awareness` });
  }

  const biqChar = get("battle_iq");
  if (biqChar) {
    const bonus = biqChar.battleIQ / 100;
    stats.strength *= 1 + bonus * 0.2;
    breakdown.push({ label: `Battle IQ (${biqChar.battleIQ})`, modifier: `+${(bonus * 20).toFixed(0)}% Strength` });
  }

  // Round to 1 decimal
  stats.strength = Math.round(stats.strength * 10) / 10;
  stats.durability = Math.round(stats.durability * 10) / 10;
  stats.speed = Math.round(stats.speed * 10) / 10;
  stats.awareness = Math.round(stats.awareness * 10) / 10;
  stats.stamina = Math.round(stats.stamina * 10) / 10;

  return { stats, breakdown };
}

/** Simplified BST calculator — takes a single character, returns total stat sum */
export function calculateCharacterBST(char: Character): number {
  const race = getRaceStats(char.race);
  const s = {
    strength: race.strength,
    durability: race.durability,
    speed: race.speed,
    awareness: race.awareness,
    stamina: race.stamina,
  };

  // Haki — armament boosts STR+DEF, observation boosts SPD+AWR, conqueror boosts STR+DEF+STA
  s.strength *= char.haki.armament.multiplier * char.haki.conqueror.multiplier;
  s.durability *= char.haki.armament.multiplier * char.haki.conqueror.multiplier;
  s.speed *= char.haki.observation.multiplier;
  s.awareness *= char.haki.observation.multiplier;
  s.stamina *= char.haki.conqueror.multiplier;

  // Devil Fruit
  if (char.devilFruit.type !== "none") {
    const df = char.devilFruit;
    s.strength *= df.attackMultiplier;
    s.durability *= df.durabilityMultiplier;
    s.speed *= df.speedMultiplier;
    s.awareness *= df.awarenessMultiplier;
    s.stamina *= df.staminaMultiplier;

    if (df.state.awakened) {
      for (const stat of df.state.target) {
        s[stat] *= df.state.awakenedMultiplier;
      }
    }
  }

  // Weapon
  if (char.weapon.type !== "none") {
    const w = char.weapon;
    s.strength *= w.attackMultiplier;
    s.durability *= w.durabilityMultiplier;
    s.speed *= w.speedMultiplier;
    s.awareness *= w.awarenessMultiplier;
    s.stamina *= w.staminaMultiplier;
  }

  // Intelligence boosts awareness, Battle IQ boosts strength
  s.awareness *= 1 + (char.intelligence / 100) * 0.3;
  s.strength *= 1 + (char.battleIQ / 100) * 0.2;

  return Math.round((s.strength + s.durability + s.speed + s.awareness + s.stamina) * 10) / 10;
}
