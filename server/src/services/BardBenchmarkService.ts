/**
 * BardBenchmarkService
 *
 * Savras has foreseen the need for a bard — a voice to carry his truth into the world.
 * This service defines three Level 8 bard candidates, runs them through standardised
 * combat and social encounter simulations, and ranks them by composite performance score.
 *
 * Combat weight: 50%  (survive long enough to sing the tale)
 * Social weight:  50%  (inspire, enchant, and persuade the masses)
 */

// ─── Candidate Data Types ─────────────────────────────────────────────────────

export interface BardAbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface BardSpell {
  name: string;
  level: number;
  school: string;
  type: 'damage' | 'control' | 'support' | 'social' | 'utility' | 'defense';
}

export interface BardEquipment {
  name: string;
  type: string;
  rarity: 'common' | 'uncommon' | 'rare';
  properties: string[];
  damage?: string;
  armorClass?: number;
}

export interface BardCandidate {
  id: string;
  name: string;
  species: string;
  subspecies: string;
  subclass: string;
  background: string;
  abilityScores: BardAbilityScores;
  armorClass: number;
  maxHitPoints: number;
  speed: number;
  proficiencyBonus: number;
  savingThrows: string[];
  skillProficiencies: string[];
  skillExpertise: string[];
  feats: Array<{ name: string; description: string }>;
  spells: BardSpell[];
  equipment: BardEquipment[];
  specialTraits: string[];
  lore: string;
}

// ─── Benchmark Result Types ────────────────────────────────────────────────────

export interface CombatScenarioResult {
  scenarioName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  iterationsRun: number;
  wins: number;
  losses: number;
  averageRoundsToVictory: number;
  averageDamageTaken: number;
  survivalRate: number;
  score: number;
}

export interface SocialScenarioResult {
  scenarioName: string;
  skill: string;
  dc: number;
  iterationsRun: number;
  successes: number;
  criticalSuccesses: number;
  averageRoll: number;
  successRate: number;
  score: number;
}

export interface BenchmarkResult {
  candidateId: string;
  candidateName: string;
  species: string;
  subclass: string;
  combatScore: number;
  socialScore: number;
  compositeScore: number;
  rank: number;
  combatDetails: CombatScenarioResult[];
  socialDetails: SocialScenarioResult[];
  strengths: string[];
  weaknesses: string[];
  savrasAssessment: string;
}

// ─── Simulation Scenarios ─────────────────────────────────────────────────────

interface CombatScenario {
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  enemies: Array<{ name: string; hp: number; ac: number; attackBonus: number; damage: string; count: number }>;
  rounds: number;
}

interface SocialScenario {
  name: string;
  skill: string;
  dc: number;
  description: string;
}

const COMBAT_SCENARIOS: CombatScenario[] = [
  {
    name: 'Bandit Ambush',
    difficulty: 'easy',
    enemies: [{ name: 'Bandit', hp: 11, ac: 12, attackBonus: 3, damage: '1d6+1', count: 2 }],
    rounds: 10,
  },
  {
    name: 'Gnoll War Band',
    difficulty: 'medium',
    enemies: [
      { name: 'Gnoll', hp: 22, ac: 15, attackBonus: 4, damage: '2d6+2', count: 3 },
    ],
    rounds: 15,
  },
  {
    name: 'Undead Horde',
    difficulty: 'hard',
    enemies: [
      { name: 'Skeleton', hp: 13, ac: 13, attackBonus: 4, damage: '1d6+2', count: 4 },
      { name: 'Skeleton Archer', hp: 13, ac: 13, attackBonus: 4, damage: '1d6+2', count: 2 },
    ],
    rounds: 20,
  },
];

const SOCIAL_SCENARIOS: SocialScenario[] = [
  {
    name: 'Convince the City Guard',
    skill: 'Persuasion',
    dc: 14,
    description: 'Persuade the gate captain to grant passage without proper documentation.',
  },
  {
    name: 'Infiltrate the Noble Gala',
    skill: 'Deception',
    dc: 16,
    description: 'Masquerade as a court bard to access the noble\'s private quarters.',
  },
  {
    name: 'Inspire the Downtrodden',
    skill: 'Performance',
    dc: 12,
    description: 'Rally a crowd of refugees with a stirring ballad to restore their hope.',
  },
];

// ─── Dice Rolling ─────────────────────────────────────────────────────────────

