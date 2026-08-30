# One Piece Character Draft Builder — Game Design Document

## Core Concept

A self-contained, browser-based game where the player builds their own original "strongest possible character" by drafting individual attributes from a pool of One Piece-inspired characters, round by round. Instead of picking a whole character, the player harvests **one trait per round** from a choice of four characters, gradually assembling a custom, original build. Once the draft is complete, the character can be ranked against a simulated population of thousands of other possible builds.

The game has no backend — all logic, data, and simulation run client-side.

---

## Game Loop Overview

1. Player begins a new draft.
2. The game presents **x rounds**, one per attribute.
3. Each round shows **4 character options**, each representing a "donor" for that round's attribute.
4. The player selects one option — only the attribute tied to that round transfers to the player's custom character. The rest of that character's data is discarded.
5. The player has **2 rerolls total**, shared across the whole draft (not per-round). A reroll replaces the current round's 4 options with 4 new ones.
6. After all 10 rounds are complete, the player has a fully custom character built from 10 different "donors."
7. The finished character's overall power is calculated and compared against a large simulated population to produce a rank and/or percentile.

---

## Rerolls

- The player has **2 total rerolls** for the entire draft (not per round).
- A reroll discards the current 4 options for that round and replaces them with 4 newly selected options.
- Because rerolls are scarce and shared, players must decide strategically which rounds are worth spending a reroll on (typically Devil Fruit and Haki, since they define playstyle most heavily) rather than relying on rerolls to fix every weak round.
- This scarcity ensures high variance between playthroughs — two players with the same luck can end up with meaningfully different builds depending on where they chose to spend their rerolls.

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
