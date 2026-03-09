# Rank #1: lore-eladrin__actor+cha-+2-asi__+1-rapier+cloak-of-pro

## Build Summary

| Field | Value |
|-------|-------|
| Species | Eladrin (Elf) |
| Feats | Actor, CHA +2 ASI |
| Magic Items | Cloak of Protection, +1 Rapier |
| AC | 15 |
| HP | 52 |
| CHA modifier | +4 |
| Spell Save DC | 15 |

### Ability Scores

STR 8 | DEX 16 | CON 14 | INT 11 | WIS 12 | CHA 18

---

## Combat Encounter Logs

> Each combat scenario is run once (single simulation). Rolls are random — compare
> patterns across multiple runs for statistical validation.

### Combat: Bandit Ambush (EASY)

**Enemy Roster:**
- Bandit 1: HP 11, AC 12, Attack +3, Damage 1d6+1
- Bandit 2: HP 11, AC 12, Attack +3, Damage 1d6+1

**Outcome: VICTORY**  
Rounds: 4 | Damage taken: 2 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — enemies won. Enemies act before the bard in round 1 (bard has no Mirror Image or control spell up yet).
- **[Bandit 1] Pre-Round Surprise Attack:** Bandit 1 attacks Bard (pre-round, no Mirror Image): roll 16+3=19 vs AC 16 — HIT. Deals 2 damage. Bard HP: 50/52.
- **[Bandit 2] Pre-Round Surprise Attack:** Bandit 2 attacks Bard (pre-round): roll 7+3=10 vs AC 16 — MISS.

