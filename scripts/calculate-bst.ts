import { Characters } from "../src/data/characters";
import { calculateFinalStats } from "../src/lib/draft";
import type { DraftPick, RoundType } from "../src/lib/types";
import { writeFileSync } from "fs";

const statRoundTypes: RoundType[] = [
  "race",
  "armament",
  "observation",
  "conqueror",
  "devil_fruit",
  "weapon",
  "intelligence",
  "battle_iq",
];

const results = Characters.map((char) => {
  // Simulate a draft where this character is used for every stat round
  const picks: DraftPick[] = statRoundTypes.map((roundType, i) => ({
    round: i + 1,
    roundType,
    characterId: char.id,
    characterName: char.displayName,
    rarity: char.rarity,
  }));

  const { stats } = calculateFinalStats(picks);
  const bst = Math.round((stats.strength + stats.durability + stats.speed + stats.awareness + stats.stamina) * 10) / 10;

  return {
    name: char.displayName,
    bst,
    race: char.race,
    df: char.devilFruit.englishName || "None",
    weapon: char.weapon.name || "None",
    stats,
  };
});

// Sort by BST descending
results.sort((a, b) => b.bst - a.bst);

// Build markdown
const lines = [
  "# Character Base Stat Totals (BST)",
  "",
  "Each character used for all 8 stat rounds (race → haki → DF → weapon → intelligence → battle IQ). BST = sum of final 5 stats.",
  "",
  "| # | Name | BST | Race | DF | Weapon |",
  "| - | ---- | --- | ---- | -- | ------ |",
];

results.forEach((r, i) => {
  lines.push(
    `| ${i + 1} | ${r.name} | ${r.bst.toLocaleString()} | ${r.race} | ${r.df} | ${r.weapon} |`,
  );
});

writeFileSync("BST.md", lines.join("\n"));
console.log(`BST.md written — ${results.length} characters, top 5:`);
results.slice(0, 5).forEach((r, i) => {
  console.log(`  ${i + 1}. ${r.name} — ${r.bst.toLocaleString()}`);
});
