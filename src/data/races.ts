import type { Race, StatBlock } from "../lib/types";
import type { Race as RaceV2, RaceModifier } from "../lib/types-v2";

export type RaceStats = {
  name: Race;
  stats: StatBlock;
};

export const RaceTable: RaceStats[] = [
  {
    name: "human",
    stats: { strength: 100, durability: 100, speed: 100, awareness: 100, stamina: 100 },
  },
  {
    name: "skypiean",
    stats: { strength: 115, durability: 115, speed: 150, awareness: 190, stamina: 130 },
  },
  {
    name: "longarm",
    stats: { strength: 140, durability: 115, speed: 105, awareness: 105, stamina: 115 },
  },
  {
    name: "longleg",
    stats: { strength: 115, durability: 120, speed: 190, awareness: 115, stamina: 115 },
  },
  {
    name: "shandia",
    stats: { strength: 155, durability: 145, speed: 170, awareness: 155, stamina: 140 },
  },
  {
    name: "merfolk",
    stats: { strength: 130, durability: 155, speed: 240, awareness: 130, stamina: 130 },
  },
  {
    name: "mink",
    stats: { strength: 200, durability: 180, speed: 250, awareness: 215, stamina: 160 },
  },
  {
    name: "dwarf",
    stats: { strength: 155, durability: 130, speed: 215, awareness: 155, stamina: 130 },
  },
  {
    name: "fishman",
    stats: { strength: 215, durability: 215, speed: 170, awareness: 130, stamina: 170 },
  },
  {
    name: "lunarian",
    stats: { strength: 215, durability: 260, speed: 170, awareness: 170, stamina: 175 },
  },
  {
    name: "giant",
    stats: { strength: 260, durability: 245, speed: 100, awareness: 100, stamina: 215 },
  },
  {
    name: "oni",
    stats: { strength: 235, durability: 235, speed: 170, awareness: 155, stamina: 190 },
  },
];

/** Get stats for a race, fallback to human if not found. Returns a copy to avoid mutating the table. */
export function getRaceStats(race: Race): StatBlock {
  const found = RaceTable.find((r) => r.name === race);
  const base = found?.stats ?? RaceTable[0].stats;
  return { ...base };
}

/** Get all race names */
export function getAllRaces(): Race[] {
  return RaceTable.map((r) => r.name);
}

// --- V2 race % modifiers (body stats only — never attack/defense) ---
// Per-character baseStats carry ~90% of power; race adds small flavor on top.
// Human gets +2% all (versatility nod, else 60% of roster gets nothing).

export const RaceModifierTable: { name: RaceV2; modifier: RaceModifier }[] = [
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
export function getRaceModifier(race: RaceV2): RaceModifier {
  const found = RaceModifierTable.find((r) => r.name === race);
  return { ...(found?.modifier ?? { strength: 0, durability: 0, speed: 0, awareness: 0, stamina: 0 }) };
}