function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

function parseDamage(dice: string): number {
  // Supports formats like "1d6+1", "2d6+2", "1d6"
  const match = dice.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (!match) return 1;
  const count = parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const bonus = match[3] ? parseInt(match[3], 10) : 0;
  let total = bonus;
  for (let i = 0; i < count; i++) {
    total += rollDie(sides);
  }
  return total;
}

function modifierFor(score: number): number {
  return Math.floor((score - 10) / 2);
}

// ─── Candidate Definitions ────────────────────────────────────────────────────

/**
 * Build 1: Lyra Silverstring — Half-Elf, College of Lore
 *
 * The all-knowing bard. Lyra collects information the way Savras collects futures.
 * Her silver tongue and versatile spellbook make her deadly at the negotiating table
 * and a formidable disruption on the battlefield. Counterspell and Hypnotic Pattern
 * ensure she is never helpless in combat.
 */
const LYRA_SILVERSTRING: BardCandidate = {
  id: 'lyra-silverstring',
  name: 'Lyra Silverstring',
  species: 'Half-Elf',
  subspecies: 'Standard Half-Elf',
  subclass: 'College of Lore',
  background: 'Sage',
  abilityScores: {
    strength: 8,
    dexterity: 14,
    constitution: 14,
    intelligence: 12,
    wisdom: 12,
    charisma: 20,
  },
  armorClass: 14, // Studded Leather + DEX modifier
  maxHitPoints: 52, // 8d8 + 2×8 CON (avg 4.5 per die) = ~52
  speed: 30,
  proficiencyBonus: 3,
  savingThrows: ['Dexterity', 'Charisma'],
  skillProficiencies: [
    'Arcana', 'History', 'Insight', 'Perception', 'Persuasion',
    'Deception', 'Performance',
  ],
  skillExpertise: ['Persuasion', 'Deception'],
  feats: [
    {
      name: 'War Caster',
      description: 'Advantage on Constitution saving throws to maintain concentration. Can cast spells as opportunity attacks.',
    },
    {
      name: 'Inspiring Leader',
      description: 'After a 10-minute speech, grant up to 6 creatures temporary HP equal to your level + CHA modifier.',
    },
  ],
  spells: [
    { name: 'Vicious Mockery', level: 0, school: 'Enchantment', type: 'damage' },
    { name: 'Minor Illusion', level: 0, school: 'Illusion', type: 'utility' },
    { name: 'Prestidigitation', level: 0, school: 'Transmutation', type: 'utility' },
    { name: 'Healing Word', level: 1, school: 'Evocation', type: 'support' },
    { name: 'Charm Person', level: 1, school: 'Enchantment', type: 'social' },
    { name: 'Thunderwave', level: 1, school: 'Evocation', type: 'damage' },
    { name: 'Suggestion', level: 2, school: 'Enchantment', type: 'social' },
    { name: 'Mirror Image', level: 2, school: 'Illusion', type: 'defense' },
    { name: 'Hold Person', level: 2, school: 'Enchantment', type: 'control' },
    { name: 'Hypnotic Pattern', level: 3, school: 'Illusion', type: 'control' },
    { name: 'Counterspell', level: 3, school: 'Abjuration', type: 'defense' },
    { name: 'Dimension Door', level: 4, school: 'Conjuration', type: 'utility' },
    { name: 'Hold Monster', level: 5, school: 'Enchantment', type: 'control' },
  ],
  equipment: [
    { name: 'Rapier', type: 'weapon', rarity: 'common', properties: ['finesse'], damage: '1d8' },
    { name: 'Studded Leather Armor', type: 'armor', rarity: 'common', properties: [], armorClass: 12 },
    { name: 'Lute', type: 'instrument', rarity: 'common', properties: ['focus'] },
    {
      name: 'Hat of Disguise',
      type: 'wondrous item',
      rarity: 'uncommon',
      properties: ['cast Disguise Self at will', 'social infiltration'],
    },
    {
      name: 'Cloak of Protection',
      type: 'wondrous item',
      rarity: 'uncommon',
      properties: ['+1 AC', '+1 to all saving throws'],
      armorClass: 1,
    },
  ],
  specialTraits: [
    'Fey Ancestry: Advantage on saves vs. charm, immune to magical sleep',
    'Skill Versatility: Two bonus skill proficiencies (Perception, Performance)',
    'Cutting Words: Impose disadvantage on enemy attack rolls, ability checks, or damage',
    'Jack of All Trades: Add half proficiency to non-proficient ability checks',
    'Bardic Inspiration (d8): Grant a d8 to an ally\'s roll',
    'Magical Secrets (L6): Counterspell and Dimension Door from the Wizard list',
  ],
  lore: 'Lyra spent her mortal years collecting secrets in the great libraries of Candlekeep, ' +
    'where she learned that knowledge — like Savras himself — is most powerful when ' +
    'revealed at exactly the right moment. She is the chronicler, the keeper of truths.',
};

