import { EPIC_SHARE, ROUNDS, SPECIAL_TIER_CHANCE } from "../data/draftConfig";
import { LEGEND_POOL as LEGENDS, NORMAL_POOL as NORMALS } from "../data/characters";
import type { Character, DraftOption, RoundKey, Tier } from "./types";

/** Injectable RNG so the engine stays testable; defaults to Math.random. */
export type Rng = () => number;

/** Result of the per-round tier roll. */
export interface TierRoll {
  special: boolean;
  specialTier: Tier | null;
}

/** Roll the special-tier chance for a round (40% -> 60% Epic / 40% Legend). */
export function rollTier(rng: Rng = Math.random): TierRoll {
  if (rng() < SPECIAL_TIER_CHANCE) {
    const specialTier: Tier = rng() < EPIC_SHARE ? "Epic" : "Legend";
    return { special: true, specialTier };
  }
  return { special: false, specialTier: null };
}

/** Pick one random element from a pool. */
function pickOne<T>(pool: readonly T[], rng: Rng): T {
  return pool[Math.floor(rng() * pool.length)] as T;
}

/** Sample `count` distinct elements from a pool without replacement. */
function sampleDistinct<T>(pool: readonly T[], count: number, rng: Rng): T[] {
  const copy = [...pool];
  const result: T[] = [];
  for (let i = 0; i < count && copy.length > 0; i++) {
    const index = Math.floor(rng() * copy.length);
    result.push(copy.splice(index, 1)[0] as T);
  }
  return result;
}

/**
 * Build the four options for a round.
 * - No special tier: 4 distinct Normal characters.
 * - Special tier: 3 Normal + 1 Epic (a normal character elevated) or Legend
 *   (drawn only from LEGEND_POOL). Order is shuffled so the special slot varies.
 */
export function generateRoundOptions(roundIndex: number, rng: Rng = Math.random): DraftOption[] {
  if (roundIndex < 0 || roundIndex >= ROUNDS.length) {
    throw new Error(`Invalid round index: ${roundIndex}`);
  }

  const { special, specialTier } = rollTier(rng);
  const normals = sampleDistinct(NORMALS, 3, rng);
  const normalOptions = normals.map((c) => ({ ...c, tier: "Normal" as const }));

  let options: DraftOption[];
  if (special && specialTier === "Legend") {
    // Legends live in a separate pool, so no collision with the 3 normals.
    const legend = pickOne(LEGENDS, rng);
    options = [...normalOptions, { ...legend, tier: "Legend" }];
  } else if (special && specialTier === "Epic") {
    // Epic elevates a Normal-pool character, so exclude the 3 already drawn.
    const remaining = NORMALS.filter((c) => !normals.some((n) => n.id === c.id));
    const epic = pickOne(remaining, rng);
    options = [...normalOptions, { ...epic, tier: "Epic" }];
  } else {
    // No special tier: four distinct Normal characters.
    const fourNormals = sampleDistinct(NORMALS, 4, rng);
    options = fourNormals.map((c) => ({ ...c, tier: "Normal" as const }));
  }

  // Shuffle so the tiered option isn't pinned to a fixed position.
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [options[i], options[j]] = [options[j] as DraftOption, options[i] as DraftOption];
  }
  return options;
}

/** Drafted attribute value + human-readable description for a round. */
export interface ExtractedAttribute {
  value: unknown;
  description: string;
}

/**
 * Pull the single attribute relevant to `roundKey` from a character.
 * Characters lacking a meaningful value for the round (e.g. no Devil Fruit)
 * yield 0 / "none" — a legitimate trap per CORE_IDEA.md, no substitution.
 */
export function extractAttribute(character: Character, roundKey: RoundKey): ExtractedAttribute {
  switch (roundKey) {
    case "race":
      return { value: character.race, description: character.race };
    case "armament":
      return { value: character.armament, description: character.armament };
    case "observation":
      return { value: character.observation, description: character.observation };
    case "conqueror":
      return character.conqueror.has
        ? { value: character.conqueror, description: `Conqueror's Haki — ${character.conqueror.control}` }
        : { value: 0, description: "No Conqueror's Haki" };
    case "devilFruit": {
      const fruit = character.devilFruit;
      if (fruit.type === "None") return { value: 0, description: "No Devil Fruit" };
      const awakened = fruit.awakened ? " (Awakened)" : "";
      return {
        value: fruit,
        description: `${fruit.type}${awakened} · O${fruit.offense}/D${fruit.defense}/V${fruit.versatility}`,
      };
    }
    case "weapon": {
      const weapon = character.weapon;
      if (weapon.type === "None") return { value: 0, description: "No Weapon" };
      return { value: weapon, description: `${weapon.type} · ${weapon.proficiency}` };
    }
    case "strength":
    case "speed":
    case "durability":
    case "intelligence":
      return { value: character[roundKey], description: String(character[roundKey]) };
  }
}
