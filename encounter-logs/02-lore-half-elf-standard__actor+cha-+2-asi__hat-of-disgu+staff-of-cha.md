# Rank #2: lore-half-elf-standard__actor+cha-+2-asi__hat-of-disgu+staff-of-cha

## Build Summary

| Field | Value |
|-------|-------|
| Species | Standard Half-Elf (Half-Elf) |
| Feats | Actor, CHA +2 ASI |
| Magic Items | Hat of Disguise, Staff of Charming |
| AC | 14 |
| HP | 52 |
| CHA modifier | +5 |
| Spell Save DC | 16 |

### Ability Scores

STR 8 | DEX 15 | CON 15 | INT 10 | WIS 12 | CHA 20

---

## Combat Encounter Logs

> Each combat scenario is run once (single simulation). Rolls are random — compare
> patterns across multiple runs for statistical validation.

### Combat: Bandit Ambush (EASY)

**Enemy Roster:**
- Bandit 1: HP 11, AC 12, Attack +3, Damage 1d6+1
- Bandit 2: HP 11, AC 12, Attack +3, Damage 1d6+1

**Outcome: VICTORY**  
Rounds: 1 | Damage taken: 0 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Bandit 1 (11/11 HP), Bandit 2 (11/11 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 2 of 2 active enemies. Spell attack bonus: +8.
- **[Bandit 1] WIS Saving Throw vs Control Spell:** Bandit 1 WIS save: roll 11+0=11 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Bandit 2] WIS Saving Throw vs Control Spell:** Bandit 2 WIS save: roll 7+0=7 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 2/2 enemies. Bard is now concentrating. Remaining free enemies: 0.
- **[Bard] Round End:** All enemies defeated or controlled. VICTORY.

> *End of Round 1: Bard HP 52/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3*
> *Controlled: Bandit 1 (11/11 HP), Bandit 2 (11/11 HP)*

---

### Combat: Gnoll War Band (MEDIUM)

**Enemy Roster:**
- Gnoll 1: HP 22, AC 15, Attack +4, Damage 2d6+2
- Gnoll 2: HP 22, AC 15, Attack +4, Damage 2d6+2
- Gnoll 3: HP 22, AC 15, Attack +4, Damage 2d6+2

**Outcome: DEFEAT**  
Rounds: 7 | Damage taken: 64 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — enemies won. Enemies act before the bard in round 1 (bard has no Mirror Image or control spell up yet).
- **[Gnoll 1] Pre-Round Surprise Attack:** Gnoll 1 attacks Bard (pre-round, no Mirror Image): roll 13+4=17 vs AC 14 — HIT. Deals 4 damage. Bard HP: 48/52.
- **[Gnoll 2] Pre-Round Surprise Attack:** Gnoll 2 attacks Bard (pre-round): roll 2+4=6 vs AC 14 — MISS.
- **[Gnoll 3] Pre-Round Surprise Attack:** Gnoll 3 attacks Bard (pre-round): roll 4+4=8 vs AC 14 — MISS.