> *End of pre-combat: Bard HP 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Bandit 1 (11/11 HP), Bandit 2 (11/11 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 15) targeting 2 of 2 active enemies. Spell attack bonus: +7.
- **[Bandit 1] WIS Saving Throw vs Control Spell:** Bandit 1 WIS save: roll 10+0=20 vs DC 15 — PASS (resists, remains active).
- **[Bandit 2] WIS Saving Throw vs Control Spell:** Bandit 2 WIS save: roll 1+0=11 vs DC 15 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 1/2 enemies. Bard is now concentrating. Remaining free enemies: 1.
- **[Bandit 1] Melee/Ranged Attack (AI: Attack):** Bandit 1 attacks Bard: roll 9+3=12 vs AC 16 — MISS.
- **[Bandit 2] End-of-Round: WIS Save to Break Free from Control:** Bandit 2 (controlled) WIS save to break free: roll 17+0=27 vs DC 15 — PASS (breaks free at 11/11 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 1:** Bard HP: 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 1: Bard HP 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Bandit 1 (11/11 HP), Bandit 2 (11/11 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Bandit 1: roll 13+7=20 vs AC 12 — HIT. Deals 12 damage. Bandit 1 HP: 0/11.
- **[Bandit 1] Defeated:** Bandit 1 drops to 0 HP and is defeated.
- **[Bandit 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Bandit 2 attacks: roll 2+3 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 2.
- **[Round Summary] End of Round 2:** Bard HP: 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 1 | Enemies controlled: 0

> *End of Round 2: Bard HP 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Bandit 2 (11/11 HP)*
> *Defeated: Bandit 1*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Bandit 2: roll 5+7=12 vs AC 12 — HIT. Deals 8 damage. Bandit 2 HP: 3/11.
- **[Bandit 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Bandit 2 attacks: roll 4+3 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 1.
- **[Round Summary] End of Round 3:** Bard HP: 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1 | Enemies active/free: 1 | Enemies controlled: 0

> *End of Round 3: Bard HP 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1*
> *Active enemies: Bandit 2 (3/11 HP)*
> *Defeated: Bandit 1*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Bandit 2: roll 10+7=17 vs AC 12 — HIT. Deals 12 damage. Bandit 2 HP: 0/11.
- **[Bandit 2] Defeated:** Bandit 2 drops to 0 HP and is defeated.
- **[Bard] Round End:** All enemies defeated or controlled. VICTORY.

> *End of Round 4: Bard HP 50/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1*
> *Defeated: Bandit 1, Bandit 2*

---

### Combat: Gnoll War Band (MEDIUM)

**Enemy Roster:**
- Gnoll 1: HP 22, AC 15, Attack +4, Damage 2d6+2
- Gnoll 2: HP 22, AC 15, Attack +4, Damage 2d6+2
- Gnoll 3: HP 22, AC 15, Attack +4, Damage 2d6+2

**Outcome: DEFEAT**  
Rounds: 6 | Damage taken: 52 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 15) targeting 3 of 3 active enemies. Spell attack bonus: +7.
- **[Gnoll 1] WIS Saving Throw vs Control Spell:** Gnoll 1 WIS save: roll 3+0=13 vs DC 15 — FAIL (incapacitated, under Bard's control).
- **[Gnoll 2] WIS Saving Throw vs Control Spell:** Gnoll 2 WIS save: roll 3+0=13 vs DC 15 — FAIL (incapacitated, under Bard's control).
- **[Gnoll 3] WIS Saving Throw vs Control Spell:** Gnoll 3 WIS save: roll 13+0=23 vs DC 15 — PASS (resists, remains active).
- **[Bard] Concentration Started:** Hold Person incapacitated 2/3 enemies. Bard is now concentrating. Remaining free enemies: 1.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 12+4=16 vs AC 16 — HIT. Deals 8 damage. Bard HP: 44/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 8 damage (DC 10 = max(10, ⌊8/2⌋)): roll 10 vs DC 10 — SUCCESS (concentration maintained)
- **[Gnoll 1] End-of-Round: WIS Save to Break Free from Control:** Gnoll 1 (controlled) WIS save to break free: roll 5+0=15 vs DC 15 — PASS (breaks free at 22/22 HP and rejoins combat)
- **[Gnoll 2] End-of-Round: WIS Save to Break Free from Control:** Gnoll 2 (controlled) WIS save to break free: roll 17+0=27 vs DC 15 — PASS (breaks free at 22/22 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 1:** Bard HP: 44/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 1: Bard HP 44/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 17+7=24 vs AC 15 — HIT. Deals 5 damage. Gnoll 1 HP: 17/22.
- **[Gnoll 1] Melee/Ranged Attack (AI: Attack):** Gnoll 1 attacks Bard: roll 3+4=7 vs AC 16 — MISS.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 18+4=22 vs AC 16 — HIT. Deals 10 damage. Bard HP: 34/52.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 1+4=5 vs AC 16 — MISS.
- **[Round Summary] End of Round 2:** Bard HP: 34/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 2: Bard HP 34/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (17/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 4+7=11 vs AC 15 — MISS.
- **[Gnoll 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 1 attacks: roll 12+4 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 2.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 6+4=10 vs AC 16 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 16+4=20 vs AC 16 — HIT. Deals 9 damage. Bard HP: 25/52.
- **[Round Summary] End of Round 3:** Bard HP: 25/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 3: Bard HP 25/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Gnoll 1 (17/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 4+7=11 vs AC 15 — MISS.
- **[Gnoll 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 1 attacks: roll 20+4 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 1.
- **[Gnoll 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 2 attacks: roll 17+4 — deflected by Mirror Image (mirror check roll: 1 ≤ 6). Mirror Image charges remaining: 0.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 17+4=21 vs AC 16 — HIT. Deals 10 damage. Bard HP: 15/52.
- **[Round Summary] End of Round 4:** Bard HP: 15/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 4: Bard HP 15/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 1 (17/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 5

- **[Bard] Fey Step (Bonus Action):** Bard HP is 15/52 (29% — at or below 40% threshold). Eladrin Fey Step: teleport 30 ft away. Enemies must spend movement closing the gap and cannot attack this round.
- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 12+7=19 vs AC 15 — HIT. Deals 10 damage. Gnoll 1 HP: 7/22.
- **[Enemies] Enemy Turns Skipped:** Bard teleported 30 ft away via Fey Step. All 3 enemies spend their movement closing the gap. No attacks are possible this round.

> *End of Round 5: Bard HP 15/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 1 (7/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 6

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 2+7=9 vs AC 15 — MISS.
- **[Gnoll 1] Melee/Ranged Attack (AI: Attack):** Gnoll 1 attacks Bard: roll 2+4=6 vs AC 16 — MISS.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 18+4=22 vs AC 16 — HIT. Deals 6 damage. Bard HP: 9/52.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 19+4=23 vs AC 16 — HIT. Deals 9 damage. Bard HP: 0/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 6: Bard HP 0/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 1 (7/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

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
Rounds: 4 | Damage taken: 52 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — enemies won. Enemies act before the bard in round 1 (bard has no Mirror Image or control spell up yet).
- **[Skeleton 1] Pre-Round Surprise Attack:** Skeleton 1 attacks Bard (pre-round): roll 1+4=5 vs AC 16 — MISS.
- **[Skeleton 2] Pre-Round Surprise Attack:** Skeleton 2 attacks Bard (pre-round): roll 6+4=10 vs AC 16 — MISS.
- **[Skeleton 3] Pre-Round Surprise Attack:** Skeleton 3 attacks Bard (pre-round, no Mirror Image): roll 15+4=19 vs AC 16 — HIT. Deals 8 damage. Bard HP: 44/52.
- **[Skeleton 4] Pre-Round Surprise Attack:** Skeleton 4 attacks Bard (pre-round, no Mirror Image): roll 19+4=23 vs AC 16 — HIT. Deals 3 damage. Bard HP: 41/52.
- **[Skeleton Archer 1] Pre-Round Surprise Attack:** Skeleton Archer 1 attacks Bard (pre-round): roll 9+4=13 vs AC 16 — MISS.
- **[Skeleton Archer 2] Pre-Round Surprise Attack:** Skeleton Archer 2 attacks Bard (pre-round, no Mirror Image): roll 15+4=19 vs AC 16 — HIT. Deals 8 damage. Bard HP: 33/52.

> *End of pre-combat: Bard HP 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Skeleton 1 (13/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 15) targeting 3 of 6 active enemies. Spell attack bonus: +7.
- **[Skeleton 1] WIS Saving Throw vs Control Spell:** Skeleton 1 WIS save: roll 8+0=18 vs DC 15 — PASS (resists, remains active).
- **[Skeleton 2] WIS Saving Throw vs Control Spell:** Skeleton 2 WIS save: roll 14+0=24 vs DC 15 — PASS (resists, remains active).
- **[Skeleton 3] WIS Saving Throw vs Control Spell:** Skeleton 3 WIS save: roll 10+0=20 vs DC 15 — PASS (resists, remains active).
- **[Bard] Control Spell Failed:** All 3 enemies resisted Hold Person. Spell slot spent, no concentration — spell was wasted this encounter.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 6+4=10 vs AC 16 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 4+4=8 vs AC 16 — MISS.
- **[Skeleton 3] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 3 attacks: roll 19+4 — deflected by Mirror Image (mirror check roll: 3 ≤ 6). Mirror Image charges remaining: 2.
- **[Skeleton 4] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 4 attacks: roll 13+4 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 1.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 4+4=8 vs AC 16 — MISS.
- **[Skeleton Archer 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton Archer 2 attacks: roll 3+4 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 0.
- **[Round Summary] End of Round 1:** Bard HP: 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 6 | Enemies controlled: 0

> *End of Round 1: Bard HP 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (13/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 16+7=23 vs AC 13 — HIT. Deals 10 damage. Skeleton 1 HP: 3/13.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 7+4=11 vs AC 16 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 9+4=13 vs AC 16 — MISS.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 11+4=15 vs AC 16 — MISS.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 4+4=8 vs AC 16 — MISS.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 11+4=15 vs AC 16 — MISS.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 11+4=15 vs AC 16 — MISS.
- **[Round Summary] End of Round 2:** Bard HP: 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 6 | Enemies controlled: 0

> *End of Round 2: Bard HP 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (3/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 2+7=9 vs AC 13 — MISS.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 11+4=15 vs AC 16 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 8+4=12 vs AC 16 — MISS.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 1+4=5 vs AC 16 — MISS.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 11+4=15 vs AC 16 — MISS.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 2+4=6 vs AC 16 — MISS.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 4+4=8 vs AC 16 — MISS.
- **[Round Summary] End of Round 3:** Bard HP: 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 6 | Enemies controlled: 0

> *End of Round 3: Bard HP 33/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (3/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 2+7=9 vs AC 13 — MISS.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 9+4=13 vs AC 16 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 7+4=11 vs AC 16 — MISS.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 20+4=24 vs AC 16 — HIT (CRITICAL). Deals 11 damage. Bard HP: 22/52.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 19+4=23 vs AC 16 — HIT. Deals 8 damage. Bard HP: 14/52.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 20+4=24 vs AC 16 — HIT (CRITICAL). Deals 14 damage. Bard HP: 0/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 4: Bard HP 0/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (3/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

---

### Combat: Warlock's Hold (HARD)

**Enemy Roster:**
- Warlock 1: HP 32, AC 13, Attack +5, Damage 1d10+3
- Cultist 1: HP 9, AC 12, Attack +3, Damage 1d6+1
- Cultist 2: HP 9, AC 12, Attack +3, Damage 1d6+1

**Outcome: VICTORY**  
Rounds: 7 | Damage taken: 27 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (32/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 15) targeting 3 of 3 active enemies. Spell attack bonus: +7.
- **[Warlock 1] WIS Saving Throw vs Control Spell:** Warlock 1 WIS save: roll 3+0=13 vs DC 15 — FAIL (incapacitated, under Bard's control).
- **[Cultist 1] WIS Saving Throw vs Control Spell:** Cultist 1 WIS save: roll 15+0=25 vs DC 15 — PASS (resists, remains active).
- **[Cultist 2] WIS Saving Throw vs Control Spell:** Cultist 2 WIS save: roll 10+0=20 vs DC 15 — PASS (resists, remains active).
- **[Bard] Concentration Started:** Hold Person incapacitated 1/3 enemies. Bard is now concentrating. Remaining free enemies: 2.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 13+3=16 vs AC 16 — HIT. Deals 3 damage. Bard HP: 49/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 3 damage (DC 10 = max(10, ⌊3/2⌋)): roll 22 vs DC 10 — SUCCESS (concentration maintained)
- **[Cultist 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 2 attacks: roll 9+3 — deflected by Mirror Image (mirror check roll: 3 ≤ 6). Mirror Image charges remaining: 2.
- **[Warlock 1] End-of-Round: WIS Save to Break Free from Control:** Warlock 1 (controlled) WIS save to break free: roll 10+0=20 vs DC 15 — PASS (breaks free at 32/32 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 1:** Bard HP: 49/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 1: Bard HP 49/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Warlock 1 (32/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 18+7=25 vs AC 13 — HIT. Deals 9 damage. Warlock 1 HP: 23/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 10+1=11 vs DC 14 — FAIL (bard incapacitated)
- **[Warlock 1] Incapacitation Damage:** Bard incapacitated — takes automatic 10 damage. Bard HP: 39/52.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 7+3=10 vs AC 16 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 12+3=15 vs AC 16 — MISS.
- **[Round Summary] End of Round 2:** Bard HP: 39/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 2: Bard HP 39/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Warlock 1 (23/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 11+7=18 vs AC 13 — HIT. Deals 10 damage. Warlock 1 HP: 13/32.
- **[Warlock 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Warlock 1 attacks: roll 10+5 — deflected by Mirror Image (mirror check roll: 6 ≤ 6). Mirror Image charges remaining: 1.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 2+3=5 vs AC 16 — MISS.
- **[Cultist 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 2 attacks: roll 3+3 — deflected by Mirror Image (mirror check roll: 6 ≤ 6). Mirror Image charges remaining: 0.
- **[Round Summary] End of Round 3:** Bard HP: 39/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 3: Bard HP 39/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (13/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 20+7=27 vs AC 13 — HIT (CRITICAL). Deals 12 damage. Warlock 1 HP: 1/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 15+1=16 vs DC 14 — PASS (spell resisted!)
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 3+3=6 vs AC 16 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 18+3=21 vs AC 16 — HIT. Deals 2 damage. Bard HP: 37/52.
- **[Round Summary] End of Round 4:** Bard HP: 37/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 4: Bard HP 37/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (1/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 20+7=27 vs AC 13 — HIT (CRITICAL). Deals 11 damage. Warlock 1 HP: 0/32.
- **[Warlock 1] Defeated:** Warlock 1 drops to 0 HP and is defeated.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 15+3=18 vs AC 16 — HIT. Deals 7 damage. Bard HP: 30/52.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 8+3=11 vs AC 16 — MISS.
- **[Round Summary] End of Round 5:** Bard HP: 30/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 5: Bard HP 30/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*
> *Defeated: Warlock 1*

#### Round 6

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 1: roll 20+7=27 vs AC 12 — HIT (CRITICAL). Deals 14 damage. Cultist 1 HP: 0/9.
- **[Cultist 1] Defeated:** Cultist 1 drops to 0 HP and is defeated.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 16+3=19 vs AC 16 — HIT. Deals 5 damage. Bard HP: 25/52.
- **[Round Summary] End of Round 6:** Bard HP: 25/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 1 | Enemies controlled: 0

> *End of Round 6: Bard HP 25/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Cultist 2 (9/9 HP)*
> *Defeated: Warlock 1, Cultist 1*

#### Round 7

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 2: roll 20+7=27 vs AC 12 — HIT (CRITICAL). Deals 14 damage. Cultist 2 HP: 0/9.
- **[Cultist 2] Defeated:** Cultist 2 drops to 0 HP and is defeated.
- **[Bard] Round End:** All enemies defeated or controlled. VICTORY.

> *End of Round 7: Bard HP 25/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Defeated: Warlock 1, Cultist 1, Cultist 2*

---

## Social Encounter Logs

### Social: Convince the City Guard

*Persuade the gate captain to grant passage without proper documentation.*

**Skill:** Persuasion | **DC:** 14 | **Skill Bonus:** +10

**Result:** Persuasion check: CHA 4 + expertise (6) = +10. Roll: 17. Total: 17+10=27 vs DC 14 — SUCCESS (27 ≥ 14).

**Outcome: SUCCESS**

### Social: Infiltrate the Noble Gala

*Masquerade as a court bard to access the noble's private quarters.*

**Skill:** Deception | **DC:** 16 | **Skill Bonus:** +10
**Advantages:** Actor feat (advantage on Deception)

**Result:** Deception check: CHA 4 + expertise (6) = +10. ADVANTAGE (Actor feat (advantage on Deception)): rolls [7,18] take higher=18. Total: 18+10=28 vs DC 16 — SUCCESS (28 ≥ 16).

**Outcome: SUCCESS**

### Social: Inspire the Downtrodden

*Rally a crowd of refugees with a stirring ballad to restore their hope.*

**Skill:** Performance | **DC:** 12 | **Skill Bonus:** +7
**Advantages:** Actor feat (advantage on Performance)

**Result:** Performance check: CHA 4 + proficiency (3) = +7. ADVANTAGE (Actor feat (advantage on Performance)): rolls [18,13] take higher=18. Total: 18+7=25 vs DC 12 — SUCCESS (25 ≥ 12).

**Outcome: SUCCESS**

---

## Party Support Encounter Logs

### Party Support: The Dragon Ambush (combat-support)

#### Round 1

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(2)+4=6 HP restored. Spell slots remaining: 3.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 3 | Healing slots: 3 | Inspirations given: 1 | Healing dealt: 6 HP | Features activated: 2*

#### Round 2

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(1)+4=5 HP restored. Spell slots remaining: 2.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.

> *Inspiration dice: 2 | Healing slots: 2 | Inspirations given: 2 | Healing dealt: 11 HP | Features activated: 2*

#### Round 3

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 1.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 1 | Healing slots: 2 | Inspirations given: 3 | Healing dealt: 11 HP | Features activated: 4*

#### Round 4

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 0.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 1.

> *Inspiration dice: 0 | Healing slots: 2 | Inspirations given: 4 | Healing dealt: 11 HP | Features activated: 5*

#### Round 5

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 0 → 4 (max 8). Reactive feature uses reset to 4.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 3 | Healing slots: 2 | Inspirations given: 5 | Healing dealt: 11 HP | Features activated: 7*

#### Round 6

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.

> *Inspiration dice: 2 | Healing slots: 2 | Inspirations given: 6 | Healing dealt: 11 HP | Features activated: 8*

#### Round 7

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 1.

> *Inspiration dice: 1 | Healing slots: 2 | Inspirations given: 7 | Healing dealt: 11 HP | Features activated: 8*

#### Round 8

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 0.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 1.

> *Inspiration dice: 0 | Healing slots: 2 | Inspirations given: 8 | Healing dealt: 11 HP | Features activated: 9*

**Summary:** 8 inspirations given | 11 HP healed | 9 feature activations

---

### Party Support: The Road to Baldur's Gate (mixed)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 1*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.

> *Inspiration dice: 2 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 1*

#### Round 3

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 1.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 1 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 2*

#### Round 4

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 1 → 5 (max 8). Reactive feature uses reset to 4.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 4*

#### Round 5

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(1)+4=5 HP restored. Spell slots remaining: 3.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.

> *Inspiration dice: 3 | Healing slots: 3 | Inspirations given: 5 | Healing dealt: 5 HP | Features activated: 5*

#### Round 6

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 1.

> *Inspiration dice: 2 | Healing slots: 3 | Inspirations given: 6 | Healing dealt: 5 HP | Features activated: 6*

**Summary:** 6 inspirations given | 5 HP healed | 6 feature activations

---

### Party Support: The Lord's Alliance Summit (social-support)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 1*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.

> *Inspiration dice: 2 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 2*

#### Round 3

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 2 → 6 (max 8). Reactive feature uses reset to 4.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 5.

> *Inspiration dice: 5 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 2*

#### Round 4

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 3*

**Summary:** 4 inspirations given | 0 HP healed | 3 feature activations

---
