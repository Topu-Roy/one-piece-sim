import type { Character, Rarity, DraftState, DraftPick, StatBlock, RoundType } from "./types";
import { Characters } from "../data/characters-v2";
import { getRaceModifier } from "../data/races";

/** Rarity roll probabilities: 40% basic, 30% epic, 20% legend, 10% god */
function rollRarity(): Rarity {
  const roll = Math.random() * 100;
  if (roll < 10) return "god";
  if (roll < 30) return "legend";
  if (roll < 60) return "epic";
  return "basic";
}

/** Get a random item from an array */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
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

/** Full fallback pool for a round type (any rarity) */
function getFullPool(roundType: RoundType): Character[] {
  switch (roundType) {
    case "devil_fruit":
      return Characters.filter((c) => c.devilFruit.type !== "none");
    case "weapon":
      return Characters.filter((c) => c.weapon.type !== "none");
    default:
      return Characters;
  }
}

/**
 * Draw one option: rarity roll → random char of that rarity.
 * Sampling is without replacement within the round (taken = already drawn
 * this round) and excludes already-picked donors (excludedIds).
 * Fallback ladder: rarity pool → any-rarity pool → any-rarity incl. picked
 * (last resort only fires in tiny DF/weapon rarity slices).
 */
function drawOption(roundType: RoundType, taken: Set<string>, excludedIds: Set<string>): Character {
  const rarity = rollRarity();

  let pool: Character[];
  switch (roundType) {
    case "devil_fruit":
      pool = getDFUsersByRarity(rarity);
      break;
    case "weapon":
      pool = getWeaponUsersByRarity(rarity);
      break;
    default:
      pool = getCharactersByRarity(rarity);
      break;
  }

  const fresh = (list: Character[]) => list.filter((c) => !taken.has(c.id) && !excludedIds.has(c.id));

  let candidates = fresh(pool);
  if (candidates.length === 0) candidates = fresh(getFullPool(roundType));
  if (candidates.length === 0) candidates = getFullPool(roundType).filter((c) => !taken.has(c.id));
  if (candidates.length === 0) candidates = getFullPool(roundType);

  const choice = pickRandom(candidates);
  taken.add(choice.id);
  return choice;
}

/**
 * Generate 4 options for a round.
 * Every round (body included) rolls rarity per slot (40/30/20/10).
 * Options are unique within the round and never re-offer picked donors.
 */
function generateRoundOptions(roundType: RoundType, excludedIds: Set<string> = new Set()): Character[] {
  // Round 1 body uses the standard rarity-weighted path — race plays
  // no part in selection (race % still buffs the final BST).
  const taken = new Set<string>();
  const options: Character[] = [];

  for (let i = 0; i < 4; i++) {
    options.push(drawOption(roundType, taken, excludedIds));
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
        const candidates = Characters.filter(
          (c) => c.weapon.type !== "none" && !options.some((o) => o.id === c.id),
        );
        const replacement = candidates.length > 0 ? pickRandom(candidates) : undefined;
        if (replacement) {
          taken.delete(nw.id);
          taken.add(replacement.id);
          options[idx] = replacement;
          weaponUsers.push(replacement);
        }
      }
    }
  }

  return options;
}

/** Total draft rounds (1 Body + 5 power + 2 mind... see labels) */
export const TOTAL_ROUNDS = 8;

/** Get the round type for a given round number */
export function getRoundType(round: number): RoundType {
  const types: RoundType[] = [
    "body",
    "armament",
    "observation",
    "conqueror",
    "devil_fruit",
    "weapon",
    "intelligence",
    "battle_iq",
  ];
  return types[round - 1] ?? "battle_iq";
}

/** Get the display label for a round type */
export function getRoundLabel(round: number): string {
  const labels: Record<number, string> = {
    1: "Choose Your Body",
    2: "Armament Haki",
    3: "Observation Haki",
    4: "Conqueror's Haki",
    5: "Devil Fruit",
    6: "Weapon",
    7: "Intelligence",
    8: "Battle IQ",
  };
  return labels[round] ?? "Unknown";
}