/**
 * Build 2: Cadwyn Ironbeat — Variant Human, College of Valor
 *
 * The warrior-bard. Where Lyra wins with words, Cadwyn wins with steel and song.
 * Trained in the arena traditions, his Combat Inspiration and Extra Attack make him
 * a genuine threat in melee, while his bardic magic ensures he is never predictable.
 */
const CADWYN_IRONBEAT: BardCandidate = {
  id: 'cadwyn-ironbeat',
  name: 'Cadwyn Ironbeat',
  species: 'Human',
  subspecies: 'Variant Human',
  subclass: 'College of Valor',
  background: 'Entertainer',
  abilityScores: {
    strength: 12,
    dexterity: 16,
    constitution: 14,
    intelligence: 10,
    wisdom: 12,
    charisma: 18,
  },
  armorClass: 17, // Breastplate (14) + DEX modifier cap (+2) + Shield (+2) = 18; without shield: 14 + 3 = 17. Using shield-free for spellcasting flexibility.
  maxHitPoints: 58, // 8d8 avg + 2×8 CON + Tough feat
  speed: 30,
  proficiencyBonus: 3,
  savingThrows: ['Dexterity', 'Charisma'],
  skillProficiencies: [
    'Athletics', 'Acrobatics', 'Intimidation', 'Performance',
    'Persuasion', 'Perception',
  ],
  skillExpertise: ['Performance', 'Athletics'],
  feats: [
    {
      name: 'Alert',
      description: '+5 to initiative, cannot be surprised, enemies gain no advantage from hiding.',
    },
    {
      name: 'War Caster',
      description: 'Advantage on Constitution saving throws to maintain concentration. Can cast spells as opportunity attacks.',
    },
    {
      name: 'Tough',
      description: 'Maximum hit points increase by 2 per level (16 additional HP at level 8).',
    },
  ],
  spells: [
    { name: 'Vicious Mockery', level: 0, school: 'Enchantment', type: 'damage' },
    { name: 'Minor Illusion', level: 0, school: 'Illusion', type: 'utility' },
    { name: 'Healing Word', level: 1, school: 'Evocation', type: 'support' },
    { name: 'Thunderwave', level: 1, school: 'Evocation', type: 'damage' },
    { name: 'Bless', level: 1, school: 'Enchantment', type: 'support' },
    { name: 'Shatter', level: 2, school: 'Evocation', type: 'damage' },
    { name: 'Mirror Image', level: 2, school: 'Illusion', type: 'defense' },
    { name: 'Hold Person', level: 2, school: 'Enchantment', type: 'control' },
    { name: 'Fear', level: 3, school: 'Illusion', type: 'control' },
    { name: 'Hypnotic Pattern', level: 3, school: 'Illusion', type: 'control' },
    { name: 'Hold Monster', level: 5, school: 'Enchantment', type: 'control' },
  ],
  equipment: [
    { name: 'Rapier', type: 'weapon', rarity: 'common', properties: ['finesse'], damage: '1d8' },
    { name: 'Breastplate', type: 'armor', rarity: 'common', properties: [], armorClass: 14 },
    { name: 'Shield', type: 'shield', rarity: 'common', properties: [], armorClass: 2 },
    { name: 'Drum', type: 'instrument', rarity: 'common', properties: ['focus'] },
    {
      name: '+1 Rapier',
      type: 'weapon',
      rarity: 'uncommon',
      properties: ['finesse', '+1 attack and damage rolls'],
      damage: '1d8+1',
    },
    {
      name: 'Adamantine Armor (Breastplate)',
      type: 'armor',
      rarity: 'uncommon',
      properties: ['Critical hits against you become normal hits', '+0 AC (replaces standard breastplate)'],
      armorClass: 14,
    },
  ],
  specialTraits: [
    'Variant Human: +1 DEX, +1 STR, bonus Feat (Alert)',
    'Extra Attack: Attack twice when taking the Attack action',
    'Combat Inspiration: Allies can add Bardic Inspiration die to damage rolls',
    'Jack of All Trades: Add half proficiency to non-proficient ability checks',
    'Bardic Inspiration (d8): Grant a d8 to an ally\'s roll',
    'Bonus Proficiencies: Medium armor, shields, and martial weapons',
  ],
  lore: 'Cadwyn earned his name in the battle-arenas of the Sword Coast, where the drumbeat ' +
    'of his performances became synonymous with the rhythms of war. He knows that truth ' +
    'is often delivered at sword-point, and he is prepared to make that delivery personally.',
};

