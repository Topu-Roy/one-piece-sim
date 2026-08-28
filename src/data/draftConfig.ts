import type { RoundDef, RoundKey } from "./types";

/** Total rounds in a draft — one per attribute. */
export const TOTAL_ROUNDS = 10;

/** Shared rerolls across the whole draft (not per round). */
export const REROLLS_TOTAL = 2;

/**
 * Tier roll probabilities (per CORE_IDEA.md):
 * - 40% of rounds trigger a special tier.
 * - Of those, 60% Epic, 40% Legend.
 * Resulting round mix: 60% all-Normal, 24% +1 Epic, 16% +1 Legend.
 */
export const SPECIAL_TIER_CHANCE = 0.4;
export const EPIC_SHARE = 0.6;

/** Ordered draft rounds. Order drives pacing and where rerolls feel worth spending. */
export const ROUNDS: RoundDef[] = [
  { key: "race", label: "ROUND 01 — RACE", prompt: "Choose the bloodline that shapes your build." },
  { key: "armament", label: "ROUND 02 — ARMAMENT HAKI", prompt: "Forge your defensive and offensive Haki." },
  { key: "observation", label: "ROUND 03 — OBSERVATION HAKI", prompt: "Sharpen your perception." },
  { key: "conqueror", label: "ROUND 04 — CONQUEROR'S HAKI", prompt: "Will your will bends others?" },
  { key: "devilFruit", label: "ROUND 05 — DEVIL FRUIT", prompt: "Harvest a fruit's raw potential." },
  { key: "weapon", label: "ROUND 06 — WEAPON", prompt: "Pick your instrument of war." },
  { key: "strength", label: "ROUND 07 — STRENGTH", prompt: "Claim raw physical power." },
  { key: "speed", label: "ROUND 08 — SPEED", prompt: "Take the edge in reflexes and movement." },
  { key: "durability", label: "ROUND 09 — DURABILITY", prompt: "Endure the longest fights." },
  { key: "intelligence", label: "ROUND 10 — INTELLIGENCE", prompt: "Out-think every opponent." },
];

/** Lookup helper for a round definition by its key. */
export function getRound(key: RoundKey): RoundDef {
  const round = ROUNDS.find((r) => r.key === key);
  if (!round) throw new Error(`Unknown round key: ${key}`);
  return round;
}
