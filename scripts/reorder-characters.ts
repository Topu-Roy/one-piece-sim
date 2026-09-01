import { readFileSync, writeFileSync } from "fs";

const rankContent = readFileSync("Rank.md", "utf8");
const rankNames: string[] = [];
for (const line of rankContent.split("\n")) {
  if (line.startsWith("| ") && !line.startsWith("| Rank") && !line.startsWith("| ---")) {
    const name = line.split("|")[2]?.trim();
    if (name) rankNames.push(name);
  }
}

const charFile = readFileSync("src/data/characters.ts", "utf8");

// Extract the array between `export const Characters: Character[] = [` and `];`
const arrayStart = charFile.indexOf("export const Characters: Character[] = [");
const arrayEnd = charFile.indexOf("];", arrayStart) + 2;
const arrayContent = charFile.substring(arrayStart, arrayEnd);

// Split into individual character objects by finding `  {` at start of object
const objects: string[] = [];
let depth = 0;
let start = -1;
const bodyStart = arrayContent.indexOf("[") + 1;
const body = arrayContent.substring(bodyStart);

for (let i = 0; i < body.length; i++) {
  if (body[i] === "{" && depth === 0) {
    start = i;
    depth = 1;
  } else if (body[i] === "{") {
    depth++;
  } else if (body[i] === "}") {
    depth--;
    if (depth === 0 && start !== -1) {
      objects.push(body.substring(start, i + 1));
      start = -1;
    }
  }
}

// Build name -> object map
const nameToObject = new Map<string, string>();
for (const obj of objects) {
  const nameMatch = obj.match(/displayName:\s*"([^"]+)"/);
  if (nameMatch) nameToObject.set(nameMatch[1], obj);
}

// Check matches
const missing = rankNames.filter((n) => !nameToObject.has(n));
const extra = [...nameToObject.keys()].filter((n) => !rankNames.includes(n));
if (missing.length) console.log("Missing from characters.ts:", missing);
if (extra.length) console.log("Extra in characters.ts:", extra);

// Reorder
const reordered = rankNames.map((name) => nameToObject.get(name)).filter(Boolean);
const before = arrayContent.substring(0, arrayContent.indexOf("[") + 1);
const after = "];\n";
const newBody = "\n" + reordered.map((obj) => "  " + obj).join(",\n") + ",\n";

const newFile = charFile.substring(0, arrayStart) + before + newBody + after + charFile.substring(arrayEnd);
writeFileSync("src/data/characters.ts", newFile);
console.log(`Reordered ${reordered.length} characters to match Rank.md`);