/** IDs of already-picked donors — excluded from future option sets */
function pickedIds(picks: DraftPick[]): Set<string> {
  return new Set(picks.map((p) => p.characterId));
}

/** Initialize a new draft */
export function initDraft(): DraftState {
  const options = generateRoundOptions("body");

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
  // Reroll offers fresh faces: exclude picked donors + current 4 options.
  const excluded = pickedIds(state.picks);
  for (const o of state.roundOptions) excluded.add(o.id);
  const options = generateRoundOptions(roundType, excluded);

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

  // Set base stats from body pick (Round 1) — per-character base, not race table
  let baseStats = state.baseStats;
  if (roundType === "body") {
    const b = character.baseStats;
    baseStats = {
      strength: b.strength,
      attack: 0,
      durability: b.durability,
      defense: 0,
      speed: b.speed,
      awareness: b.awareness,
      stamina: b.stamina,
    };
  }

  const nextRound = state.currentRound + 1;
  const isComplete = nextRound > TOTAL_ROUNDS;

  // Generate options for next round if not complete (picked donors excluded)
  const nextOptions = isComplete ? [] : generateRoundOptions(getRoundType(nextRound), pickedIds(newPicks));

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

/**
 * Calculate final stats from all picks — V2 additive system (7 stats).
 *
 * Formula: finalStat = characterBase + hakiBonus + dfBonus + weaponBonus,
 * then race % (body only), then intelligence boosts awareness
 * and battle IQ boosts strength (%).
 *
 * Routing (attack/defense are distinct from strength/durability):
 *   STR = base.strength only (+ battleIQ %)
 *   ATK = armament.attack + conqueror.attack + DF.attack + weapon.attack (base 0)
 *   DUR = base.durability only
 *   DEF = armament.defense + conqueror.defense + DF.defense + weapon.defense (base 0)
 *   SPD = base.speed + observation.speed + observation.reflex + DF/weapon.speed
 *   AWR = base.awareness + observation.awareness + DF/weapon.awareness (+ int %)
 *   STA = base.stamina + armament/conqueror stamina + DF/weapon.stamina
 */
export function calculateFinalStats(picks: DraftPick[]): {
  stats: StatBlock;
  breakdown: { label: string; modifier: string }[];
} {
  const breakdown: { label: string; modifier: string }[] = [];
  const get = (type: RoundType) => resolveChar(picks.find((p) => p.roundType === type));

  // Step 1: Base stats from character (individual, evaluated from feats).
  // Attack/defense start at 0 — derived purely from haki/DF/weapon.
  const bodyChar = get("body");
  const stats: StatBlock = bodyChar
    ? {
        strength: bodyChar.baseStats.strength,
        attack: 0,
        durability: bodyChar.baseStats.durability,
        defense: 0,
        speed: bodyChar.baseStats.speed,
        awareness: bodyChar.baseStats.awareness,
        stamina: bodyChar.baseStats.stamina,
      }
    : { strength: 100, attack: 0, durability: 100, defense: 0, speed: 100, awareness: 100, stamina: 100 };

  breakdown.push({
    label: `Base (${bodyChar?.displayName ?? "unknown"})`,
    modifier: `STR:${stats.strength} DUR:${stats.durability} SPD:${stats.speed} AWR:${stats.awareness} STA:${stats.stamina}`,
  });

  // Step 2: Add haki raw values
  // Armament → attack, defense, stamina
  const armChar = get("armament");
  if (armChar) {
    const arm = armChar.haki.armament;
    stats.attack += arm.attack;
    stats.defense += arm.defense;
    stats.stamina += arm.stamina;
    breakdown.push({
      label: `Armament (${arm.tier})`,
      modifier: `+${arm.attack} ATK, +${arm.defense} DEF, +${arm.stamina} STA`,
    });
  }

  // Observation → awareness, speed, reflex (dodge sense → speed)
  const obsChar = get("observation");
  if (obsChar) {
    const obs = obsChar.haki.observation;
    stats.awareness += obs.awareness;
    stats.speed += obs.speed + obs.reflex;
    breakdown.push({
      label: `Observation (${obs.tier})`,
      modifier: `+${obs.awareness} AWR, +${obs.speed + obs.reflex} SPD`,
    });
  }

  // Conqueror → attack, stamina, defense
  const conChar = get("conqueror");
  if (conChar) {
    const con = conChar.haki.conqueror;
    stats.attack += con.attack;
    stats.stamina += con.stamina;
    stats.defense += con.defense;
    breakdown.push({
      label: `Conqueror (${con.tier})`,
      modifier: `+${con.attack} ATK, +${con.stamina} STA, +${con.defense} DEF`,
    });
  }

  // Step 3: Add DF raw values
  const dfChar = get("devil_fruit");
  if (dfChar && dfChar.devilFruit.type !== "none") {
    const df = dfChar.devilFruit;
    stats.attack += df.attack;
    stats.defense += df.defense;
    stats.speed += df.speed;
    stats.awareness += df.awareness;
    stats.stamina += df.stamina;
    breakdown.push({
      label: `DF (${df.englishName})`,
      modifier: `+${df.attack} ATK, +${df.defense} DEF, +${df.speed} SPD, +${df.awareness} AWR, +${df.stamina} STA`,
    });
  }

  // Step 4: Add weapon raw values
  const weaponChar = get("weapon");
  if (weaponChar && weaponChar.weapon.type !== "none") {
    const w = weaponChar.weapon;
    stats.attack += w.attack;
    stats.defense += w.defense;
    stats.speed += w.speed;
    stats.awareness += w.awareness;
    stats.stamina += w.stamina;
    breakdown.push({
      label: `Weapon (${w.name})`,
      modifier: `+${w.attack} ATK, +${w.defense} DEF, +${w.speed} SPD, +${w.awareness} AWR, +${w.stamina} STA`,
    });
  }

  // Step 5: Race % modifiers (body stats only — never attack/defense).
  // Race comes from the Round 1 Body pick.
  if (bodyChar) {
    const mod = getRaceModifier(bodyChar.race);
    stats.strength *= 1 + mod.strength / 100;
    stats.durability *= 1 + mod.durability / 100;
    stats.speed *= 1 + mod.speed / 100;
    stats.awareness *= 1 + mod.awareness / 100;
    stats.stamina *= 1 + mod.stamina / 100;
    breakdown.push({
      label: `Race (${bodyChar.race})`,
      modifier: `STR:+${mod.strength}% DUR:+${mod.durability}% SPD:+${mod.speed}% AWR:+${mod.awareness}% STA:+${mod.stamina}%`,
    });
  }

  // Step 6: Intelligence boosts awareness, Battle IQ boosts strength (percentage bonuses)
  const intChar = get("intelligence");
  if (intChar) {
    const bonus = intChar.baseStats.intelligence / 100;
    stats.awareness *= 1 + bonus * 0.3;
    breakdown.push({
      label: `Intelligence (${intChar.baseStats.intelligence})`,
      modifier: `+${(bonus * 30).toFixed(0)}% Awareness`,
    });
  }

  const biqChar = get("battle_iq");
  if (biqChar) {
    const bonus = biqChar.baseStats.battleIQ / 100;
    stats.strength *= 1 + bonus * 0.2;
    breakdown.push({
      label: `Battle IQ (${biqChar.baseStats.battleIQ})`,
      modifier: `+${(bonus * 20).toFixed(0)}% Strength`,
    });
  }

  // Round to 1 decimal
  stats.strength = Math.round(stats.strength * 10) / 10;
  stats.attack = Math.round(stats.attack * 10) / 10;
  stats.durability = Math.round(stats.durability * 10) / 10;
  stats.defense = Math.round(stats.defense * 10) / 10;
  stats.speed = Math.round(stats.speed * 10) / 10;
  stats.awareness = Math.round(stats.awareness * 10) / 10;
  stats.stamina = Math.round(stats.stamina * 10) / 10;

  return { stats, breakdown };
}

/** Simplified BST calculator — V2 additive system (7 stats) */
export function calculateCharacterBST(char: Character): number {
  const s = {
    strength: char.baseStats.strength,
    attack: 0,
    durability: char.baseStats.durability,
    defense: 0,
    speed: char.baseStats.speed,
    awareness: char.baseStats.awareness,
    stamina: char.baseStats.stamina,
  };

  // Haki — additive (attack/defense separate from strength/durability)
  s.attack += char.haki.armament.attack + char.haki.conqueror.attack;
  s.defense += char.haki.armament.defense + char.haki.conqueror.defense;
  s.speed += char.haki.observation.speed + char.haki.observation.reflex;
  s.awareness += char.haki.observation.awareness;
  s.stamina += char.haki.armament.stamina + char.haki.conqueror.stamina;

  // Devil Fruit — additive
  if (char.devilFruit.type !== "none") {
    const df = char.devilFruit;
    s.attack += df.attack;
    s.defense += df.defense;
    s.speed += df.speed;
    s.awareness += df.awareness;
    s.stamina += df.stamina;
  }

  // Weapon — additive
  if (char.weapon.type !== "none") {
    const w = char.weapon;
    s.attack += w.attack;
    s.defense += w.defense;
    s.speed += w.speed;
    s.awareness += w.awareness;
    s.stamina += w.stamina;
  }

  // Race % modifiers (body stats only — never attack/defense)
  const mod = getRaceModifier(char.race);
  s.strength *= 1 + mod.strength / 100;
  s.durability *= 1 + mod.durability / 100;
  s.speed *= 1 + mod.speed / 100;
  s.awareness *= 1 + mod.awareness / 100;
  s.stamina *= 1 + mod.stamina / 100;

  // Intelligence boosts awareness, Battle IQ boosts strength (percentage)
  s.awareness *= 1 + (char.baseStats.intelligence / 100) * 0.3;
  s.strength *= 1 + (char.baseStats.battleIQ / 100) * 0.2;

  return (
    Math.round((s.strength + s.attack + s.durability + s.defense + s.speed + s.awareness + s.stamina) * 10) / 10
  );
}

export type BuildRank = {
  rank: number;
  total: number;
  bst: number;
  above: { name: string; bst: number } | null;
  below: { name: string; bst: number } | null;
  tied: string[];
};

/**
 * Rank a drafted build against all 184 roster characters.
 * Rank = 1 + count(roster BST strictly greater). Ties share rank.
 * Runs live in-browser (184 cheap calcs) — always in sync with tuning.
 */
export function rankBuild(stats: StatBlock): BuildRank {
  const r = (n: number) => Math.round(n * 10) / 10;
  const bst = r(
    stats.strength +
      stats.attack +
      stats.durability +
      stats.defense +
      stats.speed +
      stats.awareness +
      stats.stamina,
  );

  const table = Characters.map((c) => ({ name: c.displayName, bst: calculateCharacterBST(c) })).sort(
    (a, b) => b.bst - a.bst,
  );

  const better = table.filter((t) => t.bst > bst);
  const tied = table.filter((t) => t.bst === bst).map((t) => t.name);
  const rank = better.length + 1;

  // Neighbors: closest roster BST strictly above / below
  const above = better.length > 0 ? better[better.length - 1] : null;
  const below = table.find((t) => t.bst < bst) ?? null;

  return { rank, total: table.length + 1, bst, above, below, tied };
}
