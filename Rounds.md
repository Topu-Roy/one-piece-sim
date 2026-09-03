# Draft Rounds — current spec (8 rounds, 7 stats)

- Calculations happen after the draft finishes, not during. Picks stored in shared state, computed at end. Placeholder images only where real art missing.

## Round 1 — Body

- Pool: all characters, rarity-weighted per slot with stronger Round 1 dice (~16/35/30/20). Race plays no part in selection, except the guarantee: at least one option is always giant, oni, or lunarian.
- Shows: character name, race (flavor label), rarity chip. No numbers shown.
- Pick gives: looks + name + base stat block + race. Race % still buffs the final BST.
- Note: per-character baseStats (hand-tuned from canonical feats), NOT a shared race table.
- Options are unique within the round and exclude already-picked donors.

## Haki rounds — 2/3/4

- Options: all characters (haki users or not — tier `none` contributes 0). Names + tiers shown.
- Armament → ATK, DEF, STA.
- Observation → AWR, SPD (incl. reflex).
- Conqueror → ATK, STA, DEF.

## Round 5 — Devil Fruit

- DF users only. Characters with no DF omitted. Names + DF names shown.

## Round 6 — Weapon

- Weapon users + non-weapon users, but at least 3 of 4 must be weapon users. Names shown.

## Round 7 — Intelligence

- All characters. Names shown.
- End buff: AWR *= 1 + (intelligence / 100) * 0.3.

## Round 8 — Battle IQ

- All characters. Names shown.
- End buff: STR *= 1 + (battleIQ / 100) * 0.2.

## Calculation flow (result screen)

Step 1: base STR/DUR/SPD/AWR/STA from Round 1 character. ATK/DEF start at 0.

Step 2: flat haki additions (armament → ATK/DEF/STA; observation → AWR/SPD; conqueror → ATK/STA/DEF).

Step 3: flat DF additions (ATK/DEF/SPD/AWR/STA). Skipped if donor has none.

Step 4: flat weapon additions (ATK/DEF/SPD/AWR/STA). Skipped if donor has none.

Step 5: race % modifiers on STR/DUR/SPD/AWR/STA only (giant +10/+10/−10/0/+5, human +2% all, etc.). Never ATK/DEF.

Step 6: intelligence % on AWR, battle IQ % on STR.

Result screen shows: final name (Round 1 pick), live rank vs all 184 roster characters with neighbors above/below, all 7 stats, per-round breakdown, picks recap, New Draft button.

BST = STR + ATK + DUR + DEF + SPD + AWR + STA.
