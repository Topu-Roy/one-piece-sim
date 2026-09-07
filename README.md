# Anime Draft — One Piece Character Draft Builder

A browser draft game: build an original "strongest possible character" by harvesting **one trait per round** from 4 donor options, over **8 rounds** (Body → Armament → Observation → Conqueror's → Devil Fruit → Weapon → Intelligence → Battle IQ). Final builds resolve to **7 stats** (STR/ATK/DUR/DEF/SPD/AWR/STA) and rank live against all **184** roster characters. Rank-only results — raw numbers stay hidden.

Stack: Astro 7 + Svelte 5 + Tailwind CSS v4 + TypeScript (strict), client-side only. Package manager: **Bun**.

## Commands

| Command                  | Action                                        |
| :----------------------- | :-------------------------------------------- |
| `bun install`            | Install dependencies                          |
| `bun dev`                | Dev server at `localhost:4321`                |
| `bun run build`          | Production build to `./dist/`                 |
| `bun run preview`        | Preview the build locally                     |
| `bun run tsc --noEmit`   | Typecheck                                     |
| `bun run lint`           | ESLint                                        |
| `bun run lint:fix`       | ESLint with autofix                           |
| `bun run format`         | Prettier write                                |
| `bun scripts/rank-v2.ts` | Regenerate `Rankings-v2.md` from current data |

After data or formula changes: regen rankings → `tsc` → `lint:fix` → `format` → `lint` → sanity drafts → `build`.

## Project Structure

```text
src/
├── components/      # DraftGame, RoundScreen, CharacterCard, DraftPicks,
│                    # ResultScreen, RerollButton, NavBar (Svelte)
├── data/            # characters-v2.ts — all 184 hand-tuned characters
├── lib/             # draft.ts — rolls, guarantees, stat math, ranking
│                    # types.ts, preload.ts, cloudinary.ts
├── stores/          # draft.ts — Svelte draft state store
├── assets/          # ancient_bg.jpg backdrop
└── pages/index.astro# client:only entry
scripts/rank-v2.ts   # rankings generator (imports the lib's BST — no copy)
Rankings-v2.md       # generated roster rankings (read, don't hand-edit)
```

## Docs

- `CORE_IDEA.md` — game design document (rounds, rarity, 7-stat formula)
- `Rounds.md`, `design.md` — round spec, visual design system
- `*_REVIEW.md`, `MISPLACED.md`, `RARITY_REVIEW.md` — canon audit trails behind the numbers