/**
 * Build 3: Vael Duskwhisper — Tiefling, College of Glamour
 *
 * The enchanter. Vael is the instrument of Savras in the courts, salons, and shadows
 * of civilisation. Where words fail, glamour succeeds. Her Mantle of Inspiration and
 * Enthralling Performance can sway entire crowds, while infernal fire ensures that
 * those who cannot be charmed will remember their mistake.
 */
const VAEL_DUSKWHISPER: BardCandidate = {
  id: 'vael-duskwhisper',
  name: 'Vael Duskwhisper',
  species: 'Tiefling',
  subspecies: 'Standard Tiefling',
  subclass: 'College of Glamour',
  background: 'Charlatan',
  abilityScores: {
    strength: 8,
    dexterity: 14,
    constitution: 14,
    intelligence: 12,
    wisdom: 12,
    charisma: 20,
  },
  armorClass: 14, // Studded Leather + DEX modifier
  maxHitPoints: 52,
  speed: 30,
  proficiencyBonus: 3,
  savingThrows: ['Dexterity', 'Charisma'],
  skillProficiencies: [
    'Deception', 'Persuasion', 'Performance', 'Insight',
    'Intimidation', 'Sleight of Hand',
  ],
  skillExpertise: ['Deception', 'Persuasion'],
  feats: [
    {
      name: 'Actor',
      description: '+1 Charisma, advantage on Deception and Performance, can mimic voices and sounds.',
    },
    {
      name: 'Inspiring Leader',
      description: 'After a 10-minute speech, grant temporary HP equal to level + CHA modifier to up to 6 creatures.',
    },
  ],
  spells: [
    { name: 'Vicious Mockery', level: 0, school: 'Enchantment', type: 'damage' },
    { name: 'Minor Illusion', level: 0, school: 'Illusion', type: 'utility' },
    { name: 'Prestidigitation', level: 0, school: 'Transmutation', type: 'utility' },
    { name: 'Charm Person', level: 1, school: 'Enchantment', type: 'social' },
    { name: 'Healing Word', level: 1, school: 'Evocation', type: 'support' },
    { name: 'Invisibility', level: 2, school: 'Illusion', type: 'utility' },
    { name: 'Suggestion', level: 2, school: 'Enchantment', type: 'social' },
    { name: 'Mirror Image', level: 2, school: 'Illusion', type: 'defense' },
    { name: 'Hypnotic Pattern', level: 3, school: 'Illusion', type: 'control' },
    { name: 'Fear', level: 3, school: 'Illusion', type: 'control' },
    { name: 'Dimension Door', level: 4, school: 'Conjuration', type: 'utility' },
    { name: 'Hold Monster', level: 5, school: 'Enchantment', type: 'control' },
  ],
  equipment: [
    { name: 'Rapier', type: 'weapon', rarity: 'common', properties: ['finesse'], damage: '1d8' },
    { name: 'Studded Leather Armor', type: 'armor', rarity: 'common', properties: [], armorClass: 12 },
    { name: 'Lute', type: 'instrument', rarity: 'common', properties: ['focus'] },
    {
      name: 'Hat of Disguise',
      type: 'wondrous item',
      rarity: 'uncommon',
      properties: ['cast Disguise Self at will', 'social infiltration'],
    },
    {
      name: 'Periapt of Proof against Poison',
      type: 'wondrous item',
      rarity: 'uncommon',
      properties: ['Immunity to poison damage', 'Immunity to the poisoned condition'],
    },
  ],
  specialTraits: [
    'Hellish Resistance: Resistance to fire damage',
    'Infernal Legacy: Thaumaturgy cantrip, Hellish Rebuke 2/day, Darkness 1/day',
    'Mantle of Inspiration: Bonus action to grant allies temporary HP and let them move',
    'Enthralling Performance: After performing for 1 minute, charm up to CHA-mod humanoids',
    'Jack of All Trades: Add half proficiency to non-proficient ability checks',
    'Bardic Inspiration (d8): Grant a d8 to an ally\'s roll',
    'Mantle of Majesty (L6): Cast Command as a bonus action each turn while concentrating',
  ],
  lore: 'Vael emerged from Avernus not as a conqueror, but as an observer. She learned that ' +
    'the most powerful beings in the Nine Hells were not the strongest — they were the most ' +
    'persuasive. She seeks Savras because she understands: the greatest power is knowing ' +
    'what others will do before they do it.',
};

