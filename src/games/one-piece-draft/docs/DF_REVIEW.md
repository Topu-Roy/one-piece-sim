# Devil Fruit Review — all 184 characters

Scope: `devilFruit` ONLY — type + names + awakened flag + 5 output values (attack/defense/speed/awareness/stamina).
No data edits yet — verdicts first, apply step after all 19 batches land.

## Mechanics (verified against code)

- R5 Step 3 (`draft.ts:402-408`): flat 1:1 addition — `attack/defense/speed/awareness/stamina` added with no multipliers, no type scaling, no STR/DUR contribution. Skipped if `type === "none"`. Identical math in live-rank calc (`draft.ts:486-492`).
- R5 pool is DF-holders-only, rarity-weighted (`getDFUsersByRarity`, `draft.ts:36-39, 87-89`) — every R5 option carries a fruit by construction. (Earlier plan note about all-none R5 rounds was wrong — struck.)
- `awakened` appears NOWHERE outside the data file (zero hits in `src/lib`, scripts) — pure label, zero mechanical effect. Awakening matters only through the values reviewers assign. (User decision: keep label-only; no multiplier mechanic.)

## Standards

### Correctness checks (every character)

- **Assignment**: right fruit per canon. Teach keeps Yami Yami (Gura stolen + WB-associated — exclusion noted, not modeled). Single-fruit file: the fruit that defines the datasheet.
- **Type classification**: logia (intangible element) · zoan · ancient_zoan (extinct) · mythical_zoan (creature/god) · paramecia (else). Special cases: Katakuri mochi = special paramecia · Yami = logia (no intangibility — note only) · Momonosuke artificial = filed type verified, not assumed · Devon = Kyubi (Suke went to Shiryu).
- **Awakened flag**: true ONLY with evidence — Luffy, Law, Kid, Katakuri, Doffy, Lucci (Egghead zoan), Joy Boy. False stays for: Kaido, BM, Teach, admirals/logias, Sabo/Ace Mera, Bonney (Distorted Future ≠ awakening), Hancock Mero, Crocodile, Enel, Smoker, Caesar, Queen/King/Jack/Marco forms, Burgess, Pizarro, Vasco, Doc Q, Van Augur.

### Awakened-value rule (user decision)

Awakened fruits are judged against their AWAKENED showings, not the base fruit:

- Law: Puncture Wille / Shock Wille vs BM — Yonko-damaging output, must clear unawakened-paramecia band.
- Kid: Damned Punk, railgun constructs — same bar as Law (rooftop peers).
- Katakuri: overflowing/ambient mochi, Block Mochi vs Snakeman — above base-paramecia, below Nika-scale.
- Doffy: awakened strings, God Thread, Birdcage sustain under G4 beating — above base-string output.
- Luffy: Bajrang Gun scale — mythical-awakened ceiling all others sit below.
- Lucci: Egghead recovery/pace vs G5 — zoan-awakening recovery must show in STA, not just offense.
- Joy Boy: sealed-blast scale (ch 1122) — ceiling-adjacent, speculative-keep per policy.
- Anti-patterns killed: awakened-true with base-level numbers (flag without substance) · unawakened numbers pricing awakening-level output. Workers cite the awakening panel per awakened fruit.

### Value judgments (peer ladders, no fixed bands)

- Judge output-consistency with panels + same-class/same-tier peers: mythical-awakened top (Nika scale) · Yonko-paramecia (Gura scale) · admiral-logia · ancient-commander · utility (Bonney/Sugar/Mansherry low).
- Cross-leak enforcement (from base/haki reviews, now DF-side): Enel lightning, Kizaru light-speed, Katakuri mochi, Cracker biscuits, Lucci awakening, Smoothie juice, Perospero candy, Oven heat, Daifuku genie, Mont-d'Or books, Doffy strings, Law Room, Kid magnets, Bege castle, Hawkins dolls, Apoo sound, Drake allo, Tobiroppo ancients, Marco regen, Hancock arrows, Kuma Paw-repel — ALL must live in DF values, nowhere else.
- **none-DF**: type `none` + all zeros + `awakened: false`, enforced. Any nonzero is auto-flag.

### Rules

- Verdicts per block: `Perfect` · `Re-assign → fruit` · `Re-type → type` · `Awakened flip` · `Raise/Lower → range` · `Speculative (no verdict)`.
- Flag bar: wrong fruit/type/awakened · ~50+ value deviation · any nonzero under `none` · awakened-true with base-level numbers.
- Every non-Perfect needs: canon evidence (manga, databooks/Vivre; anime/portrayal admissible) + peer comparison (same fruit class + same tier).
- Peer ladders to protect: Nika scale (Luffy ceiling, Joy Boy speculative-adjacent) · rooftop peers (Law ≈ Kid awakened) · Sweet Commander DFs (Katakuri > Cracker > Smoothie/Perospero/Oven/Daifuku) · calamity zoans (Kaido > King/Queen/Jack) · admirals logia parity · Tobiroppo ancients among themselves · Supernova DFs (Law/Kid/Apoo/Hawkins/Bonney/Bege).
- Low-feat characters (Imu, Joy Boy, Rocks, Harald, Ryuma, Loki, …): `Speculative`, keep current values. Era flags: Burgess Riki = post-Dressrosa ✓ · Shiryu Suke = current ✓ · Kuma Paw lifelong ✓.

## Verdicts

### Batch 1 — Imu → Akainu

#### 1. Imu (nerona-imu) — ALL SPECULATIVE (placeholder fruit)

- ASSIGN file [Akuma no Mi / Devil-Devil Fruit] (Speculative): placeholder name; true fruit unrevealed (Domi Reversi/Covenants/Omen trinity ch 1179/1181).
- TYPE file [mythical_zoan] (Speculative): demonic transformation suggests zoan, class unconfirmed — keep pending Oda naming.
- AWAKENED file [false] (Speculative): no awakening statement; keep false pending Elbaf reveal.
- VALUES file [300/300/300/250/250] (Speculative): magnitude unsettled until true fruit + Imu showings fixed.

#### 2. Joy Boy (joy-boy)

- ASSIGN file [Hito Hito no Mi, Model: Nika] (Perfect): first Nika user, Luffy's fruit origin.
- TYPE file [mythical_zoan] (Perfect): Nika god-model class fixed.
- AWAKENED file [true] (Perfect): prime Nika mastery, matches awakened ladder.
- VALUES file [400/400/400/400/410] (Perfect): prime/sealed-blast scale above developing Luffy justified.
- Peer: +50/+50/+100/+150/+60 over Luffy Nika [350/350/300/250/350] — speculative-adjacent ceiling holds.

#### 3. Rocks (rocks-d-xebec)

- ASSIGN file [none] (Speculative): file gives no fruit — correct conservative call (Ope/Yami/Mera theories all unconfirmed).
- TYPE file [none] (Perfect): enforced by none-DF rule.
- AWAKENED file [false] (Perfect): enforced.
- VALUES file [0/0/0/0/0] (Perfect): enforced; Haki/weapon-side carries God Valley weight.

#### 4. Roger (gol-d-roger)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): famously non-DF; Ace-sword + supreme conqueror carry load.
- Peer: none-DF uniformity with Garp/Shanks.

#### 5. Garp (monkey-d-garp)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): famously fist-only non-DF; supreme armament + base carry load.
- Peer: none-DF uniformity with Roger/Shanks.

#### 6. Blackbeard (marshall-d-teach) — FLAGSHIP

- ASSIGN file [Yami Yami no Mi] (Perfect): flagship correct — Gura excluded per user decision.
- TYPE file [logia] (Perfect): canon logia despite no-intangibility quirk.
- AWAKENED file [false] (Perfect): awakening unconfirmed anywhere.
- VALUES file [450/450/400/400/500] (Perfect): Black Hole town-crush + Liberation + Kurouzu DF-null net of pain-drawback justify below-admiral placement.
- Peer: -100/-100/-100 vs admiral-logia trio on atk/def/spd; stamina 500 ties Akainu above Kizaru/Kuzan 450; utility/null over raw lethality.

#### 7. Shanks (shanks)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): famously non-DF; supreme obs/conq + Gryphon carry load.
- Peer: none-DF uniformity with Roger/Garp.

#### 8. Loki (loki) — CONFIRMED FRUIT, RE-ASSIGN NEEDED

- ASSIGN file [blank] (Re-assign → Ryu Ryu no Mi, Model: Nidhogg): Elbaf legendary fruit confirmed ch 1175 — blank names must be filled.
- TYPE file [mythical_zoan] (Perfect): Nidhogg dragon class confirmed; lightning DF-side via Thorheim, not hammer.
- AWAKENED file [false] (Perfect): awakening never stated; stays false.
- VALUES file [250/250/200/180/200] (Raise → atk 300–350 / def 300–350 / spd 200–250 / awr 180–230 / sta 250–320): largest dragon + lightning + Harald-domination + Shanks/Gaban stall + giant-size scaling exceed Kaido-Seiryu baseline.
- Peer: vs Kaido Seiryu [250/250/120/110/130] unawakened — Loki deserves clear atk/def premium at same 250 baseline; ice stays weapon-side (Ragnir).

#### 9. Dragon (monkey-d-dragon) — ALL SPECULATIVE

- ASSIGN file [blank logia] (Speculative): wind/storm reading (Loguetown ch 100 gust) plausible but Oda never confirmed DF at all (anime "wind blast" absent in manga).
- TYPE file [logia] (Speculative): Kaze-type guess fits gale showings; Haki/weather-machine alternatives open — keep pending reveal.
- AWAKENED file [false] (Speculative): nothing supports awakening of unconfirmed fruit.
- VALUES file [300/280/300/250/250] (Speculative): mid-wind placeholder until Oda names fruit or confirms non-DF.

#### 10. Akainu (sakazuki)

- ASSIGN file [Magu Magu no Mi] (Perfect): canon logia (SBS 62, first shown ch 554).
- TYPE file [logia] (Perfect): magma class fixed.
- AWAKENED file [false] (Perfect): logia awakening mechanics unrevealed; Punk Hazard scar only hints.
- VALUES file [550/550/500/400/500] (Perfect): Dai Funka iceberg-melt + WB wounding + magma-over-fire Ace kill (ch 573–574) justify top magma offense.
- Peer: admiral-logia parity vs Kizaru [550/550/500/450/450] + Kuzan [550/550/500/450/450] — Akainu trades -50 awr for +50 sta; 10-day stamina stays body-side.

### Batch 2 — Luffy → Nusjuro

#### 11. Luffy (monkey-d-luffy)

- ASSIGN file [Hito Hito no Mi, Model: Nika] (Perfect): Gomu cover reveal as Nika (ch 1044).
- TYPE file [mythical_zoan] (Perfect): Elders confirm mythical zoan Nika (ch 1044).
- AWAKENED file [true] (Perfect): Gear 5 = awakening declaration (ch 1044).
- VALUES file [350/350/300/250/350] (Perfect): Bajrang KO Kaido (ch 1049–1050) + env-warps G5; stamina tax priced below Joy Boy ceiling.
- Peer: Nika ladder holds — below Joy Boy [400/400/400/400/410] ceiling per B1.

#### 12. Kizaru (borsalino)

- ASSIGN file [Pika Pika no Mi] (Perfect): light-human; Sabaody rout + MF vs Rayleigh/Marco.
- TYPE file [logia] (Perfect): create/control/transform light logia.
- AWAKENED file [false] (Perfect): no awakening shown; Egghead speculation only.
- VALUES file [550/550/500/450/450] (Perfect): Yata/Yasakani/Murakumo + G5 duel DF-side carry (ch 511, ch 1092–1093).
- Peer: admiral parity TEST passes — = Kuzan; trades 50 stamina for 50 awareness vs Akainu.

#### 13. Whitebeard (edward-newgate)

- ASSIGN file [Gura Gura no Mi] (Perfect): quake fruit, MF core.
- TYPE file [paramecia] (Perfect): vibration paramecia; Sengoku world-destroyer statement.
- AWAKENED file [false] (Perfect): never confirmed awakened.
- VALUES file [400/200/200/180/135] (Adjust → def 100–150, spd ~100–150): ATK 400 Perfect (Akainu beatdown + plaza split ch 575); DEF 200/SPD 200 high for pure-offense fruit — shock-block vs Aokiji spears (ch 567) justifies ~100–150 DEF; shockwave range is not mobility.
- Peer: Yonko DF-ATK top — Gura 400 > BM-Soru 300 > Kaido-Seiryu 250. File models sick old-WB MF-era output (stab ch 562, half-face ch 575), not prime.

#### 14. Kaido (kaido)

- ASSIGN file [Uo Uo no Mi, Model: Seiryu] (Perfect): SBS 98 + God Valley gift (ch 1096).
- TYPE file [mythical_zoan] (Perfect): azure dragon mythical zoan.
- AWAKENED file [false] (Perfect): Kaen Daiko/feral-hybrid = fan theory, no Oda confirmation.
- VALUES file [250/250/120/110/130] (Adjust → raise atk/def/spd): Blast Breath (ch 922) + Tornadoes + Flame-Cloud flight (ch 1001) + dragon scales underpriced — ATK/DEF light vs BM 300/WB 400; SPD 120 ignores flight mobility. Thunder Bagua correctly CoC-side excluded.
- Peer: TENSION with B1 — Loki raised OVER this baseline, but Seiryu dragon bulk/elemental suite should sit above Loki baseline. Resolution for apply: raise Kaido (atk ~300–350 / def ~300 / spd ~200) AND trim Loki raise to parity-or-below Kaido. Both adjustments logged.

#### 15. Big Mom (charlotte-linlin)

- ASSIGN file [Soru Soru no Mi] (Perfect): soul/homie fruit (ch 868).
- TYPE file [paramecia] (Perfect): soul-manipulation paramecia.
- AWAKENED file [false] (Perfect): never confirmed awakened.
- VALUES file [300/300/250/250/300] (Perfect): Hera flight + Prometheus/Napoleon combos; Cognac vs Jinbe (ch 887); Ikoku (ch 1031) DF+CoC stack split; iron-balloon correctly base-side.
- Peer: Yonko DF mid — Soru 300 below Gura 400, above Seiryu 250 on DF-ATK; sky-split with Kaido CoC-side, excluded.

#### 16. Mihawk (dracule-mihawk)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): non-DF swordsman, no fruit ever shown; Yoru power correctly weapon-side.
- Peer: none-DF baseline — zeros confirm no DF inflation vs DF Yonko/admirals.

#### 17. Shamrock (figarland-shamrock)

- ASSIGN file [none] (Perfect): Cerberus is the SWORD's power, not his — Funkfreed (ch 365/400) + Lassoo precedent (object-DF ≠ user-DF).
- TYPE file [none] (Perfect): user holds no fruit class.
- AWAKENED file [false] (Perfect): no user awakening shown.
- VALUES file [0/0/0/0/0] (Perfect): zeros correct; Cerberus correctly weapon-block [450/420/440/300/300].
- Peer: Funkfreed-precedent holds — Shamrock-sword-DF vs Zou Zou / Inu Inu identical modeling; near-speculative (Cerberus DF vs Abyss-covenant unconfirmed).

#### 18. Kuzan (kuzan)

- ASSIGN file [Hie Hie no Mi] (Perfect): ice logia; Long Ring + MF + PH.
- TYPE file [logia] (Perfect): create/control/transform ice logia.
- AWAKENED file [false] (Perfect): Punk Hazard climate split (ch 658–660) is scale; Logia awakening undefined — speculation only.
- VALUES file [550/550/500/450/450] (Perfect): Ice Age ocean-freeze + bay freeze vs WB tsunamis (ch 567); Ice Time vs Jozu; 10-day Akainu draw DF-side.
- Peer: admiral parity TEST passes — = Kizaru; 10-day draw justifies equal 550/550/500 with Akainu despite magma edge (DF stamina 450 < Akainu 500 reflects it).

