// Lineup sampling — own implementation, no imports from other modes.
// Input donors must already be slimmed to RankedCharacter by the caller.

import { TOTAL_SLOTS, type BlindRarity, type RankedCharacter } from "./types";

/** Per-draw rarity odds: gods stay treasure, basics fill the list. */
const RARITY_WEIGHTS: { rarity: BlindRarity; weight: number }[] = [
  { rarity: "god", weight: 10 },
  { rarity: "legend", weight: 20 },
  { rarity: "epic", weight: 30 },
  { rarity: "basic", weight: 40 },
];

function rollRarity(): BlindRarity {
  const total = RARITY_WEIGHTS.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of RARITY_WEIGHTS) {
    roll -= entry.weight;
    if (roll < 0) return entry.rarity;
  }
  return "basic";
}

/**
 * Draw TOTAL_SLOTS unique donors: each slot rolls rarity at
 * 10/20/30/40, then takes a random unpicked donor of that rarity.
 * Exhausted rarities spill to whatever remains — uniqueness always wins.
 */
export function sampleLineup(donors: RankedCharacter[]): RankedCharacter[] {
  const remaining = [...donors];
  const lineup: RankedCharacter[] = [];
  while (lineup.length < TOTAL_SLOTS && remaining.length > 0) {
    const wanted = rollRarity();
    const pool = remaining.filter((donor) => donor.rarity === wanted);
    const source = pool.length > 0 ? pool : remaining;
    const pick = source[Math.floor(Math.random() * source.length)] as RankedCharacter;
    lineup.push(pick);
    remaining.splice(remaining.indexOf(pick), 1);
  }
  return lineup;
}

/** Scoring lands here once decided — stub keeps rounds shippable first. */
export function scorePlacements(): number {
  return 0;
}