export const BARD_CANDIDATES: BardCandidate[] = [
  LYRA_SILVERSTRING,
  CADWYN_IRONBEAT,
  VAEL_DUSKWHISPER,
];

// ─── Simulation Engine ─────────────────────────────────────────────────────────

/**
 * Simulate a single combat encounter for a candidate.
 * Returns: survival (boolean), rounds survived, damage taken.
 */
function simulateSingleCombat(
  candidate: BardCandidate,
  scenario: CombatScenario,
): { survived: boolean; roundsToEnd: number; damageTaken: number } {
  const cha = modifierFor(candidate.abilityScores.charisma);
  const dex = modifierFor(candidate.abilityScores.dexterity);
  const spellAttack = cha + candidate.proficiencyBonus;
  const spellSaveDC = 8 + cha + candidate.proficiencyBonus;

  // Build enemy list
  const enemies = scenario.enemies.flatMap((e) =>
    Array.from({ length: e.count }, (_, i) => ({
      name: `${e.name} ${i + 1}`,
      hp: e.hp,
      ac: e.ac,
      attackBonus: e.attackBonus,
      damage: e.damage,
      alive: true,
      savingThrow: 10, // enemy WIS save modifier (flat 0 bonus vs DC)
    }))
  );

  // Determine if candidate has useful combat spells
  const hasControlSpell = candidate.spells.some(
    (s) => s.type === 'control' && s.level >= 2 && s.level <= 4
  );
  const hasDefenseSpell = candidate.spells.some((s) => s.type === 'defense');
  const hasCounterspell = candidate.spells.some((s) => s.name === 'Counterspell');
  const hasMirrorImage = candidate.spells.some((s) => s.name === 'Mirror Image');
  const isValorBard = candidate.subclass === 'College of Valor';

  let candidateHp = candidate.maxHitPoints;
  let damageTaken = 0;
  let mirrorImageCharges = hasMirrorImage ? 3 : 0;
  let controlSpellUsed = false;

  // Cloak of Protection: +1 to saves and AC
  const hasCloakProtection = candidate.equipment.some((e) => e.name === 'Cloak of Protection');
  const acBonus = hasCloakProtection ? 1 : 0;
  const effectiveAC = candidate.armorClass + acBonus;

  // Adamantine Armor: convert crits to normal hits
  const hasAdamantine = candidate.equipment.some((e) =>
    e.name.toLowerCase().includes('adamantine')
  );

  // +1 Rapier bonus
  const weaponBonus = candidate.equipment.some((e) => e.name === '+1 Rapier') ? 1 : 0;
  const attackBonus = dex + candidate.proficiencyBonus + weaponBonus;

  let roundsElapsed = 0;

  for (let round = 1; round <= scenario.rounds; round++) {
    roundsElapsed = round;
    const aliveEnemies = enemies.filter((e) => e.alive);
    if (aliveEnemies.length === 0) break;

    // ── Candidate's turn ──────────────────────────────────────────────
    // Use control spell in round 1 if available and not yet used
    if (hasControlSpell && !controlSpellUsed && aliveEnemies.length >= 2) {
      // Hypnotic Pattern / Hold Person — enemies must make WIS save
      const savesNeeded = Math.min(aliveEnemies.length, 3);
      let controlled = 0;
      for (let ei = 0; ei < savesNeeded; ei++) {
        const savRoll = rollDie(20);
        if (savRoll + aliveEnemies[ei].savingThrow < spellSaveDC) {
          aliveEnemies[ei].alive = false; // Treat as incapacitated / removed from combat
          controlled++;
        }
      }
      controlSpellUsed = true;
    } else {
      // Attack with weapon (Valor gets Extra Attack at 6, so 2 attacks)
      const attacks = isValorBard ? 2 : 1;
      const target = aliveEnemies[0];
      for (let a = 0; a < attacks; a++) {
        const attackRoll = rollDie(20);
        const isCrit = attackRoll === 20;
        const hits = (attackRoll + attackBonus) >= target.ac;
        if (hits || isCrit) {
          const dmg = parseDamage('1d8') + dex + weaponBonus + (isCrit ? rollDie(8) : 0);
          target.hp -= dmg;
          if (target.hp <= 0) {
            target.alive = false;
            break;
          }
        }
      }
    }

    // Refresh alive enemies after candidate attacks
    const aliveAfterTurn = enemies.filter((e) => e.alive);
    if (aliveAfterTurn.length === 0) break;

    // ── Enemy turns ───────────────────────────────────────────────────
    for (const enemy of aliveAfterTurn) {
      const attackRoll = rollDie(20);
      const isCrit = attackRoll === 20 && !hasAdamantine;

      // Mirror Image: 1/3 chance of hitting an image instead
      if (mirrorImageCharges > 0) {
        const roll = rollDie(20);
        if (roll <= 6) {
          // Hit the image
          mirrorImageCharges--;
          continue;
        }
      }

      const hits = isCrit || (attackRoll + enemy.attackBonus) >= effectiveAC;
      if (hits) {
        const dmg = parseDamage(enemy.damage) + (isCrit ? parseDamage(enemy.damage.split('+')[0]) : 0);
        damageTaken += dmg;
        candidateHp -= dmg;
        if (candidateHp <= 0) {
          return { survived: false, roundsToEnd: round, damageTaken };
        }
      }
    }
  }

  const finalAlive = enemies.filter((e) => e.alive);
  return {
    survived: finalAlive.length === 0,
    roundsToEnd: roundsElapsed,
    damageTaken,
  };
}

