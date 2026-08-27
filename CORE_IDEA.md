# One Piece Character Draft Builder — Game Design Document

## Core Concept

A self-contained, browser-based game where the player builds their own original "strongest possible character" by drafting individual attributes from a pool of One Piece-inspired characters, round by round. Instead of picking a whole character, the player harvests **one trait per round** from a choice of four characters, gradually assembling a custom, original build. Once the draft is complete, the character can be ranked against a simulated population of thousands of other possible builds.

The game has no backend — all logic, data, and simulation run client-side.

---

## Game Loop Overview

1. Player begins a new draft.
2. The game presents **10 rounds**, one per attribute.
3. Each round shows **4 character options**, each representing a "donor" for that round's attribute.
4. The player selects one option — only the attribute tied to that round transfers to the player's custom character. The rest of that character's data is discarded.
5. The player has **2 rerolls total**, shared across the whole draft (not per-round). A reroll replaces the current round's 4 options with 4 new ones.
6. After all 10 rounds are complete, the player has a fully custom character built from 10 different "donors."
7. The finished character's overall power is calculated and compared against a large simulated population to produce a rank and/or percentile.

---

## The 10 Draft Rounds (Attributes)

Each round corresponds to exactly one attribute. The order matters because it determines pacing and how "build-defining" decisions land relative to rerolls. Haki is split into three separate rounds — Armament, Observation, and Conqueror's — rather than one combined round, since each represents a distinct, independently drafted ability rather than a single tier choice.