#### 19. Harald (harald) — provisional-speculative

- ASSIGN file [none] (Perfect, provisional): Elbaf flashback ongoing, no DF shown.
- TYPE file [none] (Perfect, provisional): no class evidenced.
- AWAKENED file [false] (Perfect): nothing to awaken.
- VALUES file [0/0/0/0/0] (Perfect, provisional): zeros correct until reveal; any future fruit demands evidence or Speculative tag.
- Peer: giant non-DF baseline holds pending Elbaf reveal — revisit if flashback grants fruit.

#### 20. Nusjuro (ethanbaron-v-nusjuro)

- ASSIGN file [blank names] (Speculative): Bakotsu/Itsumade names never stated by Oda — yokai visuals only (ch 1110–1111).
- TYPE file [mythical_zoan] (Speculative): asserts mythical subclass without confirmation — no fruit names given; unconfirmed-class.
- AWAKENED file [true] (Flip → false): regen = Abyss/Imu-contract-side, NOT DF awakening — Saturn stripped (ch 1125); Joy Boy haki negates via Emet (ch 1122); smoke ribbons ≠ proof.
- VALUES file [220/220/200/170/210] (Speculative): Pacifista bisection/blitz (ch 1110–1111) real but DF-vs-sword-vs-Haki split + ice-imbuement unquantified; hold pending classification.
- Peer: classification unsettled — values frozen until Oda names the fruit.

### Batch 3 — Saturn → Sommers (Gorosei classification flagship)

#### 21. Saturn (jaygarcia-saturn)

- ASSIGN file [blank] (KEEP blank, Speculative): ch-1110 beast-label "Gyuki" only — no Oda fruit name ever.
- TYPE file [mythical_zoan] (HOLD provisional-Speculative): yokai visual + sash only; same unconfirmed-class as Nusjuro; contract confounds DF reading.
- AWAKENED file [true] (Flip → false): regen = Abyss/Imu-contract-side (stripped ch 1125; Joy Boy haki negates ch 1122); sash ≠ proof.
- VALUES file [430/430/380/330/380] (HOLD-frozen per Nusjuro-uniformity, else TRIM DEF/STA): G5 blows/Kuma punch/Radical Beam all regen-healed, never tanked clean; venom/gaze/telekinesis DF-vs-Abyss unseparated.
- Peer: frozen with the Elder quad pending classification; identical-quad values unjustified on showings.

#### 22. Warcury (topman-warcury)

- ASSIGN file [blank] (KEEP blank, Speculative): ch-1110 beast-label "Hoki/Fengxi" only; no fruit name ever (Nusjuro-blank precedent).
- TYPE file [mythical_zoan] (HOLD provisional-Speculative): boar-form visual + sash only; Red Roc hand-hurt (ch 1112) = transformed-hide, not type proof.
- AWAKENED file [true] (Flip → false): regen contract-side (ch 1125 strip, ch 1122 negate); CoC roar (ch 1111) is HAKI-side per haki review; charges DF-side unawakened.
- VALUES file [430/430/380/330/380] (HOLD-frozen per uniformity, else TRIM DEF): zero clean tanks; copy-paste identical to Saturn/Mars/JuPeter unjustified.

#### 23. Ju Peter (shepherd-ju-peter)

- ASSIGN file [blank] (KEEP blank, Speculative): ch-1110 "Sandworm" beast-label only; Mongolian-Death-Worm inspiration unconfirmed.
- TYPE file [mythical_zoan] (HOLD provisional-Speculative): burrow-form + sash only; worm-explosion-soak regen-masked; weakest Egghead showing.
- AWAKENED file [true] (Flip → false): regen contract-side (ch 1125/ch 1122); no independent awakening evidence.
- VALUES file [430/430/380/330/380] (HOLD-frozen per uniformity, else TRIM all): burrowing lunges only feat; identical-quad vs Saturn/Warcury/Mars indefensible on showings.

#### 24. Mars (marcus-mars)

- ASSIGN file [Tori Tori no Mi, Model: Itsumade] (STRIP → blank, Speculative): ch-1110 "Itsumade" is beast-label only — no fruit name ever; Nusjuro-flip precedent demands strip.
- TYPE file [mythical_zoan] (HOLD provisional-Speculative): bird-serpent visual + sash only; flight/talons/beams (ch 1110–1111) are form showings, not type proof.
- AWAKENED file [true] (Flip → false): regen contract-side (ch 1125 strip, ch 1122 negate); no awakening statement.
- VALUES file [430/430/380/330/380] (HOLD-frozen per uniformity, else TRIM DEF/STA + RAISE SPD/AWA): flight range (ch 1110–1111) suggests SPD/AWA above identical-quad; body never tanks clean.

#### 25. Rayleigh (silvers-rayleigh)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): non-DF swordsman/coater; Sabaody vs Kizaru stalemate zero DF use; databook/Vivre confirm swordsman.
- Peer: Rayleigh-none matches Roger/Mihawk-none; old-coater legs vs prime swordsmen handled baseStats-side, not DF.

#### 26. Gaban (scopper-gaban)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): axe fighter Ya-san; Elbaf vs Sommers/Killingham zero DF use; Yasotakeru weapon-side.
- Peer: Gaban-none matches Rayleigh/Roger-none left-hand tier; Gaban-chop on regen Sommers haki/weapon-side, not DF.

#### 27. Fujitora (fujitora)

- ASSIGN file [Zushi Zushi no Mi] (Perfect): canon paramecia named in manga/databook; Dressrosa Gravito/Moko user.
- TYPE file [paramecia] (Perfect): gravity-create/manipulate without transformation.
- AWAKENED file [false] (Perfect): unconfirmed; Dressrosa rubble-levitate + Birdcage-lift are base application.
- VALUES file [250/250/115/130/125] (Perfect): Raging Tiger vs Sabo (ch 757) + meteors (ch 713) + island-rubble float while attacking Luffy (ch 798–799) justify utility-output; SPD 115 reflects blind setup style.
- Peer: DF-ATK 250 ≪ admiral-logia 550s — but total parity via Yakuza Kasen weapon 440 ATK + gravity-hax; paramecia-utility vs logia-raw-output split correct.

#### 28. Sengoku (sengoku)

- ASSIGN file [Hito Hito no Mi, Model: Daibutsu] (Perfect): canon mythical named pre-MF; "Sengoku the Buddha".
- TYPE file [mythical_zoan] (Perfect): giant-gold-Buddha transform + shockwave.
- AWAKENED file [false] (Perfect): unconfirmed; MF form base/hybrid.
- VALUES file [350/350/300/250/300] (Perfect): Buddha shockwave sends BB Pirates flying (ch 578–579) + platform collapse; mid-mythical scale correct.
- Peer: 350 sits mid-mythical far below Nika-scale, above base zoans; WB-Gura-400 ATK top intact.

#### 29. Killingham (rimoshifu-killingham)

- ASSIGN file [Ryu Ryu no Mi, Model: Kirin] (Perfect on names, values-Speculative): ch-1143 officially names both; hybrid arrival (ch 1140) matches.
- TYPE file [mythical_zoan] (Perfect): Kirin transform + dream-manifest mythical power (ch 1143 confirm).
- AWAKENED file [true] (Flip → false): hybrid/MMA (ch 1140–1151) base showings; scarf ≠ proof per Yamato precedent.
- VALUES file [350/350/300/250/300] (Speculative-HOLD pending Elbaf, else TRIM DEF/STA): MMA immortal army + sleep/dream-pull (ch 1143–1151) hax utility; zero clean tanks; Abyss-regen masks durability; Sengoku-mirror unjustified.

#### 30. Sommers (shepherd-sommers)

- ASSIGN file [Iba Iba no Mi] (Perfect on names, values-Speculative): ch-1143 officially confirms thorn fruit; thorny-hilt sword matches.
- TYPE file [paramecia] (Perfect): invisible thorn-vine creation/control; love-scaled damage (ch 1143 confirm).
- AWAKENED file [false] (Perfect): unconfirmed; thorn-leading children (ch 1140–1148) base application.
- VALUES file [300/280/250/230/250] (Speculative-HOLD pending Elbaf, else TRIM ATK/DEF): love-scaled thorns shred unquantified; Gaban-chop regen-healed, never tanked clean; near-Kirin/Sengoku scale unearned on 2-chapter showings.

### Batch 4 — Enel → Sabo

#### 31. Enel (enel)

- ASSIGN file [Goro Goro no Mi] (Perfect): Logia lightning-human; usage debut ch 241; Robin "invincible" ch 274.
- TYPE file [logia] (Perfect): confirmed Logia (ch 273, SBS/databooks).
- AWAKENED file [false] (Perfect): no awakening paneled/stated.
- VALUES file [200/150/160/250/120] (Raise → near-550 band): 200M-volt El Thor + Maxim island-destroy + lightning travel/forms + heart-restart (ch 264–280) needs high logia band, not 36% of admiral-550s.
- Peer: Skypiea-god output + intangibility + travel demands near-550 band. (Consistent with baseStats gutting — DF-side carries the lightning god.)

#### 32. Green Bull (aramaki)

- ASSIGN file [Mori Mori no Mi] (Perfect): Forest-Human Logia debut (ch 1052–1054).
- TYPE file [logia] (Perfect): confirmed Logia (ch 1054), not paramecia.
- AWAKENED file [false] (Perfect): no awakening stated/shown.
- VALUES file [400/400/350/350/350] (Raise → 550 band): vine-pierce recovering King/Queen + Groves of Wrath + 3-yr photosynthesis fast (ch 1053–1054) still admiral-tier; breaks 550-trio parity at 73%. (Fire-weakness portrayal discount max ~50, not 150.)
- Peer: 4th-admiral parity demands 550 band vs Akainu/Kizaru/Kuzan.

#### 33. Ryuma (shimotsuki-ryuma)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): pre-DF-era Monsters + zombie animated by Brook shadow (ch 450–456); Shusui sword-side.
- Peer: Ryuma-none vs Roger/Mihawk-none swordsmen — zeros keep sword/Haki-side pure.

#### 34. Oden (kozuki-oden)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Enma/Ame no Habakiri weapon-side + Togen Totsuka CoC-side (ch 960–969); no fruit.
- Peer: Oden-none vs Roger/Mihawk-none duelists — zeros preserve weapon/CoC split.

#### 35. Shiki (shiki)

- ASSIGN file [Fuwa Fuwa no Mi] (Perfect): Float-Float levitate self + touched non-living matter (ch 0); SBS 109 confirms canon.
- TYPE file [paramecia] (Perfect): confirmed paramecia, telekinesis-like.
- AWAKENED file [false] (Perfect): awakening unconfirmed.
- VALUES file [180/160/160/150/160] (Raise → Fujitora-250+ utility band): Edd War armada-float + Marineford island-lift vs Garp/Sengoku (ch 0) + Strong World drops + legless flight/ID escape — fleet/island scale exceeds 250 baseline; file inverts ladder.
- Peer: Shiki-float vs Fujitora-250-utility + combat DFs — scale demands 250+.

#### 36. Garling (figarland-garling)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): God Valley champion (ch 1095–1096) shows no fruit power; only Elder without confirmed DF; unknown stays zeros per Speculative policy.
- Peer: Garling-unknown vs Gorosei-awakened-flips — zeros correct until paneled; no God Valley DF prize proof.

#### 37. Law (trafalgar-d-water-law) — AWAKENED FLAGSHIP

- ASSIGN file [Ope Ope no Mi] (Perfect): Free Modification Human (ch 504/661/765); Rosinante-fed.
- TYPE file [paramecia] (Perfect): confirmed paramecia.
- AWAKENED file [true] (Perfect): KROOM/Anesthesia debut (ch 1030) + SBS 106 confirms awakening.
- VALUES file [200/140/135/140/120] (Raise → 400+ atk band): Shock Wille internal-fry + Puncture Wille Onigashima-through-Wano crater vs BM (ch 1030–1040) is Yonko-damaging AWAKENED output, not unawakened-paramecia 200.
- Peer: rooftop parity — B5 records Kid side; Law file must match Kid awakened tier, currently far below.

#### 38. Beckman (benn-beckman)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): rifle veteran; Haki-gunpoint vs Kizaru (ch 501–502/569–570); no fruit.
- Peer: Beckman-none vs Roger/Mihawk-none — zeros keep rifle/Haki-side pure.

#### 39. Zoro (roronoa-zoro)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Enma weapon-side + Asura CoC-side; no fruit ever.
- Peer: Zoro-none vs Ryuma/Oden/Mihawk-none swordsmen — zeros preserve sword/CoC split.

#### 40. Sabo (sabo)

- ASSIGN file [Mera Mera no Mi] (Perfect): inherits Ace fruit; eats at Colosseum (ch 744); Ace prior user.
- TYPE file [logia] (Perfect): confirmed Logia (SBS 30).
- AWAKENED file [false] (Perfect): no awakening paneled/stated.
- VALUES file [250/150/150/130/120] (Raise → BM-Soru-300 mid-logia band): Kaen Ryuo Burgess-win (ch 787) + Fujitora stall (ch 743–757) + Hiken inheritance needs mid-logia band + intangibility def, not 250/150 novice discount.
- Peer: Mera-line Sabo vs Ace — same fruit different users demands parity band; file 250 sits below Soru-300 despite admiral-stall feat.

### Batch 5 — Yamato → Katakuri

#### 41. Yamato (yamato)

- ASSIGN file [Inu Inu no Mi, Model: Okuchi-no-Makami] (Perfect): divine-wolf ice stated (ch 1018) + Vivre.
- TYPE file [mythical_zoan] (Perfect): god-beast + ice generation = mythical.
- AWAKENED file [false] (Perfect): no awakening statement/slaver-band/cloud-ring shown vs Kaido (ch 1017–1025).
- VALUES file [200/200/180/150/160] (Perfect): ice-armor/fang stall Kaido unawakened band; Thunder Bagua excluded as CoC-side.
- Peer: mythical 200 atk below Kaido-Seiryu raise band (father output ceiling holds; CoC-side carries Bagua parity).

#### 42. Kid (eustass-kid) — ROOFTOP PARITY DECIDED

- ASSIGN file [Jiki Jiki no Mi] (Perfect): magnetism Assign/Punk Rotten vs BM (ch 1030–1040).
- TYPE file [paramecia] (Perfect): assign-magnetism paramecia per Vivre/databook.
- AWAKENED file [true] (Perfect): awakening stated alongside Law (ch 1030) + Damned Punk environmental assign.
- VALUES file [150/140/110/110/120] (Raise → atk 400–450 band, def 250+): Damned Punk wounded Yonko BM (ch 1039–1040); 150 atk contradicts awakened-value rule + Law-400+ parity — Punk Rotten hull needs def 250+.
- Peer: Kid-awakened atk 400–450 = Law-awakened-400+ rooftop parity (railgun vs Puncture/Shock Yonko damage).

#### 43. Hancock (boa-hancock)

- ASSIGN file [Mero Mero no Mi] (Perfect): Slave Arrow/petrification vs Pacifista/Smoker MF (ch 558–559).
- TYPE file [paramecia] (Perfect): petrification-beam emission paramecia per databook.
- AWAKENED file [false] (Perfect): love-mastery ≠ awakening; no ambient/emission evolution shown.
- VALUES file [180/150/110/110/120] (Perfect): conditional one-shot hax capped at 180 atk; Femur cracks Pacifista = cited ceiling.
- Peer: utility 180 atk below Yonko-damaging awakened band, above readable-utility floor.

#### 44. King (king-the-conflagration)

