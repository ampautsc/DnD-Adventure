# Rank #14: lore-half-elf-standard__actor+cha-+2-asi__hat-of-disgu+instrument-o

## Build Summary

| Field | Value |
|-------|-------|
| Species | Standard Half-Elf (Half-Elf) |
| Feats | Actor, CHA +2 ASI |
| Magic Items | Hat of Disguise, Instrument of the Bards — Canaith Mandolin |
| AC | 14 |
| HP | 52 |
| CHA modifier | +5 |
| Spell Save DC | 17 |

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

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 17) targeting 2 of 2 active enemies. Spell attack bonus: +8.
- **[Bandit 1] WIS Saving Throw vs Control Spell:** Bandit 1 WIS save: roll 12+0=12 vs DC 17 — FAIL (incapacitated, under Bard's control).
- **[Bandit 2] WIS Saving Throw vs Control Spell:** Bandit 2 WIS save: roll 1+0=1 vs DC 17 — FAIL (incapacitated, under Bard's control).
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
Rounds: 5 | Damage taken: 52 | Concentration breaks: 1

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (22/22 HP), Gnoll 2 (22/22 HP), Gnoll 3 (22/22 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 17) targeting 3 of 3 active enemies. Spell attack bonus: +8.
- **[Gnoll 1] WIS Saving Throw vs Control Spell:** Gnoll 1 WIS save: roll 3+0=3 vs DC 17 — FAIL (incapacitated, under Bard's control).
- **[Gnoll 2] WIS Saving Throw vs Control Spell:** Gnoll 2 WIS save: roll 1+0=1 vs DC 17 — FAIL (incapacitated, under Bard's control).
- **[Gnoll 3] WIS Saving Throw vs Control Spell:** Gnoll 3 WIS save: roll 17+0=17 vs DC 17 — PASS (resists, remains active).
- **[Bard] Concentration Started:** Hold Person incapacitated 2/3 enemies. Bard is now concentrating. Remaining free enemies: 1.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 10+4=14 vs AC 14 — HIT. Deals 12 damage. Bard HP: 40/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 12 damage (DC 10 = max(10, ⌊12/2⌋)): roll 7 vs DC 10 — FAIL (concentration broken)
- **[Bard] Concentration Broken:** Concentration lost. 2 controlled enemy/enemies shake free at half HP (Gnoll 1: 11/22 HP, Gnoll 2: 11/22 HP).
- **[Round Summary] End of Round 1:** Bard HP: 40/52 | Concentrating: false | Breaks: 1 | Mirror Images: 3 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 1: Bard HP 40/52 | Concentrating: false | Breaks: 1 | Mirror Images: 3*
> *Active enemies: Gnoll 1 (11/22 HP), Gnoll 2 (11/22 HP), Gnoll 3 (22/22 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 16+5=21 vs AC 15 — HIT. Deals 7 damage. Gnoll 1 HP: 4/22.
- **[Gnoll 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 1 attacks: roll 15+4 — deflected by Mirror Image (mirror check roll: 1 ≤ 6). Mirror Image charges remaining: 2.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 6+4=10 vs AC 14 — MISS.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 3+4=7 vs AC 14 — MISS.
- **[Round Summary] End of Round 2:** Bard HP: 40/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 2: Bard HP 40/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2*
> *Active enemies: Gnoll 1 (4/22 HP), Gnoll 2 (11/22 HP), Gnoll 3 (22/22 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 1: roll 19+5=24 vs AC 15 — HIT. Deals 4 damage. Gnoll 1 HP: 0/22.
- **[Gnoll 1] Defeated:** Gnoll 1 drops to 0 HP and is defeated.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 19+4=23 vs AC 14 — HIT. Deals 7 damage. Bard HP: 33/52.
- **[Gnoll 3] Melee/Ranged Attack (AI: Attack):** Gnoll 3 attacks Bard: roll 20+4=24 vs AC 14 — HIT (CRITICAL). Deals 12 damage. Bard HP: 21/52.
- **[Round Summary] End of Round 3:** Bard HP: 21/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 3: Bard HP 21/52 | Concentrating: false | Breaks: 1 | Mirror Images: 2*
> *Active enemies: Gnoll 2 (11/22 HP), Gnoll 3 (22/22 HP)*
> *Defeated: Gnoll 1*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 2: roll 2+5=7 vs AC 15 — MISS.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 13+4=17 vs AC 14 — HIT. Deals 14 damage. Bard HP: 7/52.
- **[Gnoll 3] Attack Deflected by Mirror Image (AI: Melee Attack):** Gnoll 3 attacks: roll 9+4 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 1.
- **[Round Summary] End of Round 4:** Bard HP: 7/52 | Concentrating: false | Breaks: 1 | Mirror Images: 1 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 4: Bard HP 7/52 | Concentrating: false | Breaks: 1 | Mirror Images: 1*
> *Active enemies: Gnoll 2 (11/22 HP), Gnoll 3 (22/22 HP)*
> *Defeated: Gnoll 1*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Gnoll 2: roll 20+5=25 vs AC 15 — HIT (CRITICAL). Deals 5 damage. Gnoll 2 HP: 6/22.
- **[Gnoll 2] Melee/Ranged Attack (AI: Attack):** Gnoll 2 attacks Bard: roll 13+4=17 vs AC 14 — HIT. Deals 7 damage. Bard HP: 0/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 5: Bard HP 0/52 | Concentrating: false | Breaks: 1 | Mirror Images: 1*
> *Active enemies: Gnoll 2 (6/22 HP), Gnoll 3 (22/22 HP)*
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
Rounds: 5 | Damage taken: 59 | Concentration breaks: 1

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — bard won. Bard acts first in round 1.

> *End of pre-combat: Bard HP 52/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Skeleton 1 (13/13 HP), Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 17) targeting 3 of 6 active enemies. Spell attack bonus: +8.
- **[Skeleton 1] WIS Saving Throw vs Control Spell:** Skeleton 1 WIS save: roll 13+0=13 vs DC 17 — FAIL (incapacitated, under Bard's control).
- **[Skeleton 2] WIS Saving Throw vs Control Spell:** Skeleton 2 WIS save: roll 19+0=19 vs DC 17 — PASS (resists, remains active).
- **[Skeleton 3] WIS Saving Throw vs Control Spell:** Skeleton 3 WIS save: roll 2+0=2 vs DC 17 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 2/3 enemies. Bard is now concentrating. Remaining free enemies: 4.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 4+4=8 vs AC 14 — MISS.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 16+4=20 vs AC 14 — HIT. Deals 5 damage. Bard HP: 47/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 5 damage (DC 10 = max(10, ⌊5/2⌋)): roll 10 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 12+4=16 vs AC 14 — HIT. Deals 8 damage. Bard HP: 39/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 8 damage (DC 10 = max(10, ⌊8/2⌋)): roll 15 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 2+4=6 vs AC 14 — MISS.
- **[Skeleton 1] End-of-Round: WIS Save to Break Free from Control:** Skeleton 1 (controlled) WIS save to break free: roll 10+0=10 vs DC 17 — FAIL (remains incapacitated)
- **[Skeleton 3] End-of-Round: WIS Save to Break Free from Control:** Skeleton 3 (controlled) WIS save to break free: roll 20+0=20 vs DC 17 — PASS (breaks free at 13/13 HP and rejoins combat)
- **[Round Summary] End of Round 1:** Bard HP: 39/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 5 | Enemies controlled: 1

> *End of Round 1: Bard HP 39/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Skeleton 2 (13/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*
> *Controlled: Skeleton 1 (13/13 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 2: roll 18+5=23 vs AC 13 — HIT. Deals 4 damage. Skeleton 2 HP: 9/13.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 6+4=10 vs AC 14 — MISS.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 6+4=10 vs AC 14 — MISS.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 4+4=8 vs AC 14 — MISS.
- **[Skeleton Archer 1] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton Archer 1 attacks: roll 14+4 — deflected by Mirror Image (mirror check roll: 4 ≤ 6). Mirror Image charges remaining: 2.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 6+4=10 vs AC 14 — MISS.
- **[Skeleton 1] End-of-Round: WIS Save to Break Free from Control:** Skeleton 1 (controlled) WIS save to break free: roll 3+0=3 vs DC 17 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 2:** Bard HP: 39/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 5 | Enemies controlled: 1

> *End of Round 2: Bard HP 39/52 | Concentrating: true | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Skeleton 2 (9/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*
> *Controlled: Skeleton 1 (13/13 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 2: roll 2+5=7 vs AC 13 — MISS.
- **[Skeleton 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 2 attacks: roll 14+4 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 1.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 7+4=11 vs AC 14 — MISS.
- **[Skeleton 4] Attack Deflected by Mirror Image (AI: Melee Attack):** Skeleton 4 attacks: roll 11+4 — deflected by Mirror Image (mirror check roll: 5 ≤ 6). Mirror Image charges remaining: 0.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 19+4=23 vs AC 14 — HIT. Deals 6 damage. Bard HP: 33/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 6 damage (DC 10 = max(10, ⌊6/2⌋)): roll 20 vs DC 10 — SUCCESS (concentration maintained)
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 15+4=19 vs AC 14 — HIT. Deals 4 damage. Bard HP: 29/52.
- **[Bard] Concentration Saving Throw:** Concentration check after taking 4 damage (DC 10 = max(10, ⌊4/2⌋)): roll 5 vs DC 10 — FAIL (concentration broken)
- **[Bard] Concentration Broken:** Concentration lost. 1 controlled enemy/enemies shake free at half HP (Skeleton 1: 7/13 HP).
- **[Round Summary] End of Round 3:** Bard HP: 29/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0 | Enemies active/free: 6 | Enemies controlled: 0

> *End of Round 3: Bard HP 29/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (7/13 HP), Skeleton 2 (9/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 2+5=7 vs AC 13 — MISS.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 2+4=6 vs AC 14 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 17+4=21 vs AC 14 — HIT. Deals 5 damage. Bard HP: 24/52.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 1+4=5 vs AC 14 — MISS.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 9+4=13 vs AC 14 — MISS.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 17+4=21 vs AC 14 — HIT. Deals 6 damage. Bard HP: 18/52.
- **[Skeleton Archer 2] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 2 attacks Bard: roll 13+4=17 vs AC 14 — HIT. Deals 5 damage. Bard HP: 13/52.
- **[Round Summary] End of Round 4:** Bard HP: 13/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0 | Enemies active/free: 6 | Enemies controlled: 0

> *End of Round 4: Bard HP 13/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (7/13 HP), Skeleton 2 (9/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Skeleton 1: roll 17+5=22 vs AC 13 — HIT. Deals 3 damage. Skeleton 1 HP: 4/13.
- **[Skeleton 1] Melee/Ranged Attack (AI: Attack):** Skeleton 1 attacks Bard: roll 4+4=8 vs AC 14 — MISS.
- **[Skeleton 2] Melee/Ranged Attack (AI: Attack):** Skeleton 2 attacks Bard: roll 11+4=15 vs AC 14 — HIT. Deals 8 damage. Bard HP: 5/52.
- **[Skeleton 3] Melee/Ranged Attack (AI: Attack):** Skeleton 3 attacks Bard: roll 4+4=8 vs AC 14 — MISS.
- **[Skeleton 4] Melee/Ranged Attack (AI: Attack):** Skeleton 4 attacks Bard: roll 16+4=20 vs AC 14 — HIT. Deals 4 damage. Bard HP: 1/52.
- **[Skeleton Archer 1] Melee/Ranged Attack (AI: Attack):** Skeleton Archer 1 attacks Bard: roll 10+4=14 vs AC 14 — HIT. Deals 8 damage. Bard HP: -7/52.
- **[Bard] Death:** Bard drops to 0 HP. DEFEAT.

> *End of Round 5: Bard HP -7/52 | Concentrating: false | Breaks: 1 | Mirror Images: 0*
> *Active enemies: Skeleton 1 (4/13 HP), Skeleton 2 (9/13 HP), Skeleton 3 (13/13 HP), Skeleton 4 (13/13 HP), Skeleton Archer 1 (13/13 HP), Skeleton Archer 2 (13/13 HP)*

---

### Combat: Warlock's Hold (HARD)

**Enemy Roster:**
- Warlock 1: HP 32, AC 13, Attack +5, Damage 1d10+3
- Cultist 1: HP 9, AC 12, Attack +3, Damage 1d6+1
- Cultist 2: HP 9, AC 12, Attack +3, Damage 1d6+1

**Outcome: VICTORY**  
Rounds: 12 | Damage taken: 46 | Concentration breaks: 0

#### Pre-Combat / Initiative Phase

- **[Bard] Initiative:** No Alert feat: coin-flip initiative — enemies won. Enemies act before the bard in round 1 (bard has no Mirror Image or control spell up yet).
- **[Warlock 1] Pre-Round Surprise Attack:** Warlock 1 attacks Bard (pre-round, no Mirror Image): roll 12+5=17 vs AC 14 — HIT. Deals 7 damage. Bard HP: 45/52.
- **[Cultist 1] Pre-Round Surprise Attack:** Cultist 1 attacks Bard (pre-round): roll 5+3=8 vs AC 14 — MISS.
- **[Cultist 2] Pre-Round Surprise Attack:** Cultist 2 attacks Bard (pre-round, no Mirror Image): roll 16+3=19 vs AC 14 — HIT. Deals 2 damage. Bard HP: 43/52.

> *End of pre-combat: Bard HP 43/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (32/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 1

- **[Bard] Cast Hold Person (Action):** Bard casts Hold Person (DC 17) targeting 3 of 3 active enemies. Spell attack bonus: +8.
- **[Warlock 1] WIS Saving Throw vs Control Spell:** Warlock 1 WIS save: roll 17+0=17 vs DC 17 — PASS (resists, remains active).
- **[Cultist 1] WIS Saving Throw vs Control Spell:** Cultist 1 WIS save: roll 4+0=4 vs DC 17 — FAIL (incapacitated, under Bard's control).
- **[Cultist 2] WIS Saving Throw vs Control Spell:** Cultist 2 WIS save: roll 2+0=2 vs DC 17 — FAIL (incapacitated, under Bard's control).
- **[Bard] Concentration Started:** Hold Person incapacitated 2/3 enemies. Bard is now concentrating. Remaining free enemies: 1.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 20+1=21 vs DC 14 — PASS (spell resisted!)
- **[Cultist 1] End-of-Round: WIS Save to Break Free from Control:** Cultist 1 (controlled) WIS save to break free: roll 3+0=3 vs DC 17 — FAIL (remains incapacitated)
- **[Cultist 2] End-of-Round: WIS Save to Break Free from Control:** Cultist 2 (controlled) WIS save to break free: roll 11+0=11 vs DC 17 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 1:** Bard HP: 43/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 1 | Enemies controlled: 2

> *End of Round 1: Bard HP 43/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (32/32 HP)*
> *Controlled: Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 2

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 11+5=16 vs AC 13 — HIT. Deals 6 damage. Warlock 1 HP: 26/32.
- **[Warlock 1] Melee/Ranged Attack (AI: Attack):** Warlock 1 attacks Bard: roll 2+5=7 vs AC 14 — MISS.
- **[Cultist 1] End-of-Round: WIS Save to Break Free from Control:** Cultist 1 (controlled) WIS save to break free: roll 17+0=17 vs DC 17 — PASS (breaks free at 9/9 HP and rejoins combat)
- **[Cultist 2] End-of-Round: WIS Save to Break Free from Control:** Cultist 2 (controlled) WIS save to break free: roll 13+0=13 vs DC 17 — FAIL (remains incapacitated)
- **[Round Summary] End of Round 2:** Bard HP: 43/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 2 | Enemies controlled: 1

> *End of Round 2: Bard HP 43/52 | Concentrating: true | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (26/32 HP), Cultist 1 (9/9 HP)*
> *Controlled: Cultist 2 (9/9 HP)*

#### Round 3

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 12+5=17 vs AC 13 — HIT. Deals 3 damage. Warlock 1 HP: 23/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 19+1=20 vs DC 14 — PASS (spell resisted!)
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 8+3=11 vs AC 14 — MISS.
- **[Cultist 2] End-of-Round: WIS Save to Break Free from Control:** Cultist 2 (controlled) WIS save to break free: roll 18+0=18 vs DC 17 — PASS (breaks free at 9/9 HP and rejoins combat)
- **[Bard] Concentration Ends (No Targets):** All controlled enemies have broken free. Concentration spell ends naturally.
- **[Round Summary] End of Round 3:** Bard HP: 43/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 3: Bard HP 43/52 | Concentrating: false | Breaks: 0 | Mirror Images: 3*
> *Active enemies: Warlock 1 (23/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 4

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 10+5=15 vs AC 13 — HIT. Deals 3 damage. Warlock 1 HP: 20/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 3+1=4 vs DC 14 — FAIL (bard incapacitated)
- **[Warlock 1] Incapacitation Damage:** Bard incapacitated — takes automatic 8 damage. Bard HP: 35/52.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 15+3=18 vs AC 14 — HIT. Deals 4 damage. Bard HP: 31/52.
- **[Cultist 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 2 attacks: roll 13+3 — deflected by Mirror Image (mirror check roll: 2 ≤ 6). Mirror Image charges remaining: 2.
- **[Round Summary] End of Round 4:** Bard HP: 31/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 4: Bard HP 31/52 | Concentrating: false | Breaks: 0 | Mirror Images: 2*
> *Active enemies: Warlock 1 (20/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 5

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 9+5=14 vs AC 13 — HIT. Deals 5 damage. Warlock 1 HP: 15/32.
- **[Warlock 1] Cast Incapacitating Spell (AI: Spellcast):** Warlock 1 AI decision: cast incapacitating spell (DC 14). Bard WIS save: roll 17+1=18 vs DC 14 — PASS (spell resisted!)
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 16+3=19 vs AC 14 — HIT. Deals 5 damage. Bard HP: 26/52.
- **[Cultist 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 2 attacks: roll 14+3 — deflected by Mirror Image (mirror check roll: 3 ≤ 6). Mirror Image charges remaining: 1.
- **[Round Summary] End of Round 5:** Bard HP: 26/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 5: Bard HP 26/52 | Concentrating: false | Breaks: 0 | Mirror Images: 1*
> *Active enemies: Warlock 1 (15/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 6

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 20+5=25 vs AC 13 — HIT (CRITICAL). Deals 10 damage. Warlock 1 HP: 5/32.
- **[Warlock 1] Melee/Ranged Attack (AI: Attack):** Warlock 1 attacks Bard: roll 7+5=12 vs AC 14 — MISS.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 9+3=12 vs AC 14 — MISS.
- **[Cultist 2] Attack Deflected by Mirror Image (AI: Melee Attack):** Cultist 2 attacks: roll 4+3 — deflected by Mirror Image (mirror check roll: 4 ≤ 6). Mirror Image charges remaining: 0.
- **[Round Summary] End of Round 6:** Bard HP: 26/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 3 | Enemies controlled: 0

> *End of Round 6: Bard HP 26/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Warlock 1 (5/32 HP), Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*

#### Round 7

- **[Bard] Weapon Attack (Action):** Bard attacks Warlock 1: roll 12+5=17 vs AC 13 — HIT. Deals 5 damage. Warlock 1 HP: 0/32.
- **[Warlock 1] Defeated:** Warlock 1 drops to 0 HP and is defeated.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 3+3=6 vs AC 14 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 17+3=20 vs AC 14 — HIT. Deals 6 damage. Bard HP: 20/52.
- **[Round Summary] End of Round 7:** Bard HP: 20/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 7: Bard HP 20/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*
> *Defeated: Warlock 1*

#### Round 8

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 1: roll 5+5=10 vs AC 12 — MISS.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 5+3=8 vs AC 14 — MISS.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 20+3=23 vs AC 14 — HIT (CRITICAL). Deals 5 damage. Bard HP: 15/52.
- **[Round Summary] End of Round 8:** Bard HP: 15/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 8: Bard HP 15/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Cultist 1 (9/9 HP), Cultist 2 (9/9 HP)*
> *Defeated: Warlock 1*

#### Round 9

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 1: roll 9+5=14 vs AC 12 — HIT. Deals 6 damage. Cultist 1 HP: 3/9.
- **[Cultist 1] Melee/Ranged Attack (AI: Attack):** Cultist 1 attacks Bard: roll 16+3=19 vs AC 14 — HIT. Deals 6 damage. Bard HP: 9/52.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 8+3=11 vs AC 14 — MISS.
- **[Round Summary] End of Round 9:** Bard HP: 9/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 2 | Enemies controlled: 0

> *End of Round 9: Bard HP 9/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Cultist 1 (3/9 HP), Cultist 2 (9/9 HP)*
> *Defeated: Warlock 1*

#### Round 10

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 1: roll 7+5=12 vs AC 12 — HIT. Deals 7 damage. Cultist 1 HP: 0/9.
- **[Cultist 1] Defeated:** Cultist 1 drops to 0 HP and is defeated.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 13+3=16 vs AC 14 — HIT. Deals 3 damage. Bard HP: 6/52.
- **[Round Summary] End of Round 10:** Bard HP: 6/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 1 | Enemies controlled: 0

> *End of Round 10: Bard HP 6/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Cultist 2 (9/9 HP)*
> *Defeated: Warlock 1, Cultist 1*

#### Round 11

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 2: roll 10+5=15 vs AC 12 — HIT. Deals 3 damage. Cultist 2 HP: 6/9.
- **[Cultist 2] Melee/Ranged Attack (AI: Attack):** Cultist 2 attacks Bard: roll 1+3=4 vs AC 14 — MISS.
- **[Round Summary] End of Round 11:** Bard HP: 6/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0 | Enemies active/free: 1 | Enemies controlled: 0

> *End of Round 11: Bard HP 6/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Active enemies: Cultist 2 (6/9 HP)*
> *Defeated: Warlock 1, Cultist 1*

#### Round 12

- **[Bard] Weapon Attack (Action):** Bard attacks Cultist 2: roll 11+5=16 vs AC 12 — HIT. Deals 9 damage. Cultist 2 HP: 0/9.
- **[Cultist 2] Defeated:** Cultist 2 drops to 0 HP and is defeated.
- **[Bard] Round End:** All enemies defeated or controlled. VICTORY.

> *End of Round 12: Bard HP 6/52 | Concentrating: false | Breaks: 0 | Mirror Images: 0*
> *Defeated: Warlock 1, Cultist 1, Cultist 2*

---

## Social Encounter Logs

### Social: Convince the City Guard

*Persuade the gate captain to grant passage without proper documentation.*

**Skill:** Persuasion | **DC:** 14 | **Skill Bonus:** +11

**Result:** Persuasion check: CHA 5 + expertise (6) = +11. Roll: 14. Total: 14+11=25 vs DC 14 — SUCCESS (25 ≥ 14).

**Outcome: SUCCESS**

### Social: Infiltrate the Noble Gala

*Masquerade as a court bard to access the noble's private quarters.*

**Skill:** Deception | **DC:** 16 | **Skill Bonus:** +11
**Advantages:** Actor feat (advantage on Deception), Hat of Disguise (advantage on Deception while disguised)

**Result:** Deception check: CHA 5 + expertise (6) = +11. ADVANTAGE (Actor feat (advantage on Deception), Hat of Disguise (advantage on Deception while disguised)): rolls [13,2] take higher=13. Total: 13+11=24 vs DC 16 — SUCCESS (24 ≥ 16).

**Outcome: SUCCESS**

### Social: Inspire the Downtrodden

*Rally a crowd of refugees with a stirring ballad to restore their hope.*

**Skill:** Performance | **DC:** 12 | **Skill Bonus:** +8
**Advantages:** Actor feat (advantage on Performance)

**Result:** Performance check: CHA 5 + proficiency (3) = +8. ADVANTAGE (Actor feat (advantage on Performance)): rolls [9,15] take higher=15. Total: 15+8=23 vs DC 12 — SUCCESS (23 ≥ 12).

**Outcome: SUCCESS**

---

## Party Support Encounter Logs

### Party Support: The Dragon Ambush (combat-support)

#### Round 1

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(4)+5=9 HP restored. Spell slots remaining: 3.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.

> *Inspiration dice: 4 | Healing slots: 3 | Inspirations given: 1 | Healing dealt: 9 HP | Features activated: 0*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.

> *Inspiration dice: 3 | Healing slots: 3 | Inspirations given: 2 | Healing dealt: 9 HP | Features activated: 0*

#### Round 3

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(1)+5=6 HP restored. Spell slots remaining: 2.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 2 | Healing slots: 2 | Inspirations given: 3 | Healing dealt: 15 HP | Features activated: 1*

#### Round 4

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 1.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 3.

> *Inspiration dice: 1 | Healing slots: 2 | Inspirations given: 4 | Healing dealt: 15 HP | Features activated: 2*

#### Round 5

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 1 → 6 (max 10). Reactive feature uses reset to 5.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 5.

> *Inspiration dice: 5 | Healing slots: 2 | Inspirations given: 5 | Healing dealt: 15 HP | Features activated: 2*

#### Round 6

- **[Bard] Healing Word (Bonus Action):** Ally is downed — Bard casts Healing Word (bonus action): d4(2)+5=7 HP restored. Spell slots remaining: 1.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.

> *Inspiration dice: 4 | Healing slots: 1 | Inspirations given: 6 | Healing dealt: 22 HP | Features activated: 2*

#### Round 7

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 3 | Healing slots: 1 | Inspirations given: 7 | Healing dealt: 22 HP | Features activated: 3*

#### Round 8

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 2 | Healing slots: 1 | Inspirations given: 8 | Healing dealt: 22 HP | Features activated: 4*

**Summary:** 8 inspirations given | 22 HP healed | 4 feature activations

---

### Party Support: The Road to Baldur's Gate (mixed)

#### Round 1

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 1 | Healing dealt: 0 HP | Features activated: 1*

#### Round 2

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 3.

> *Inspiration dice: 3 | Healing slots: 4 | Inspirations given: 2 | Healing dealt: 0 HP | Features activated: 1*

#### Round 3

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 2.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 2 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 3*

#### Round 4

- **[Bard] Short Rest:** Mid-encounter short rest: Bardic Inspiration replenished from 2 → 7 (max 10). Reactive feature uses reset to 5.
- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 6.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 6 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 4*

#### Round 5

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 5.

> *Inspiration dice: 5 | Healing slots: 4 | Inspirations given: 5 | Healing dealt: 0 HP | Features activated: 4*

#### Round 6

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 4.
- **[Bard] Counterspell (Reaction):** Enemy cast a spell — Bard counters it with Counterspell (reaction), negating the spell entirely.

> *Inspiration dice: 4 | Healing slots: 4 | Inspirations given: 6 | Healing dealt: 0 HP | Features activated: 5*

**Summary:** 6 inspirations given | 0 HP healed | 5 feature activations

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

> *Inspiration dice: 7 | Healing slots: 4 | Inspirations given: 3 | Healing dealt: 0 HP | Features activated: 1*

#### Round 4

- **[Bard] Bardic Inspiration (Bonus Action):** Lore Bard: grants Bardic Inspiration d8 to an ally. Dice remaining: 6.
- **[Bard] Cutting Words (Reaction):** Lore Bard: Cutting Words — impose disadvantage on enemy roll (subtract d8 from their total). Reactive uses remaining: 4.

> *Inspiration dice: 6 | Healing slots: 4 | Inspirations given: 4 | Healing dealt: 0 HP | Features activated: 2*

**Summary:** 4 inspirations given | 0 HP healed | 2 feature activations

---
