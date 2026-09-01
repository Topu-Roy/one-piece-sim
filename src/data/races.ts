import type { Race, StatBlock } from "../lib/types";

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
    stats: { strength: 110, durability: 110, speed: 130, awareness: 150, stamina: 120 },
  },
  {
    name: "longarm",
    stats: { strength: 180, durability: 130, speed: 110, awareness: 110, stamina: 120 },
  },
  {
    name: "longleg",
    stats: { strength: 100, durability: 130, speed: 200, awareness: 120, stamina: 120 },
  },
  {
    name: "shandia",
    stats: { strength: 180, durability: 160, speed: 200, awareness: 180, stamina: 120 },
  },
  {
    name: "merfolk",
    stats: { strength: 130, durability: 230, speed: 400, awareness: 150, stamina: 130 },
  },
  {
    name: "mink",
    stats: { strength: 250, durability: 200, speed: 350, awareness: 250, stamina: 140 },
  },
  {
    name: "dwarf",
    stats: { strength: 300, durability: 200, speed: 300, awareness: 180, stamina: 170 },
  },
  {
    name: "fishman",
    stats: { strength: 350, durability: 350, speed: 260, awareness: 150, stamina: 180 },
  },
  {
    name: "lunarian",
    stats: { strength: 390, durability: 600, speed: 220, awareness: 190, stamina: 220 },
  },
  {
    name: "giant",
    stats: { strength: 450, durability: 450, speed: 100, awareness: 100, stamina: 200 },
  },
  {
    name: "oni",
    stats: { strength: 400, durability: 400, speed: 200, awareness: 180, stamina: 200 },
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