1. **Race** — e.g. Human, Fish-Man, Giant, Mink, Skypiean, Cyborg, etc. Influences flavor and can bias the natural range of certain stats (e.g. Giants trend toward higher Strength/Durability).
2. **Armament Haki** — tier of Armament Haki: None, Basic, Advanced, or Advanced King's-infused.
3. **Observation Haki** — tier of Observation Haki: None, Basic, Advanced, or precognition-level.
4. **Conqueror's Haki** — Yes/No, plus a control sub-level if present (uncontrolled bursts vs. full directional control).
5. **Devil Fruit** — a manually authored profile per character, not a dynamically generated one. Includes:
   - **Type** — Paramecia, Zoan, Logia, or None.
   - **Awakened** — Yes/No.
   - **Offense** — hand-assigned value representing the fruit's raw combat/damage potential.
   - **Defense** — hand-assigned value representing the fruit's protective/damage-mitigation potential.
   - **Versatility** — hand-assigned value representing how broadly useful the fruit is outside pure combat (utility, mobility, information-gathering, environmental control, etc.).

   As with all other attributes, none of these sub-values are derived from a formula (e.g. Logia doesn't automatically get a fixed Defense number) — each is manually assigned per character based on how that fruit actually functions in canon. A character with no Devil Fruit gets 0 across all Devil Fruit sub-values, per the empty-attribute rule above.

6. **Weapon** — proficiency and weapon type: swordsmanship, marksmanship, staff, hand-to-hand, or none.
7. **Strength** — raw physical power stat.
8. **Speed** — reflexes and movement stat.
9. **Durability** — endurance and damage resistance stat.
10. **Intelligence** — tactical/strategic capability stat.

Each of the 10 rounds presents 4 full characters as options, but only the round's specific attribute is actually drafted from the chosen character — the rest of that character's data is irrelevant and discarded once the pick is made. This also means a player could draft their Armament Haki from one character, their Observation Haki from a completely different character, and their Conqueror's Haki from a third — mixing and matching Haki proficiencies independently rather than inheriting a single character's full Haki package.

---

## Rerolls

- The player has **2 total rerolls** for the entire draft (not per round).
- A reroll discards the current 4 options for that round and replaces them with 4 newly selected options.
- Because rerolls are scarce and shared, players must decide strategically which rounds are worth spending a reroll on (typically Devil Fruit and Haki, since they define playstyle most heavily) rather than relying on rerolls to fix every weak round.
- This scarcity ensures high variance between playthroughs — two players with the same luck can end up with meaningfully different builds depending on where they chose to spend their rerolls.

---

## Character Pool Rules

- **No exhaustion:** A character can appear in multiple rounds across the same draft, and can reappear even after being picked or rerolled away in an earlier round. There is no removal from the pool.
- **Two separate pools:**
  - **Normal/Epic pool** — the general character roster. Characters from this pool appear randomly across rounds, and any character in it can be randomly elevated to Epic tier when the tier roll triggers.
  - **Legend pool** — a small, hand-curated, separate list (e.g. Garp, Joyboy, Admirals). Legend characters do **not** appear through the normal random draw. They only ever appear as the single tiered slot in a round when the tier roll specifically resolves to Legend (the 40% special-tier chance × 40% Legend chance). They are never one of the 3 baseline Normal options.
- **Empty attributes:** If a character has no meaningful value for the round's attribute (e.g. a character with no Devil Fruit appears in the Devil Fruit round), picking them for that round simply gives the player a value of **0** for that attribute — no filtering, no substitution. This makes some picks a legitimate trap if the player doesn't know the source material well.

---

## Stat Values Are Manually Assigned

Numeric stats (Strength, Speed, Durability, Intelligence) and the strength of categorical attributes (Haki tiers, Devil Fruit potency, Weapon mastery) are **not generated from fixed formulas or clean round numbers** (e.g. not simply 10/25/40/etc.). Instead, every character's stats across every attribute are **manually assigned** by the designer, individually, based on where that character sits in the power scale of the source material.

- A Legend-tier character doesn't get their stat multiplied by a flat rule — they are manually given a higher, hand-picked value appropriate to their canon strength.
- This keeps power levels feeling authentic and canon-accurate (e.g. Garp's Strength isn't "Epic value × 1.7," it's simply set to whatever number reflects how strong Garp actually is relative to the rest of the roster) rather than mechanically derived.
- This means the tier a character carries into a round (Normal/Epic/Legend) is really just a _label/rarity indicator_ — the actual stat values are hand-tuned per character per attribute, not calculated from the tier.

---

## Tier System (Rarity Layer)

On top of the normal draft pool, every round has a chance of featuring a rare, exceptionally strong character option.

- **Every round** (not just alternating ones) has a **40% chance** of triggering a special tier roll.
- If the special tier triggers:
  - **60% chance** the special option is **Epic** tier.
  - **40% chance** the special option is **Legend** tier.
- When a tier is triggered, exactly **one of the four options** in that round is replaced with a tiered character; the other three remain **Normal** tier.
- If no tier is triggered (60% of the time), all four options in that round are Normal tier.

### Tier Meaning

- **Normal** — standard-strength canon characters.
- **Epic** — notably powerful characters (e.g. Warlord-level, top commanders).
- **Legend** — the strongest characters in the setting (e.g. Garp, Joyboy, Admirals, Yonko-level figures). These are rare, high-impact pulls that can dramatically shift a build's overall power when drafted.

### Resulting Round Probabilities

- 60% of rounds: all 4 options Normal.
- 24% of rounds: 3 Normal + 1 Epic option present.
- 16% of rounds: 3 Normal + 1 Legend option present.

This creates a "rare pull" feeling similar to gacha-style systems, without overwhelming the draft with high-tier options, and without making the tier schedule predictable (since it's re-rolled independently for every round rather than tied to fixed round positions).

---

## Power Scoring System

To make characters comparable and rankable, every completed character (whether player-built or simulated) is converted into a single overall **Power Score**.

The score combines:

- The four numeric stats (Strength, Speed, Durability, Intelligence), summed or weighted.
- Converted numeric values for each of the three Haki attributes separately — Armament, Observation, and Conqueror's — each via its own lookup table (e.g. None=0, Basic, Advanced, top-tier=highest), then summed or weighted together.
- Devil Fruit contribution combining its manually assigned Offense, Defense, and Versatility values (plus a bump if Awakened), rather than a single derived Devil Fruit number.
- A converted numeric value for Weapon proficiency.
- A small modifier based on Race (some races naturally lean toward higher physical ceilings).
- Tier multipliers applied to whichever specific attribute was drafted at Epic or Legend tier.

The relative weighting between raw stats and special abilities (Haki, Devil Fruit) is a key design decision — a canon-accurate model would weight Devil Fruit/Haki more heavily than raw stats, since ability-based power differences tend to dominate over pure physical stats in the source material.

---

## Ranking System

To give players a sense of how strong their build is relative to the full space of possible builds:

1. **Simulate many drafts automatically.** Run the draft logic (including reroll behavior, tier probabilities, and attribute pools) a large number of times — e.g. 500 or more — without any player input, generating a full population of randomly built characters.
2. **Calculate a Power Score for every simulated character**, using the same scoring formula applied to the player's character.
3. **Insert the player's character into the sorted population** of simulated scores (sorted highest to lowest) to determine their exact rank position (e.g. "#43 out of 501").
4. **Optionally convert rank into a percentile** for a more intuitive readout (e.g. "Your character is stronger than 62% of all possible builds"), which tends to feel more meaningful to players than a raw rank number.
5. **Cache the simulated population** rather than regenerating it on every play session — only regenerate if the underlying draft rules (tier probabilities, attribute pools, scoring weights) change.
