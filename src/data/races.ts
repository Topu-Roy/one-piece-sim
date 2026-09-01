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
    stats: { strength: 100, durability: 100, speed: 220, awareness: 120, stamina: 140 },
  },
  {
    name: "shandia",
    stats: { strength: 180, durability: 160, speed: 200, awareness: 180, stamina: 180 },
  },
  {
    name: "merfolk",
    stats: { strength: 130, durability: 130, speed: 600, awareness: 150, stamina: 100 },
  },
  {
    name: "mink",
    stats: { strength: 250, durability: 220, speed: 450, awareness: 250, stamina: 190 },
  },
  {
    name: "dwarf",
    stats: { strength: 300, durability: 180, speed: 400, awareness: 200, stamina: 200 },
  },
  {
    name: "fishman",
    stats: { strength: 500, durability: 400, speed: 300, awareness: 150, stamina: 250 },
  },
  {
    name: "lunarian",
    stats: { strength: 600, durability: 650, speed: 280, awareness: 190, stamina: 300 },
  },
  {
    name: "giant",
    stats: { strength: 850, durability: 550, speed: 100, awareness: 100, stamina: 250 },
  },
  {
    name: "oni",
    stats: { strength: 650, durability: 450, speed: 200, awareness: 180, stamina: 350 },
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
