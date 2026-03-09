# Rank #8: lore-lightfoot-halfling__cha-+2-asi+cha-+2-asi__+1-rapier+hat-of-disgu

## Build Summary

| Field | Value |
|-------|-------|
| Species | Lightfoot Halfling (Halfling) |
| Feats | CHA +2 ASI, CHA +2 ASI |
| Magic Items | Hat of Disguise, +1 Rapier |
| AC | 15 |
| HP | 52 |
| CHA modifier | +5 |
| Spell Save DC | 16 |

### Ability Scores

STR 8 | DEX 16 | CON 14 | INT 10 | WIS 12 | CHA 20

---

## Combat Encounter Logs

> Each combat scenario is run once (single simulation). Rolls are random — compare
> patterns across multiple runs for statistical validation.

### Combat: Bandit Ambush (EASY)

**Enemy Roster:**
- Bandit 1: HP 11, AC 12, Attack +3, Damage 1d6+1
- Bandit 2: HP 11, AC 12, Attack +3, Damage 1d6+1

**Outcome: VICTORY**  
Rounds: 2 | Damage taken: 0 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Bandit 1 (11/11 HP), Bandit 2 (11/11 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 2 of 2 active enemies. Spell attack bonus: +8.
- **[Bandit 1] WIS Saving Throw vs Control Spell:** Bandit 1 WIS save: roll 17+0=17 vs DC 16 — PASS (resists, remains active).
- **[Bandit 2] WIS Saving Throw vs Control Spell:** Bandit 2 WIS save: roll 9+0=9 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 1/2 enemies. Bard is now concentrating. Remaining free enemies: 1.
- **[Bandit 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Bandit 1 attacks: roll 8+3 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 2.
- **[Bandit 2] End-of-Round: WIS Save to Break Free from Control:** Bandit 2 (controlled) WIS save to break free: roll 15+0=15 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 1:** Bard HP: 52/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 1 | Enemies controlled: 1

> *End of Round 1: Bard HP 52/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Bandit 1 (11/11 HP)*
> *Controlled: Bandit 2 (11/11 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Bandit 1: roll 14+7=21 vs AC 12 — HIT. Deals 11 damage. Bandit 1 HP: 0/11.
- **[Bandit 1] Defeated:** Bandit 1 drops to 0 HP and is defeated.
- **[Bard] Round End:** All enemies defeated or controlled. VICTORY.

> *End of Round 2: Bard HP 52/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2*
> *Controlled: Bandit 2 (11/11 HP)*
> *Defeated: Bandit 1*

---

### Combat: Gnoll War Band (MEDIUM)

**Enemy Roster:**
- Gnoll 1: HP 22, AC 15, Attack +4, Damage 2d6+2
- Gnoll 2: HP 22, AC 15, Attack +4, Damage 2d6+2
- Gnoll 3: HP 22, AC 15, Attack +4, Damage 2d6+2

**Outcome: DEFEAT**  
Rounds: 8 | Damage taken: 61 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — enemies won. Enemies act before the bard in round 1 (bard has no Mirror Image or control spell up yet).
- **[Gnoll 1] Pre-Round Surprise Attack:** Gnoll 1 attacks Bard (pre-round, no Mirror Image): roll 16+4=20 vs AC 15 — HIT. Deals 12 damage. Bard HP: 40/52.
- **[Gnoll 2] Pre-Round Surprise Attack:** Gnoll 2 attacks Bard (pre-round, no Mirror Image): roll 18+4=22 vs AC 15 — HIT. Deals 7 damage. Bard HP: 33/52.
- **[Gnoll 3] Pre-Round Surprise Attack:** Gnoll 3 attacks Bard (pre-round, no Mirror Image): roll 12+4=16 vs AC 15 — HIT. Deals 6 damage. Bard HP: 27/52.

> *End of pre-combat: Bard HP 27/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 3 of 3 active enemies. Spell attack bonus: +8.
- **[Gnoll 1] WIS Saving Throw vs Control Spell:** Gnoll 1 WIS save: roll 18+0=18 vs DC 16 — PASS (resists, remains active).
- **[Gnoll 2] WIS Saving Throw vs Control Spell:** Gnoll 2 WIS save: roll 6+0=6 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Gnoll 3] WIS Saving Throw vs Control Spell:** Gnoll 3 WIS save: roll 18+0=18 vs DC 16 — PASS (resists, remains active).
- **[Bard] Concentration Started:** Hold Person incapacitated 1/3 enemies. Bard is now concentrating. Remaining free enemies: 2.
- **[Gnoll 1] Melee/Ranged Attack (AI: Attack):** Gnoll 1 attacks Bard: roll 15+4=19 vs AC 15 — HIT. Deals 6 damage. Bard HP: 21/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 6 damage (DC 10 = max(10, ⌊6/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 15 vs DC 10 — SUCCESS (concentration maintained)
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 14+4=18 vs AC 15 — HIT. Deals 7 damage. Bard HP: 14/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 7 damage (DC 10 = max(10, ⌊7/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 21 vs DC 10 — SUCCESS (concentration maintained)
- **[Gnoll 2] End-of-Round: WIS Save to Break Free from Control:** Gnoll 2 (controlled) WIS save to break free: roll 13+0=13 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 1:** Bard HP: 14/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 2 | Enemies controlled: 1

> *End of Round 1: Bard HP 14/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 3 (22/22 HP)*
> *Controlled: Gnoll 2 (22/22 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 10+7=17 vs AC 15 — HIT. Deals 7 damage. Gnoll 1 HP: 15/22.
- **[Gnoll 1] Melee/Ranged Attack (AI: Attack):** Gnoll 1 attacks Bard: roll 6+4=10 vs AC 15 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 15+4=19 vs AC 15 — HIT. Deals 9 damage. Bard HP: 5/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 9 damage (DC 10 = max(10, ⌊9/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 22 vs DC 10 — SUCCESS (concentration maintained)
- **[Gnoll 2] End-of-Round: WIS Save to Break Free from Control:** Gnoll 2 (controlled) WIS save to break free: roll 5+0=5 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 2:** Bard HP: 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 2 | Enemies controlled: 1

> *End of Round 2: Bard HP 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (15/22 HP), Gnoll 3 (22/22 HP)*
> *Controlled: Gnoll 2 (22/22 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 13+7=20 vs AC 15 — HIT. Deals 12 damage. Gnoll 1 HP: 3/22.
- **[Gnoll 1] Melee/Ranged Attack (AI: Attack):** Gnoll 1 attacks Bard: roll 4+4=8 vs AC 15 — MISS.
- **[Gnoll 3] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 3 attacks: roll 16+4 — deflected by Mirror Image (mirror check roll: 1 ≤ 6). Mirror Image charges remaining: 2.
- **[Gnoll 2] End-of-Round: WIS Save to Break Free from Control:** Gnoll 2 (controlled) WIS save to break free: roll 14+0=14 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 3:** Bard HP: 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 2 | Enemies controlled: 1

> *End of Round 3: Bard HP 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Gnoll 1 (3/22 HP), Gnoll 3 (22/22 HP)*
> *Controlled: Gnoll 2 (22/22 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 12+7=19 vs AC 15 — HIT. Deals 11 damage. Gnoll 1 HP: 0/22.
- **[Gnoll 1] Defeated:** Gnoll 1 drops to 0 HP and is defeated.
- **[Gnoll 3] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 3 attacks: roll 5+4 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 1.
- **[Gnoll 2] End-of-Round: WIS Save to Break Free from Control:** Gnoll 2 (controlled) WIS save to break free: roll 7+0=7 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 4:** Bard HP: 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 1 | Enemies active/free: 1 | Enemies controlled: 1

> *End of Round 4: Bard HP 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 1*
> *Active enemies: Gnoll 3 (22/22 HP)*
> *Controlled: Gnoll 2 (22/22 HP)*
> *Defeated: Gnoll 1*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 3: roll 18+7=25 vs AC 15 — HIT. Deals 9 damage. Gnoll 3 HP: 13/22.
- **[Gnoll 3] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 3 attacks: roll 11+4 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 0.
- **[Gnoll 2] End-of-Round: WIS Save to Break Free from Control:** Gnoll 2 (controlled) WIS save to break free: roll 12+0=12 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 5:** Bard HP: 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 1 | Enemies controlled: 1

> *End of Round 5: Bard HP 5/52 | Concentrating: true | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 3 (13/22 HP)*
> *Controlled: Gnoll 2 (22/22 HP)*
> *Defeated: Gnoll 1*

#### Round 6

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 3: roll 5+7=12 vs AC 15 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 15+4=19 vs AC 15 — HIT. Deals 4 damage. Bard HP: 1/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 4 damage (DC 10 = max(10, ⌊4/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 12 vs DC 10 — SUCCESS (concentration maintained)
- **[Gnoll 2] End-of-Round: WIS Save to Break Free from Control:** Gnoll 2 (controlled) WIS save to break free: roll 19+0=19 vs DC 16 — PASS (breaks free at 22/22 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 6:** Bard HP: 1/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 6: Bard HP 1/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 2 (22/22 HP), Gnoll 3 (13/22 HP)*
> *Defeated: Gnoll 1*

#### Round 7

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 2: roll 10+7=17 vs AC 15 — HIT. Deals 7 damage. Gnoll 2 HP: 15/22.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 5+4=9 vs AC 15 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 4+4=8 vs AC 15 — MISS.
- **[Round Summary] End of Round 7:** Bard HP: 1/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 7: Bard HP 1/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 2 (15/22 HP), Gnoll 3 (13/22 HP)*
> *Defeated: Gnoll 1*

#### Round 8

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 2: roll 2+7=9 vs AC 15 — MISS.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 18+4=22 vs AC 15 — HIT. Deals 10 damage. Bard HP: -9/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 8: Bard HP -9/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 2 (15/22 HP), Gnoll 3 (13/22 HP)*
> *Defeated: Gnoll 1*

---

### Combat: Undead Horde (HARD)

**Enemy Roster:**
- Skeleton 1: HP 13, AC 13, Attack +4, Damage 1d6+2
- Skeleton 2: HP 13, AC 13, Attack +4, Damage 1d6+2
- Skeleton 3: HP 13, AC 13, Attack +4, Damage 1d6+2
- Skeleton 4: HP 13, AC 13, Attack +4, Damage 1d6+2
- Skeleton Archer 1: HP 13, AC 13, Attack +4, Damage 1d6+2
- Skeleton Archer 2: HP 13, AC 13, Attack +4, Damage 1d6+2

**Outcome: DEFEAT**  
Rounds: 4 | Damage taken: 53 | Concentration breaks: 1

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — enemies won. Enemies act before the bard in round 1 (bard has no Mirror Image or control spell up yet).
- **[Skeleton 1] Pre-Round Surprise Attack:** Skeleton 1 attacks Bard (pre-round, no Mirror Image): roll 17+4=21 vs AC 15 — HIT. Deals 8 damage. Bard HP: 44/52.
- **[Skeleton 2] Pre-Round Surprise Attack:** Skeleton 2 attacks Bard (pre-round, no Mirror Image): roll 17+4=21 vs AC 15 — HIT. Deals 7 damage. Bard HP: 37/52.
- **[Skeleton 3] Pre-Round Surprise Attack:** Skeleton 3 attacks Bard (pre-round): roll 8+4=12 vs AC 15 — MISS.
- **[Skeleton 4] Pre-Round Surprise Attack:** Skeleton 4 attacks Bard (pre-round): roll 8+4=12 vs AC 15 — MISS.
- **[Skeleton Archer 1] Pre-Round Surprise Attack:** Skeleton Archer 1 attacks Bard (pre-round): roll 7+4=11 vs AC 15 — MISS.
- **[Skeleton Archer 2] Pre-Round Surprise Attack:** Skeleton Archer 2 attacks Bard (pre-round): roll 7+4=11 vs AC 15 — MISS.

> *End of pre-combat: Bard HP 37/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Skeleton 1 (13/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 3 of 6 active enemies. Spell attack bonus: +8.
- **[Skeleton 1] WIS Saving Throw vs Control Spell:** Skeleton 1 WIS save: roll 18+0=18 vs DC 16 — PASS (resists, remains active).
- **[Skeleton 2] WIS Saving Throw vs Control Spell:** Skeleton 2 WIS save: roll 18+0=18 vs DC 16 — PASS (resists, remains active).
- **[Skeleton 3] WIS Saving Throw vs Control Spell:** Skeleton 3 WIS save: roll 6+0=6 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 1/3 enemies. Bard is now concentrating. Remaining free enemies: 5.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 9+4=13 vs AC 15 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 16+4=20 vs AC 15 — HIT. Deals 5 damage. Bard HP: 32/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 5 damage (DC 10 = max(10, ⌊5/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 15 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton 4] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 4 attacks: roll 19+4 — deflected by Mirror Image (mirror check roll: 1 ≤ 6). Mirror Image charges remaining: 2.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 4+4=8 vs AC 15 — MISS.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 8+4=12 vs AC 15 — MISS.
- **[Skeleton 3] End-of-Round: WIS Save to Break Free from Control:** Skeleton 3 (controlled) WIS save to break free: roll 1+0=1 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 1:** Bard HP: 32/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 5 | Enemies controlled: 1

> *End of Round 1: Bard HP 32/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Skeleton 1 (13/13 HP), Skeleton 2 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*
> *Controlled: Skeleton 3 (13/13 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 19+7=26 vs AC 13 — HIT. Deals 12 damage. Skeleton 1 HP: 1/13.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 4+4=8 vs AC 15 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 12+4=16 vs AC 15 — HIT. Deals 4 damage. Bard HP: 28/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 4 damage (DC 10 = max(10, ⌊4/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 16 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 2+4=6 vs AC 15 — MISS.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 6+4=10 vs AC 15 — MISS.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 16+4=20 vs AC 15 — HIT. Deals 3 damage. Bard HP: 25/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 3 damage (DC 10 = max(10, ⌊3/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 19 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton 3] End-of-Round: WIS Save to Break Free from Control:** Skeleton 3 (controlled) WIS save to break free: roll 7+0=7 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 2:** Bard HP: 25/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 5 | Enemies controlled: 1

> *End of Round 2: Bard HP 25/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Skeleton 1 (1/13 HP), Skeleton 2 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*
> *Controlled: Skeleton 3 (13/13 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 3+7=10 vs AC 13 — MISS.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 14+4=18 vs AC 15 — HIT. Deals 7 damage. Bard HP: 18/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 7 damage (DC 10 = max(10, ⌊7/2⌋)) [Halfling Lucky: natural 1s rerolled]: roll 5 vs DC 10 — FAIL (concentration broken)
- **[Bard] Concentration Broken:** Concentration lost. 1 controlled enemy/enemies shake free at half HP (Skeleton 3: 7/13 HP).
- **[Skeleton 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 2 attacks: roll 6+4 — deflected by Mirror Image (mirror check roll: 4 ≤ 6). Mirror Image charges remaining: 1.
- **[Skeleton 4] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 4 attacks: roll 4+4 — deflected by Mirror Image (mirror check roll: 4 ≤ 6). Mirror Image charges remaining: 0.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 20+4=24 vs AC 15 — HIT (CRITICAL). Deals 12 damage. Bard HP: 6/52.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 1+4=5 vs AC 15 — MISS.
- **[Round Summary] End of Round 3:** Bard HP: 6/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0 | Enemies active/free: 6 | Enemies controlled: 0

> *End of Round 3: Bard HP 6/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (1/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (7/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 7+7=14 vs AC 13 — HIT. Deals 7 damage. Skeleton 1 HP: 0/13.
- **[Skeleton 1] Defeated:** Skeleton 1 drops to 0 HP and is defeated.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 10+4=14 vs AC 15 — MISS.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 20+4=24 vs AC 15 — HIT (CRITICAL). Deals 7 damage. Bard HP: -1/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 4: Bard HP -1/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0*
> *Active enemies: Skeleton 2 (13/13 HP), Skeleton 3 (7/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*
> *Defeated: Skeleton 1*

---

### Combat: Warlock's Hold (HARD)

**Enemy Roster:**
- Warlock 1: HP 32, AC 13, Attack +5, Damage 1d10+3
- Cultist 1: HP 9, AC 12, Attack +3, Damage 1d6+1
- Cultist 2: HP 9, AC 12, Attack +3, Damage 1d6+1

**Outcome: DEFEAT**  
Rounds: 8 | Damage taken: 54 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (32/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 3 of 3 active enemies. Spell attack bonus: +8.
- **[Warlock 1] WIS Saving Throw vs Control Spell:** Warlock 1 WIS save: roll 1+0=1 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Cultist 1] WIS Saving Throw vs Control Spell:** Cultist 1 WIS save: roll 19+0=19 vs DC 16 — PASS (resists, remains active).
- **[Cultist 2] WIS Saving Throw vs Control Spell:** Cultist 2 WIS save: roll 17+0=17 vs DC 16 — PASS (resists, remains active).
- **[Bard] Concentration Started:** Hold Person incapacitated 1/3 enemies. Bard is now concentrating. Remaining free enemies: 2.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 4+3=7 vs AC 15 — MISS.
- **[Cultist 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 2 attacks: roll 20+3 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 2.
- **[Warlock 1] End-of-Round: WIS Save to Break Free from Control:** Warlock 1 (controlled) WIS save to break free: roll 9+0=9 vs DC 16 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 1:** Bard HP: 52/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 2 | Enemies controlled: 1

> *End of Round 1: Bard HP 52/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*
> *Controlled: Warlock 1 (32/32 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 1: roll 17+7=24 vs AC 12 — HIT. Deals 8 damage. Cultist 1 HP: 1/9.
- **[Cultist 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 1 attacks: roll 17+3 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 1.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 8+3=11 vs AC 15 — MISS.
- **[Warlock 1] End-of-Round: WIS Save to Break Free from Control:** Warlock 1 (controlled) WIS save to break free: roll 20+0=20 vs DC 16 — PASS (breaks free at 32/32 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 2:** Bard HP: 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 2: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1*
> *Active enemies: Warlock 1 (32/32 HP), Cultist 1 (1/9 HP), Cultist 2 (9/9 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 11+7=18 vs AC 13 — HIT. Deals 5 damage. Warlock 1 HP: 27/32.
- **[Warlock 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Warlock 1 attacks: roll 6+5 — deflected by Mirror Image (mirror check roll: 4 ≤ 6). Mirror Image charges remaining: 0.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 6+3=9 vs AC 15 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 19+3=22 vs AC 15 — HIT. Deals 6 damage. Bard HP: 46/52.
- **[Round Summary] End of Round 3:** Bard HP: 46/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 3: Bard HP 46/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (27/32 HP), Cultist 1 (1/9 HP), Cultist 2 (9/9 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 9+7=16 vs AC 13 — HIT. Deals 6 damage. Warlock 1 HP: 21/32.
- **[Warlock 1] Melee/Ranged Attack (AI: Attack):** Warlock 1 attacks Bard: roll 5+5=10 vs AC 15 — MISS.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 19+3=22 vs AC 15 — HIT. Deals 6 damage. Bard HP: 40/52.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 17+3=20 vs AC 15 — HIT. Deals 7 damage. Bard HP: 33/52.
- **[Round Summary] End of Round 4:** Bard HP: 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 4: Bard HP 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (21/32 HP), Cultist 1 (1/9 HP), Cultist 2 (9/9 HP)*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 19+7=26 vs AC 13 — HIT. Deals 9 damage. Warlock 1 HP: 12/32.
- **[Warlock 1] Melee/Ranged Attack (AI: Attack):** Warlock 1 attacks Bard: roll 9+5=14 vs AC 15 — MISS.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 11+3=14 vs AC 15 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 5+3=8 vs AC 15 — MISS.
- **[Round Summary] End of Round 5:** Bard HP: 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 5: Bard HP 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (12/32 HP), Cultist 1 (1/9 HP), Cultist 2 (9/9 HP)*

#### Round 6

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 3+7=10 vs AC 13 — MISS.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 3+1=4 vs DC 14 — FAIL (bard incapacitated)
- **[Warlock 1] Incapacitation Damage:** Bard incapacitated — takes automatic 4 damage. Bard HP: 29/52.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 9+3=12 vs AC 15 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 7+3=10 vs AC 15 — MISS.
- **[Round Summary] End of Round 6:** Bard HP: 29/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 6: Bard HP 29/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (12/32 HP), Cultist 1 (1/9 HP), Cultist 2 (9/9 HP)*

#### Round 7

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 18+7=25 vs AC 13 — HIT. Deals 10 damage. Warlock 1 HP: 2/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 13+1=14 vs DC 14 — PASS (spell resisted!)
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 18+3=21 vs AC 15 — HIT. Deals 6 damage. Bard HP: 23/52.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 11+3=14 vs AC 15 — MISS.
- **[Round Summary] End of Round 7:** Bard HP: 23/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 7: Bard HP 23/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (2/32 HP), Cultist 1 (1/9 HP), Cultist 2 (9/9 HP)*

#### Round 8

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 5+7=12 vs AC 13 — MISS.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 7+1=8 vs DC 14 — FAIL (bard incapacitated)
- **[Warlock 1] Incapacitation Damage:** Bard incapacitated — takes automatic 13 damage. Bard HP: 10/52.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 17+3=20 vs AC 15 — HIT. Deals 5 damage. Bard HP: 5/52.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 18+3=21 vs AC 15 — HIT. Deals 7 damage. Bard HP: -2/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 8: Bard HP -2/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (2/32 HP), Cultist 1 (1/9 HP), Cultist 2 (9/9 HP)*

---

## Social Encounter Logs

### Social: Convince the City Guard

*Persuade the gate captain to grant passage without proper documentation.*

**Skill:** Persuasion | **DC:** 14 | **Skill Bonus:** +11

**Result:** Persuasion check: CHA 5 + expertise (6) = +11. Roll: 4. Total: 4+11=15 vs DC 14 — SUCCESS (15 ≥ 14).

**Outcome: SUCCESS**

### Social: Infiltrate the Noble Gala

*Masquerade as a court bard to access the noble's private quarters.*

**Skill:** Deception | **DC:** 16 | **Skill Bonus:** +11
**Advantages:** Hat of Disguise (advantage on Deception while disguised)

**Result:** Deception check: CHA 5 + expertise (6) = +11. ADVANTAGE (Hat of Disguise (advantage on Deception while disguised)): rolls [2,18] take higher=18. Total: 18+11=29 vs DC 16 — SUCCESS (29 ≥ 16).

**Outcome: SUCCESS**

### Social: Inspire the Downtrodden

*Rally a crowd of refugees with a stirring ballad to restore their hope.*

**Skill:** Performance | **DC:** 12 | **Skill Bonus:** +8

**Result:** Performance check: CHA 5 + proficiency (3) = +8. Roll: 11. Total: 11+8=19 vs DC 12 — SUCCESS (19 ≥ 12).

**Outcome: SUCCESS**

---

## Party Support Encounter Logs

### Party Support: The Dragon Ambush (combat-support)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 1*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 2*

#### Round 3

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.

> *Inspiration dice: 2 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 2*

#### Round 4

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(1)+5=6 HP restored. Spell slots remaining: 3.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 1.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.

> *Inspiration dice: 1 | Healing slots: 3 | Inspirations given: 4 | Healing dealt: 6 HP | Features activated: 3*

#### Round 5

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 1 → 6 (max 10). Reactive feature uses reset to 5.
- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(1)+5=6 HP restored. Spell slots remaining: 2.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 5.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 5 | Healing slots: 2 | Inspirations given: 5 | Healing dealt: 12 HP | Features activated: 4*

#### Round 6

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(3)+5=8 HP restored. Spell slots remaining: 1.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 4 | Healing slots: 1 | Inspirations given: 6 | Healing dealt: 20 HP | Features activated: 5*

#### Round 7

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(1)+5=6 HP restored. Spell slots remaining: 0.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 3 | Healing slots: 0 | Inspirations given: 7 | Healing dealt: 26 HP | Features activated: 6*

#### Round 8

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.

> *Inspiration dice: 2 | Healing slots: 0 | Inspirations given: 8 | Healing dealt: 26 HP | Features activated: 7*

**Summary:** 8 inspirations given | 26 HP healed | 7 feature activations

---

### Party Support: The Road to Baldur's Gate (mixed)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 1*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 2*

#### Round 3

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 2 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 4*

#### Round 4

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 2 → 7 (max 10). Reactive feature uses reset to 5.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 6.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 6 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 6*

#### Round 5

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 5.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 5 | Healing slots: 4 | Inspirations given: 5 | Healing dealt: 0 HP | Features activated: 7*

#### Round 6

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 6 | Healing dealt: 0 HP | Features activated: 7*

**Summary:** 6 inspirations given | 0 HP healed | 7 feature activations

---

### Party Support: The Lord's Alliance Summit (social-support)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 1*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 2*

#### Round 3

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 3 → 8 (max 10). Reactive feature uses reset to 5.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 7.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 7 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 3*

#### Round 4

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 6.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 6 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 4*

**Summary:** 4 inspirations given | 0 HP healed | 4 feature activations

---