> *End of pre-combat: Bard HP 48/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 3 of 3 active enemies. Spell attack bonus: +8.
- **[Gnoll 1] WIS Saving Throw vs Control Spell:** Gnoll 1 WIS save: roll 17+0=17 vs DC 16 — PASS (resists, remains active).
- **[Gnoll 2] WIS Saving Throw vs Control Spell:** Gnoll 2 WIS save: roll 18+0=18 vs DC 16 — PASS (resists, remains active).
- **[Gnoll 3] WIS Saving Throw vs Control Spell:** Gnoll 3 WIS save: roll 6+0=6 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 1/3 enemies. Bard is now concentrating. Remaining free enemies: 2.
- **[Gnoll 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 1 attacks: roll 5+4 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 2.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 7+4=11 vs AC 14 — MISS.
- **[Gnoll 3] End-of-Round: WIS Save to Break Free from Control:** Gnoll 3 (controlled) WIS save to break free: roll 18+0=18 vs DC 16 — PASS (breaks free at 22/22 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 1:** Bard HP: 48/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 1: Bard HP 48/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 9+5=14 vs AC 15 — MISS.
- **[Gnoll 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 1 attacks: roll 10+4 — deflected by Mirror Image (mirror check roll: 1 ≤ 6). Mirror Image charges remaining: 1.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 19+4=23 vs AC 14 — HIT. Deals 12 damage. Bard HP: 36/52.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 7+4=11 vs AC 14 — MISS.
- **[Round Summary] End of Round 2:** Bard HP: 36/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 2: Bard HP 36/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 19+5=24 vs AC 15 — HIT. Deals 6 damage. Gnoll 1 HP: 16/22.
- **[Gnoll 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 1 attacks: roll 17+4 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 0.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 5+4=9 vs AC 14 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 2+4=6 vs AC 14 — MISS.
- **[Round Summary] End of Round 3:** Bard HP: 36/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 3: Bard HP 36/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 1 (16/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 13+5=18 vs AC 15 — HIT. Deals 8 damage. Gnoll 1 HP: 8/22.
- **[Gnoll 1] Melee/Ranged Attack (AI: Attack):** Gnoll 1 attacks Bard: roll 18+4=22 vs AC 14 — HIT. Deals 12 damage. Bard HP: 24/52.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 1+4=5 vs AC 14 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 15+4=19 vs AC 14 — HIT. Deals 7 damage. Bard HP: 17/52.
- **[Round Summary] End of Round 4:** Bard HP: 17/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 4: Bard HP 17/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 1 (8/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 7+5=12 vs AC 15 — MISS.
- **[Gnoll 1] Melee/Ranged Attack (AI: Attack):** Gnoll 1 attacks Bard: roll 7+4=11 vs AC 14 — MISS.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 7+4=11 vs AC 14 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 6+4=10 vs AC 14 — MISS.
- **[Round Summary] End of Round 5:** Bard HP: 17/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 5: Bard HP 17/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 1 (8/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 6

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 17+5=22 vs AC 15 — HIT. Deals 9 damage. Gnoll 1 HP: 0/22.
- **[Gnoll 1] Defeated:** Gnoll 1 drops to 0 HP and is defeated.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 17+4=21 vs AC 14 — HIT. Deals 8 damage. Bard HP: 9/52.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 7+4=11 vs AC 14 — MISS.
- **[Round Summary] End of Round 6:** Bard HP: 9/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 6: Bard HP 9/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*
> *Defeated: Gnoll 1*

#### Round 7

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 2: roll 5+5=10 vs AC 15 — MISS.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 13+4=17 vs AC 14 — HIT. Deals 8 damage. Bard HP: 1/52.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 13+4=17 vs AC 14 — HIT. Deals 13 damage. Bard HP: -12/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 7: Bard HP -12/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*
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
Rounds: 3 | Damage taken: 54 | Concentration breaks: 1

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — enemies won. Enemies act before the bard in round 1 (bard has no Mirror Image or control spell up yet).
- **[Skeleton 1] Pre-Round Surprise Attack:** Skeleton 1 attacks Bard (pre-round): roll 5+4=9 vs AC 14 — MISS.
- **[Skeleton 2] Pre-Round Surprise Attack:** Skeleton 2 attacks Bard (pre-round, no Mirror Image): roll 14+4=18 vs AC 14 — HIT. Deals 7 damage. Bard HP: 45/52.
- **[Skeleton 3] Pre-Round Surprise Attack:** Skeleton 3 attacks Bard (pre-round, no Mirror Image): roll 17+4=21 vs AC 14 — HIT. Deals 4 damage. Bard HP: 41/52.
- **[Skeleton 4] Pre-Round Surprise Attack:** Skeleton 4 attacks Bard (pre-round): roll 5+4=9 vs AC 14 — MISS.
- **[Skeleton Archer 1] Pre-Round Surprise Attack:** Skeleton Archer 1 attacks Bard (pre-round, no Mirror Image): roll 10+4=14 vs AC 14 — HIT. Deals 4 damage. Bard HP: 37/52.
- **[Skeleton Archer 2] Pre-Round Surprise Attack:** Skeleton Archer 2 attacks Bard (pre-round, no Mirror Image): roll 11+4=15 vs AC 14 — HIT. Deals 8 damage. Bard HP: 29/52.

> *End of pre-combat: Bard HP 29/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Skeleton 1 (13/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 3 of 6 active enemies. Spell attack bonus: +8.
- **[Skeleton 1] WIS Saving Throw vs Control Spell:** Skeleton 1 WIS save: roll 5+0=5 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Skeleton 2] WIS Saving Throw vs Control Spell:** Skeleton 2 WIS save: roll 6+0=6 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Skeleton 3] WIS Saving Throw vs Control Spell:** Skeleton 3 WIS save: roll 17+0=17 vs DC 16 — PASS (resists, remains active).
- **[Bard] Concentration Started:** Hold Person incapacitated 2/3 enemies. Bard is now concentrating. Remaining free enemies: 4.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 20+4=24 vs AC 14 — HIT (CRITICAL). Deals 9 damage. Bard HP: 20/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 9 damage (DC 10 = max(10, ⌊9/2⌋)): roll 13 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 17+4=21 vs AC 14 — HIT. Deals 4 damage. Bard HP: 16/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 4 damage (DC 10 = max(10, ⌊4/2⌋)): roll 12 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton Archer 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton Archer 1 attacks: roll 15+4 — deflected by Mirror Image (mirror check roll: 3 ≤ 6). Mirror Image charges remaining: 2.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 19+4=23 vs AC 14 — HIT. Deals 4 damage. Bard HP: 12/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 4 damage (DC 10 = max(10, ⌊4/2⌋)): roll 8 vs DC 10 — FAIL (concentration broken)
- **[Bard] Concentration Broken:** Concentration lost. 2 controlled enemy/enemies shake free at half HP (Skeleton 1: 7/13 HP, Skeleton 2: 7/13 HP).
- **[Round Summary] End of Round 1:** Bard HP: 12/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2 | Enemies active/free: 6 | Enemies controlled: 0

> *End of Round 1: Bard HP 12/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2*
> *Active enemies: Skeleton 1 (7/13 HP), Skeleton 2 (7/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 14+5=19 vs AC 13 — HIT. Deals 7 damage. Skeleton 1 HP: 0/13.
- **[Skeleton 1] Defeated:** Skeleton 1 drops to 0 HP and is defeated.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 4+4=8 vs AC 14 — MISS.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 6+4=10 vs AC 14 — MISS.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 6+4=10 vs AC 14 — MISS.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 12+4=16 vs AC 14 — HIT. Deals 6 damage. Bard HP: 6/52.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 5+4=9 vs AC 14 — MISS.
- **[Round Summary] End of Round 2:** Bard HP: 6/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2 | Enemies active/free: 5 | Enemies controlled: 0

> *End of Round 2: Bard HP 6/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2*
> *Active enemies: Skeleton 2 (7/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*
> *Defeated: Skeleton 1*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 2: roll 11+5=16 vs AC 13 — HIT. Deals 5 damage. Skeleton 2 HP: 2/13.
- **[Skeleton 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 2 attacks: roll 14+4 — deflected by Mirror Image (mirror check roll: 4 ≤ 6). Mirror Image charges remaining: 1.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 15+4=19 vs AC 14 — HIT. Deals 8 damage. Bard HP: -2/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 3: Bard HP -2/52 | Concentrating: false | Breaks: 1 | Mirror Images: 1*
> *Active enemies: Skeleton 2 (2/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*
> *Defeated: Skeleton 1*

---

### Combat: Warlock's Hold (HARD)

**Enemy Roster:**
- Warlock 1: HP 32, AC 13, Attack +5, Damage 1d10+3
- Cultist 1: HP 9, AC 12, Attack +3, Damage 1d6+1
- Cultist 2: HP 9, AC 12, Attack +3, Damage 1d6+1

**Outcome: DEFEAT**  
Rounds: 6 | Damage taken: 59 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (32/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 16) targeting 3 of 3 active enemies. Spell attack bonus: +8.
- **[Warlock 1] WIS Saving Throw vs Control Spell:** Warlock 1 WIS save: roll 15+0=15 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Cultist 1] WIS Saving Throw vs Control Spell:** Cultist 1 WIS save: roll 17+0=17 vs DC 16 — PASS (resists, remains active).
- **[Cultist 2] WIS Saving Throw vs Control Spell:** Cultist 2 WIS save: roll 3+0=3 vs DC 16 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 2/3 enemies. Bard is now concentrating. Remaining free enemies: 1.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 3+3=6 vs AC 14 — MISS.
- **[Warlock 1] End-of-Round: WIS Save to Break Free from Control:** Warlock 1 (controlled) WIS save to break free: roll 16+0=16 vs DC 16 — PASS (breaks free at 32/32 HP and rejoins combat)
- **[Cultist 2] End-of-Round: WIS Save to Break Free from Control:** Cultist 2 (controlled) WIS save to break free: roll 17+0=17 vs DC 16 — PASS (breaks free at 9/9 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 1:** Bard HP: 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 1: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (32/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 15+5=20 vs AC 13 — HIT. Deals 10 damage. Warlock 1 HP: 22/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 11+1=12 vs DC 14 — FAIL (bard incapacitated)
- **[Warlock 1] Incapacitation Damage:** Bard incapacitated — takes automatic 8 damage. Bard HP: 44/52.
- **[Cultist 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 1 attacks: roll 6+3 — deflected by Mirror Image (mirror check roll: 3 ≤ 6). Mirror Image charges remaining: 2.
- **[Cultist 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 2 attacks: roll 11+3 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 1.
- **[Round Summary] End of Round 2:** Bard HP: 44/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 2: Bard HP 44/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1*
> *Active enemies: Warlock 1 (22/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 10+5=15 vs AC 13 — HIT. Deals 10 damage. Warlock 1 HP: 12/32.
- **[Warlock 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Warlock 1 attacks: roll 14+5 — deflected by Mirror Image (mirror check roll: 4 ≤ 6). Mirror Image charges remaining: 0.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 6+3=9 vs AC 14 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 14+3=17 vs AC 14 — HIT. Deals 5 damage. Bard HP: 39/52.
- **[Round Summary] End of Round 3:** Bard HP: 39/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 3: Bard HP 39/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (12/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 4+5=9 vs AC 13 — MISS.
- **[Warlock 1] Melee/Ranged Attack (AI: Attack):** Warlock 1 attacks Bard: roll 16+5=21 vs AC 14 — HIT. Deals 10 damage. Bard HP: 29/52.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 20+3=23 vs AC 14 — HIT (CRITICAL). Deals 7 damage. Bard HP: 22/52.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 8+3=11 vs AC 14 — MISS.
- **[Round Summary] End of Round 4:** Bard HP: 22/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 4: Bard HP 22/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (12/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 12+5=17 vs AC 13 — HIT. Deals 8 damage. Warlock 1 HP: 4/32.
- **[Warlock 1] Melee/Ranged Attack (AI: Attack):** Warlock 1 attacks Bard: roll 20+5=25 vs AC 14 — HIT (CRITICAL). Deals 13 damage. Bard HP: 9/52.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 17+3=20 vs AC 14 — HIT. Deals 2 damage. Bard HP: 7/52.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 16+3=19 vs AC 14 — HIT. Deals 4 damage. Bard HP: 3/52.
- **[Round Summary] End of Round 5:** Bard HP: 3/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 5: Bard HP 3/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (4/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 6

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 16+5=21 vs AC 13 — HIT. Deals 3 damage. Warlock 1 HP: 1/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 4+1=5 vs DC 14 — FAIL (bard incapacitated)
- **[Warlock 1] Incapacitation Damage:** Bard incapacitated — takes automatic 10 damage. Bard HP: -7/52.
- **[Bard] Death:** Bard drops to 0 HP after incapacitation. DEFEAT.

> *End of Round 6: Bard HP -7/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (1/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

---

## Social Encounter Logs

### Social: Convince the City Guard

*Persuade the gate captain to grant passage without proper documentation.*

**Skill:** Persuasion | **DC:** 14 | **Skill Bonus:** +11
**Advantages:** Equipment: Staff of Charming (advantage on Persuasion)

**Result:** Persuasion check: CHA 5 + expertise (6) = +11. ADVANTAGE (Equipment: Staff of Charming (advantage on Persuasion)): rolls [8,9] take higher=9. Total: 9+11=20 vs DC 14 — SUCCESS (20 ≥ 14).

**Outcome: SUCCESS**

### Social: Infiltrate the Noble Gala

*Masquerade as a court bard to access the noble's private quarters.*

**Skill:** Deception | **DC:** 16 | **Skill Bonus:** +11
**Advantages:** Actor feat (advantage on Deception), Hat of Disguise (advantage on Deception while disguised)

**Result:** Deception check: CHA 5 + expertise (6) = +11. ADVANTAGE (Actor feat (advantage on Deception), Hat of Disguise (advantage on Deception while disguised)): rolls [9,5] take higher=9. Total: 9+11=20 vs DC 16 — SUCCESS (20 ≥ 16).

**Outcome: SUCCESS**

### Social: Inspire the Downtrodden

*Rally a crowd of refugees with a stirring ballad to restore their hope.*

**Skill:** Performance | **DC:** 12 | **Skill Bonus:** +8
**Advantages:** Actor feat (advantage on Performance)

**Result:** Performance check: CHA 5 + proficiency (3) = +8. ADVANTAGE (Actor feat (advantage on Performance)): rolls [20,18] take higher=20. Total: 20+8=28 vs DC 12 — CRITICAL SUCCESS (natural 20 — maximum impact).

**Outcome: CRITICAL SUCCESS**

---

## Party Support Encounter Logs

### Party Support: The Dragon Ambush (combat-support)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 0*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 1*

#### Round 3

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 2 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 3*

#### Round 4

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 1.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.

> *Inspiration dice: 1 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 4*

#### Round 5

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 1 → 6 (max 10). Reactive feature uses reset to 5.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 5.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 5 | Healing slots: 4 | Inspirations given: 5 | Healing dealt: 0 HP | Features activated: 5*

#### Round 6

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(2)+5=7 HP restored. Spell slots remaining: 3.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 4 | Healing slots: 3 | Inspirations given: 6 | Healing dealt: 7 HP | Features activated: 6*

#### Round 7

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.

> *Inspiration dice: 3 | Healing slots: 3 | Inspirations given: 7 | Healing dealt: 7 HP | Features activated: 6*

#### Round 8

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 2.

> *Inspiration dice: 2 | Healing slots: 3 | Inspirations given: 8 | Healing dealt: 7 HP | Features activated: 7*

**Summary:** 8 inspirations given | 7 HP healed | 7 feature activations

---

### Party Support: The Road to Baldur's Gate (mixed)

#### Round 1

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(4)+5=9 HP restored. Spell slots remaining: 3.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.

> *Inspiration dice: 4 | Healing slots: 3 | Inspirations given: 1 | Healing dealt: 9 HP | Features activated: 0*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.

> *Inspiration dice: 3 | Healing slots: 3 | Inspirations given: 2 | Healing dealt: 9 HP | Features activated: 0*

#### Round 3

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 2 | Healing slots: 3 | Inspirations given: 3 | Healing dealt: 9 HP | Features activated: 1*

#### Round 4

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 2 → 7 (max 10). Reactive feature uses reset to 5.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 6.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 6 | Healing slots: 3 | Inspirations given: 4 | Healing dealt: 9 HP | Features activated: 2*

#### Round 5

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 5.

> *Inspiration dice: 5 | Healing slots: 3 | Inspirations given: 5 | Healing dealt: 9 HP | Features activated: 2*

#### Round 6

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 4 | Healing slots: 3 | Inspirations given: 6 | Healing dealt: 9 HP | Features activated: 3*

**Summary:** 6 inspirations given | 9 HP healed | 3 feature activations

---

### Party Support: The Lord's Alliance Summit (social-support)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 0*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 1*

#### Round 3

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 3 → 8 (max 10). Reactive feature uses reset to 5.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 7.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 7 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 2*

#### Round 4

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 6.

> *Inspiration dice: 6 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 2*

**Summary:** 4 inspirations given | 0 HP healed | 2 feature activations

---