/**
 * Simulate a single social scenario for a candidate.
 * Returns: success (boolean), roll result.
 */
function simulateSingleSocial(
  candidate: BardCandidate,
  scenario: SocialScenario,
): { success: boolean; roll: number; isCritSuccess: boolean } {
  const cha = modifierFor(candidate.abilityScores.charisma);
  const profBonus = candidate.proficiencyBonus;
  const isExpert = candidate.skillExpertise.includes(scenario.skill);
  const isProficient = candidate.skillProficiencies.includes(scenario.skill);

  let skillBonus = cha;
  if (isExpert) {
    skillBonus += profBonus * 2;
  } else if (isProficient) {
    skillBonus += profBonus;
  }

  // Actor feat: advantage on Deception and Performance
  const hasActorFeat = candidate.feats.some((f) => f.name === 'Actor');
  const hasAdvantage =
    hasActorFeat && (scenario.skill === 'Deception' || scenario.skill === 'Performance');

  // Hat of Disguise: advantage on social checks while in disguise (Deception / Persuasion)
  const hasHatOfDisguise = candidate.equipment.some((e) => e.name === 'Hat of Disguise');
  const disguiseAdvantage = hasHatOfDisguise && scenario.skill === 'Deception';

  const useAdvantage = hasAdvantage || disguiseAdvantage;

  let roll1 = rollDie(20);
  let roll2 = useAdvantage ? rollDie(20) : roll1;
  const roll = Math.max(roll1, roll2);
  const total = roll + skillBonus;

  return {
    success: total >= scenario.dc,
    roll: total,
    isCritSuccess: roll === 20,
  };
}

// ─── Benchmark Runner ──────────────────────────────────────────────────────────

const SIMULATION_ITERATIONS = 200;

