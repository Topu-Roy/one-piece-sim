import type { Race, RaceModifier } from "../lib/types";

// Race % modifiers (body stats only — never attack/defense).
// Per-character baseStats carry ~90% of power; race adds small flavor on top.
// Human gets +2% all (versatility nod, else 60% of roster gets nothing).

export const RaceModifierTable: { name: Race; modifier: RaceModifier }[] = [
  { name: "human", modifier: { strength: 2, durability: 2, speed: 2, awareness: 2, stamina: 2 } },
  { name: "giant", modifier: { strength: 10, durability: 10, speed: -10, awareness: 0, stamina: 5 } },
  { name: "oni", modifier: { strength: 8, durability: 8, speed: 0, awareness: 0, stamina: 5 } },
  { name: "lunarian", modifier: { strength: 5, durability: 10, speed: 0, awareness: 0, stamina: 5 } },
  { name: "fishman", modifier: { strength: 6, durability: 6, speed: 0, awareness: 0, stamina: 5 } },
  { name: "mink", modifier: { strength: 5, durability: 0, speed: 10, awareness: 6, stamina: 0 } },
  { name: "merfolk", modifier: { strength: 0, durability: 5, speed: 8, awareness: 0, stamina: 0 } },
  { name: "longleg", modifier: { strength: 0, durability: 0, speed: 8, awareness: 0, stamina: 0 } },
  { name: "dwarf", modifier: { strength: 5, durability: 0, speed: 6, awareness: 0, stamina: 0 } },
  { name: "shandia", modifier: { strength: 0, durability: 0, speed: 5, awareness: 5, stamina: 0 } },
  { name: "skypiean", modifier: { strength: 0, durability: 0, speed: 5, awareness: 8, stamina: 0 } },
  { name: "longarm", modifier: { strength: 4, durability: 0, speed: 0, awareness: 0, stamina: 0 } },
];

/** Get % modifiers for a race, fallback to neutral (all zeros) if not found. */
export function getRaceModifier(race: Race): RaceModifier {
  const found = RaceModifierTable.find((r) => r.name === race);
  return { ...(found?.modifier ?? { strength: 0, durability: 0, speed: 0, awareness: 0, stamina: 0 }) };
}

/** Get all race names (used for Round 1 pool grouping). */
export function getAllRaces(): Race[] {
  return RaceModifierTable.map((r) => r.name);
}