- ASSIGN file [Ryu Ryu no Mi, Model: Pteranodon] (Perfect): flight/beak stated (ch 1027–1035) + Vivre.
- TYPE file [ancient_zoan] (Perfect): pteranodon ancient per databook; lunarian flame excluded race-side.
- AWAKENED file [false] (Perfect): no awakening statement/band shown vs Zoro (ch 1030–1035).
- VALUES file [120/110/110/100/110] (Raise → atk 180–220, speed 150+): flame-off speed blitzed Zoro + aerial beak/kick pressure (ch 1032–1035) unsupported by 110 speed/120 atk.
- Peer: ptera speed-side recorded ABOVE Queen-brachio bulk/Jack-mammoth (B6 tests their side) — King sets calamity-speed pole.

#### 45. Marco (marco-the-phoenix)

- ASSIGN file [Tori Tori no Mi, Model: Phoenix] (Perfect): regen Bluebird vs admirals (ch 567–578) + Vivre.
- TYPE file [mythical_zoan] (Perfect): healing-flame phoenix mythical per databook.
- AWAKENED file [false] (Perfect): no awakening statement/form shown at MF or Wano (ch 1005–1006).
- VALUES file [200/250/150/120/200] (Perfect): 250 def + 200 sta carry regen (base DUR cut WAS regen-laundering — DF-side correctly carries it); Bluebird kicks pressured admirals/King-Queen stall.
- Peer: phoenix regen 250/200 DEF/STA sets mythical-regen pole below Kaido-Seiryu output ceiling.

#### 46. Sanji (sanji)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no DF ever; DJ/Ifrit = exo+fire per SBS Vol 105; exoskeleton body-side per baseStats review.
- Peer: Sanji-none matches Zoro/Roger/Mihawk-none rule (speed/flames all base-side, no DF add).

#### 47. Kuma (bartholomew-kuma)

- ASSIGN file [Nikyu Nikyu no Mi] (Perfect): Paw-repel/vanish/teleport + Ursus Shock vs Oars/Zoro TB (ch 472–484), Sabaody (ch 512).
- TYPE file [paramecia] (Perfect): repel-deflect emission paramecia per databook.
- AWAKENED file [false] (Perfect): no awakening statement shown through MF/Egghead PX-0.
- VALUES file [150/130/300/110/120] (Perfect): 300 speed carries Paw-vanish instant travel (PX-0 hull base-side); 150 atk reflects charge-gated Ursus Shock, not spammable Yonko damage.
- Peer: utility 300-speed pole above combat-paramecia speed (Hancock 110) at cost of 150 atk (Warlord/Revo-officer utility premium, not output).

#### 48. Crocodile (crocodile)

- ASSIGN file [Suna Suna no Mi] (Perfect): desiccation/Sables/Ground Death vs Luffy (ch 200–210); MF sand-flight vs Mihawk/Doffy.
- TYPE file [logia] (Perfect): sand intangibility/generation logia per databook.
- AWAKENED file [false] (Perfect): no awakening statement; Ground Death ≠ confirmed awakening.
- VALUES file [250/160/120/130/120] (Perfect): 250 atk carries lethal desiccation capped by pre-G2 Luffy readability losses; logia intangibility in 160 def.
- Peer: 250 atk below admiral-logia parity band (readable twice-beaten ceiling holds).

#### 49. Lucci (rob-lucci)

- ASSIGN file [Neko Neko no Mi, Model: Leopard] (Perfect): carnivore-zoan pressure vs Luffy EL + Egghead (ch 1092).
- TYPE file [zoan] (Perfect): leopard model standard zoan per databook.
- AWAKENED file [true] (Perfect): awakened cloud-ring/banded form + recovery/pace vs G5 Egghead (ch 1092–1094).
- VALUES file [180/140/160/110/150] (Raise → sta 200+ band, def 170+): 150 sta contradicts awakened-value rule — absorbed G5 blows and kept pace via zoan recovery (base STA cut to 725 was awakening-laundered — DF-side MUST carry recovery).
- Peer: awakened recovery 200+ STA pole below Marco-phoenix 250/200 regen (leopard pace < phoenix heal, both above unawakened-zoan floor).

#### 50. Katakuri (charlotte-katakuri) — SWEET COMMANDER CEILING

- ASSIGN file [Mochi Mochi no Mi] (Perfect): special-paramecia mochi binned paramecia per databook; vs Snakeman (ch 871–895). FS excluded haki-side.
- TYPE file [paramecia] (Perfect): special-paramecia binned paramecia.
- AWAKENED file [true] (Perfect): overflowing/ambient mochi + Block Mochi stated awakening vs Snakeman (ch 884–895).
- VALUES file [180/170/110/110/120] (Raise → atk ~300 commander-ceiling band, sta 180+): 180 atk equals unawakened Hancock and contradicts awakened-value rule — ambient-mochi + Block Mochi battered Snakeman across 11h.
- Peer: ~300 sets Sweet Commander DF ceiling above Cracker-biscuit/Smoothie-juice/Perospero-candy; below Nika/rooftop-400.

### Batch 6 — Weevil → Vista

#### 51. Weevil (edward-weevil)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit ever named/shown (Vivre Card #0947 lists haki + naginata only, ch 802); portrayal-only strength lives in base 900/900; GB capture off-screen shows no fruit use. (CBR Warlord survey: Mihawk + Weevil only Warlords confirmed fruitless.)
- Peer: none-DF zeros match Mihawk-side; base carries "young WB" hype without fruit inflation.

#### 52. Ace (portgas-d-ace) — MERA PARITY

- ASSIGN file [Mera Mera no Mi] (Perfect): Entei island-feat (ch 440–441); fruit later passes to Sabo — same fruit.
- TYPE file [logia] (Perfect): flame body/intangibility; stalemated Aokiji (ch 567–568).
- AWAKENED file [false] (Perfect): never stated/shown; death (ch 573–574) magma elemental-superiority, not awakening failure.
- VALUES file [250/150/150/130/120] (Raise → atk 300 band): Mera-line PARITY — same fruit as Sabo-raise-300; Ace longer mastery + Entei + Aokiji-stalemate + 5-day Jinbe draw (ch 546–547).
- Peer: Mera parity locks Ace atk = Sabo band; above Supernova Killer-none, below admiral-logia parity (Akainu killed him).

#### 53. Doflamingo (donquixote-doflamingo)

- ASSIGN file [Ito Ito no Mi] (Perfect): strings canon, Dressrosa (ch 781–790).
- TYPE file [paramecia] (Perfect): string production, awakened-environment subtype.
- AWAKENED file [true] (Perfect): explicitly awakened (ch 785–786) — awakened strings + God Thread vs G4.
- VALUES file [140/130/110/110/120] (Raise → atk ~220–250 band + sta/def up): violates awakened-value rule — God Thread pushed G4 Boundman + island-wide Birdcage sustain + Meteor-cut at atk 140 sits below featless Smoothie-120 and base Ace-250. Still below Katakuri-~300 (fell to G4 in ~30min vs Katakuri 12h, ch 781–790).
- Peer: awakened-paramecia ladder Katakuri-~300 > Doffy-God-Thread-~220–250; above Cracker-side (B7).

#### 54. Killer (killer)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Punisher sonic-blades weapon-side; Kamazo scythes; Hawkins-fight no fruit hint. (Sonic-blade output lives in weapon 200/180/200.)
- Peer: none-DF Supernova matches Zoro-side; weapon carries Kid-crew combat value.

#### 55. Smoothie (charlotte-smoothie)

- ASSIGN file [Shibo Shibo no Mi] (Perfect): juice/squeeze canon, WCI (ch 846+).
- TYPE file [paramecia] (Perfect): wringing-body paramecia.
- AWAKENED file [false] (Perfect): never stated/shown.
- VALUES file [120/110/110/110/120] (LOWER atk 120 → ~80–100): zero combat feats — only subordinate-wringing + WCI standing (ch 846–890); juice output unproven, 120 overpays vs proven-output peers.
- Peer: Sweet-Commander DF ladder Katakuri-~300 ceiling > Cracker (B7) > Daifuku-genie (Sanji-fight feats) > Smoothie lowest-evidence bottom. (File base 950/900 body already exceeds Ace/Doffy with zero receipts — base-review flag; DF-side stays low.)

#### 56. Queen (queen)

- ASSIGN file [Ryu Ryu no Mi Model: Brachiosaurus] (Perfect): ancient reveal (ch 935); cyborg-mods correctly weapon-side per Kuma-precedent; plague/Mummy-Excite science-side.
- TYPE file [ancient_zoan] (Perfect): Brachio-coil vs Sanji (ch 1029–1035).
- AWAKENED file [false] (Perfect): never stated; lost to Sanji, BM-KO gag (ch 935), Marco-stall — no awakened markers.
- VALUES file [160/170/140/110/170] (Perfect): bulk DEF/STA 170/170 vs King-speed-pole atk 180–220/speed 150+ — bulk>speed archetype respected; atk 160 below King; speed 140 below King-pole.
- Peer: calamity DF ladder King-speed-pole > Queen-bulk-170 > Jack-120 (decided); cyborg weapon 130s separate from zoan bulk.

#### 57. Jack (jack)

- ASSIGN file [Zou Zou no Mi Model: Mammoth] (Perfect): Zou reveal; Koro-gas weapon/chemical-side, not fruit.
- TYPE file [ancient_zoan] (Perfect): trunk/mammoth bulk.
- AWAKENED file [false] (Perfect): never stated; all losses (Zou 5-day ch 801–805, Zunesha-trunk KO ch 825, Sulong beatdown).
- VALUES file [120/130/115/110/120] (Perfect): durability-only receipts justify modest DEF/STA; atk 120 Veteran-level respects King > Queen-160 > Jack ladder; no win to price higher.
- Peer: calamity DF ladder bottom confirmed; below Queen-bulk-170, below King-speed-pole on every axis.

#### 58. Karasu (karasu)

- ASSIGN file [Susu Susu no Mi] (Perfect): soot-crows Marijoa (ch 1082–1084), named (ch 1083), bounty-400M commander.
- TYPE file [logia] (Perfect-with-note): body-disperses-into-soot + bullets pass through = logia characteristic; official site lists Paramecia but wiki/Logia-consensus + intangibility showings settle logia. (Dispute logged — revisit if databook reclassifies.)
- AWAKENED file [false] (Perfect): never stated/shown.
- VALUES file [110/120/120/130/120] (Perfect): Marijoa stall was 3-commander team feat vs Fujitora (not solo); low-mid band respects Sabo-Mera-300 ceiling; awareness-130 peak prices crow-recon/multitasking correctly.
- Peer: Rev DF chain Sabo-Mera-300 > Kuma-Paw-150/300-speed > Karasu-soot-team-feat > Morley-Oshi (B9); below Sabo as same-org junior fruit.

#### 59. Jinbe (jinbe)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Buraikan water-shock Fishman-Karate technique-side (haki review: technique≠Ryuo); vs-Who's-Who + 5-day-Ace-draw priced in base 900/950; no fruit ever.
- Peer: none-DF matches Vista/Killer-side; technique-output separation mirrors Zoro/Roger-none precedent.

#### 60. Vista (vista)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): twin-saber weapon-side; Mihawk-stall sword-skill, zero fruit hints Marineford. (Stall value lives in weapon 150-atk + base awareness-800.)
- Peer: none-DF swordsman matches Zoro-side; below Mihawk (superior) without fruit inflation.

### Batch 7 — Shiryu → Oven

#### 61. Shiryu (shiryu)

- ASSIGN file [Suke Suke no Mi] (Perfect): stolen from Absalom's corpse, reveal (ch 925); Moria ambushed same chapter.
- TYPE file [paramecia] (Perfect): Clear-Clear Human.
- AWAKENED file [false] (Perfect): no markers/statements; awakening talk pure speculation.
- VALUES file [150/150/110/115/120] (Trim → def 110–120): atk 150 = sneak-enabler premium for Garp-stab (ch 1087) — zero direct DF damage caps ~150; def 150 generous (evasion≠soak).
- Peer: DF-output below Magellan-poison-260 (warden rivalry: sneak-enabler < one-shot-lethal); ambush premium in atk only, Raiu/haki-side carry the wound (ch 1087).

#### 62. Magellan (magellan)

- ASSIGN file [Doku Doku no Mi] (Perfect): Hydra/Chloro Ball/Venom Road/Kinjite kit, ID (ch 542–547).
- TYPE file [paramecia] (Perfect): Poison Human, confirmed paramecia.
- AWAKENED file [false] (Perfect): Kinjite/Venom Demon is "forbidden technique" (ch 547), never labeled awakening; no markers.
- VALUES file [260/250/110/120/120] (Perfect): atk 260 = top unawakened lethality — one-shot Luffy (ch 542–543) + Kinjite vs BB Pirates (ch 544); def 250 = Hydra screens + poison-body deterrence + Venom Road (wax-wall stall ch 547 caps below logia-like walls).
- Peer: 260 > Shiryu-sneak-150 (warden rivalry decided: lethal-submit > ambush-enabler); 260 above Doffy-awakened-250 acceptable on one-shot record; stays below Katakuri-~300/Law-Kid-400+.

#### 63. Kalgara (kalgara)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): pre-DF-era Shandian warrior (ch 282–290); spear + wits vs Noland; zero fruit markers.
- Peer: pre-era none matches Ryuma-none; no DF ladder placement.

#### 64. Ivankov (emporio-ivankov)

- ASSIGN file [Horu Horu no Mi] (Perfect): Emporio hormones — Healing/Hell Wink/Growth/Energy/Tension, ID (ch 538–548).
- TYPE file [paramecia] (Perfect): body-hormone paramecia.
- AWAKENED file [false] (Perfect): no markers/statements; Galaxy Wink/Hell Wink base techniques.
- VALUES file [120/110/110/110/120] (Perfect): support-heavy kit — Death/Galaxy Wink offense modest (vs Kuma ch 538–540, Blugori squad ch 542); Healing Hormones on Luffy (ch 540–548) support, not offense — atk capped ~120 correct.
- Peer: Rev-DF ladder — below Sabo-Mera-300/Kuma-Paw (combat output); hormone-utility band w/ Karasu-soot/Morley-Oshi (B9); support value not scored in atk.

#### 65. Drake (x-drake)

- ASSIGN file [Ryu Ryu no Mi Model Allosaurus] (Perfect): ancient zoan; hybrid + X-Caliber axe, Wano (ch 1005+).
- TYPE file [ancient_zoan] (Perfect): Allosaurus ancient model.
- AWAKENED file [false] (Perfect): no markers; CP0 capture shows limits.
- VALUES file [160/170/140/110/170] (Perfect): def 170/sta 170 ancient hybrid soak (vs Sanji ch 1005); atk 160 hybrid + axe, below commander pole; speed 140 modest for allosaurus hybrid.
- Peer: below King-speed-pole (King atk 180–220/speed 150+; Drake 160/140 both under) — Tobiroppo-ancient band w/ Who's-Who/PageOne/Ulti/Sasaki (B8/B11).

#### 66. Cracker (charlotte-cracker)

- ASSIGN file [Bisu Bisu no Mi] (Perfect): infinite biscuit soldiers + hardening, WCI (ch 835–842).
- TYPE file [paramecia] (Perfect): biscuit-production paramecia.
- AWAKENED file [false] (Perfect): no markers/statements; soldier volume is stamina feat; TRUE thin body exposed (ch 842).
- VALUES file [120/130/105/110/125] (Perfect): army-utility in def 130/sta 125 (11h G4 duel ch 838–842 SUBSIDIZED by hiding — base STA cut per review); Pretzel offense weapon-side 200, so DF atk 120 correct.
- Peer: Sweet-Commander ladder position locked — Katakuri-~300 > Cracker (120/130) > Perospero-candy + Oven-heat + Daifuku > Smoothie-lowest; 11h record + army above Smoothie confirmed.

#### 67. Inuarashi (inuarashi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit; Electro mink-side + Sulong transformation-side only (vs Jack ch 820s). Sulong is NOT a DF — full-moon transformation, stated explicitly.
- Peer: mink none-DF matches Neko/Pedro/Carrot/Bepo pattern; Sulong≠DF explicit, file clean.

