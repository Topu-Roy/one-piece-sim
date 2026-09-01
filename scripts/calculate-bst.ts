import { Characters } from "../src/data/characters";
import { calculateCharacterBST } from "../src/lib/draft";
import { writeFileSync } from "fs";

const results = Characters.map((char) => ({
  name: char.displayName,
  bst: calculateCharacterBST(char),
  race: char.race,
  df: char.devilFruit.englishName || "None",
  weapon: char.weapon.name || "None",
}));

results.sort((a, b) => b.bst - a.bst);

const lines = [
  "# Character Base Stat Totals (BST)",
  "",
  "BST = sum of final 5 stats after all multipliers (race + haki + DF + weapon + intelligence + battle IQ).",
  "",
  "| Rank | Name | BST |",
  "| ---- | ---- | --- |",
];

results.forEach((r, i) => {
  lines.push(`| ${i + 1} | ${r.name} | ${r.bst.toLocaleString()} |`);
});

writeFileSync("BST.md", lines.join("\n"));
console.log(`BST.md written — ${results.length} characters, top 5:`);
results.slice(0, 5).forEach((r, i) => {
  console.log(`  ${i + 1}. ${r.name} — ${r.bst.toLocaleString()}`);
});
