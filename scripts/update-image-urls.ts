import { readFileSync, writeFileSync } from "fs";

const urlMap: Record<string, string> = JSON.parse(readFileSync("src/data/image-urls.json", "utf-8"));
let content = readFileSync("src/data/characters.ts", "utf-8");

let updated = 0;
let missed = 0;

// Match each character block and update imageURL
for (const [name, url] of Object.entries(urlMap)) {
  // Escape special regex characters in the name
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match imageURL: "placeholder.webp" right after displayName: "Name"
  const pattern = new RegExp(
    `(displayName:\\s*"[^"]*${escaped}[^"]*"\\s*,[^]*?)imageURL:\\s*"placeholder\\.webp"`,
    "g",
  );

  const match = pattern.exec(content);
  if (match) {
    content = content.replace(match[0], match[0].replace('imageURL: "placeholder.webp"', `imageURL: "${url}"`));
    updated++;
  } else {
    console.log(`MISSED: ${name}`);
    missed++;
  }
}

writeFileSync("src/data/characters.ts", content);
console.log(`\nDone: ${updated} updated, ${missed} missed`);