#### 68. Nekomamushi (nekomamushi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit; Electro + Sulong-mauling of Perospero (ch 1026) transformation-side. Sulong is NOT a DF — stated explicitly.
- Peer: mink none-DF matches Inu; Sulong≠DF explicit, file clean.

#### 69. Perospero (charlotte-perospero)

- ASSIGN file [Pero Pero no Mi] (Perfect): candy arrows/Wall/Maiden, WCI + Wano (ch 1026).
- TYPE file [paramecia] (Perfect): candy-production paramecia.
- AWAKENED file [false] (Perfect): no markers/statements; candy-tower vs Sulong Neko loss (ch 1026) shows ceiling.
- VALUES file [120/115/110/110/120] (Trim → atk 100–110): 120 ties Cracker-120 — INVERTS decided Cracker > Perospero side; def/sta under Cracker correct on Sulong-mauling loss (ch 1026) + Bege-trap limits.
- Peer: below Katakuri-~300/Cracker-army; above Smoothie-lowest-floor (80–100); candy-control > juice-drain; heat matchup vs Oven unresolved here.

#### 70. Oven (charlotte-oven)

- ASSIGN file [Netsu Netsu no Mi] (Perfect): heat body + heat-armor soak vs Bege/Pekoms/Ichiji (ch 887–890); naginata weapon-side.
- TYPE file [paramecia] (Perfect): heat-body paramecia.
- AWAKENED file [false] (Perfect): no markers/statements; heat-subsidized per baseStats review, no environment-transmutation showings.
- VALUES file [160/130/110/110/120] (Trim → atk 120–130): 160 > Cracker-120 INVERTS decided Cracker > Oven side + double-counts heat-armor already in def; def 130 heat-armor soak acceptable vs Bege/Pekoms (ch 887–890).
- Peer: below Cracker-army (commander 860M vs officer 300M record gap) and Katakuri-~300; heat-armor DEF niche vs Perospero-candy/Daifuku-genie/Smoothie-juice; offense capped at Cracker-parity max.

### Batch 8 — Who's-Who → Brogy

#### 71. Who's-Who (whos-who)

- ASSIGN file [Neko Neko Model Saber-Tooth] (Perfect): ancient saber-tooth hybrid/full confirmed vs Jinbe (ch 1017–1018).
- TYPE file [ancient_zoan] (Perfect): Smilodon ancient class; Rokushiki-combined Gagan/Kibasen technique-side, not type changers.
- AWAKENED file [false] (Perfect): no flame-cloud/mane awakening markers anywhere in Onigashima duel.
- VALUES file [160/170/140/110/170] (Perfect): Gagan fang-pistol pierced Jinbe haki + Tekkai-Kibasen pressure justify band; loss reflects Jinbe superiority + tail-step exploit, not DF deficit.
- Peer: Tobiroppo-ancient uniformity — identical Drake [160/170/140/110/170]; holds band despite loss (Jinbe > Drake-tier opponents faced).

#### 72. Kaku (kaku) — AWAKENED CORRECTION

- ASSIGN file [Ushi Ushi Model Giraffe] (Perfect): banana-shaped Spandam fruit; Pasta-Machine/Amanedachi Rankyaku technique-side.
- TYPE file [zoan] (Perfect): standard zoan, non-ancient giraffe — below ancient band by design.
- AWAKENED file [true] (Perfect — brief premise corrected): canon awakened (ch 1072 flame-mane hybrid confirmed; personality retained); Stussy sneak-bite KO (ch 1073) is sneak + Seastone cuffs, not non-awakened proof.
- VALUES file [140/140/130/110/150] (Perfect): awakened showings thin (Amanedachi blocked by Zoro ch 1071, no prolonged awakened duel) — modest awakened band fits; herbivore-giraffe below carnivore floor.
- Peer: standard-zoan floor below Lucci-leopard-awakened-recovery-200+; sta-150 (not 200+) correctly encodes herbivore/carnivore gap.

#### 73. Pica (pica)

- ASSIGN file [Ishi Ishi no Mi] (Perfect): Dressrosa island-scale stone assimilation/golem; Charlestone/Pulpo/Bitestone (ch 770–778).
- TYPE file [paramecia] (Perfect): assimilation not generation — flesh never becomes stone, true body hides inside (non-logia explicit).
- AWAKENED file [false] (Perfect): no awakening markers; golem is base-fruit scale; Zoro forced true-body emergence (ch 778).
- VALUES file [140/200/105/115/120] (Perfect): atk-140 golem-punches vs Chinjao/Elizabello breaking hand; def-200 = golem-MASS utility (controlled stone no harder than normal stone); true-body fragility stays base-side (base DUR-250); spd-105 slow golem fits.
- Peer: golem-utility band above Cracker-army-120/130 (mountain-scale mass > biscuit-army count); one-shot-once-exposed is base/haki-side, not DF-defect.

#### 74. Sentomaru (sentomaru)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): sumo + Ashigara + axe fully cover kit; no fruit ever portrayed. Emission (arm-advanced ch 511) is HAKI-side, explicitly not DF — file complies.
- Peer: emission-utility stays haki-side like all non-DF guards; zero DF-output correctly isolates axe/haki kit.

#### 75. Gunko (manmayer-gunko)

- ASSIGN file [Aro Aro no Mi] (Speculative-lean-Confirm): vector-arrow fruit named (ch 1137); Elbaf showings ongoing — assignment correct but provisional.
- TYPE file [paramecia] (Perfect): arrow creation/manipulation; no zoan/logia markers.
- AWAKENED file [false] (Perfect): no awakening evidence; regen is Abyss/Holy-Knight gift, not DF.
- VALUES file [350/300/280/250/280] (TRIM-HEAVY → atk ~230 / def ~200 band): atk-350 shatters Sweet ladder (Katakuri-~300 top) — showings (giant-gauntlet constructs, redirect vs Jinbe/Brook ch 1146, Colon-hostage arrows) support provisional ~230/200; Imu-possession knockouts EXCLUDED (Imu's, not hers).
- Peer: provisional band pending Elbaf; below Katakuri-~300 ceiling until personal (non-possessed) feats land.

#### 76. Carrot (carrot)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Sulong (WCI ship-sinking ch 880–890) transformation-side + Electro mink-side — BOTH non-DF per Inu=Neko parity; Electro-claw weapon-side covers output.
- Peer: mink none-DF uniformity — identical Inu/Neko/Pedro/Bepo zeros; Sulong speed stays base-side.

#### 77. Yasopp (yasopp)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): portrayal-only Shanks officer; sniper-senses + rifle cover kit; Usopp-rival hype ≠ DF. Near-featless portrayal offers zero DF-output hooks.
- Peer: Shanks-crew none-DF uniformity (Beckman-none); sniper output weapon/base-side.

#### 78. Lucky Roux (lucky-roux)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): portrayal-only officer; Self-Bowling speed-feat + flintlock body/weapon-side; no fruit hint. Near-featless like Yasopp.
- Peer: Shanks-crew none-DF uniformity (Beckman/Yasopp-none); speed-feat base-side.

#### 79. Dorry (dorry)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): 100-year duel (ch 120–130) all body/weapon-side; Hakoku compressed-air beams giant TECHNIQUE, not fruit (NON-HAKI per haki review, still non-DF).
- Peer: giant none-DF uniformity (Brogy/Saul?/Hajrudin? ladder); Hakoku output weapon/technique-side.

#### 80. Brogy (brogy)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): identical Dorry reasoning — duel + Hakoku, no fruit ever. Hakoku≠DF explicit.
- Peer: giant none-DF uniformity, Dorry-mirror zeros; legend-rarity carries portrayal, not DF-output.

### Batch 9 — Morley → Saul

#### 81. Morley (morley)

- ASSIGN file [Oshi Oshi no Mi] (Perfect): push-ground matches Impel Down 5.5 carve + Marijoa terrain-drive (SBS v91, ch 904/908).
- TYPE file [paramecia] (Perfect): ground-mold with no element-body/transformation (ch 904).
- AWAKENED file [false] (Perfect): no awakening statement or Pica-scale permanent-terrain claim; Marijoa use reads base.
- VALUES file [120/110/110/110/120] (Perfect): terrain-utility + GB/Fuji stall without decisive damage keeps atk at Ivankov-level, not Sabo-300/Kuma-tier (ch 1082–1084, bounty 293M).
- Peer: Rev DF ladder bottom DECIDED — Sabo-Mera-300 > Kuma-Paw > Karasu-soot > Ivankov-hormones-120 ≈ Morley-Oshi (utility below combat-output).

#### 82. Urouge (urouge) — MODELING QUESTION RESOLVED

- ASSIGN file [unnamed, blank names] (Perfect): damage-to-strength Paramecia confirmed but never named — file correctly leaves names empty (ch 508–509).
- TYPE file [paramecia] (Perfect): body-growth/strength conversion; no zoan transform or logia element.
- AWAKENED file [false] (Perfect): no awakening showing/statement; Snack win reads base growth.
- VALUES file [120/110/110/110/120] (Perfect): Pacifista break (ch 508–509) + Snack win justify modest DF-side add; Kizaru-light-kick loss caps higher.
- Peer: growth belongs DF-side (not baseStats) — values stay modest vs Apoo/Hawkins named-fruit output, above Killer-none.

#### 83. Burgess (jesus-burgess)

- ASSIGN file [Riki Riki no Mi] (Perfect): post-Dressrosa pickup via BB fruit-hunt; Sabo loss (ch 780–792) was pre-DF (ch 1063).
- TYPE file [paramecia] (Perfect): pure strength multiplier; no transformation/element (ch 1063).
- AWAKENED file [false] (Perfect): no awakening statement; mountain-lift reads base fruit use (ch 1063–1064 Winner Island).
- VALUES file [125/110/105/105/115] (Perfect): single mountain-hurl feat thin but real; modest above Champion-boxing base, below proven combat fruits.
- Peer: BB DF side DECIDED — Teach-Yami-450s > Magellan-poison-260 > Shiryu-sneak-150 > Burgess-Riki-125 (raw-boost below hax/poison output).

#### 84. Pizarro (avalo-pizarro)

- ASSIGN file [Shima Shima no Mi] (Perfect): island-merge stated new power pre-Hachinosu; skull-face + limb manifestation (ch 1080/1087).
- TYPE file [paramecia] (Perfect): environment-assimilation Island-Human, not logia/zoan (ch 1080).
- AWAKENED file [false] (Perfect): no awakening statement; Hachinosu control reads base-scale use.
- VALUES file [140/130/115/115/125] (Perfect): island-arm offense tops BB sub-batch — but def capped 130 since Garp Galaxy Divide cracked skull + Koby Honesty Impact broke arm, both breakthroughs (ch 1087–1088).
- Peer: Pizarro-Shima-140/130 leads Burgess-Riki/Vasco-Gabu on scale; still below Pica-golem-200-def and Teach/Shiryu/Magellan tiers.

#### 85. Vasco Shot (vasco-shot)

- ASSIGN file [Gabu Gabu no Mi, english blank] (Acceptable + FILL: english "Glug-Glug Fruit" missing — fill at apply): alcohol-liquor power shown (ch 1087).
- TYPE file [paramecia] (Perfect): Liquor-Human production, no element-body.
- AWAKENED file [false] (Perfect): single-trick showings only, no awakening hint.
- VALUES file [120/110/110/110/120] (Perfect): flame-spit vs Garp blocked via human shields; thin + Hancock Amazon Lily loss caps higher.
- Peer: BB ladder bottom DECIDED — Vasco-Gabu-120 below Burgess-Riki-125/Pizarro-Shima-140; double-none haki means DF-side carries all output.

#### 86. Koby (koby)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit ever stated; Honesty Impact = advanced-armament emission per haki review (ch 1088); Soru/Rokushiki technique-side.
- Peer: SWORD none-DF holds — Koby-none vs Helmeppo? (B16 tests); no DF inflation either side.

#### 87. Kawamatsu (kawamatsu)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): kappa/fishman body + Soto Muso sumo-sword; never a fruit user (Wano). Scabbard DF-count stays ZERO.
- Peer: Scabbard none-DF uniform — Kawamatsu-none vs Oden/Kiku/Kinemon-none; Denjiro/Ashura below same check.

#### 88. Denjiro (denjiro)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Kyoshiro cover + Foxfire-style swordsmanship; never a fruit user (Wano ch 947+).
- Peer: Scabbard none-DF uniform — Denjiro-none vs Kawamatsu/Ashura-none; style/weapon-side, not fruit-side.

#### 89. Ashura Doji (ashura-doji)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): strongest Kuri headliner, Oden-two-sword style; never a fruit user (Wano).
- Peer: Scabbard none-DF uniform — Ashura-none vs Oden-alone-CoC precedent; weapon/style-side holds.

#### 90. Saul (jaguar-d-saul)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): giant VA; battleship-throw BODY-side STR-1100 per baseStats review; frozen 22y adds no fruit (Ohara ch 392–396). Giant ladder stays fruitless.
- Peer: Giants none-DF uniform — Saul-none vs Dorry/Brogy/Hajrudin-none; Elbaf-side stays body/weapon.

### Batch 10 — Franky → Hawkins (all Perfect batch)

#### 91. Franky (franky)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): cyborg ≠ DF — cola-powered modifications/weapons, never ate fruit (Water 7 through Wano); Radical Beam/General Franky weapon-side; DUR-900 hull base-side.
- Peer: SH DF ladder untouched — Robin sole SH DF-side here, far below Luffy-Nika-350s.

#### 92. Pedro (pedro)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Electro + Sulong mink racial traits, not DF (Zou ch 809+; Inu/Neko same source); Tamago rivalry + ch-877 sacrifice all base/haki-side.
- Peer: matches Killer-none precedent — non-DF fighters hold zeros regardless of Electro/Sulong portrayal.

#### 93. Smoker (smoker)

- ASSIGN file [Moku Moku no Mi] (Perfect): Loguetown capture + Alabasta White Blow/White Out vs Luffy (ch 97–100, 184–185); PH heart-theft proves DF-user status (ch 672–673).
- TYPE file [logia] (Perfect): smoke-body intangibility + production, canonical logia.
- AWAKENED file [false] (Perfect): no awakened smoke-environment feats; Vergo loss haki-side (ch 684–687), not awakening evidence.
- VALUES file [130/120/120/130/120] (Perfect): capture-utility + smoke-mobility + Marineford presence justify mid-epic logia; haki-bypassable intangibility caps defense at 120.
- Peer: VA-logia band correctly below admirals-550s — utility logia without admiral-scale output (PH vs Law/Vergo showings).

#### 94. Cavendish (cavendish)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Durandal fencer; Hakuba dissociative second personality, not DF (D-Block ch 757–760); D-Block sweep no DF component.
- Peer: third none-zero in batch alongside Franky/Pedro — non-DF zeros enforced uniformly.

#### 95. Robin (nico-robin)

- ASSIGN file [Hana Hana no Mi] (Perfect): Clutch/Gigante through Demonio Fleur Grand Jacuzzi Clutch finisher vs Black Maria (ch 1020–1022); Fish-Man Karate palm technique-side.
- TYPE file [paramecia] (Perfect): sprouted-limb grappling on self + others, canonical paramecia.
- AWAKENED file [false] (Perfect): Demonio Fleur giant-bloom application; no environmental/other-body transformation shown.
- VALUES file [120/130/140/130/120] (Perfect): atk-120 grappling bypasses durability rather than raw output (finisher needed Brook assist + setup); spd-140 sprout-mobility/reach + awr-130 multi-eye utility justified (ch 1020–1022).
- Peer: SH DF-side far below Luffy-Nika-350s; modest clutch-output keeps her under Tobiroppo-ancient raw stats while finisher stays explainable via grappling mechanics.

#### 96. Ulti (ulti)

- ASSIGN file [Ryu Ryu no Mi Model Pachycephalosaurus] (Perfect): Ul-Zugan skull vs Luffy (ch 983); Nami/Usopp hunt through ch 996–998.
- TYPE file [ancient_zoan] (Perfect): headbutt-dinosaur zoan, canonical ancient model.
- AWAKENED file [false] (Perfect): Yamato Thunder Bagua one-shot her (ch 996–998) — no awakened recovery/endurance form; recovery argued base+zoan toughness, not awakening.
- VALUES file [160/170/140/110/170] (Perfect): skull-output (atk-160) + dino-durability/tank (def-170/sta-170) match Luffy-headbutt trade + post-Bagua return; spd-140 headbutt-rush only.
- Peer: exact Tobiroppo-ancient band match vs Drake/Who's-Who-160/170/140/110/170 — Ulti at band, below neither; Page One-side (B11) decides whether trio holds uniform.

#### 97. Sasaki (sasaki)

- ASSIGN file [Ryu Ryu no Mi Model Triceratops] (Perfect): Heliceratops flight + Karakuri arsenal + Armored Division (ch 1008–1019); belly weak-spot exploited by Franky General Cannon (ch 1019).
- TYPE file [ancient_zoan] (Perfect): canonical ancient triceratops model.
- AWAKENED file [false] (Perfect): loss to Franky shows no awakened form; tank-endurance base+zoan + arsenal, not awakening.
- VALUES file [160/170/140/110/170] (Perfect): tank + flight + arsenal justify band-level atk/def/sta; Franky-Cannon endurance supports def-170; belly weak-spot argues against any higher.
- Peer: band-uniform with Ulti/Drake/Who's-Who — below Drake narratively (Drake's feats vs Sanji/Ancient-Giants edge higher) but file parity acceptable for epic Tobiroppo tier.

