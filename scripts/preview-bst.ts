import { Characters } from "../src/data/characters-v2";
import { getRaceModifier } from "../src/data/races";
import { readFileSync, writeFileSync } from "fs";

type Char = (typeof Characters)[number];
type Seven = { str: number; atk: number; dur: number; def: number; spd: number; awr: number; sta: number };

/** NEW formula: 7 stats, zero-base ATK/DEF, reflex->SPD, race % on body, int/biq %. */
function newStats(char: Char): Seven & { bst: number } {
  const b = char.baseStats;
  let str = b.strength;
  let atk = 0;
  let dur = b.durability;
  let def = 0;
  let spd = b.speed;
  let awr = b.awareness;
  let sta = b.stamina;

  atk += char.haki.armament.attack + char.haki.conqueror.attack;
  def += char.haki.armament.defense + char.haki.conqueror.defense;
  spd += char.haki.observation.speed + char.haki.observation.reflex;
  awr += char.haki.observation.awareness;
  sta += char.haki.armament.stamina + char.haki.conqueror.stamina;

  if (char.devilFruit.type !== "none") {
    const df = char.devilFruit;
    atk += df.attack;
    def += df.defense;
    spd += df.speed;
    awr += df.awareness;
    sta += df.stamina;
  }
  if (char.weapon.type !== "none") {
    const w = char.weapon;
    atk += w.attack;
    def += w.defense;
    spd += w.speed;
    awr += w.awareness;
    sta += w.stamina;
  }

  const mod = getRaceModifier(char.race);
  str *= 1 + mod.strength / 100;
  dur *= 1 + mod.durability / 100;
  spd *= 1 + mod.speed / 100;
  awr *= 1 + mod.awareness / 100;
  sta *= 1 + mod.stamina / 100;

  awr *= 1 + (b.intelligence / 100) * 0.3;
  str *= 1 + (b.battleIQ / 100) * 0.2;

  const r = (n: number) => Math.round(n * 10) / 10;
  str = r(str);
  atk = r(atk);
  dur = r(dur);
  def = r(def);
  spd = r(spd);
  awr = r(awr);
  sta = r(sta);
  return { str, atk, dur, def, spd, awr, sta, bst: Math.round(str + atk + dur + def + spd + awr + sta) };
}

/** OLD values: read live Rankings-v2.md (7-stat split, no race) — honest delta. */
const oldBstMap = new Map<string, number>();
for (const line of readFileSync("Rankings-v2.md", "utf8").split("\n")) {
  const m = line.match(/\| \d+ \| (.+?) \| (?:basic|epic|legend) \| ([\d,]+) \|/);
  if (m) oldBstMap.set(m[1], parseInt(m[2].replace(/,/g, "")));
}

const rows = Characters.map((char) => {
  const n = newStats(char);
  const o = oldBstMap.get(char.displayName) ?? 0;
  return { char, ...n, old: o, delta: n.bst - o };
});
rows.sort((a, b) => b.bst - a.bst);

// Old ranks for mover detection
const byOld = [...rows].sort((a, b) => b.old - a.old);
const oldRank = new Map(byOld.map((r, i) => [r.char.id, i + 1]));

const fmt = (n: number) => n.toLocaleString();
const lines = [
  "# BST Preview — 7-stat + race % model",
  "",
  "New = STR/ATK/DUR/DEF/SPD/AWR/STA (ATK/DEF zero-base, reflex->SPD, race % body-only, int/biq %). Old = current Rankings-v2.md formula (5 merged, no race).",
  "",
  "| Rank | Name | Rarity | Race | New BST | Old BST | Δ | STR | ATK | DUR | DEF | SPD | AWR | STA |",
  "| ---- | ---- | ------ | ---- | ------- | ------- | -- | --- | --- | --- | --- | --- | --- | --- |",
];
rows.forEach((r, i) => {
  lines.push(
    `| ${i + 1} | ${r.char.displayName} | ${r.char.rarity} | ${r.char.race} | ${fmt(r.bst)} | ${fmt(r.old)} | ${r.delta >= 0 ? "+" : ""}${fmt(r.delta)} | ${fmt(r.str)} | ${fmt(r.atk)} | ${fmt(r.dur)} | ${fmt(r.def)} | ${fmt(r.spd)} | ${fmt(r.awr)} | ${fmt(r.sta)} |`,
  );
});

lines.push("", "## Biggest rank movers (|Δrank| >= 3)", "");
rows.forEach((r, i) => {
  const or = oldRank.get(r.char.id) ?? 0;
  if (Math.abs(or - (i + 1)) >= 3)
    lines.push(`- ${r.char.displayName}: ${or} -> ${i + 1} (BST ${fmt(r.old)} -> ${fmt(r.bst)})`);
});

lines.push("", "## Race group averages (new BST)", "");
const groups = new Map<string, number[]>();
rows.forEach((r) => {
  if (!groups.has(r.char.race)) groups.set(r.char.race, []);
  groups.get(r.char.race)?.push(r.bst);
});
[...groups.entries()]
  .map(([race, arr]) => ({ race, avg: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length), n: arr.length }))
  .sort((a, b) => b.avg - a.avg)
  .forEach((g) => lines.push(`- ${g.race}: ${fmt(g.avg)} (n=${g.n})`));

writeFileSync("Preview-BST.md", lines.join("\n"));
console.log(`Preview-BST.md written — ${rows.length} characters`);
console.log("Top 5:");
rows
  .slice(0, 5)
  .forEach((r, i) => console.log(`  ${i + 1}. ${r.char.displayName} — ${fmt(r.bst)} (old ${fmt(r.old)})`));
