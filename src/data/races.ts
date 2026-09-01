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
    stats: { strength: 200, durability: 130, speed: 110, awareness: 110, stamina: 130 },
  },
  {
    name: "longleg",
    stats: { strength: 100, durability: 100, speed: 400, awareness: 120, stamina: 140 },
  },
  {
    name: "shandia",
    stats: { strength: 180, durability: 160, speed: 200, awareness: 180, stamina: 200 },
  },
  {
    name: "merfolk",
    stats: { strength: 130, durability: 130, speed: 700, awareness: 150, stamina: 100 },
  },
  {
    name: "mink",
    stats: { strength: 250, durability: 220, speed: 500, awareness: 400, stamina: 350 },
  },
  {
    name: "dwarf",
    stats: { strength: 300, durability: 180, speed: 600, awareness: 200, stamina: 250 },
  },
  {
    name: "fishman",
    stats: { strength: 1000, durability: 500, speed: 300, awareness: 150, stamina: 500 },
  },
  {
    name: "lunarian",
    stats: { strength: 700, durability: 2000, speed: 400, awareness: 200, stamina: 500 },
  },
  {
    name: "giant",
    stats: { strength: 2000, durability: 1000, speed: 100, awareness: 100, stamina: 900 },
  },
  {
    name: "oni",
    stats: { strength: 900, durability: 900, speed: 200, awareness: 200, stamina: 1000 },
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