function runCombatBenchmark(candidate: BardCandidate): CombatScenarioResult[] {
  return COMBAT_SCENARIOS.map((scenario) => {
    let wins = 0;
    let totalRounds = 0;
    let totalDamage = 0;

    for (let i = 0; i < SIMULATION_ITERATIONS; i++) {
      const result = simulateSingleCombat(candidate, scenario);
      if (result.survived) wins++;
      totalRounds += result.roundsToEnd;
      totalDamage += result.damageTaken;
    }

    const survivalRate = wins / SIMULATION_ITERATIONS;
    const avgRounds = totalRounds / SIMULATION_ITERATIONS;
    const avgDamage = totalDamage / SIMULATION_ITERATIONS;

    // Score: weighted by survival rate + speed of victory
    const speedBonus = scenario.difficulty === 'hard' ? 0 : (scenario.rounds - avgRounds) / scenario.rounds;
    const score = Math.round((survivalRate * 0.8 + speedBonus * 0.2) * 100);

    return {
      scenarioName: scenario.name,
      difficulty: scenario.difficulty,
      iterationsRun: SIMULATION_ITERATIONS,
      wins,
      losses: SIMULATION_ITERATIONS - wins,
      averageRoundsToVictory: parseFloat(avgRounds.toFixed(1)),
      averageDamageTaken: parseFloat(avgDamage.toFixed(1)),
      survivalRate: parseFloat((survivalRate * 100).toFixed(1)),
      score: Math.min(100, Math.max(0, score)),
    };
  });
}

function runSocialBenchmark(candidate: BardCandidate): SocialScenarioResult[] {
  return SOCIAL_SCENARIOS.map((scenario) => {
    let successes = 0;
    let critSuccesses = 0;
    let totalRoll = 0;

    for (let i = 0; i < SIMULATION_ITERATIONS; i++) {
      const result = simulateSingleSocial(candidate, scenario);
      if (result.success) successes++;
      if (result.isCritSuccess) critSuccesses++;
      totalRoll += result.roll;
    }

    const successRate = successes / SIMULATION_ITERATIONS;
    const avgRoll = totalRoll / SIMULATION_ITERATIONS;
    const score = Math.round(successRate * 100);

    return {
      scenarioName: scenario.name,
      skill: scenario.skill,
      dc: scenario.dc,
      iterationsRun: SIMULATION_ITERATIONS,
      successes,
      criticalSuccesses: critSuccesses,
      averageRoll: parseFloat(avgRoll.toFixed(1)),
      successRate: parseFloat((successRate * 100).toFixed(1)),
      score: Math.min(100, Math.max(0, score)),
    };
  });
}

function identifyStrengths(candidate: BardCandidate, combatResults: CombatScenarioResult[], socialResults: SocialScenarioResult[]): string[] {
  const strengths: string[] = [];
  const avgCombat = combatResults.reduce((s, r) => s + r.survivalRate, 0) / combatResults.length;
  const avgSocial = socialResults.reduce((s, r) => s + r.successRate, 0) / socialResults.length;

  if (avgCombat > 70) strengths.push('High combat survivability');
  if (avgSocial > 80) strengths.push('Exceptional social aptitude');
  if (candidate.abilityScores.charisma >= 20) strengths.push('Maximum Charisma (+5 modifier)');
  if (candidate.feats.some((f) => f.name === 'War Caster')) strengths.push('Concentration spell reliability (War Caster)');
  if (candidate.feats.some((f) => f.name === 'Alert')) strengths.push('Initiative dominance (Alert +5)');
  if (candidate.feats.some((f) => f.name === 'Actor')) strengths.push('Deception mastery (Actor feat)');
  if (candidate.feats.some((f) => f.name === 'Inspiring Leader')) strengths.push('Pre-combat HP buffer (Inspiring Leader)');
  if (candidate.subclass === 'College of Glamour') strengths.push('Mass social influence (Enthralling Performance)');
  if (candidate.subclass === 'College of Valor') strengths.push('Extra Attack for sustained melee pressure');
  if (candidate.subclass === 'College of Lore') strengths.push('Cutting Words + expanded spell selection (Magical Secrets)');
  if (candidate.skillExpertise.length >= 2) strengths.push(`Expertise in: ${candidate.skillExpertise.join(', ')}`);
  if (candidate.species === 'Half-Elf') strengths.push('Fey Ancestry: immune to charm/sleep effects');
  if (candidate.species === 'Tiefling') strengths.push('Hellish Resistance: fire damage resistance');

  return strengths;
}

