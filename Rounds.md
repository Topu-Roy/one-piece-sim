- Note:
  - the calculations of stats will happen after the draft rounds are finished. Not during the draft. So after each pick you will store the picks in a shared state. For images, use a placeholder image for now.

## Round 1 - Race

You will create an array that will hold at most 3 charecter per race in it. When the round starts you will first randomly select 4 unique races, and to desplay one random charecter as the option out of the 3. No need for additional info just show the race name.

## Haki Rounds - (2/3/4)

For this the options can be charecters who can use haki or can't both will be presented. Names shown.

## Round 5 - Devil fruit

For this round you will only show DF users. Charecters with no DF are ommited. Charecter names shown.

## Round 6 - Weapon

For this round you will show Weapon users and also non weapon user but at least 3 of them must be weappon user. Charecter names shown.

## Round 7 - Inteligence

For this round you will show All charecter. Names shown.

- Buffs at end:
  - Awareness
  - BattleIQ

## Round 8 - BattleIQ

For this round you will show All charecter. Names shown.

## Round 9 - Apperiance

This is just cosmetic, no effect on the stats just how the charecter looks. User can refresh and get new ones as many times as they have to.

## The claculation flow

You will show the stats and final calculation at the end in a result screen.

Setp 1:

This are the stats of each race, set base stats from this table according to users selection:

| Race     | Strength | Durability | Speed | Awareness | Stamina |
| -------- | -------: | ---------: | ----: | --------: | ------: |
| Human    |      100 |        100 |   100 |       100 |     100 |
| Fish-man |     1000 |        450 |   125 |       120 |     300 |
| Giant    |    10000 |       4000 |   140 |       100 |    1000 |
| Mink     |      400 |        270 |   300 |       180 |     350 |
| Skypiean |      110 |        110 |   140 |       130 |     120 |
| Shandia  |      180 |        120 |   190 |       150 |     150 |
| Lunarian |     6500 |      10000 |   400 |       200 |     800 |
| Longarm  |      145 |        120 |   135 |       115 |     120 |
| Longleg  |      250 |        140 |   210 |       125 |     180 |
| Merfolk  |      300 |        250 |  1000 |       140 |     250 |
| Dwarf    |     1500 |        400 |   600 |       160 |     300 |
| Oni      |    11000 |       9000 |   250 |       150 |     900 |

step 2: (Note: all the stats multipliers applied will be stacked on top of it)

Apply the multiplier of each haki round to the base stats:

- Armament
  - Attack (100% multiplier)
  - Durability (100% multiplier)

- Observation
  - Awareness (100% multiplier)
  - Speed (30% multiplier)

- Conqueror's
  - Attack (100% multiplier)
  - Durability (30% multiplier)

Step 3:

Apply the DF multipliers on the stats. After applied if Awakened It applis another layer to the target fields.

Step 4:

Apply the Weapon multipliers on the stats.

Setp 5:

According to the IQ increase Awareness and BattleIQ by certain amount, based on IQ points.

Finally present the created charecter with all the stats.
