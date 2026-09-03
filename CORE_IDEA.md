# One Piece Character Draft Builder — Game Design Document

## Core Concept

A self-contained, browser-based game where the player builds their own original "strongest possible character" by drafting individual attributes from a pool of One Piece-inspired characters, round by round. Instead of picking a whole character, the player harvests **one trait per round** from a choice of four characters, gradually assembling a custom, original build. Once the draft is complete, the character's stats are calculated and displayed on a result screen — including where the build ranks against all 184 roster characters.

The game has no backend — all logic, data, and simulation run client-side.

---

## Game Loop Overview

1. Player begins a new draft.
2. The game presents **8 rounds**, one per attribute.
3. Each round shows **4 character options**, each representing a "donor" for that round's attribute.
4. The player selects one option — only the attribute tied to that round transfers to the player's custom character. The rest of that character's data is discarded.
5. The player has **2 rerolls total**, shared across rounds 1–7 (not per-round). A reroll replaces the current round's 4 options with 4 new ones.
6. After all 8 rounds are complete, the player has a fully custom character built from up to 8 different "donors."
7. The finished character's stats are calculated from all picks and displayed on a result screen with a full breakdown plus a live rank against the full roster.
8. **New Draft** button restarts.

---

## The 8 Rounds

| Round | Attribute        | What's Shown                                    | Pool Rules                                |
| ----- | ---------------- | ----------------------------------------------- | ----------------------------------------- |
| 1     | Body             | Character name + race + base stats + race bonus | 4 unique races, max 3 characters per race |
| 2     | Armament Haki    | Character name + haki tier                      | All characters                            |
| 3     | Observation Haki | Character name + haki tier                      | All characters                            |
| 4     | Conqueror's Haki | Character name + haki tier                      | All characters                            |
| 5     | Devil Fruit      | Character name + DF name/type                   | DF users only                             |
| 6     | Weapon           | Character name + weapon name/type               | At least 3 of 4 must be weapon users      |
| 7     | Intelligence     | Character name + intelligence value             | All characters                            |
| 8     | Battle IQ        | Character name + battle IQ value                | All characters                            |

Round 1 (Body) merges the old Race + Appearance rounds: the picked character provides the looks, the name, the base stat block, and the race. No separate cosmetic round.

---

## Rerolls

- The player has **2 total rerolls** for the entire draft (Rounds 1–7 only, not Round 8).
- A reroll discards the current 4 options for that round and replaces them with 4 newly selected options.
- Because rerolls are scarce and shared, players must decide strategically which rounds are worth spending a reroll on (typically Devil Fruit and Haki, since they define playstyle most heavily) rather than relying on rerolls to fix every weak round.
- This scarcity ensures high variance between playthroughs — two players with the same luck can end up with meaningfully different builds depending on where they chose to spend their rerolls.

---

## Rarity System

Each of the 4 options in a round gets an **independent** rarity roll (from Round 2 onwards):

- **50% Basic** — standard-strength canon characters.
- **30% Epic** — notably powerful characters (e.g. Warlord-level, top commanders).
- **20% Legend** — the strongest characters in the setting (e.g. Garp, Joy Boy, Admirals, Yonko-level figures).

### Round 1 Exception

Round 1 (Body) has **no rarity** — options are grouped by race (max 3 characters per race), one random character per shown race. The focus is on body selection, not power pulls.

### Selection Process

1. Roll rarity for each of the 4 options independently.
2. Pick a random character matching that rarity from the available pool.
3. If no character exists for that rarity in the pool, fall back to any available character.

---

## Stat Values Are Manually Assigned

Numeric base stats and the strength of categorical attributes (Haki values, Devil Fruit potency, Weapon mastery) are **not generated from fixed formulas or clean round numbers**. Instead, every character's stats across every attribute are **manually assigned** by the designer, individually, based on canonical feats.

- A Legend-tier character doesn't get a flat multiplier — they are manually given hand-picked values appropriate to their canon strength.
- This keeps power levels feeling authentic and canon-accurate rather than mechanically derived.
- Rarity is really just a label/rarity indicator for draft pools — actual stat values are hand-tuned per character per attribute, not calculated from the tier.

---

## The 7 Stats

Final builds have **7 stats**. Strength/durability are distinct from attack/defense:

- **STR (Strength)** — raw physical power. From base only (+ Battle IQ %).
- **ATK (Attack)** — technique output (haki/DF/weapon). Starts at 0, fed only by picks.
- **DUR (Durability)** — body toughness / HP. From base only.
- **DEF (Defense)** — blocking, hardening, parrying. Starts at 0, fed only by picks.
- **SPD (Speed)** — movement + reaction. Base + observation (+ reflex) + DF + weapon.
- **AWR (Awareness)** — perception. Base + observation + DF + weapon (+ Intelligence %).
- **STA (Stamina)** — endurance. Base + armament/conqueror + DF + weapon.

BST (Battle Stat Total) = sum of all 7.

---

## Stat Calculation Flow

All calculations happen **after the draft is complete**, not during. Picks are stored in shared state and computed at the end.

### Step 1: Base Stats (from Body pick)

Set STR/DUR/SPD/AWR/STA from the Round 1 character's individual baseStats (evaluated from canonical feats — not from a race table). ATK and DEF start at 0.

### Step 2: Haki (flat additions)

- **Armament** — adds attack, defense, stamina.
- **Observation** — adds awareness, speed, plus reflex (dodge sense) into speed.
- **Conqueror's** — adds attack, stamina, defense.

### Step 3: Devil Fruit (flat additions)

Adds attack, defense, speed, awareness, stamina. Skipped when the picked donor has no DF.

### Step 4: Weapon (flat additions)

Adds attack, defense, speed, awareness, stamina. Skipped when the picked donor has no weapon.

### Step 5: Race % Modifiers (body stats only)

The Round 1 pick's race applies small percentage modifiers to STR/DUR/SPD/AWR/STA (roughly ±4–10%, human +2% all). Never touches attack/defense — technique stays pure. Per-character base carries ~90% of power; race is flavor on top.

### Step 6: Intelligence & Battle IQ (% bonuses)

- **Intelligence** boosts awareness: `AWR *= 1 + (intelligence / 100) * 0.3`.
- **Battle IQ** boosts strength: `STR *= 1 + (battleIQ / 100) * 0.2`.

Finally, present the created character with all 7 stats on the result screen.

---

## Result Screen

After all 8 rounds are complete, the result screen shows:

- **Final character name** (from the Round 1 Body pick)
- **Live rank** (`#X of 185`) computed in-browser against all 184 roster characters, with the closest neighbor above and below plus tie info
- **All 7 stats** with calculated values
- **Full breakdown** of each round's contribution (base, haki, DF, weapon, race %, intelligence, battle IQ)
- **Draft picks recap** showing all 8 selections
- **New Draft** button to start over
