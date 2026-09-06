# Rarity Review — who deserves what tier

Pool sizes before: god 8 · legend 38 · epic 70 · basic 68.
Rule: rarity ≈ draft value (BST tier + canon standing). Blurry lines fixed at legend↔epic (~5.5k) and epic↔basic (~3.3k).
STATUS: AUDIT ONLY — apply pass follows.

## Promote to legend (+4)

1. Katakuri (epic → legend): #27 at 6,906, above legend Garling; 1B+ bounty, peerless record pre-Luffy.
2. Marco (epic → legend): #42 at 5,658; WB #1, 1.37B, stalled two admirals + King and Queen.
3. King (epic → legend): #43 at 5,578; 1.39B, Zoro extreme-diff.
4. Ace (epic → legend): #44 at 5,542; WB 2nd commander, above legend Sanji as filed.

## Demote to epic (−2)

5. Kanjuro (legend → epic): #119 at 2,596 — worst legend by ~1.3k, traitor joke-tier polling legend slots.
6. Brogy (legend → epic): #88 at 3,869 — twin parity: Dorry (epic) sits 14 points above him; same rarity required.

## Promote to epic (+5)

7. Sentomaru (basic → epic): #68 at 4,621 — above 20+ epics; VX science officer.
8. Urouge (basic → epic): #90 at 3,823 — Supernova, Snack-beater.
9. Marigold (basic → epic): #98 at 3,643 — above epic Devon/Cavendish/Brook.
10. Kin'emon (basic → epic): #99 at 3,642 — Scabbard, same band.
11. Lindbergh (basic → epic): #108 at 3,133 — Rev South commander parity (Morley/Karasu both epic).

## Demote to basic (−4)

12. Vegapunk (epic → basic): #175 at 631 — weakest epic by 400; non-combatant dead-rolling epic body slots.
13. Buggy (epic → basic): #149 at 1,507 — Yonko title isn't draft value; gag combat.
14. Neptune (epic → basic): #147 at 1,620 — non-fighter king.
15. Momonosuke (epic → basic): #129 at 2,123 — child, symbolic sword.

(Bepo dropped from this list during apply validation: already basic.)

## Deliberately untouched

- Kaido #4 stays legend: god fixed at 8 by design (narrative godhood, not BST rank). 9th god would cascade to Big Mom/Mihawk/Garp — line held. Accepted quirk, user-confirmed.
- Kid / Sanji / Ju Peter / Mars stay legend (canon standing over BST).
- Hancock stays epic (ex-Warlord cluster: Doffy/Croc/Moria/Kuma/Jinbe all epic).
- Garp stays legend (god fixed at 8).
- Pica stays basic (golem-DUR-inflated, Zoro one-shot); Wyper stays basic.

## Tally

15 moves (4 up to legend, 2 down to epic, 5 up to epic, 4 down to basic).
Net pools: god 8 · legend 40 · epic 69 · basic 67 = 184.

## Apply log

APPLIED via scripted exact-match write (`apply-rarity.ts`, temp): 15/15, each old-rarity asserted. One miss caught by validation (Bepo assumed epic, already basic — dropped, zero partial writes since the script writes only after all replacements succeed). `git diff`: 15+/15−, `characters-v2.ts` only. Rankings regen'd (order unchanged — rarity doesn't feed BST).
Post-apply: `tsc` clean, `eslint` clean, `prettier` clean, 300-draft sanity clean (`bad: 0`, new pools hold guarantees), `astro build` clean.
