import { Characters } from "../src/data/characters-v2";
import { getRaceModifier } from "../src/data/races";
import { writeFileSync } from "fs";

/** BST calculator — 7 stats, uses character base stats (evaluated from canonical feats) */
function calculateBST(char: (typeof Characters)[0]): number {
  const s = {
    strength: char.baseStats.strength,
    attack: 0,
    durability: char.baseStats.durability,
    defense: 0,
    speed: char.baseStats.speed,
    awareness: char.baseStats.awareness,
    stamina: char.baseStats.stamina,
  };

  // Haki — additive (attack/defense separate from strength/durability)
  s.attack += char.haki.armament.attack + char.haki.conqueror.attack;
  s.defense += char.haki.armament.defense + char.haki.conqueror.defense;
  s.speed += char.haki.observation.speed + char.haki.observation.reflex;
  s.awareness += char.haki.observation.awareness;
  s.stamina += char.haki.armament.stamina + char.haki.conqueror.stamina;

  // Devil Fruit — additive
  if (char.devilFruit.type !== "none") {
    const df = char.devilFruit;
    s.attack += df.attack;
    s.defense += df.defense;
    s.speed += df.speed;
    s.awareness += df.awareness;
    s.stamina += df.stamina;
  }

  // Weapon — additive
  if (char.weapon.type !== "none") {
    const w = char.weapon;
    s.attack += w.attack;
    s.defense += w.defense;
    s.speed += w.speed;
    s.awareness += w.awareness;
    s.stamina += w.stamina;
  }

  // Race % modifiers (body stats only — never attack/defense)
  const mod = getRaceModifier(char.race);
  s.strength *= 1 + mod.strength / 100;
  s.durability *= 1 + mod.durability / 100;
  s.speed *= 1 + mod.speed / 100;
  s.awareness *= 1 + mod.awareness / 100;
  s.stamina *= 1 + mod.stamina / 100;

  // Intelligence boosts awareness, Battle IQ boosts strength (percentage)
  s.awareness *= 1 + (char.baseStats.intelligence / 100) * 0.3;
  s.strength *= 1 + (char.baseStats.battleIQ / 100) * 0.2;

  return Math.round(s.strength + s.attack + s.durability + s.defense + s.speed + s.awareness + s.stamina);
}

const results = Characters.map((char) => ({
  name: char.displayName,
  bst: calculateBST(char),
  race: char.race,
  rarity: char.rarity,
  weapon: char.weapon.name || "None",
}));

results.sort((a, b) => b.bst - a.bst);

const lines = [
  "# Character Rankings — V2",
  "",
  "Rankings based on 7-stat sum (STR/ATK/DUR/DEF/SPD/AWR/STA): characterBase + haki + DF + weapon, then intelligence/battleIQ % bonuses.",
  "",
  "| Rank | Name | Rarity | BST | Race | Weapon |",
  "| ---- | ---- | ------ | --- | ---- | ------ |",
];

results.forEach((r, i) => {
  lines.push(`| ${i + 1} | ${r.name} | ${r.rarity} | ${r.bst.toLocaleString()} | ${r.race} | ${r.weapon} |`);
});

writeFileSync("Rankings-v2.md", lines.join("\n"));
console.log(`Rankings-v2.md written — ${results.length} characters`);
console.log("\nTop 10:");
results.slice(0, 10).forEach((r, i) => {
  console.log(`  ${i + 1}. ${r.name} (${r.rarity}) — ${r.bst.toLocaleString()}`);
});