#### 98. Black Maria (black-maria)

- ASSIGN file [Kumo Kumo no Mi Model Rosamygale Grauvogeli] (Perfect): webs + poison-legs + fire-breathing spider-face vs Robin/Brook (ch 1005, 1020–1022); Sanji-trap setup (ch 1005).
- TYPE file [ancient_zoan] (Perfect — VERIFIED): Rosamygale grauvogeli Triassic mygalomorph spider; Vivre Card #1553 + ch 998 reveal confirm Ancient Zoan (extinct-species rule, not modern-spider zoan).
- AWAKENED file [false] (Perfect): drug-modified hybrid cosmetic alteration (SBS 100), not awakening; loss to Demonio Fleur argues against awakened values.
- VALUES file [155/160/130/110/155] (Perfect): slight trim under 160/170/140/110/170 band justified — trap/ambush fighter (webs/poison/illusion-mist DF-side) with Robin-Demonio loss; Wanyudo staff stays weapon-side.
- Peer: Tobiroppo-ancient ladder Ulti = Sasaki = band > Black Maria trim — size/webs utility doesn't offset direct-loss + lower physical dominance.

#### 99. Apoo (scratchmen-apoo)

- ASSIGN file [Oto Oto no Mi] (Perfect): sound-slash/boom-box vs Luffy/Zoro (ch 980–981); Kizaru scratch Sabaody (ch 509–511); Kid-metal-fist + Drake-alliance/CP0-abandon Onigashima.
- TYPE file [paramecia] (Perfect): body-instrument sound production, canonical paramecia.
- AWAKENED file [false] (Perfect): no environmental sound-transformation shown; output scales with heard-range, not awakening.
- VALUES file [130/120/110/110/120] (Perfect): atk-130 ranged sound-hax (Kizaru-scratch + Luffy/Zoro wounds) capped by ear-cover hard counter (ch 510–511); eavesdrop-utility doesn't lift awareness beyond 110.
- Peer: Supernova DF ladder — Apoo attack-led vs Hawkins defense-led, both modest vs Law-Kid-400+ and above Killer-none/Urouge-unnamed; ear-cover counter justifies no higher.

#### 100. Hawkins (basil-hawkins)

- ASSIGN file [Wara Wara no Mi] (Perfect): 8-doll redirect vs Kizaru (ch 509); straw-constructs + Warabide sword (weapon-side); Killer doll-loophole loss (ch 1029–1035); Tarot non-CoO prediction per haki review.
- TYPE file [paramecia] (Perfect): straw-doll production/redirection, canonical paramecia.
- AWAKENED file [false] (Perfect): constructs base-fruit application; Killer bypassing last doll (ch 1032–1035) shows finite-stock mechanic, no awakening.
- VALUES file [100/150/110/120/130] (Perfect): def-150 doll-tank pole (redirected Kizaru hits) batch-highest DF-defense by design; atk-100 capped — constructs never finished peers, Killer solved stock; final-doll-bypass hard counter holds caps.
- Peer: Supernova ladder — Hawkins defense-pole mirrors Apoo attack-pole at matched totals (~590–610); both well under Law-Kid-400+, above Killer-none; Tarot excluded from awareness (120 = straw-senses only).

### Batch 11 — Page One → Marigold

#### 101. Page One (page-one)