function identifyWeaknesses(candidate: BardCandidate, combatResults: CombatScenarioResult[]): string[] {
  const weaknesses: string[] = [];
  const avgCombat = combatResults.reduce((s, r) => s + r.survivalRate, 0) / combatResults.length;

  if (avgCombat < 60) weaknesses.push('Below-average combat durability');
  if (candidate.armorClass < 15) weaknesses.push('Moderate AC — vulnerable to sustained attacks');
  if (candidate.maxHitPoints < 55) weaknesses.push('Below-average HP pool');
  if (!candidate.feats.some((f) => f.name === 'War Caster')) {
    weaknesses.push('No War Caster — concentration spells may drop under pressure');
  }
  if (candidate.abilityScores.strength <= 8) weaknesses.push('Low Strength — physical challenges are difficult');
  if (!candidate.spells.some((s) => s.name === 'Counterspell')) {
    weaknesses.push('No Counterspell — vulnerable to enemy spellcasters');
  }
  if (candidate.subclass === 'College of Glamour') weaknesses.push('Limited offensive spell damage output');
  if (candidate.subclass === 'College of Lore') weaknesses.push('Lower martial contribution than Valor');

  return weaknesses;
}

function generateSavrasAssessment(candidate: BardCandidate, combatScore: number, socialScore: number): string {
  const composite = (combatScore + socialScore) / 2;

  const assessments: Record<string, string> = {
    'lyra-silverstring': composite > 65
      ? 'Lyra sees patterns in the world as I do. Her Counterspell whispers: ' +
        '"I have already read your spell before you cast it." She is the scholar, ' +
        'the archivist of my truth. In her, knowledge becomes melody.'
      : 'Lyra\'s mind is sharp, but the battlefield may prove sharper still. ' +
        'She must strengthen her armor before she can strengthen my voice.',
    'cadwyn-ironbeat': composite > 65
      ? 'Cadwyn understands that truth sometimes arrives at the point of a blade. ' +
        'His combat prowess ensures that when he speaks my prophecies, none will ' +
        'dare silence him by force. The warrior-bard who cannot be shut down.'
      : 'Cadwyn\'s steel is strong, but in the courts where my word must echo loudest, ' +
        'iron discipline in social arts matters more than extra attacks.',
    'vael-duskwhisper': composite > 65
      ? 'Vael does not merely speak truth — she makes it irresistible. Her glamours ' +
        'open doors that armies could not breach. Among mortals who fear prophecy, ' +
        'she makes the bitter truth taste sweet enough to accept.'
      : 'Vael\'s enchantments are powerful, but a bard who cannot survive the ambush ' +
        'cannot deliver the message that arrives at the end of it.',
  };

  return assessments[candidate.id] ?? `${candidate.name} demonstrates a composite performance score of ${composite.toFixed(1)}.`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Run all benchmarks and return ranked results.
 */
export function runBardBenchmarks(): BenchmarkResult[] {
  const rawResults = BARD_CANDIDATES.map((candidate) => {
    const combatResults = runCombatBenchmark(candidate);
    const socialResults = runSocialBenchmark(candidate);

    const combatScore = Math.round(
      combatResults.reduce((s, r) => s + r.score, 0) / combatResults.length
    );
    const socialScore = Math.round(
      socialResults.reduce((s, r) => s + r.score, 0) / socialResults.length
    );
    const compositeScore = Math.round((combatScore + socialScore) / 2);

    return {
      candidateId: candidate.id,
      candidateName: candidate.name,
      species: `${candidate.species}${candidate.subspecies !== candidate.species ? ` (${candidate.subspecies})` : ''}`,
      subclass: candidate.subclass,
      combatScore,
      socialScore,
      compositeScore,
      rank: 0, // assigned below
      combatDetails: combatResults,
      socialDetails: socialResults,
      strengths: identifyStrengths(candidate, combatResults, socialResults),
      weaknesses: identifyWeaknesses(candidate, combatResults),
      savrasAssessment: generateSavrasAssessment(candidate, combatScore, socialScore),
    };
  });

  // Sort by composite score descending and assign ranks
  rawResults.sort((a, b) => b.compositeScore - a.compositeScore);
  rawResults.forEach((r, i) => {
    r.rank = i + 1;
  });

  return rawResults;
}

/**
 * Return all bard candidates without running benchmarks.
 */
export function getBardCandidates(): BardCandidate[] {
  return BARD_CANDIDATES;
}

/**
 * Return the top-ranked candidate after running all benchmarks.
 */
export function getTopBardRecommendation(): BenchmarkResult {
  const results = runBardBenchmarks();
  return results[0];
}
