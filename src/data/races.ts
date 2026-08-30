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
    name: "fishman",
    stats: { strength: 1000, durability: 450, speed: 125, awareness: 120, stamina: 300 },
  },
  {
    name: "giant",
    stats: { strength: 10000, durability: 4000, speed: 140, awareness: 100, stamina: 1000 },
  },
  {
    name: "mink",
    stats: { strength: 400, durability: 270, speed: 300, awareness: 180, stamina: 350 },
  },
  {
    name: "skypiean",
    stats: { strength: 110, durability: 110, speed: 140, awareness: 130, stamina: 120 },
  },
  {
    name: "shandia",
    stats: { strength: 180, durability: 120, speed: 190, awareness: 150, stamina: 150 },
  },
  {
    name: "lunarian",
    stats: { strength: 6500, durability: 10000, speed: 400, awareness: 200, stamina: 800 },
  },
  {
    name: "longarm",
    stats: { strength: 145, durability: 120, speed: 135, awareness: 115, stamina: 120 },
  },
  {
    name: "longleg",
    stats: { strength: 250, durability: 140, speed: 210, awareness: 125, stamina: 180 },
  },
  {
    name: "merfolk",
    stats: { strength: 300, durability: 250, speed: 1000, awareness: 140, stamina: 250 },
  },
  {
    name: "dwarf",
    stats: { strength: 1500, durability: 400, speed: 600, awareness: 160, stamina: 300 },
  },
  {
    name: "oni",
    stats: { strength: 11000, durability: 9000, speed: 250, awareness: 150, stamina: 900 },
  },
];

/** Get stats for a race, fallback to human if not found */
export function getRaceStats(race: Race): StatBlock {
  const found = RaceTable.find((r) => r.name === race);
  return found?.stats ?? RaceTable[0].stats;
}

/** Get all race names */
export function getAllRaces(): Race[] {
  return RaceTable.map((r) => r.name);
}