- ASSIGN file [Ryu Ryu no Mi Model Spinosaurus] (Perfect): Tobiroppo ancient; debut ch 929 / named ch 930–931.
- TYPE file [ancient_zoan] (Perfect): dinosaur spino full/hybrid vs Raid Suit Sanji (ch 931–932); standard ancient durability class.
- AWAKENED file [false] (Perfect): no awakening cues/clouds; BM one-shot KO + Luffy Elephant Gun KO (ch 983) / Yamato Thunder Bagua (ch 984) show unawakened recovery.
- VALUES file [200/170/140/110/170] (Trim → atk 160): atk +40 breaks Tobiroppo-ancient uniform 160/170/140/110/170 (Drake/Who's-Who/Ulti/Sasaki); showings (Sanji-kick swipe ch 931, G3 recovery, BM one-shot loss) sit below Drake / with Sasaki; def/spd/awa/sta already uniform.
- Peer: Tobiroppo-ancient uniformity DECIDED — hold 160/170/140/110/170 quartet+trio; Page One trims to 160 atk (total 750); spino bulk priced body-side, not DF atk.

#### 102. Fisher Tiger (fisher-tiger)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit ever; Red Line climb + Marijoa slave-raid (ch 621–626) + Sun Pirates founder; died to gunfire/blood-loss — fishman body-side.
- Peer: Fishman ladder Tiger-none vs Jinbe-none/Arlong-none/Hody-steroid-none — all DF-zero.

#### 103. Kyros (kyros)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): never ate fruit; toy-body was SUGAR's Hobi Hobi victim-state (Thunder Soldier), not user power — DF-victim ≠ DF-user, stated explicitly; 3000-win sword + Thunder Bastardo weapon-side vs Diamante.
- Peer: Gladiator ladder Kyros-none (DF-victim rule) vs Diamante-Hira (DF) / Chinjao-none / Ideo-none — correctly non-DF side.

#### 104. Hajrudin (hajrudin)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit; giant body-side; Gungnir vs Machvise Dressrosa; mercenary captain.
- Peer: Giant ladder Hajrudin-none vs Dorry-none/Brogy-none/Saul-none — uniform non-DF giant band holds.

#### 105. Brook (brook)

- ASSIGN file [Yomi Yomi no Mi] (Perfect): Paramecia revival + soul control (ch 442/489); soul-projection + underworld-chill post-TS; WCI homie-suppression (ch 848).
- TYPE file [paramecia] (Perfect): soul/revival effect paramecia-class, not zoan/logia.
- AWAKENED file [false] (Perfect): no awakening cues; WCI/Onigashima show base soul-chill + Soul Solid freeze, not awakened environment-effect.
- VALUES file [120/165/121/110/120] (Trim → def 130): atk 120 prices soul-chill offense correctly — but def 165 prices one-time revival as combat durability; revival is NOT combat output (single extra life, dormant until first death). Regular-homie rout (ch 848) soul-authority utility while Zeus/Prometheus/Napoleon immune (ch 853) — no 35-pt def premium over Robin-130.
- Peer: SH DF ladder DECIDED — Brook trims to ~120/130/121/110/120 (≈600 total, Robin parity) far below Luffy-Nika-350s; utility/soul-hax priced in awa/sta, not def.

#### 106. Bonney (jewelry-bonney)

- ASSIGN file [Toshi Toshi no Mi] (Perfect): age-manipulation (self/others/objects, temp on living) usage debut ch 499 Sabaody, named SBS Vol.107; Saturn extract-to-infant experiment (ch 1099–1103); Sapphire Scales Ginny-line disease, not DF.
- TYPE file [paramecia] (Perfect): age-manipulation human, paramecia listing.
- AWAKENED file [false] (Perfect): Distorted Future ≠ awakening — base technique usable since childhood escape vs Alpha; Nika-mimicry (ch 1119)/Dawn Balloon vs Saturn imagined-future application, no awakening cues. Stated explicitly.
- VALUES file [130/120/110/120/130] (Perfect): atk 130 prices burst Nika-mimicry punch vs Saturn (not sustained Law/Kid-400+ output); def 120/sta 130 price child-body Frontier Dome survival; awa 120 escapee-tactics; true age 12 keeps totals ~610 in Hawkins/Apoo-~600 utility-Supernova band.
- Peer: Supernova ladder Bonney-610 utility band with Apoo/Hawkins (~600, atk-130 poles) well below Law/Kid-400+ sustained outputs; child + utility-fruit discount holds.

#### 107. Ideo (ideo)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit; Destruction Cannon Longarm-technique-side; boxer, C-Block vs Sai, vs Dellinger/Hajrudin backing.
- Peer: Boxer ladder Ideo-none vs Sai-none/Chinjao-none — uniform non-DF boxer side; Gladiator cross-check Kyros-none holds.

#### 108. Lindbergh (lindbergh)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit; Cool Shooter/Laser Shooter/jetpack invention weapon-side; cat-mink Electro + Rev South commander body-side. (Inventor ≠ DF — Franky-precedent.)
- Peer: Inventor ladder Lindbergh-none vs Franky-none — uniform non-DF inventor band.

#### 109. Sandersonia (boa-sandersonia)

- ASSIGN file [Hebi Hebi no Mi Model Anaconda] (Perfect): force-fed by Celestial Dragons as slave entertainment (ch 521); constriction + tail-strike vs pre-TS Luffy arena (ch 518–522); Gorgon-curse cover story.
- TYPE file [zoan] (Perfect): regular zoan snake (not ancient); full/hybrid constrictor with Haki-synergy arm-basic.
- AWAKENED file [false] (Perfect): no awakening cues; Amazon Lily loss to G2/G3 Luffy shows base-zoan ceiling.
- VALUES file [140/140/130/110/150] (Perfect): atk 140 anaconda-squeeze + Haki tail; def 140/sta 150 zoan-body recovery; spd 130 flexible-body evasion; loss to G2/G3 Luffy caps band below Warlord tier.
- Peer: Kuja-zoan ladder DECIDED — sister-parity 140/140/130/110/150 holds vs Marigold identical; both −40 atk below Hancock-Mero-180 (petrification-hax > zoan-body).

#### 110. Marigold (boa-marigold)

- ASSIGN file [Hebi Hebi no Mi Model King Cobra] (Perfect): force-fed alongside sisters (ch 521); named on-page (ch 519); venom-spit Modoku + constriction + halberd vs pre-TS Luffy (ch 518–522).
- TYPE file [zoan] (Perfect): regular zoan snake (not ancient); venom model trait, still zoan-class.
- AWAKENED file [false] (Perfect): no awakening cues; joint loss with Sandersonia to G2/G3 Luffy shows base-zoan ceiling.
- VALUES file [140/140/130/110/150] (Perfect): atk 140 venom + Haki Heavy Stick tail parity with Sandersonia-constriction (venom offset by anaconda flexibility); halberd output correctly split weapon-side; def/sta zoan-body standard.
- Peer: Kuja-zoan ladder DECIDED — sister-parity with Sandersonia identical holds; both −40 atk below Hancock-Mero-180; venom does not break sister band, hax-gap preserved.

### Batch 12 — Kiku → Wyper

#### 111. Kiku (kikunojo)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no DF in canon — Kaido-raid stab/Kanjuro duel all sword-side.
- Peer: Scabbard sword-side Kiku vs Oden/Ashura/Denjiro/Kawamatsu — all none-DF, zeros uniform.

#### 112. Kin'emon (kinemon) — BRIEF CORRECTED, SCABBARD DF-COUNT IS ONE

- ASSIGN file [Fuku Fuku no Mi] (Perfect — my plan brief was wrong): canon eats clothing-fruit, creates garb from leaves/stones (ch 663/672, Vivre Card). Foxfire is sword-TECHNIQUE, not DF — stated explicitly.
- TYPE file [paramecia] (Perfect): clothing-creation paramecia per databook/Vivre.
- AWAKENED file [false] (Perfect): no awakening showing; Kin-chan gate = application, not awakening.
- VALUES file [110/110/105/115/110] (Trim → atk 100): utility/disguise fruit, near-zero combat — atk 110 generous; awa 115 acceptable (infiltration/disguise use).
- Peer: one of THREE Scabbards with DF (Kin'emon Fuku + Raizo Maki + Kanjuro Fude — count corrected in B15; Kiku/Kawamatsu/Denjiro/Ashura/Oden none).

#### 113. Laffitte (laffitte) — UNNAMED DF CONFIRMED, FILE WRONG

- ASSIGN file [none] (FAIL — brief wrong): Vivre Card/databook confirms UNNAMED DF (arms→wings ch 542 Impel Down) — file contradicts canon.
- TYPE file [none] (FAIL): follows bad assign — should be unnamed/unknown-type placeholder, not none.
- AWAKENED file [false] (Perfect): no awakening hint regardless.
- VALUES file [0/0/0/0/0] (FAIL): unnamed flight-DF showings (Impel Down flight, Mary Geoise infiltration ch 234; Gates hypnosis ch 576 hax-side) warrant small mobility values, not zeros — spec spd/awa-side trim band ~110–120; hypnosis stays haki/hax-side, not DF.
- Peer: BB officer with unnamed-DF vs Shiryu-sneak-150/Magellan-poison-260/Burgess-Riki-125/Pizarro-Shima-140/Vasco-Gabu-120 — side UNDECIDED pending named-fruit reveal; do not rank on ladder yet.

#### 114. Van Augur (van-augur)

- ASSIGN file [Wapu Wapu no Mi] (Perfect): teleport self+touch-targets; Winner Island warp (ch 1064), Egghead escape (ch 1107); range-limited unmastered.
- TYPE file [paramecia] (Perfect): teleportation paramecia per canon.
- AWAKENED file [false] (Perfect): explicitly unmastered range — anti-awakening evidence.
- VALUES file [120/110/140/110/120] (Perfect): spd 140 warp-reposition utility (sniper-ambush); thin post-DF feats cap atk at 120 — no inflation.
- Peer: BB ladder teleport-utility spd-140 vs Burgess-Riki-125 raw-boost — Augur wins mobility, loses direct-output; below Magellan-poison-260/Shiryu-sneak-150 on combat record.

#### 115. Daifuku (charlotte-daifuku)

- ASSIGN file [Hoya Hoya no Mi] (Perfect): Lamp Human; belly-rub genie + bisento; overpowered Sanji (ch 864); ship-cleaving Maji Giren.
- TYPE file [paramecia] (Perfect): summoning-type paramecia per canon.
- AWAKENED file [false] (Perfect): no awakening showing; giant-genie = scale, not awakening.
- VALUES file [120/110/110/110/120] (Perfect): genie-battering-Sanji record justifies atk 120; lamp-rub setup caps spd/awa at 110.
- Peer: Sweet ladder Katakuri-~300 > Cracker-120/130 ≈ Daifuku-genie-120 > Perospero-trim/Oven-trim > Smoothie-lowest — Daifuku above Smoothie-zero-feats; full ladder LOCKS.

#### 116. Moria (gecko-moria)

- ASSIGN file [Kage Kage no Mi] (Perfect): Doppelman/switch, Brick Bat, zombie-army (Oars/Ryuma), TB (ch 480–490).
- TYPE file [paramecia] (Perfect): shadow-manipulation paramecia per canon.
- AWAKENED file [false] (Perfect): Asgard-1000-shadows = technique-scale last-resort (desperate, not trump) — not confirmed awakening.
- VALUES file [120/131/110/110/120] (Trim → def 130): Doppelman-switch + Asgard-vessel justify atk 120; def 131 odd-precision — round to 130 (Brook-trim-def-130 parity band).
- Peer: Warlord ladder Crocodile-250 ≈ Doffy-~220–250 > Moria-shadow-120; below Hancock-hax/Doffy-strings on direct-output; shadow-army utility ≠ duel value; Mihawk/Jinbe-none above on base.

#### 117. Bege (capone-bege)

- ASSIGN file [Shiro Shiro no Mi] (Perfect): castle-body; Big Father tank vs BM-scream (ch 869); rook-escapes; cannon-arsenal WCI plot.
- TYPE file [paramecia] (Perfect): body-fortress paramecia per canon.
- AWAKENED file [false] (Perfect): no awakening showing; vehicle-forms = applications.
- VALUES file [150/190/110/140/150] (Perfect): def 190 = Big-Father-tank + assassination-plot peak WCI feat; atk 150 crew-arsenal-side, not solo-output.
- Peer: Supernova ladder below Law/Kid-400+ combat-output, above Apoo/Hawkins on WCI plot-carry; fortress-utility ≠ duel-output — side DECIDED low-combat/high-plot.

#### 118. Devon (catarina-devon)

- ASSIGN file [Inu Inu Model Kyubi] (Perfect): mythical nine-tails; Absalom-impersonation trick (ch 925); Saturn-leg-touch (ch 1079–1081).
- TYPE file [mythical_zoan] (Perfect): mythical zoan per canon/green-databook Kitsune salvage.
- AWAKENED file [false] (Perfect): no awakening showing; transform-trickery only.
- VALUES file [170/170/150/120/180] (Trim → atk/def ~140–150, sta ~150): near-featless commander — zero DF-combat showings; atk/def 170 + sta 180 = mythical-name premium, violates showings rule. (BB-commander floor; trickery-side awa keep 120.)
- Peer: trimmed-~145 below Shiryu-sneak-150/Magellan-poison-260, ≈ Pizarro-Shima-140 — mythical-trickery loses to Burgess-raw-125? NO: stays above Vasco-Gabu-120 on Level-6 pedigree + Hachinosu role.

#### 119. Doc Q (doc-q)

- ASSIGN file [Shiku Shiku no Mi] (Perfect): disease-hax; feminization contagion vs Heart Pirates (ch 1063); DF-hunt origin.
- TYPE file [paramecia] (Perfect): disease-creation paramecia per canon.
- AWAKENED file [false] (Perfect): no awakening showing; Law-haki-break = anti-awakening cap evidence.
- VALUES file [120/110/110/110/120] (Perfect): disease-hax utility atk 120 capped by Law-haki-negate; sickly-doctor base keeps def/spd/awa/sta floor 110–120; Stronger-mount stays weapon-side.
- Peer: BB ladder bottom with Vasco-Gabu-120 — disease-hax ≈ Gabu-trickery on utility, both below Burgess-Riki-125 direct-output.

#### 120. Wyper (wyper)

- ASSIGN file [none] (Perfect): no DF — Reject Dial + Burn Bazooka/waver all tech-side; Enel near-kill (ch 284–285) dial-burst; Shura win.
- TYPE file [none] (Perfect): no fruit, no type.
- AWAKENED file [false] (Perfect): nothing to awaken.
- VALUES file [0/0/0/0/0] (Perfect): none-DF zeros enforced — Dial-tech ≠ DF, stated explicitly.

### Batch 13 — Gan Fall → Bartolomeo

#### 121. Gan Fall (gan-fall)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit ever shown; sky-knight fights with lance + Pierre mount vs Shura. Pierre ate Uma Uma no Mi — MOUNT's DF, not rider's (Shamrock/Cerberus precedent holds).
- Peer: rider-none holds vs Shamrock-sword-DF — mount-DF ≠ rider-DF, zeros enforced.

#### 122. Sugar (sugar)

- ASSIGN file [Hobi Hobi no Mi] (Perfect): touch-toy + contracts + memory-erase; Kyros/Robin victims (ch 717/740); Paramecia per canon.
- TYPE file [paramecia] (Perfect): transformation/contract hax; no element/zoan traits.
- AWAKENED file [false] (Perfect): no awakening shown; faint breaks ALL effects (opposite of awakened control, ch 742/756).
- VALUES file [100/140/110/110/120] (Trim → def ~105–110): atk-100 touch-hax OK; def-140 unearned — one-scare-faint child, Trebol-guarded precisely because fragile (ch 740–742); eternal-youth ≠ durability.
- Peer: child-hax utility band vs Bonney-610-utility — nation-scale toy-army out-scales age-mimicry in utility, both zero-duel without setup.

#### 123. Monet (monet)

- ASSIGN file [Yuki Yuki no Mi] (Perfect): snow body/flight/blizzard + Kamakura/Yuki Gaki walls vs Tashigi (ch 687–690).
- TYPE file [logia] (Perfect): create/control/transform-into snow = Logia (snow-woman; heat/haki-bypassable like all logia).
- AWAKENED file [false] (Perfect): no awakening signs; lost composure/reform vs Zoro intent-freeze (ch 690).
- VALUES file [150/180/125/130/120] (Trim → def ~150–160): atk-150 blizzard-output OK; def-180 overpays intangibility broken by Nami-heat + Zoro-fear (ch 687–690) — snow-walls fell, heart-stab killed her.
- Peer: Dressrosa-DF mid-ladder — snow-logia intangibility out-defends Sugar-touch (no self-defense) but well below Bari-barrier absolute-defense.

#### 124. Mr. 3 (galdino)

- ASSIGN file [Doru Doru no Mi] (Perfect): wax walls/armor/keys — Candle Wall vs Magellan/Mihawk-teamwork, Candle Champion, ID wax-keys (Alabasta/ID/MF).
- TYPE file [paramecia] (Perfect): wax-generation body-side; no element/zoan traits.
- AWAKENED file [false] (Perfect): no awakening shown; constructs stay contact-shaped wax.
- VALUES file [120/110/110/110/120] (Perfect): atk-120 wax-construct offense + def-110 Candle-Wall utility fit Baroque-officer band — utility, not output.
- Peer: Baroque ladder — boss Crocodile-Suna-250 holds output, officer Galdino holds wax-utility (~120 band); Daz-none below both.

#### 125. Senor Pink (senor-pink)

- ASSIGN file [Sui Sui no Mi] (Perfect): ground-swim repositioning + wall-phasing vs Franky (ch 774–775).
- TYPE file [paramecia] (Perfect): swim-through-solid hax; no element/zoan traits.
- AWAKENED file [false] (Perfect): no awakening shown; swim stays touch-range gimmick + suit-style supplement.
- VALUES file [155/140/120/110/120] (Trim → atk ~130–140): def-140 earned (dozens of Franky blows absorbed, ch 774–775); atk-155 overpays — offense is Iron-Boxing/technique-side, fruit only repositions.
- Peer: Dressrosa-officer utility band — swim-gimmick mobility below Monet-snow-output, above Sugar-zero-combat; lost duel caps attack.

#### 126. Rebecca (rebecca)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): dull blade + evasion-only; Hakuba-dodge D-Block (ch 739), zero offense vs Diamante. Evasion base-SPD/obs-side (file obs-basic-100s), not DF.
- Peer: Dressrosa-none pair with Kyros-none — both evasion/footwork fighters, zeros enforced.

#### 127. Hody (hody-jones)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no fruit; power from fishman body + Energy-Steroid DRUG (FI arc) — steroids ≠ DF, stated explicitly.
- Peer: fishman-none trio (Hody/Wadatsumi/Arlong) matches Tiger-none/Jinbe-none — race-body ≠ DF.

#### 128. Wadatsumi (wadatsumi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): 80m pufferfish-fishman body only; deflation gags vs Jinbe/Sanji, Sunny-hide WCI utility — size ≠ DF. (Inflation pufferfish-racial trait, not DF transformation.)
- Peer: fishman-none trio holds — biggest body of the three, still zero DF like Hody/Arlong.

#### 129. Arlong (arlong)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): fishman body + Kiribachi weapon-side; loss vs Luffy (ch 93–94) zero DF hints. (East Blue had DFs (Buggy/Alvida/Smoker) — Arlong simply has none, not pre-saturation.)
- Peer: fishman-none trio complete — Kiribachi weapon-side mirrors Hody/trident, both DF-zero.

#### 130. Bartolomeo (bartolomeo)

- ASSIGN file [Bari Bari no Mi] (Perfect): finger-cross barriers — King Punch block (ch 709), Gladius KO + Hakuba/Dellinger blocks (ch 773).
- TYPE file [paramecia] (Perfect): barrier-generation, canon Paramecia; one-barrier limit balancing rule.
- AWAKENED file [false] (Perfect): no awakening shown; single limited-area barrier throughout Dressrosa.
- VALUES file [120/300/110/110/120] (Perfect): def-300 = absolute-defense pole — King Punch (fortress-buster, ch 707–709) + Gladius self-rupture both zero-damage; atk-120 Barrier-Crash KO'd Elizabello/Gladius.
- Peer: barrier-defense pole vs Hawkins-150-pole — absolute-block out-defends doll-redirect (no damage taken vs damage transferred).

### Batch 14 — Caesar → Koala

#### 131. Caesar (caesar-clown)

- ASSIGN file [Gasu Gasu no Mi] (Perfect): creates/controls/transforms gas + Gastille/Karakuni/Shinokuni (ch 658/690–692).
- TYPE file [logia] (Perfect): stated Logia, Law confirms class.
- AWAKENED file [false] (Perfect): never stated/shown; Shinokuni-merge = gas-absorb technique, not awakening.
- VALUES file [180/190/120/130/120] (Trim → def 150–160, Monet parity): Haki-vulnerable Grizzly Magnum KO (ch 691–692) + pipe-break Karakuni; hold atk 180 steel-melt Gastille + oxygen-theft Luffy-KO.
- Peer: gas-WMD utility (Shinokuni nation-sale) above Queen-plague duel-output, but personal-duel ceiling far below admiral-logias; def must sit with Monet, not near Barto-300.

#### 132. Daz Bonez (daz-bonez)

- ASSIGN file [Supa Supa no Mi] (Perfect): full-body steel blades; Spider/Mantle/Spiral; Zoro duel (ch 195–211).
- TYPE file [paramecia] (Perfect): stated Paramecia, inferior to Buki Buki.
- AWAKENED file [false] (Perfect): never stated/shown; steel-hardness fixed ceiling.
- VALUES file [180/180/110/110/120] (Trim → atk 140–150 + def 150–160): extreme-diff loss to pre-Haki Zoro steel-cut ceiling; Senor Pink-atk-trim-130–140 band.
- Peer: pre-haki-era blade ceiling below post-skip cutters; steel-defense above Kyros-none base but below Hawkins-150 DF-defense.

#### 133. Momonosuke (kozuki-momonosuke)

- ASSIGN file [Artificial Uo Uo no Mi Model Seiryu] (Perfect): Vegapunk Kaido-Lineage-Factor replica, pink-only failure (ch 1067); Flame Clouds/Onigashima-pull (ch 1005–1055).
- TYPE file [mythical_zoan] (Perfect): artificial-copy = same Mythical Zoan class; artificial prefix in names preserves distinction, not separate type.
- AWAKENED file [false] (Perfect): never stated/shown; Distorted-Future-style aging via Shinobu ≠ awakening per Bonney-610 rule.
- VALUES file [180/150/130/115/145] (Trim → atk 80–100 + def 100–110): true 8yo zero-combat; Bolo Breath struggled vs Aramaki-regrow. Hold stamina-145 cloud-utility that saved Onigashima.
- Peer: child + dragon-utility band with Bonney-610-utility (island-scale utility, near-zero personal duel output).

#### 134. Hack (hack)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Fishman Karate 100-dan + Rev officer, no fruit ever; karate ≠ DF; Colosseum barrier-hax loss (ch 707–708) base-side.
- Peer: sits with Jinbe-none/Tiger-none/Hody-none/Arlong-none fishman-none ladder; Koala's teacher base-side only.

#### 135. Hyouzou (hyouzou)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): 8-sword + venom-blade trait-side, Energy-Steroid drug-side, no fruit ever; Zoro FI loss base/weapon-side.
- Peer: sits with fishman-none ladder (Jinbe/Tiger/Hack-none); drugged-Hody amp excluded from DF-side.

#### 136. Fukaboshi (fukaboshi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): merman prince trident-side, no fruit ever; drugged-Hody loss. (Royalty/trident ≠ DF; brothers B18 test.)
- Peer: prince-none with brothers B18 + Neptune-none; trident priced weapon-side only.

#### 137. Bon Clay (bentham)

- ASSIGN file [Mane Mane no Mi] (Perfect): face-touch copy + body-mimicry Nami-ruse (ch 538–540); Magellan-feint MF.
- TYPE file [paramecia] (Perfect): stated Paramecia Imitating-Human.
- AWAKENED file [false] (Perfect): never stated/shown; copy-mannerisms limit retained.
- VALUES file [115/110/110/115/120] (Trim → atk 60–80 + def 80–100): zero combat output, infiltration-utility only per Mr.3-wax-utility-120 rule; hold awareness/stamina plot-carry ID/MF.
- Peer: face-copy utility below Ivankov-hormones-120 combat-hax; at Mr.3-120/Lindbergh plot-carry utility tier, not duelist tier.

#### 138. Tamago (baron-tamago)

- ASSIGN file [Tama Tama no Mi] (Perfect): egg-cycle Hiyoko/Niwatori; Pedro bisection→yolk-regen (ch 850–853).
- TYPE file [zoan] (Perfect): stated Zoan egg-body, unique non-voluntary cycle.
- AWAKENED file [false] (Perfect): never stated/shown; cycle-loop ≠ awakening.
- VALUES file [140/140/130/110/150] (Perfect): def-140 correctly prices DF-side bisection-survival + cycle-durability; atk-140 shikomizue/Hiyoko-knives; stamina-150 endless-loop.
- Peer: BMP-knight DF-durability above Daifuku-genie-120 burst-output; Pedro-rivalry 5-year eye-duel validates mid-epic band.

#### 139. Hannyabal (hannyabal)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Kessui-blades weapon-side; vice-warden→warden (ch 661); no fruit ever. Luffy/Bon Clay duels + Teach-stomp base-side.
- Peer: guard-none with Sentomaru-none far below Magellan-poison-260; Kessui priced weapon-side only.

#### 140. Koala (koala)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Hack-taught Fishman Karate technique-side; Rev officer/support; zero manga duels; no fruit ever. (Literacy/organizing ≠ DF.)
- Peer: student-none with Hack-none teacher, far below Sabo-Mera-300/Kuma-Paw Rev DF ladder.

### Batch 15 — Raizo → Mont-d'Or

#### 141. Raizo (raizo) — BRIEF CORRECTED, SCABBARD DF-COUNT IS THREE

- ASSIGN file [Maki Maki no Mi] (Perfect — my plan brief nearly erred): scroll create/seal/release + Bunshin clones (ch 817/992 + Vivre #0981).
- TYPE file [paramecia] (Perfect): manifests/controls scrolls; no body-change/element.
- AWAKENED file [false] (Perfect): no environment-transmutation showings vs Doffy/Katakuri standard.
- VALUES file [115/115/105/115/115] (Perfect): Boro-Breath seal+redirect damaged Kaido (ch 992, def-115) + Bunshin/paralysis outlasted Fukurokuju (ch 1038–1041); redirect-reliant, below direct-damage peers.
- Peer: scroll def-115 just below Kanjuro-paint atk-120 (redirect < paint-sword cut ch 1005), above Bon-Clay-trim. CORRECTION: canon THREE Scabbard DF users (Kin'emon Fuku + Raizo Maki + Kanjuro Fude) — prior "count is ONE" statements in B12/Kin'emon entry are wrong; count is THREE.

#### 142. Kanjuro (kurozumi-kanjuro)

- ASSIGN file [Fude Fude no Mi] (Perfect): ink-paintings animate (Sumi-Garasu/Kazenbo/ink-dragon) + paint-sword cut Kiku arm (ch 1005).
- TYPE file [paramecia] (Perfect): drawing-conjuring; no zoan/logia traits.
- AWAKENED file [false] (Perfect): constructs stay ink, no transmutation; death forecloses.
- VALUES file [120/110/110/110/120] (Perfect): LEGEND 100%-DF threat (no haki help) — paint-army + Kiku-cut justify atk-120 at Mr.3-120 cap; def-110 capped by Kin'emon kill (ch 1014/1015, mortal ink body); sta-120 sustains Kazenbo/army.
- Peer: paint atk-120 = Mr.3-wax-120 cap, above Raizo-scroll-115 (direct cut > redirect), def-110 far below Tamago-140 (egg-cycle rebirth > mortal body).

#### 143. Perona (perona)

- ASSIGN file [Horo Horo no Mi] (Perfect): Negative/Mini/Toku Hollows + Kumashi-side; Usopp-loss (ch 465–466).
- TYPE file [paramecia] (Perfect): spawns spectral hollows, body unchanged.
- AWAKENED file [false] (Perfect): no transmutation showings; Mihawk-castle years added none.
- VALUES file [125/135/110/120/115] (Perfect): negativity-bypass dropped Zoro/Sanji/Franky (ch 465–466, hax-atk premium above Mr.3-120 cap) + Mini-Hollow bombs real damage; def-135 hollow-intangibility screen + Toku body-concealment (glass liability already in base dur-40); awa-120 Toku astral scouting.
- Peer: hax-atk-125 above Bon-Clay-trim/Mr.3-120 (negativity bypass + bombs > wax/face-copy utility); beside Sugar-toy-hax band (both bypass-durability incapacitation on glass bodies).

#### 144. Corazon (donquixote-rosinante)

- ASSIGN file [Nagi Nagi no Mi] (Perfect): silence field hid Law screams/gunfire vs Doffy; Law-escape cover (ch 767).
- TYPE file [paramecia] (Perfect): sound-null field; no zoan/logia traits.
- AWAKENED file [false] (Perfect): field only, no expansion/transmutation; death precludes.
- VALUES file [115/110/110/115/115] (Trim → full block toward 70/90/90/95/90 band): pure silence utility, zero combat output, explicit non-combatant (BIQ-48) — Bon-Clay-trim rule caps utility-only at atk 60–80/def 80–100; file overshoots ~35–50; silence grants no spd/awa/sta either.
- Peer: silence utility belongs inside Bon-Clay-trim ceiling (both zero-combat utility); file ABOVE it = ladder inversion; corrected Corazon-trimmed ≤ Bon-Clay-trim.

#### 145. Hatchan (hatchan)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): 6 arms = octopus-fishman trait, not DF; 6-sword technique-side; takoyaki chef; no fruit Arlong Park→Sabaody→FI.
- Peer: none-zero beside Arlong-model fishman-trait peers (limbs/technique ≠ DF); complies with zeros rule.

#### 146. Blue Gilly (blue-gilly)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Jao Kun Do technique-side + longleg limbs body-side; Block B vs Dellinger/Ideo-peer; no fruit.
- Peer: none-zero beside Ideo (technique-side peer); legs ≠ DF.

#### 147. Leo (leo)

- ASSIGN file [Nui Nui no Mi] (Perfect): stitched Robin (ch 711) + ships (ch 798) + Patchwork KO'd Giolla (ch 774); named/confirmed paramecia in Magazine.
- TYPE file [paramecia] (Perfect): stitch/unstitch objects/people.
- AWAKENED file [false] (Perfect): stitches only, no transmutation.
- VALUES file [120/110/110/110/120] (Perfect): atk-120 = Mr.3-120 utility cap w/ Giolla-KO + ship-scale justification; def-110 modest (zero bodily protection); sta-120 sustains Patchwork/ships.
- Peer: stitch atk-120 = Kanjuro-paint-120/Mr.3-120 cap (Giolla KO ≈ paint-sword cut), above Bon-Clay-trim (real damage > face-copy); dwarf-DF peer Kabu/Bian same utility band.

#### 148. Kamakiri (kamakiri)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Jet Board + Burn-Blade dial-weapon-side; felled by Enel (ch 264); Shandia dial-tech-none rule.
- Peer: none-zero beside Wyper/Raki/Gan Fall (dial-tech peers, same Shandia rule).

#### 149. Neptune (neptune)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): giant merman king, trident weapon-side, chained (ch 618); royalty ≠ DF.
- Peer: none-zero beside Cobra/Vivi/Fukaboshi royal peers (throne ≠ fruit).

#### 150. Mont-d'Or (charlotte-mont-dor)

- ASSIGN file [Buku Buku no Mi] (Perfect): book-world prison + illusion trapped Luffy/Nami (ch 846–847); Prisoner Library; Den-Mushi network (ch 899).
- TYPE file [paramecia] (Perfect): book manipulation/storage, paramecia canon.
- AWAKENED file [false] (Perfect): worlds bounded by books/imagination per Jinbe; no awakening shown.
- VALUES file [120/110/110/110/120] (Perfect): book-prison captured Luffy+Nami (ch 846, atk-120 utility-cap w/ capture premium, illusion+gang-up not solo damage); def-110 (zero duel durability); zero duels, below combat BMPs.
- Peer: book atk-120 = Daifuku-genie-120 parity (capture/command utility); below Cracker/Perospero-trim/Oven-trim (duel damage); above Smoothie-lowest (zero-feats) — Sweet ladder LOCKS.

### Batch 16 — Hina → Wapol

#### 151. Hina (hina)

- ASSIGN file [Ori Ori no Mi] (Perfect): bind-foes-in-iron Paramecia; debut ch 217.
- TYPE file [paramecia] (Perfect): iron-shackle generation from body.
- AWAKENED file [false] (Perfect): no awakening shown/stated; only Awase Baori cage (ch 558).
- VALUES file [120/110/110/110/120] (Perfect): cage-restraint utility (Bon Clay capture ch 217; Black Cage Corps) — but Luffy slipped it (ch 558), so restraint-hax priced below raw-combat DFs.
- Peer: below Smoker-Moku-130/120s — cage-bind utility vs smoke-utility; Rear Admiral vs VA ladder OK.

#### 152. Tsuru (tsuru)

- ASSIGN file [Woshu Woshu no Mi] (Perfect): wash-hang-dry Laundry Human; debut ch 556.
- TYPE file [paramecia] (Perfect): canon Paramecia per SBS vol 58 p116.
- AWAKENED file [false] (Perfect): no awakening shown/stated; only MF laundry-disable (ch 556).
- VALUES file [100/110/110/110/120] (Perfect): wash-hax disables + hang-dry helplessness (WB pirates ch 556; Doffy-avoidance) but zero damage feats, old VA — atk-floor 100 correct.
- Peer: below Smoker-Moku-130/120s — wash-hax/evil-scrub utility vs smoke combat-utility; Great Staff Officer brains-priced, not fists.

#### 153. Tashigi (tashigi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no DF ever shown/stated; Shigure weapon-side only. Monet WIN (ch 687) haki-side (Haki coating Shigure); swordsmanship ≠ DF.
- Peer: matches Koby-none/Zoro/Sanji-none — weapon/haki ≠ DF, zeros enforced.

#### 154. Helmeppo (helmeppo)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no DF ever shown/stated; kukri + Garp/Bogard training only. Hachinosu spectator; Koby's partner — training ≠ DF.
- Peer: matches Koby-none — SWORD-side pair both DF-zero, haki/weapon-side only.

#### 155. Chopper (tony-tony-chopper)

- ASSIGN file [Hito Hito no Mi] (Perfect): canon zoan; Rumble-Ball forms derive from it.
- TYPE file [zoan] (Perfect): canon Zoan (Walk/Brain/Heavy base trio).
- AWAKENED file [false] (Perfect): Monster Point is Rumble-Ball DRUG effect, NOT awakening; no awakening stated.
- VALUES file [150/150/130/120/150] (Trim → atk/def/sta ~130): prices 30-min Monster-Point burst (Queen-stall ch 1005–1007; Kumadori-win ch 407–408 berserk) as SUSTAINED output — ignoring crash-penalty (paralysis/Baby-geezer) + Rumble 3-min/6-hr limits.
- Peer: above Robin-120/130/140/130/120 + Brook-trim-130 despite stall-not-win + crash — burst-nuke must sit ≤ utility-zoan band, well below Luffy-Nika-350s.

#### 156. Nami (nami)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no DF ever shown/stated; Clima-Tact weapon-side only. Zeus is Big Mom's homie ON LOAN, not Nami's DF — homie-loan ≠ DF, stated explicitly. Doublefinger/Kalifa wins weapon-tactics.
- Peer: matches SH none-DF pair Usopp — weapon/weather-sense ≠ DF, zeros enforced.

#### 157. Usopp (usopp)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): no DF ever shown/stated; Kabuto/Pop Greens/Impact Dial weapon-side only. Perona-win (ch 465–466) was Negative-Hollow IMMUNITY + Sugar-snipe (ch 758) CoO-side — immunity/technique ≠ DF, stated explicitly.
- Peer: matches SH none-DF pair Nami + Koby-none — weapon/CoO ≠ DF, zeros enforced.

#### 158. Pudding (charlotte-pudding)

- ASSIGN file [Memo Memo no Mi] (Perfect): memory-film Paramecia; debut ch 851.
- TYPE file [paramecia] (Perfect): canon Paramecia per ch 851 reveal.
- AWAKENED file [false] (Perfect): no awakening shown/stated; only Edit/film-strip (ch 851).
- VALUES file [100/110/110/110/120] (Perfect): Reiju memory-ectomy + false-stray-bullet splice (ch 851) pure plot-utility, zero combat — utility-only band correct.
- Peer: below Daifuku-genie-120/Mont-d'Or-book-120 — memory-edit plot-hax vs genie/book combat-utility; Bon-Clay-trim-adjacent OK.

#### 159. Brûlée (charlotte-brulee)

- ASSIGN file [Mira Mira no Mi] (Perfect): Mirror Human Paramecia; debut ch 831.
- TYPE file [paramecia] (Perfect): canon Paramecia.
- AWAKENED file [false] (Perfect): no awakening shown/stated; Mirro-World base power.
- VALUES file [100/110/110/110/120] (Perfect): mirror-dimension UTILITY (army-transport + scrying + replica ch 835–849) vs soup-pot loss to Chopper/Carrot (ch 849) — dimension-utility priced, duel-output floored.
- Peer: below/at Mont-d'Or-book-120; pairs Pudding — mirror-network intel vs book-prison control, both zero-duel sisters OK.

#### 160. Wapol (wapol)

- ASSIGN file [Baku Baku no Mi] (Perfect): eat/merge Paramecia; usage debut ch 131.
- TYPE file [paramecia] (Perfect): canon Paramecia.
- AWAKENED file [false] (Perfect): no awakening shown/stated; Baku Factory/Shock base.
- VALUES file [120/121/105/105/115] (Perfect): eat-arsenal (cannon-house vs Luffy ch 145–148; Chessmarimo fusion) priced; Wapometal ch-249-cover ACCIDENTAL byproduct correctly NOT counted as DF-output; Drum loss (ch 153) caps ceiling.
- Peer: at Mr.3-wax-120 vs Bon-Clay-trim — eat/assimilate-utility ≈ wax-utility; coward-king discount OK.

### Batch 17 — Zala → Gancho

#### 161. Zala (zala)

- ASSIGN file [Toge Toge no Mi] (Perfect): Miss Doublefinger's spike-spike canon; Spiders Cafe/Baroque officer; Vivre verified.
- TYPE file [paramecia] (Perfect): body-spike generation; no element/transform.
- AWAKENED file [false] (Perfect): no awakening hinted; lost pre-TS, zero post-TS showings.
- VALUES file [120/110/110/110/120] (Trim → atk 110 + awa 100): lost to pre-Clima-Tact Nami (ch 192–197) — must sit below Mr.3-wax-120 who bound Zoro/giants; spikes grant zero senses.
- Peer: Baroque ladder Crocodile-Suna-250 > Mr.3-wax-120 > Zala-thorns-110 > Goldenweek/Bon-Clay-trim (Nami-duel loss caps her bottom of Officer DFs).

#### 162. Koza (koza)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): rebel leader, swords/pistol fighter, zero DF ever hinted (Alubarna revolt ch 170–210).
- Peer: Alabasta none-DF parity Koza/Vivi/Cobra/Chaka-human-form? (Chaka HAS Inu-Jackal — Koza stays true-zero alongside Vivi/Cobra).

#### 163. Buggy (buggy-the-star-clown)

- ASSIGN file [Bara Bara no Mi] (Perfect): chop-chop split canon since Orange Town (ch 9–18); Cross Guild Yonko gag doesn't change fruit.
- TYPE file [paramecia] (Perfect): body-splitting; no element/zoan transform.
- AWAKENED file [false] (Perfect): zero awakening hints across 1000+ chs; ID/MF survival all base-split gags.
- VALUES file [120/110/110/110/120] (Trim → atk 100 + awa 100): zero DF offense — Bara Festival chips no one, Muggy Balls WEAPON-side (ch 560); def-140... file def 110? verdict keeps def (Mihawk-slash immunity gag ch 560 + ID/MF gag-survival) — hold def, trim atk/awa only.
- Peer: Cross Guild ladder Crocodile-Suna-250 >> Buggy-immunity-utility > Mihawk-none (slash-immunity niche vs swordsmen only, zero output vs everyone else).

#### 164. Pell (pell)

- ASSIGN file [Tori Tori no Mi, Model: Falcon] (Perfect): falcon zoan canon; guard captain; bomb-carry DF-form feat (ch 207–208).
- TYPE file [zoan] (Perfect): full falcon/hybrid transform (standard bird model, not ancient).
- AWAKENED file [false] (Perfect): no awakening hints; bomb "survival" offscreen miracle, not awakened durability.
- VALUES file [140/140/130/110/150] (Trim → atk 120 + def 130): zero duel wins — folded by Robin Clutch (ch 169); bomb-carry = flight/stamina feat, not attack; bomb-survival gag ≠ DF durability. Keep spd 130 + sta 150 (falcon-flight + bomb-lift showings).
- Peer: Alabasta guard ladder Pell-falcon-flight-utility ≈ Chaka-jackal > Koza-none/Vivi-none (only DF guards, both utility-first, neither wins a duel on-panel).

#### 165. Bepo (bepo)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): polar-bear mink, Heart navigator; Electro/Sulong racial-side; Winner Island Sulong-drug escape (ch 1081) mink trait.
- Peer: Mink none-DF parity Bepo = Inu/Neko/Pedro/Carrot (Electro + Sulong scored body/weapon-side, never DF).

#### 166. Shinobu (shinobu)

- ASSIGN file [Juku Juku no Mi] (Perfect): ripe-ripen rotting canon; Oden-castle-era kunoichi; weapons/ground-rot showings Wano.
- TYPE file [paramecia] (Perfect): aging/rotting touch on targets; no element/transform.
- AWAKENED file [false] (Perfect): drained helpless by Aramaki forest-drain (ch 1055), zero awakening resistance/hints.
- VALUES file [100/110/110/110/120] (Perfect): atk 100 = Tsuru-wash-100 non-combat band; rot-utility over duels; Aramaki-drain anti-feat caps everything, no inflation to trim.
- Peer: Wano ladder Oden/Scabbard-combat >> Shinobu-rot-utility (support rot, Hanzo-level skirmish only, never a duel win that matters).

#### 167. Hogback (doctor-hogback)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): NO DF — Moria's surgeon; zombie-surgery = medical INT-side; Thriller Bark zero combat. (Triple-none-equivalent: no DF/weapon/haki. Medicine ≠ DF — Corazon-parallel non-combatant except Corazon HAS Nagi, Hogback has nothing.)
- Peer: Doctor ladder Law-400+ > Caesar-gas > Chopper-trim-130 > Hogback-zero (INT 85 scored base-side; DF column stays true-zero).

#### 168. Caribou (caribou)

- ASSIGN file [Numa Numa no Mi] (Perfect): swamp-swamp canon; mermaid abductions (ch 612–650); Udon prisoner arc confirms fruit retained.
- TYPE file [logia] (Perfect): swamp-body transformation/storage, databook logia classification.
- AWAKENED file [false] (Perfect): folded instantly by Luffy (ch 650) with zero resistance; Wano prisoner helpless; zero hints.
- VALUES file [110/120/120/130/120] (Perfect): atk 110 restrained for a logia — zero duels, coward discount applied; awa 130 swamp-spying eavesdrop feat (Poseidon secret) + bottomless storage senses; capture-utility band, not combat band.
- Peer: Coward-capture ladder Caribou-swamp-storage ≈ Mr.3-wax-restraint-120 > Perona? no — Perona-hax-125 beats him (Caribou folds to any haki/competent fighter; utility-only logia, weakest logia showing on-panel).

#### 169. Kabu (kabu)

- ASSIGN file [Mushi Mushi no Mi, Model: Kabutomushi] (Perfect): rhinoceros-beetle zoan canon; Yellow Squad leader; SOP airlift (ch 742–743).
- TYPE file [zoan] (Perfect): beetle-flight transform, standard insect model.
- AWAKENED file [false] (Perfect): zero awakening hints; airlift taxi, no combat transformation escalation.
- VALUES file [140/140/130/110/150] (Trim → atk 120): SOP airlift = speed/stamina feat, zero duels — atk 140 claims Leo-Nui-120+ combat tier without a single fight. Keep spd 130 + sta 150 (aviation showings); def 140 kept (beetle carapace).
- Peer: Dwarf ladder Leo-Nui-120-combat ≥ Kabu-aviation-utility > Bian/Wicca-support > Gancho-none (Kabu flies the squad, Leo wins the fights).

#### 170. Gancho (gancho)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): NO DF — 900-year-history dwarf chief (ch 717), zero combat, lore-keeper only.
- Peer: Dwarf parity Gancho-none = Mansherry? no (Mansherry HAS Chiyu) — Gancho true-zero alongside Wicca?/Bian? non-DF dwarfs, below Leo-120/Kabu-beetle.

### Batch 18 — Wicca → Manboshi

#### 171. Wicca (wicca)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Tontatta scout, no fruit listed (DF Unknown/None per wiki); strength baseStat-side dwarf power.
- Peer: Dwarf ladder Wicca-none-support < Bian-hornet/Kabu-beetle-aviation < Leo-Nui-120-combat; mirrors Gancho-none.

#### 172. Bian (bian)

- ASSIGN file [Mushi Mushi no Mi, Model: Suzumebachi] (Perfect): eaten by Bian, Pink Bee Squad leader (manga ch 718).
- TYPE file [ancient_zoan] (Re-type → zoan): canon REGULAR Zoan-type — hornets extant, not extinct (Mushi Mushi/Suzumebachi page + Bian page).
- AWAKENED file [false] (Perfect): no awakening shown; Dressrosa support only.
- VALUES file [130/165/150/110/140] (Trim → atk 120): atk 130 high vs Sugar-incap + scout/message/sting-support showings (ch 718+); def/spd/sta kept as zoan-flight physicals.
- Peer: Dwarf aviation pair Bian-hornet ≈ Kabu-beetle (atk-trim-120, spd/sta kept) < Leo-Nui-120-combat; above Wicca/Gancho-none.

#### 173. Goldenweek (miss-goldenweek)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Colors Trap paint-based hypnosis skill, not a fruit (ch 116–117, cover story ch 395–397). Paint technique ≠ DF — stated explicitly; hypnosis weapon/skill-side.
- Peer: Baroque none (Goldenweek-paint) < Zala-thorns-110 < Mr.3-wax-120 utility cap. (Paint ≠ DF like Kanjuro-paint-120 IS DF but hers is not.)

#### 174. Cobra (nefertari-cobra)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): old sick king, no fruit; died (ch 1085–1086). Poneglyph/Pluton knowledge INT-side, not DF.
- Peer: Royals none-DF cluster Cobra = Vivi = Neptune-none = Fukaboshi-none = Koza-none; knowledge ≠ DF.

#### 175. Vivi (nefertari-vivi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Peacock Slashers fighter/diplomat, no fruit; Baroque spy arc.
- Peer: Royals none-DF Vivi = Cobra-none = Koza-none; diplomacy/weapon ≠ DF.

#### 176. Shirahoshi (shirahoshi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Devil Fruit N/A per wiki infobox; power is Poseidon Ancient Weapon, Sea King command (ch 621–648). Ancient Weapon ≠ DF — stated explicitly; Sea King control awakening Poseidon-side, not DF awakening.
- Peer: One-of-one Ancient Weapon rule — Shirahoshi-Poseidon ≠ any DF ladder; mermaid none-DF cluster with Camie/Hatchan.

#### 177. Vegapunk (vegapunk)

- ASSIGN file [Nomi Nomi no Mi] (Perfect): eaten by Vegapunk (ch 1067); infinite brain storage + Punk Records hivemind.
- TYPE file [paramecia] (Perfect): canon Paramecia-type.
- AWAKENED file [false] (Perfect): no awakening shown; satellites = tech/cloning + Punk Records sync, not awakening.
- VALUES file [120/130/110/250/120] (Trim → combat four atk/def/spd/sta ≤50, KEEP awa-250): awa-250 Punk Records database-utility justified; atk/def/spd/sta 110–130 FAIL vs "virtually no direct offensive uses" + frail zero-combat Stella.
- Peer: Scientists knowledge-utility (Vegapunk-Nomi awa-250/combat-low) vs Caesar-gas-combat vs Hogback-none; satellites/tech INT-side, not DF combat.

#### 178. Camie (camie)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): mermaid, no fruit; Sabaody kidnap victim, Hatchan's friend. (Mermaid traits ≠ fruit — fishman/mermaid biology ≠ DF.)
- Peer: Mermaids none-DF Camie = Shirahoshi = Hatchan-side; starfish-talk skill-side.

#### 179. Ryuboshi (ryuboshi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): FI prince, Twin Rapiers fighter, no fruit; ch 625–644 minimal combat. (Rapiers filed weapon-side.)
- Peer: Princes none-DF mirror Ryuboshi = Manboshi = Fukaboshi-none = Neptune-none; royalty/weapon ≠ DF.

#### 180. Manboshi (manboshi)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): FI prince, longsword fighter, no fruit; Fukaboshi's brother, ch 625–644. (Longsword filed weapon-side.)
- Peer: Twin mirror Manboshi = Ryuboshi exact (DF zeros + identical weapon band) vs Fukaboshi-none/Neptune-none royalty cluster.

### Batch 19 — Mansherry → Raki (final four)

#### 181. Mansherry (mansherry)

- ASSIGN file [Chiyu Chiyu no Mi] (Perfect): tears/palm-water restore wounded to perfect health; coerced Giolla revival use; debut ch 774 (ch 755 hostage setup).
- TYPE file [paramecia] (Perfect): grants healing via body liquid; not body-transform/element/summon.
- AWAKENED file [false] (Perfect): no awakening shown/stated Dressrosa (base tears/Chiyupopo ch 787–789/Kenpopo ch 796–798 only).
- VALUES file [80/130/110/130/130] (Trim → atk 0): atk-80 contradicts "few fruits with zero combative capability" + cannot-regrow-limbs cap (ch 784) + lifespan-cost on objects (ch 775). KEEP def/awr/sta-130 + spd-110 = army-scale heal-utility (Chiyupopo Birdcage run ch 787–789, Kenpopo donor system ch 796–798).
- Peer: dwarf ladder Leo-Nui-120 combat ≥ Kabu-aviation > Bian-hornet-support > Mansherry-heal-utility (zero combat, top support) > Wicca/Gancho-none. Healer band: Law-400+ > Chopper-130 ≈ Mansherry-130 > Ivankov-hormones-120 > Hogback-none.

#### 182. Conis (conis)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Skypiea civilian, Pagaya daughter, harp/waver/Suu, dial-user never DF-eater (ch 240–278); civilian zero-combat (warned/evacuated Angel Island, tended wounded, no fight).
- Peer: Skypiea civilian/warrior none-DF block Conis = Pagaya/Gan Fall/Wyper/Kamakiri/Raki zeros vs Enel-logia sole exception.

#### 183. Aisa (aisa)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): age-9 Shandia child; born-Mantra = Observation Haki NOT fruit (ch 265 "born with it", ch 264 death-sensing; file haki-side obs-basic HOLDS); Burn Blade carried-never-used weapon-side; waver-broke (ch 265), no DF feat.
- Peer: Mantra≠DF split — Aisa DF-zero + obs-basic vs Enel-logia + island-range Mantra; children Aisa/Mansherry-support vs Sugar-hax/Bonney-610-utility/Momonosuke-artificial.

#### 184. Raki (raki)

- ASSIGN / TYPE / AWAKENED / VALUES [none/zeros/false] (all Perfect): Shandia warrior; skate-waver/spear/dial-weapon fighter; Upper Yard assault (ch 251–253) + Kamakiri-rescue (ch 253) + Enel-attack (ch 270); never DF-eater. (File rifle 115/95/100/115/95 = dial-tech, not fruit.)
- Peer: Shandia dial-tech-none block Raki = Wyper/Kamakiri/Gan Fall zeros vs Enel-logia sole exception.

---

## Review complete — all 184 characters

### Headline changes (apply step will move these)

- Loki Re-assign → Ryu Ryu no Mi Model Nidhogg (ch 1175 CONFIRMED) + raise over Kaido-Seiryu baseline; Kaido-Seiryu raise logged (atk ~300–350/def ~300/spd ~200) with Loki trimmed to parity-or-below — both adjustments apply.
- Law-awakened → 400+ atk band (file 200) · Kid-awakened → 400–450 (file 150) — rooftop parity restored.
- Katakuri-awakened → ~300 (file 180) — Sweet Commander ceiling; Doffy-awakened → ~220–250 (file 140).
- Enel → near-550 band (file 200s) · Green Bull → 550 band (file 400s) · Sabo → Soru-300 band (file 250) · Ace → 300 band (file 250, Mera parity).
- Nusjuro + Saturn/Warcury/JuPeter/Mars awakened → false (regen = Abyss-contract); Mars Itsumade STRIPPED to blank; Gorosei values frozen pending classification.
- Killingham-Kirin + Sommers-Iba names CONFIRMED (ch 1143); awakened flips (Kirin→false); values speculative-hold.
- Shiki → 250+ utility (file 180) · Lucci STA → 200+ (file 150, awakening-recovery) · Kaku-awakened-TRUE (correction) modest band.
- WB DEF/SPD adjust (~100–150) · Smoothie atk → 80–100 · Perospero/Oven atk trims (Cracker-parity) · Page One atk → 160 (uniformity) · Brook def → 130 (revival≠durability) · Chopper → ~130s (crash-penalty) · Momonosuke atk/def trim (hold sta-145 clouds) · Bon Clay full-block trim (utility-only) · Corazon full-block trim · Caesar def → Monet parity · Daz atk/def trim · Kin'emon atk → 100 · Laffitte UNNAMED-DF (file none WRONG — needs placeholder + mobility values) · Devon trim ~145 · Moria def → 130 · Sugar/Monet/Senor Pink/Zala/Kabu/Buggy/Pell/Kamakiri/Gancho/Bian/Vegapunk/Mansherry/WB trims logged.
- Kin'emon-Fuku correction: Scabbard DF-count is THREE (Kin'emon/Raizo/Kanjuro), not one.
- Karasu-soot = logia (dispute logged: official site says paramecia, intangibility + consensus settle logia).
- Bian Re-type ancient → zoan (hornets extant).
- Vasco english-fill "Glug-Glug Fruit" (blank in file).

### Decisions needed before apply step (user calls)

1. Loki-vs-Kaido resolution: raise Kaido (atk ~300–350/def ~300/spd ~200) AND trim Loki to parity-or-below — confirm both halves.
2. Laffitte unnamed-DF: add placeholder (unnamed wings-DF, mobility ~110–120 spd/awa) or hold at none until named?
3. Gunko TRIM-HEAVY (350→~230/200): apply provisional cut or hold filed values pending Elbaf (low-confidence like Killingham/Sommers values)?
4. Enel near-550: full raise (epic-rarity god-output) or partial (split vs admiral-550s on pre-TS body?).

---

## Apply log

APPLIED to `src/data/characters-v2.ts` (devilFruit fields only — type/names/awakened/values; baseStats/haki/weapon/rarity untouched).

- 93 fields changed, zero failures, old values matched review on every line.
- Open-call resolutions: Loki-vs-Kaido BOTH halves (Kaido atk 325/def 300/spd 200 AND Loki trimmed to atk 300/def 300 parity-or-below, spd 225/awr 205/sta 285) · Laffitte placeholder (type zoan, blank names kept, atk/def/sta 0, spd/awa 115 — best-guess wing-zoan, logged) · Gunko provisional cut (atk 230/def 200, spd/awa/sta held for Elbaf revisit) · Enel FULL raise [500/450/500/400/350] (epic god-output carries, pre-TS body stays base-side).
- Judgment calls (worker-silent fields, logged): Shiki atk 275/def 250 (Fujitora-250+ band) · Sabo atk 300/def 250 (Soru band + intangibility; Ace stays [300/150s] — same-fruit asymmetry noted: Sabo's Fujitora-stall justifies def edge) · Doffy atk 235/def 200/sta 225 · Kid atk 425/def 275 · Lucci def 175/sta 225 · Katakuri atk 300/sta 200 · Sugar def 108 · Monet def 155 · Senor Pink atk 135 · Caesar def 155 · Daz atk 145/def 155 · Momo atk 90/def 105 · Bon Clay atk 70/def 90 · Corazon [70/90/90/95/90] exact · Chopper 130s · Zala atk 110/awa 100 · Buggy atk 100/awa 100 · Pell atk 120/def 130 · Kabu atk 120 · Vegapunk combat-four 40s (awa-250 kept) · Mansherry atk 0 · Devon atk/def 145/sta 150 · Moria def 130 · Kin'emon atk 100.
- Post-apply: `tsc` clean, `eslint` clean, `prettier` clean, rankings regen'd, 300-draft sanity clean, `astro build` clean.
- Ranking effect: 8 gods still top 10 (Kaido/GB intrude). Up: Kaido 5th (Seiryu raise + conq-supreme), Green Bull 8th (550 band). Down: Luffy 9th (no DF change — haki-obs cut from prior apply still settling), Roger 7th. Dragon holds 6th (speculative-keeps).

- Peer: Dial-tech Wyper-none vs Kamakiri/Raki/Gan Fall — dials stay weapon-side for all Skypiea fighters, zeros uniform.
