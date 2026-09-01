# One Piece Character Draft Builder — Game Design Document

## Core Concept

A self-contained, browser-based game where the player builds their own original "strongest possible character" by drafting individual attributes from a pool of One Piece-inspired characters, round by round. Instead of picking a whole character, the player harvests **one trait per round** from a choice of four characters, gradually assembling a custom, original build. Once the draft is complete, the character's stats are calculated and displayed on a result screen.

The game has no backend — all logic, data, and simulation run client-side.

---

## Game Loop Overview

1. Player begins a new draft.
2. The game presents **9 rounds**, one per attribute.
3. Each round shows **4 character options**, each representing a "donor" for that round's attribute.
4. The player selects one option — only the attribute tied to that round transfers to the player's custom character. The rest of that character's data is discarded.
5. The player has **2 rerolls total**, shared across rounds 1–8 (not per-round). A reroll replaces the current round's 4 options with 4 new ones.
6. After all 9 rounds are complete, the player has a fully custom character built from up to 9 different "donors."
7. The finished character's stats are calculated from all picks and displayed on a result screen with a full breakdown.

---

## The 9 Rounds

| Round | Attribute        | What's Shown                        | Pool Rules                                  |
| ----- | ---------------- | ----------------------------------- | ------------------------------------------- |
| 1     | Race             | Race name + stat preview            | 4 unique races, 1 random character per race |
| 2     | Armament Haki    | Character name + haki tier          | All characters                              |
| 3     | Observation Haki | Character name + haki tier          | All characters                              |
| 4     | Conqueror's Haki | Character name + haki tier          | All characters                              |
| 5     | Devil Fruit      | Character name + DF name/type       | DF users only                               |
| 6     | Weapon           | Character name + weapon name/type   | At least 3 of 4 must be weapon users        |
| 7     | Intelligence     | Character name + intelligence value | All characters                              |
| 8     | Battle IQ        | Character name + battle IQ value    | All characters                              |
| 9     | Appearance       | Character image + name              | All characters, free refresh (max 10)       |

---

## Rerolls

- The player has **2 total rerolls** for the entire draft (Rounds 1–8 only).
- A reroll discards the current 4 options for that round and replaces them with 4 newly selected options.
- Rerolls are **not available in Round 9** (Appearance) — that round has free unlimited refresh instead.
- Because rerolls are scarce and shared, players must decide strategically which rounds are worth spending a reroll on (typically Devil Fruit and Haki, since they define playstyle most heavily) rather than relying on rerolls to fix every weak round.
- This scarcity ensures high variance between playthroughs — two players with the same luck can end up with meaningfully different builds depending on where they chose to spend their rerolls.

---

## Rarity System

Each of the 4 options in a round gets an **independent** rarity roll (from Round 2 onwards):

- **50% Basic** — standard-strength canon characters.
- **30% Epic** — notably powerful characters (e.g. Warlord-level, top commanders).
- **20% Legend** — the strongest characters in the setting (e.g. Garp, Joyboy, Admirals, Yonko-level figures).

### Round 1 Exception

Round 1 (Race) has **no rarity** — all 4 options are basic tier. The focus is on race selection, not power pulls.

### Selection Process

1. Roll rarity for each of the 4 options independently.
2. Pick a random character matching that rarity from the available pool.
3. If no character exists for that rarity in the pool, fall back to any available character.

---

## Stat Values Are Manually Assigned

Numeric stats (Strength, Speed, Durability, Awareness, Stamina) and the strength of categorical attributes (Haki tiers, Devil Fruit potency, Weapon mastery) are **not generated from fixed formulas or clean round numbers** (e.g. not simply 10/25/40/etc.). Instead, every character's stats across every attribute are **manually assigned** by the designer, individually, based on where that character sits in the power scale of the source material.

- A Legend-tier character doesn't get their stat multiplied by a flat rule — they are manually given a higher, hand-picked value appropriate to their canon strength.
- This keeps power levels feeling authentic and canon-accurate (e.g. Garp's Strength isn't "Epic value × 1.7," it's simply set to whatever number reflects how strong Garp actually is relative to the rest of the roster) rather than mechanically derived.
- This means the tier a character carries into a round (Basic/Epic/Legend) is really just a _label/rarity indicator_ — the actual stat values are hand-tuned per character per attribute, not calculated from the tier.

---

## Stat Calculation Flow

All calculations happen **after the draft is complete**, not during. Picks are stored in shared state and computed at the end.

### Step 1: Base Stats (from Race)

Set base stats from the race table according to the user's Round 1 selection:

| Race     | Strength | Durability | Speed | Awareness | Stamina |
| -------- | -------- | ---------- | ----- | --------- | ------- |
| Human    | 100      | 100        | 100   | 100       | 100     |
| Fish-man | 1000     | 450        | 125   | 120       | 300     |
| Giant    | 10000    | 4000       | 140   | 100       | 1000    |
| Mink     | 400      | 270        | 300   | 180       | 350     |
| Skypiean | 110      | 110        | 140   | 130       | 120     |
| Shandia  | 180      | 120        | 190   | 150       | 150     |
| Lunarian | 6500     | 10000      | 400   | 200       | 800     |
| Longarm  | 145      | 120        | 135   | 115       | 120     |
| Longleg  | 250      | 140        | 210   | 125       | 180     |
| Merfolk  | 300      | 250        | 1000  | 140       | 250     |
| Dwarf    | 1500     | 400        | 600   | 160       | 300     |
| Oni      | 11000    | 9000       | 250   | 150       | 900     |

### Step 2: Haki Multipliers

Apply the multiplier of each haki round to the base stats. All multipliers stack on top of each other:

- **Armament** — multiplies Attack and Durability
- **Observation** — multiplies Awareness and Speed
- **Conqueror's** — multiplies Attack, Durability, and Stamina

### Step 3: Devil Fruit Multipliers

Apply the DF multipliers on the stats. Each DF has its own multipliers for all 5 stats (hand-tuned per character). If the DF is Awakened, an additional multiplier layer is applied to the target stats.

### Step 4: Weapon Multipliers

Apply the Weapon multipliers on the stats. Each weapon type has its own multipliers and potential nerfs (hand-tuned per character).

### Step 5: Intelligence & Battle IQ

- **Intelligence** increases Awareness and Battle IQ by a certain amount based on IQ points.
- **Battle IQ** increases Intelligence by a certain amount based on IQ points.

Finally, present the created character with all stats on the result screen.

---

## Appearance Round (Round 9)

- This round is **cosmetic only** — no effect on stats.
- The player can **refresh up to 10 times** to get new character options (no reroll cost).
- The selected character's **name becomes the final character's name** on the result screen.
- No rarity roll — just random characters for visual selection.

---

## Result Screen

After all 9 rounds are complete, the result screen shows:

- **Final character name** (from appearance pick)
- **All 5 stats** with calculated values
- **Full breakdown** of each round's contribution (race, haki, DF, weapon, intelligence, battle IQ)
- **Draft picks recap** showing all 9 selections
- **New Draft** button to start over
