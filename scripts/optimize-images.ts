import { readdirSync } from "fs";
import { execSync } from "child_process";
import { join, basename, extname } from "path";

const inputDir = "src/assets/thumbnails";
const outputDir = "src/assets/thumbnails-optimized";

const files = readdirSync(inputDir);
let converted = 0;
let failed = 0;

for (const file of files) {
  const input = join(inputDir, file);
  const name = basename(file, extname(file));
  const output = join(outputDir, `${name}.webp`);

  try {
    execSync(
      `ffmpeg -i "${input}" -vf "scale=512:512" -c:v libwebp -q:v 80 -y "${output}"`,
      { stdio: "pipe" },
    );
    converted++;
  } catch {
    console.error(`FAILED: ${file}`);
    failed++;
  }
}

console.log(`Done: ${converted} converted, ${failed} failed`);
