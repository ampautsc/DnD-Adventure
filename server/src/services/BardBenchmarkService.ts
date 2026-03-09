/**
 * BardBenchmarkService
 *
 * Savras has foreseen the need for a bard — a voice to carry his truth into the world.
 * This service defines three Level 8 bard candidates, runs them through standardised
 * combat, social encounter, and party support simulations, then ranks them by composite score.
 *
 * Combat weight:        40%  (survive long enough to sing the tale)
 * Social weight:        40%  (inspire, enchant, and persuade the masses)
 * Party support weight: 20%  (make those around you stronger)
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

/**
 * Species combat abilities that are mechanically simulated turn-by-turn
 * in the combat engine. Flavour-only abilities are listed in specialTraits.
 */
export interface SpeciesCombatTraits {
  /**
   * Firbolg: Once per short rest, bonus action to turn invisible for 1 round.
   * Enemies attacking while Hidden Step is active have disadvantage.
   * Ends immediately if the Firbolg attacks, makes a damage roll, or forces a save.
   * Used defensively: bard activates after casting their control spell so enemies
   * must attack with disadvantage, protecting concentration.
   */
  hiddenStep?: boolean;
  /**
   * Eladrin: Once per short rest, bonus action to teleport up to 30 ft.
   * Used as an emergency escape when HP drops to 40% or below —
   * the bard repositions out of range, causing all enemy melee attacks to miss
   * for that round (enemies use their movement to close the gap again).
   */
  feyStep?: boolean;
  /**
   * Satyr, Yuan-Ti: Advantage on saving throws against spells and magical effects.
   * Meaningfully reduces the risk of incapacitation by enemy spellcasters (Hold Person,
   * Dominate Person, etc.). Particularly valuable in the Mage's Ambush scenario.
   */
  magicResistance?: boolean;
  /**
   * Yuan-Ti: Immunity to poison damage and the poisoned condition.
   * Prevents the poisoned condition (disadvantage on attack rolls / ability checks)
   * which is a common battlefield debuff from many enemies.
   */
  poisonImmunity?: boolean;
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
  /** Species-level combat abilities that are mechanically resolved each turn. */
  combatTraits?: SpeciesCombatTraits;
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
  averageConcentrationBreaks: number;
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

export interface PartySupportScenarioResult {
  scenarioName: string;
  type: 'combat-support' | 'social-support' | 'mixed';
  iterationsRun: number;
  avgInspirationsGiven: number;
  avgHealingDealt: number;
  avgFeatureActivations: number;
  score: number;
}

export interface BenchmarkResult {
  candidateId: string;
  candidateName: string;
  species: string;
  subclass: string;
  combatScore: number;
  socialScore: number;
  partyScore: number;
  compositeScore: number;
  rank: number;
  combatDetails: CombatScenarioResult[];
  socialDetails: SocialScenarioResult[];
  partySupportDetails: PartySupportScenarioResult[];
  strengths: string[];
  weaknesses: string[];
  savrasAssessment: string;
}

// ─── Scoring Weights ──────────────────────────────────────────────────────────

/**
 * Configurable weights for the composite scoring system.
 *
 * Scenario weights are **relative** — they are normalised internally, so only
 * the ratios matter. A scenario with weight 2.0 counts twice as much as one
 * with weight 1.0. A weight of 0 effectively excludes a scenario.
 *
 * Category weights determine how the three domain scores combine into the final
 * composite. Like scenario weights they are normalised, so 60/20/20 and
 * 3.0/1.0/1.0 produce identical results.
 */
export interface ScoringWeights {
  /** Per-scenario weights for each combat scenario, keyed by scenario name. */
  combatScenarios: Record<string, number>;
  /** Per-scenario weights for each social scenario, keyed by scenario name. */
  socialScenarios: Record<string, number>;
  /** Per-scenario weights for each party support scenario, keyed by scenario name. */
  partySupportScenarios: Record<string, number>;
  /** Category-level weights controlling the combat/social/partySupport split. */
  categoryWeights: {
    combat: number;
    social: number;
    partySupport: number;
  };
}

/**
 * A named campaign profile that bundles a full `ScoringWeights` configuration.
 * Profiles allow the scoring system to be tuned for different campaign archetypes
 * without requiring manual weight specification.
 */
export interface CampaignProfile {
  id: string;
  name: string;
  description: string;
  weights: ScoringWeights;
}

// ─── Simulation Scenarios ─────────────────────────────────────────────────────

interface CombatEnemy {
  name: string;
  hp: number;
  ac: number;
  attackBonus: number;
  damage: string;
  count: number;
  /**
   * Optional: if set, this enemy can cast an incapacitating spell (e.g. Hold Person).
   * On each of their turns, there is `spellUseChance` probability they attempt to cast.
   * The bard must make a WIS saving throw against this DC or be incapacitated for the round:
   * concentration breaks automatically and the bard takes an extra guaranteed hit.
   * Species with Magic Resistance roll their WIS save with advantage.
   */
  spellSaveDC?: number;
  spellUseChance?: number;
}

interface CombatScenario {
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  enemies: Array<CombatEnemy>;
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
  {
    // Scenario designed to test Magic Resistance (Satyr, Yuan-Ti) and general arcane threat.
    // The Warlock attacks with Eldritch Blast each round and may attempt to cast Hold Person
    // (WIS DC 14). An incapacitated bard breaks concentration and takes an extra hit.
    // Species with Magic Resistance have advantage on the Hold Person WIS save.
    name: "Warlock's Hold",
    difficulty: 'hard',
    enemies: [
      {
        name: 'Warlock',
        hp: 32,
        ac: 13,
        attackBonus: 5,
        damage: '1d10+3',
        count: 1,
        spellSaveDC: 14,
        spellUseChance: 0.40,
      },
      { name: 'Cultist', hp: 9, ac: 12, attackBonus: 3, damage: '1d6+1', count: 2 },
    ],
    rounds: 15,
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

interface PartySupportScenario {
  name: string;
  type: 'combat-support' | 'social-support' | 'mixed';
  partySize: number;
  rounds: number;
  allyNeedHealChance: number; // probability per round that an ally needs healing
  enemySpellChance: number;   // probability per round that an enemy casts a spell
}

const PARTY_SUPPORT_SCENARIOS: PartySupportScenario[] = [
  {
    name: 'The Dragon Ambush',
    type: 'combat-support',
    partySize: 4,
    rounds: 8,
    allyNeedHealChance: 0.30,
    enemySpellChance: 0.20,
  },
  {
    name: 'The Road to Baldur\'s Gate',
    type: 'mixed',
    partySize: 3,
    rounds: 6,
    allyNeedHealChance: 0.15,
    enemySpellChance: 0.25,
  },
  {
    name: 'The Lord\'s Alliance Summit',
    type: 'social-support',
    partySize: 4,
    rounds: 4,
    allyNeedHealChance: 0.05,
    enemySpellChance: 0.0,
  },
];

// ─── Default Weights & Campaign Profiles ─────────────────────────────────────

/**
 * Default scoring weights — equal weight for every scenario, category split at
 * 40 % combat / 40 % social / 20 % party support.  These are the weights used
 * when no profile or custom weights are supplied.
 */
export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  combatScenarios: {
    'Bandit Ambush': 1.0,
    'Gnoll War Band': 1.0,
    'Undead Horde': 1.0,
    "Warlock's Hold": 1.0,
  },
  socialScenarios: {
    'Convince the City Guard': 1.0,
    'Infiltrate the Noble Gala': 1.0,
    'Inspire the Downtrodden': 1.0,
  },
  partySupportScenarios: {
    'The Dragon Ambush': 1.0,
    "The Road to Baldur's Gate": 1.0,
    "The Lord's Alliance Summit": 1.0,
  },
  categoryWeights: {
    combat: 0.4,
    social: 0.4,
    partySupport: 0.2,
  },
};

/**
 * Named campaign profiles that bundle a complete `ScoringWeights` configuration.
 * Each profile is calibrated to reflect the demands of a different campaign
 * archetype — a dungeon-crawl campaign should weight hard combat scenarios higher,
 * while a court intrigue campaign should emphasise social and infiltration skills.
 */
export const CAMPAIGN_PROFILES: CampaignProfile[] = [
  {
    id: 'all-purpose',
    name: 'All-Purpose',
    description:
      'Balanced weights: combat 40%, social 40%, party support 20%. ' +
      'All scenarios are equally weighted. Use for mixed campaigns with no ' +
      'dominant playstyle.',
    weights: DEFAULT_SCORING_WEIGHTS,
  },
  {
    id: 'dungeon-crawl',
    name: 'Dungeon Crawl',
    description:
      'Combat-heavy campaign with frequent dangerous encounters. Hard scenarios ' +
      '(Undead Horde, Warlock\'s Hold) carry more weight. Social encounters are ' +
      'brief. Party survival and combat support dominate.',
    weights: {
      combatScenarios: {
        'Bandit Ambush': 1.0,
        'Gnoll War Band': 1.5,
        'Undead Horde': 2.0,
        "Warlock's Hold": 2.0,
      },
      socialScenarios: {
        'Convince the City Guard': 1.0,
        'Infiltrate the Noble Gala': 0.5,
        'Inspire the Downtrodden': 0.5,
      },
      partySupportScenarios: {
        'The Dragon Ambush': 2.0,
        "The Road to Baldur's Gate": 1.5,
        "The Lord's Alliance Summit": 0.5,
      },
      categoryWeights: {
        combat: 0.60,
        social: 0.20,
        partySupport: 0.20,
      },
    },
  },
  {
    id: 'social-intrigue',
    name: 'Social Intrigue',
    description:
      'Political and court-focused campaign. Infiltration and persuasion are ' +
      'critical. Combat is possible but infrequent; social encounters and ' +
      'high-stakes negotiations dominate.',
    weights: {
      combatScenarios: {
        'Bandit Ambush': 1.5,
        'Gnoll War Band': 0.5,
        'Undead Horde': 0.5,
        "Warlock's Hold": 1.0,
      },
      socialScenarios: {
        'Convince the City Guard': 1.5,
        'Infiltrate the Noble Gala': 2.0,
        'Inspire the Downtrodden': 1.0,
      },
      partySupportScenarios: {
        'The Dragon Ambush': 0.5,
        "The Road to Baldur's Gate": 1.0,
        "The Lord's Alliance Summit": 2.0,
      },
      categoryWeights: {
        combat: 0.20,
        social: 0.60,
        partySupport: 0.20,
      },
    },
  },
  {
    id: 'war-campaign',
    name: 'War Campaign',
    description:
      'Battlefield campaign with constant combat, troop morale, and war-council ' +
      'diplomacy. Party support is critical to sustaining the war effort. ' +
      'Inspiring the Downtrodden (troop morale) is the key social scenario.',
    weights: {
      combatScenarios: {
        'Bandit Ambush': 1.5,
        'Gnoll War Band': 2.0,
        'Undead Horde': 2.0,
        "Warlock's Hold": 1.5,
      },
      socialScenarios: {
        'Convince the City Guard': 1.0,
        'Infiltrate the Noble Gala': 0.5,
        'Inspire the Downtrodden': 2.0,
      },
      partySupportScenarios: {
        'The Dragon Ambush': 2.0,
        "The Road to Baldur's Gate": 2.0,
        "The Lord's Alliance Summit": 1.0,
      },
      categoryWeights: {
        combat: 0.50,
        social: 0.15,
        partySupport: 0.35,
      },
    },
  },
  {
    id: 'exploration',
    name: 'Exploration',
    description:
      'Wilderness travel and discovery campaign. Moderate combat against regional ' +
      'threats; survival, group cohesion, and keeping morale high matter more than ' +
      'courtly intrigue.',
    weights: {
      combatScenarios: {
        'Bandit Ambush': 1.5,
        'Gnoll War Band': 1.5,
        'Undead Horde': 1.0,
        "Warlock's Hold": 1.0,
      },
      socialScenarios: {
        'Convince the City Guard': 1.0,
        'Infiltrate the Noble Gala': 0.5,
        'Inspire the Downtrodden': 2.0,
      },
      partySupportScenarios: {
        'The Dragon Ambush': 1.5,
        "The Road to Baldur's Gate": 2.0,
        "The Lord's Alliance Summit": 0.5,
      },
      categoryWeights: {
        combat: 0.40,
        social: 0.25,
        partySupport: 0.35,
      },
    },
  },
];

// ─── Scoring Helpers ──────────────────────────────────────────────────────────

/**
 * Compute a weighted average category score from a list of scenario results.
 *
 * @param results - Array of objects with `scenarioName` and `score` (0–100).
 * @param scenarioWeights - Map from scenario name to relative weight. Scenarios
 *   not present in the map default to weight 1.0.
 * @returns Weighted average score in the range 0–100, rounded to the nearest
 *   integer.
 */
function computeWeightedCategoryScore(
  results: Array<{ scenarioName: string; score: number }>,
  scenarioWeights: Record<string, number>,
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const result of results) {
    const weight = Math.max(0, scenarioWeights[result.scenarioName] ?? 1.0);
    weightedSum += result.score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;
  return Math.round(weightedSum / totalWeight);
}

/**
 * Combine three domain scores into a single composite score using the supplied
 * category weights.  The weights are normalised so only their ratios matter.
 */
function computeCompositeScore(
  combatScore: number,
  socialScore: number,
  partyScore: number,
  categoryWeights: { combat: number; social: number; partySupport: number },
): number {
  const total =
    Math.max(0, categoryWeights.combat) +
    Math.max(0, categoryWeights.social) +
    Math.max(0, categoryWeights.partySupport);
  if (total === 0) return 0;
  return Math.round(
    (combatScore * Math.max(0, categoryWeights.combat) +
      socialScore * Math.max(0, categoryWeights.social) +
      partyScore * Math.max(0, categoryWeights.partySupport)) /
      total,
  );
}

/**
 * Resolve a weights argument into a fully-populated `ScoringWeights` object.
 *
 * Accepts:
 *   - `undefined`         → returns `DEFAULT_SCORING_WEIGHTS`
 *   - `string`            → looks up the named campaign profile; falls back to
 *                           default if the ID is unrecognised
 *   - `Partial<ScoringWeights>` → merges supplied fields over the default
 *
 * @param weightsOrProfileId - Optional weights specification.
 */
export function resolveWeights(
  weightsOrProfileId?: Partial<ScoringWeights> | string,
): ScoringWeights {
  if (weightsOrProfileId === undefined || weightsOrProfileId === null) {
    return DEFAULT_SCORING_WEIGHTS;
  }

  if (typeof weightsOrProfileId === 'string') {
    const profile = CAMPAIGN_PROFILES.find((p) => p.id === weightsOrProfileId);
    return profile ? profile.weights : DEFAULT_SCORING_WEIGHTS;
  }

  // Partial object: deep-merge each key with its default counterpart
  return {
    combatScenarios: {
      ...DEFAULT_SCORING_WEIGHTS.combatScenarios,
      ...(weightsOrProfileId.combatScenarios ?? {}),
    },
    socialScenarios: {
      ...DEFAULT_SCORING_WEIGHTS.socialScenarios,
      ...(weightsOrProfileId.socialScenarios ?? {}),
    },
    partySupportScenarios: {
      ...DEFAULT_SCORING_WEIGHTS.partySupportScenarios,
      ...(weightsOrProfileId.partySupportScenarios ?? {}),
    },
    categoryWeights: {
      ...DEFAULT_SCORING_WEIGHTS.categoryWeights,
      ...(weightsOrProfileId.categoryWeights ?? {}),
    },
  };
}

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
 * Returns: survival (boolean), rounds survived, damage taken, concentration breaks.
 */
function simulateSingleCombat(
  candidate: BardCandidate,
  scenario: CombatScenario,
): { survived: boolean; roundsToEnd: number; damageTaken: number; concentrationBreaks: number } {
  const cha = modifierFor(candidate.abilityScores.charisma);
  const dex = modifierFor(candidate.abilityScores.dexterity);
  const con = modifierFor(candidate.abilityScores.constitution);
  const wis = modifierFor(candidate.abilityScores.wisdom);
  const spellAttack = cha + candidate.proficiencyBonus;
  const spellSaveDC = 8 + cha + candidate.proficiencyBonus;

  // Build enemy list
  const enemies = scenario.enemies.flatMap((e) =>
    Array.from({ length: e.count }, (_, i) => ({
      name: `${e.name} ${i + 1}`,
      hp: e.hp,
      maxHp: e.hp,
      ac: e.ac,
      attackBonus: e.attackBonus,
      damage: e.damage,
      alive: true,
      controlled: false,  // true = incapacitated by a concentration spell
      savingThrow: 10, // enemy WIS save modifier (flat 0 bonus vs DC)
      spellSaveDC: e.spellSaveDC,
      spellUseChance: e.spellUseChance,
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
  const hasWarCaster = candidate.feats.some((f) => f.name === 'War Caster');
  // Alert: bard always wins initiative — guaranteed to act before enemies in round 1.
  // Without Alert there is a 50% chance enemies strike first in round 1.
  const hasAlert = candidate.feats.some((f) => f.name === 'Alert');
  // Lucky feat: 3 luck points per combat — spend to reroll a failing concentration save.
  let luckyPointsLeft = candidate.feats.some((f) => f.name === 'Lucky') ? 3 : 0;
  // Halfling Lucky: reroll any concentration save that comes up a natural 1.
  const hasHalflingLucky = candidate.species === 'Halfling';

  // ── Species Combat Traits ────────────────────────────────────────────────────
  // Hidden Step (Firbolg): once per combat, bonus action to turn invisible for 1 round.
  // Used defensively after the control spell lands — bard stays still, enemies attack with
  // disadvantage. Ends at the start of the bard's next turn.
  const hasHiddenStep = candidate.combatTraits?.hiddenStep === true;
  let hiddenStepUsed = false;
  let hiddenStepActive = false;

  // Fey Step (Eladrin): once per combat, bonus action to teleport 30 ft out of melee.
  // Used as an emergency repositioning when HP drops to ≤40%. The bard escapes line of
  // engagement — enemies spend their movement closing the gap and forfeit their attacks.
  const hasFeyStep = candidate.combatTraits?.feyStep === true;
  let feyStepUsed = false;
  let feyStepJustUsed = false; // true only on the exact round Fey Step is triggered

  // Magic Resistance (Satyr, Yuan-Ti): advantage on saves vs. spells and magical effects.
  // Applies to the WIS save when an enemy casts Hold Person or similar control magic.
  const hasMagicResistance = candidate.combatTraits?.magicResistance === true;

  let candidateHp = candidate.maxHitPoints;
  let damageTaken = 0;
  let mirrorImageCharges = hasMirrorImage ? 3 : 0;
  let controlSpellUsed = false;
  let concentrating = false;
  let concentrationBreaks = 0;

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

  // ── Initiative: without Alert, enemies have a 50% chance to act before the bard ──
  // This models the real-world risk of losing initiative and taking hits before the
  // bard can cast a control spell.
  if (!hasAlert && rollDie(2) === 1) {
    // Enemies act first — bard hasn't moved yet, no Mirror Image up
    for (const enemy of enemies.filter((e) => e.alive)) {
      const attackRoll = rollDie(20);
      const isCrit = attackRoll === 20 && !hasAdamantine;
      const hits = isCrit || (attackRoll + enemy.attackBonus) >= effectiveAC;
      if (hits) {
        const dmg = parseDamage(enemy.damage) + (isCrit ? parseDamage(enemy.damage.split('+')[0]) : 0);
        damageTaken += dmg;
        candidateHp -= dmg;
        if (candidateHp <= 0) {
          return { survived: false, roundsToEnd: 0, damageTaken, concentrationBreaks };
        }
      }
    }
  }

  for (let round = 1; round <= scenario.rounds; round++) {
    roundsElapsed = round;
    const aliveEnemies = enemies.filter((e) => e.alive && !e.controlled);
    if (aliveEnemies.length === 0) break;

    // ── Hidden Step expires at the start of the bard's turn ──────────────────
    hiddenStepActive = false;

    // ── Fey Step: emergency teleport when HP is dangerously low ──────────────
    // The bard uses their bonus action to vanish 30 ft away. All enemies spend their
    // movement closing the gap and cannot attack this round.
    if (hasFeyStep && !feyStepUsed && candidateHp <= Math.floor(candidate.maxHitPoints * 0.4)) {
      feyStepUsed = true;
      feyStepJustUsed = true; // signal: skip enemy attacks this round only
      // Bard still acts normally (control spell / attack); only enemy attacks are skipped.
      // Fall through to bard's action below, then skip enemy attack phase.
    }

    // ── Hidden Step: activate after the control spell is established ──────────
    // The bard uses their bonus action to vanish. They skip their weapon attack (sacrificing
    // the offensive action to maintain stealth) so the invisibility persists through the
    // enemy attack phase. Enemies must then attack with disadvantage.
    if (hasHiddenStep && !hiddenStepUsed && concentrating && aliveEnemies.length > 0) {
      hiddenStepActive = true;
      hiddenStepUsed = true;
    }

    // ── Candidate's turn ──────────────────────────────────────────────
    // If Hidden Step is active, the bard refrains from attacking to maintain stealth.
    // Use control spell in round 1 if available and not yet used
    if (hasControlSpell && !controlSpellUsed && aliveEnemies.length >= 2) {
      // Hypnotic Pattern / Hold Person — enemies must make WIS save
      const savesNeeded = Math.min(aliveEnemies.length, 3);
      for (let ei = 0; ei < savesNeeded; ei++) {
        const savRoll = rollDie(20);
        if (savRoll + aliveEnemies[ei].savingThrow < spellSaveDC) {
          aliveEnemies[ei].controlled = true; // Incapacitated; stays alive for later
          concentrating = true;
        }
      }
      controlSpellUsed = true;
    } else if (!hiddenStepActive) {
      // Hidden Step is not active — bard can attack normally.
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
            target.controlled = false;
            break;
          }
        }
      }
    }

    // Refresh alive enemies after candidate attacks
    const aliveAfterTurn = enemies.filter((e) => e.alive && !e.controlled);
    if (aliveAfterTurn.length === 0) break;

    // ── Fey Step: bard teleported away this round — enemies cannot reach ─────
    // Skip the entire enemy attack phase. The bard is 30 ft out of melee range and
    // enemies use their movement re-closing the gap rather than attacking.
    if (feyStepJustUsed) {
      feyStepJustUsed = false;
      continue;
    }

    // ── Enemy turns ───────────────────────────────────────────────────
    for (const enemy of aliveAfterTurn) {
      // ── Enemy Spellcasting: Hold Person / Control Magic ──────────────────────
      // The enemy attempts to incapacitate the bard. Species with Magic Resistance
      // (Satyr, Yuan-Ti) roll their WIS save with advantage.
      if (enemy.spellSaveDC && enemy.spellUseChance && Math.random() < enemy.spellUseChance) {
        const wisRoll1 = rollDie(20);
        // Magic Resistance: roll a second die and take the higher result (advantage).
        const wisRoll = hasMagicResistance ? Math.max(wisRoll1, rollDie(20)) : wisRoll1;
        if (wisRoll + wis < enemy.spellSaveDC) {
          // Bard is incapacitated: concentration breaks, and takes a guaranteed hit
          if (concentrating) {
            concentrating = false;
            concentrationBreaks++;
            enemies.forEach((e) => {
              if (e.controlled) {
                e.controlled = false;
                e.hp = Math.ceil(e.maxHp / 2);
              }
            });
          }
          const spellHitDmg = parseDamage(enemy.damage);
          damageTaken += spellHitDmg;
          candidateHp -= spellHitDmg;
          if (candidateHp <= 0) {
            return { survived: false, roundsToEnd: round, damageTaken, concentrationBreaks };
          }
          continue; // Enemy used their action on the spell — no melee attack this turn
        }
      }

      // ── Enemy Melee / Ranged Attack ──────────────────────────────────────────
      // Hidden Step: bard is invisible — attacker must roll with disadvantage (take the lower die).
      const attackRoll1 = rollDie(20);
      const attackRoll = hiddenStepActive ? Math.min(attackRoll1, rollDie(20)) : attackRoll1;
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
          return { survived: false, roundsToEnd: round, damageTaken, concentrationBreaks };
        }

        // ── Concentration check when hit while concentrating ───────────────────
        // DC = max(10, half of damage taken). War Caster grants advantage on the save.
        // Bards have no CON save proficiency — roll is d20 + CON modifier only.
        if (concentrating) {
          const conSaveDC = Math.max(10, Math.floor(dmg / 2));
          // Roll dice, applying Halfling Lucky (reroll natural 1s) to each die independently,
          // then apply War Caster advantage (take the higher of two results).
          const rollWithLuck = (): number => {
            const raw = rollDie(20);
            return (hasHalflingLucky && raw === 1) ? rollDie(20) : raw;
          };
          let conRoll = hasWarCaster
            ? Math.max(rollWithLuck() + con, rollWithLuck() + con)
            : rollWithLuck() + con;
          // Lucky feat: spend a luck point to reroll a failing save
          if (conRoll < conSaveDC && luckyPointsLeft > 0) {
            luckyPointsLeft--;
            const luckyReroll = rollWithLuck() + con;
            conRoll = Math.max(conRoll, luckyReroll);
          }
          if (conRoll < conSaveDC) {
            concentrating = false;
            concentrationBreaks++;
            // Controlled enemies shake free — they rejoin combat at half their original HP
            enemies.forEach((e) => {
              if (e.controlled) {
                e.controlled = false;
                e.hp = Math.ceil(e.maxHp / 2);
              }
            });
          }
        }
      }
    }
  }

  const finalAlive = enemies.filter((e) => e.alive && !e.controlled);
  return {
    survived: finalAlive.length === 0,
    roundsToEnd: roundsElapsed,
    damageTaken,
    concentrationBreaks,
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

// ─── Party Support Simulation ─────────────────────────────────────────────────

/**
 * Simulate one party support scenario for a candidate.
 *
 * Returns: inspirations given, healing dealt, and class-feature activations.
 * The bard uses Healing Word reactively when allies fall low, distributes Bardic
 * Inspiration proactively, and fires class-specific features when conditions arise.
 */
function simulateSinglePartySupport(
  candidate: BardCandidate,
  scenario: PartySupportScenario,
): { inspirationsGiven: number; healingDealt: number; featureActivations: number } {
  const cha = modifierFor(candidate.abilityScores.charisma);

  const isGlamour = candidate.subclass === 'College of Glamour';
  const isValor = candidate.subclass === 'College of Valor';
  const isLore = candidate.subclass === 'College of Lore';

  const hasInspiringLeader = candidate.feats.some((f) => f.name === 'Inspiring Leader');
  const hasCounterspell = candidate.spells.some((s) => s.name === 'Counterspell');
  const hasBless = candidate.spells.some((s) => s.name === 'Bless');

  // Resources available at the start
  let inspirationDice = cha;          // Bardic Inspiration: CHA mod per short rest
  let healingSlots = 4;               // Level 1 slots dedicated to Healing Word
  let reactiveFeatureUses = cha;      // Cutting Words / Mantle of Majesty: CHA mod per short rest

  let inspirationsGiven = 0;
  let healingDealt = 0;
  let featureActivations = 0;

  // ── Pre-combat phase ────────────────────────────────────────────────────────

  // Inspiring Leader: grant temp HP to the whole party before combat
  if (hasInspiringLeader) {
    featureActivations++;
  }

  // Glamour: Enthralling Performance neutralises hostile NPCs at social events
  if (isGlamour && scenario.type === 'social-support') {
    featureActivations++;
  }

  // Valor: Alert feat → always first → cast Bless on three allies in round 1
  let blessCastInRound1 = false;

  // ── Per-round simulation ─────────────────────────────────────────────────────

  for (let round = 1; round <= scenario.rounds; round++) {
    // Midpoint short rest: partially replenish inspiration
    if (round === Math.floor(scenario.rounds / 2) + 1) {
      inspirationDice = Math.min(inspirationDice + cha, cha * 2);
      reactiveFeatureUses = cha;
    }

    // Healing Word (bonus action) — reactive healing when an ally is downed
    if (Math.random() < scenario.allyNeedHealChance && healingSlots > 0) {
      healingDealt += rollDie(4) + cha;
      healingSlots--;
    }

    // ── Glamour: Mantle of Inspiration ────────────────────────────────────────
    // Spend 1 inspiration die (bonus action) → grant cha temporary HP to up to cha
    // allies. Far more efficient for party-wide damage mitigation than one-for-one
    // inspiration distribution in a large combat.
    if (isGlamour && inspirationDice > 0) {
      inspirationDice--;
      inspirationsGiven++;
      featureActivations++;  // Mantle activation

    // ── Valor: Combat Inspiration ──────────────────────────────────────────────
    // Standard inspiration distribution; ally later adds d8 to an attack or damage roll.
    // Round 1: also cast Bless to give three allies +1d4 on attacks and saves.
    } else if (isValor) {
      if (!blessCastInRound1 && hasBless && round === 1) {
        featureActivations++;   // Bless buffs 3 party members for the full encounter
        blessCastInRound1 = true;
      }
      if (inspirationDice > 0) {
        inspirationsGiven++;
        inspirationDice--;
      }

    // ── Lore: Cutting Words + standard inspiration ────────────────────────────
    // Cutting Words (reaction) reduces an enemy's roll; standard inspiration for allies.
    } else if (isLore) {
      if (inspirationDice > 0) {
        inspirationsGiven++;
        inspirationDice--;
      }
    }

    // ── Lore: Cutting Words (reaction) ────────────────────────────────────────
    if (isLore && reactiveFeatureUses > 0 && Math.random() < 0.65) {
      reactiveFeatureUses--;
      featureActivations++;
    }

    // ── Lore: Counterspell (reaction) ─────────────────────────────────────────
    if (hasCounterspell && Math.random() < scenario.enemySpellChance) {
      featureActivations++;
    }

    // ── Glamour: Mantle of Majesty (social scenario) ───────────────────────────
    // Cast Command as a bonus action each turn — disrupts hostile social actors.
    if (isGlamour && scenario.type === 'social-support') {
      featureActivations++;
    }
  }

  return { inspirationsGiven, healingDealt, featureActivations };
}

function runPartySupportBenchmark(candidate: BardCandidate, iterations = SIMULATION_ITERATIONS): PartySupportScenarioResult[] {
  return PARTY_SUPPORT_SCENARIOS.map((scenario) => {
    let totalInspirations = 0;
    let totalHealing = 0;
    let totalFeatures = 0;

    for (let i = 0; i < iterations; i++) {
      const result = simulateSinglePartySupport(candidate, scenario);
      totalInspirations += result.inspirationsGiven;
      totalHealing += result.healingDealt;
      totalFeatures += result.featureActivations;
    }

    const avgInspirations = totalInspirations / iterations;
    const avgHealing = totalHealing / iterations;
    const avgFeatures = totalFeatures / iterations;

    // Normalise to 0–100. Calibrated against observed maximums across all candidates:
    // inspirations ≈ 10, healing ≈ 35 HP, feature activations ≈ 14.
    const inspirationScore = Math.min((avgInspirations / 10) * 100, 100);
    const healingScore = Math.min((avgHealing / 35) * 100, 100);
    const featureScore = Math.min((avgFeatures / 14) * 100, 100);
    const score = Math.round(inspirationScore * 0.40 + healingScore * 0.30 + featureScore * 0.30);

    return {
      scenarioName: scenario.name,
      type: scenario.type,
      iterationsRun: iterations,
      avgInspirationsGiven: parseFloat(avgInspirations.toFixed(1)),
      avgHealingDealt: parseFloat(avgHealing.toFixed(1)),
      avgFeatureActivations: parseFloat(avgFeatures.toFixed(1)),
      score: Math.min(100, Math.max(0, score)),
    };
  });
}

// ─── Benchmark Runner ──────────────────────────────────────────────────────────

const SIMULATION_ITERATIONS = 200;

function runCombatBenchmark(candidate: BardCandidate, iterations = SIMULATION_ITERATIONS): CombatScenarioResult[] {
  return COMBAT_SCENARIOS.map((scenario) => {
    let wins = 0;
    let totalRounds = 0;
    let totalDamage = 0;
    let totalConcentrationBreaks = 0;

    for (let i = 0; i < iterations; i++) {
      const result = simulateSingleCombat(candidate, scenario);
      if (result.survived) wins++;
      totalRounds += result.roundsToEnd;
      totalDamage += result.damageTaken;
      totalConcentrationBreaks += result.concentrationBreaks;
    }

    const survivalRate = wins / iterations;
    const avgRounds = totalRounds / iterations;
    const avgDamage = totalDamage / iterations;
    const avgConcentrationBreaks = totalConcentrationBreaks / iterations;

    // Score: weighted by survival rate + speed of victory
    const speedBonus = scenario.difficulty === 'hard' ? 0 : (scenario.rounds - avgRounds) / scenario.rounds;
    const score = Math.round((survivalRate * 0.8 + speedBonus * 0.2) * 100);

    return {
      scenarioName: scenario.name,
      difficulty: scenario.difficulty,
      iterationsRun: iterations,
      wins,
      losses: iterations - wins,
      averageRoundsToVictory: parseFloat(avgRounds.toFixed(1)),
      averageDamageTaken: parseFloat(avgDamage.toFixed(1)),
      averageConcentrationBreaks: parseFloat(avgConcentrationBreaks.toFixed(2)),
      survivalRate: parseFloat((survivalRate * 100).toFixed(1)),
      score: Math.min(100, Math.max(0, score)),
    };
  });
}

function runSocialBenchmark(candidate: BardCandidate, iterations = SIMULATION_ITERATIONS): SocialScenarioResult[] {
  return SOCIAL_SCENARIOS.map((scenario) => {
    let successes = 0;
    let critSuccesses = 0;
    let totalRoll = 0;

    for (let i = 0; i < iterations; i++) {
      const result = simulateSingleSocial(candidate, scenario);
      if (result.success) successes++;
      if (result.isCritSuccess) critSuccesses++;
      totalRoll += result.roll;
    }

    const successRate = successes / iterations;
    const avgRoll = totalRoll / iterations;
    const score = Math.round(successRate * 100);

    return {
      scenarioName: scenario.name,
      skill: scenario.skill,
      dc: scenario.dc,
      iterationsRun: iterations,
      successes,
      criticalSuccesses: critSuccesses,
      averageRoll: parseFloat(avgRoll.toFixed(1)),
      successRate: parseFloat((successRate * 100).toFixed(1)),
      score: Math.min(100, Math.max(0, score)),
    };
  });
}

function identifyStrengths(candidate: BardCandidate, combatResults: CombatScenarioResult[], socialResults: SocialScenarioResult[], partyResults: PartySupportScenarioResult[]): string[] {
  const strengths: string[] = [];
  const avgCombat = combatResults.reduce((s, r) => s + r.survivalRate, 0) / combatResults.length;
  const avgSocial = socialResults.reduce((s, r) => s + r.successRate, 0) / socialResults.length;
  const avgParty = partyResults.reduce((s, r) => s + r.score, 0) / partyResults.length;

  if (avgCombat > 70) strengths.push('High combat survivability');
  if (avgSocial > 80) strengths.push('Exceptional social aptitude');
  if (avgParty > 60) strengths.push('Strong party support capability');
  if (candidate.abilityScores.charisma >= 20) strengths.push('Maximum Charisma (+5 modifier)');
  if (candidate.abilityScores.charisma >= 18 && candidate.abilityScores.charisma < 20) strengths.push('High Charisma (+4 modifier)');
  if (candidate.feats.some((f) => f.name === 'War Caster')) strengths.push('Concentration spell reliability (War Caster)');
  if (candidate.feats.some((f) => f.name === 'Alert')) strengths.push('Initiative dominance (Alert +5)');
  if (candidate.feats.some((f) => f.name === 'Actor')) strengths.push('Deception mastery (Actor feat)');
  if (candidate.feats.some((f) => f.name === 'Inspiring Leader')) strengths.push('Pre-combat HP buffer (Inspiring Leader)');
  if (candidate.feats.some((f) => f.name === 'Lucky')) strengths.push('Lucky: 3 fate-rerolls per day');
  if (candidate.feats.some((f) => f.name === 'Resilient (CON)')) strengths.push('CON save proficiency for concentration (Resilient)');
  if (candidate.feats.some((f) => f.name === 'Fey Touched')) strengths.push('Fey Touched: Misty Step mobility + bonus spell');
  if (candidate.feats.some((f) => f.name === 'Shadow Touched')) strengths.push('Shadow Touched: Invisibility + bonus spell');
  if (candidate.feats.some((f) => f.name === 'Telekinetic')) strengths.push('Telekinetic: Mage Hand upgrade + bonus shove');
  if (candidate.feats.some((f) => f.name === 'Tough')) strengths.push('Tough: +16 HP at level 8');
  if (candidate.subclass === 'College of Glamour') strengths.push('Mass social influence (Enthralling Performance)');
  if (candidate.subclass === 'College of Valor') strengths.push('Extra Attack for sustained melee pressure');
  if (candidate.subclass === 'College of Lore') strengths.push('Cutting Words + expanded spell selection (Magical Secrets)');
  if (candidate.skillExpertise.length >= 2) strengths.push(`Expertise in: ${candidate.skillExpertise.join(', ')}`);
  if (candidate.species === 'Half-Elf') strengths.push('Fey Ancestry: immune to charm/sleep effects');
  if (candidate.species === 'Tiefling') strengths.push('Hellish Resistance: fire damage resistance');
  if (candidate.species === 'Halfling') strengths.push('Halfling Lucky: reroll natural 1s on d20 rolls');
  if (candidate.species === 'Aasimar') strengths.push('Aasimar: Healing Hands + Radiant Soul flight (1 min/day)');
  if (candidate.combatTraits?.hiddenStep) strengths.push('Hidden Step: invisible 1 round/short rest — enemies attack with disadvantage');
  if (candidate.combatTraits?.feyStep) strengths.push('Fey Step: teleport 30 ft/short rest — emergency escape negating one round of attacks');
  if (candidate.combatTraits?.magicResistance) strengths.push('Magic Resistance: advantage on all saves vs. spells and magical effects');
  if (candidate.combatTraits?.poisonImmunity) strengths.push('Poison Immunity: immune to poison damage and the poisoned condition');
  if (candidate.speed > 30) strengths.push(`Fleet of Foot: speed ${candidate.speed} ft`);

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

function generateSavrasAssessment(candidate: BardCandidate, compositeScore: number): string {
  const assessments: Record<string, string> = {
    'lyra-silverstring': compositeScore > 65
      ? 'Lyra sees patterns in the world as I do. Her Counterspell whispers: ' +
        '"I have already read your spell before you cast it." She is the scholar, ' +
        'the archivist of my truth. In her, knowledge becomes melody.'
      : 'Lyra\'s mind is sharp, but the battlefield may prove sharper still. ' +
        'She must strengthen her armor before she can strengthen my voice.',
    'cadwyn-ironbeat': compositeScore > 65
      ? 'Cadwyn understands that truth sometimes arrives at the point of a blade. ' +
        'His combat prowess ensures that when he speaks my prophecies, none will ' +
        'dare silence him by force. The warrior-bard who cannot be shut down.'
      : 'Cadwyn\'s steel is strong, but in the courts where my word must echo loudest, ' +
        'iron discipline in social arts matters more than extra attacks.',
    'vael-duskwhisper': compositeScore > 65
      ? 'Vael does not merely speak truth — she makes it irresistible. Her glamours ' +
        'open doors that armies could not breach. Among mortals who fear prophecy, ' +
        'she makes the bitter truth taste sweet enough to accept.'
      : 'Vael\'s enchantments are powerful, but a bard who cannot survive the ambush ' +
        'cannot deliver the message that arrives at the end of it.',
  };

  return assessments[candidate.id] ?? `${candidate.name} demonstrates a composite performance score of ${compositeScore.toFixed(1)}.`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Run all benchmarks and return ranked results.
 *
 * @param weights - Optional scoring weights or campaign profile ID.
 *   Omit to use `DEFAULT_SCORING_WEIGHTS` (40% combat / 40% social / 20% party,
 *   all scenarios equally weighted).
 */
export function runBardBenchmarks(weights?: Partial<ScoringWeights> | string): BenchmarkResult[] {
  const resolvedWeights = resolveWeights(weights);

  const rawResults = BARD_CANDIDATES.map((candidate) => {
    const combatResults = runCombatBenchmark(candidate);
    const socialResults = runSocialBenchmark(candidate);
    const partyResults = runPartySupportBenchmark(candidate);

    const combatScore = computeWeightedCategoryScore(
      combatResults,
      resolvedWeights.combatScenarios,
    );
    const socialScore = computeWeightedCategoryScore(
      socialResults,
      resolvedWeights.socialScenarios,
    );
    const partyScore = computeWeightedCategoryScore(
      partyResults,
      resolvedWeights.partySupportScenarios,
    );
    const compositeScore = computeCompositeScore(
      combatScore,
      socialScore,
      partyScore,
      resolvedWeights.categoryWeights,
    );

    return {
      candidateId: candidate.id,
      candidateName: candidate.name,
      species: `${candidate.species}${candidate.subspecies !== candidate.species ? ` (${candidate.subspecies})` : ''}`,
      subclass: candidate.subclass,
      combatScore,
      socialScore,
      partyScore,
      compositeScore,
      rank: 0, // assigned below
      combatDetails: combatResults,
      socialDetails: socialResults,
      partySupportDetails: partyResults,
      strengths: identifyStrengths(candidate, combatResults, socialResults, partyResults),
      weaknesses: identifyWeaknesses(candidate, combatResults),
      savrasAssessment: generateSavrasAssessment(candidate, compositeScore),
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
 *
 * @param weights - Optional scoring weights or campaign profile ID.
 */
export function getTopBardRecommendation(weights?: Partial<ScoringWeights> | string): BenchmarkResult {
  const results = runBardBenchmarks(weights);
  return results[0];
}

// ─── Lore Bard Exploration System ─────────────────────────────────────────────
//
// This section defines the combinatorial exploration engine for College of Lore
// bards. It generates hundreds of builds by varying species, feats, and magic
// items, then benchmarks them with a fast simulation pass to identify optimal
// choices for Savras's champion.
//
// Base stats (27-point buy before species bonuses):
//   STR 8 | DEX 14 | CON 14 | INT 10 | WIS 12 | CHA 15

/**
 * A species option available to a College of Lore bard.
 */
export interface SpeciesTemplate {
  id: string;
  species: string;
  subspecies: string;
  /** Racial ability score bonuses applied on top of the base point-buy array. */
  abilityBonuses: Partial<BardAbilityScores>;
  speed: number;
  /** Variant Human and Custom Lineage receive an extra feat slot at level 1. */
  extraFeatSlot: boolean;
  /** Flavour traits listed in the result but not mechanically simulated. */
  specialTraits: string[];
  /** Species abilities that are mechanically resolved turn-by-turn in combat. */
  combatTraits?: SpeciesCombatTraits;
}

/**
 * A feat option available during exploration.
 * Some feats grant +1 to an ability score; these are applied during build generation.
 */
export interface FeatTemplate {
  name: string;
  description: string;
  /** Optional ability score improvement granted by this feat (e.g. Actor → +1 CHA). */
  abilityBonus?: Partial<BardAbilityScores>;
}

/**
 * An uncommon magic item available to a College of Lore bard (no medium-armor
 * requirement — the exploration uses light armor only).
 */
export interface MagicItemTemplate {
  name: string;
  type: string;
  rarity: 'uncommon';
  properties: string[];
  armorClass?: number;
  damage?: string;
}

/**
 * The condensed benchmark result for a single generated build.
 * Unlike BenchmarkResult (which carries full per-scenario details), this
 * surface-level summary is designed for bulk ranked comparisons.
 */
export interface BardBuildResult {
  rank: number;
  buildId: string;
  species: string;
  subspecies: string;
  feats: string[];
  magicItems: string[];
  abilityScores: BardAbilityScores;
  armorClass: number;
  maxHitPoints: number;
  charismaModifier: number;
  spellSaveDC: number;
  compositeScore: number;
  combatScore: number;
  socialScore: number;
  partySupportScore: number;
  strengths: string[];
  weaknesses: string[];
  assessment: string;
}

/**
 * The full output of a bard exploration run.
 */
export interface BardExplorationResult {
  summary: {
    totalBuildsEvaluated: number;
    iterationsPerScenario: number;
    subclassFixed: string;
    level: number;
    /** The scoring weights that were applied when producing this result. */
    scoringWeightsUsed: ScoringWeights;
  };
  topBuilds: BardBuildResult[];
  bySpecies: Record<string, { topBuild: BardBuildResult; averageCompositeScore: number }>;
  byFeatCombination: Record<string, { topBuild: BardBuildResult; averageCompositeScore: number }>;
  byMagicItems: Record<string, { topBuild: BardBuildResult; averageCompositeScore: number }>;
}

// ─── Species Pool ──────────────────────────────────────────────────────────────

export const LORE_BARD_SPECIES_POOL: SpeciesTemplate[] = [
  {
    id: 'half-elf-standard',
    species: 'Half-Elf',
    subspecies: 'Standard Half-Elf',
    abilityBonuses: { charisma: 2, dexterity: 1, constitution: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Fey Ancestry: advantage on saves vs. charm, immune to magical sleep',
      'Darkvision 60 ft',
      'Skill Versatility: two additional skill proficiencies',
    ],
  },
  {
    id: 'half-elf-drow',
    species: 'Half-Elf',
    subspecies: 'Drow-Descent Half-Elf',
    abilityBonuses: { charisma: 2, dexterity: 1, wisdom: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Fey Ancestry: advantage on saves vs. charm, immune to magical sleep',
      'Superior Darkvision 120 ft',
      'Drow Magic: Dancing Lights, Faerie Fire (1/day), Darkness (1/day)',
    ],
  },
  {
    id: 'tiefling-standard',
    species: 'Tiefling',
    subspecies: 'Standard Tiefling',
    abilityBonuses: { charisma: 2, intelligence: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Hellish Resistance: resistance to fire damage',
      'Darkvision 60 ft',
      'Infernal Legacy: Thaumaturgy, Hellish Rebuke (2/day), Darkness (1/day)',
    ],
  },
  {
    id: 'tiefling-glasya',
    species: 'Tiefling',
    subspecies: 'Glasya Tiefling',
    abilityBonuses: { charisma: 2, dexterity: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Hellish Resistance: resistance to fire damage',
      'Darkvision 60 ft',
      'Legacy of Malbolge: Minor Illusion, Disguise Self (1/day), Invisibility (1/day)',
    ],
  },
  {
    id: 'variant-human',
    species: 'Human',
    subspecies: 'Variant Human',
    abilityBonuses: { charisma: 1, dexterity: 1 },
    speed: 30,
    extraFeatSlot: true,  // gains a feat at level 1 = 3 total at level 8
    specialTraits: [
      'Extra feat at character creation (3 feats total at level 8)',
      'One additional skill proficiency',
      'Flexible +1 to any two ability scores',
    ],
  },
  {
    id: 'lightfoot-halfling',
    species: 'Halfling',
    subspecies: 'Lightfoot Halfling',
    abilityBonuses: { dexterity: 2, charisma: 1 },
    speed: 25,
    extraFeatSlot: false,
    specialTraits: [
      'Lucky: reroll natural 1s on attack rolls, ability checks, and saving throws',
      'Brave: advantage on saves vs. frightened',
      'Naturally Stealthy: can hide behind creatures one size larger',
    ],
  },
  {
    id: 'protector-aasimar',
    species: 'Aasimar',
    subspecies: 'Protector Aasimar',
    abilityBonuses: { charisma: 2, wisdom: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Healing Hands: heal HP equal to level (1/long rest)',
      'Light Bearer: Light cantrip',
      'Radiant Soul: sprout wings, fly 30 ft, +radiant damage 1×/turn (1 min/long rest)',
      'Darkvision 60 ft, resistance to necrotic and radiant damage',
    ],
  },
  {
    id: 'wood-elf',
    species: 'Elf',
    subspecies: 'Wood Elf',
    abilityBonuses: { dexterity: 2, wisdom: 1 },
    speed: 35,
    extraFeatSlot: false,
    specialTraits: [
      'Fleet of Foot: base speed 35 ft',
      'Mask of the Wild: hide in lightly obscured natural terrain',
      'Keen Senses: proficiency in Perception',
      'Trance: 4-hour trance replaces 8-hour sleep',
      'Fey Ancestry: advantage on saves vs. charm, immune to magical sleep',
    ],
  },

  // ─── New Species: Fey-Origin and Magical ─────────────────────────────────────

  {
    id: 'firbolg',
    species: 'Firbolg',
    subspecies: 'Firbolg',
    abilityBonuses: { strength: 2, wisdom: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Hidden Step: bonus action to become invisible for 1 round (1/short rest) — enemies must attack with disadvantage',
      'Firbolg Magic: Detect Magic and Disguise Self 1/short rest (WIS-based)',
      'Powerful Build: counts as Large for carry weight',
      'Speech of Beast and Leaf: can communicate with beasts and plants; advantage on CHA checks vs. them',
    ],
    combatTraits: { hiddenStep: true },
  },
  {
    id: 'eladrin',
    species: 'Elf',
    subspecies: 'Eladrin',
    abilityBonuses: { dexterity: 2, intelligence: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Fey Step: bonus action to teleport 30 ft (1/short rest) — escape danger, negate one round of attacks',
      'Fey Ancestry: advantage on saves vs. charm, immune to magical sleep',
      'Darkvision 60 ft',
      'Trance: 4-hour trance replaces 8-hour sleep',
      'Keen Senses: proficiency in Perception',
    ],
    combatTraits: { feyStep: true },
  },
  {
    id: 'satyr',
    species: 'Satyr',
    subspecies: 'Satyr',
    abilityBonuses: { charisma: 2, dexterity: 1 },
    speed: 35,
    extraFeatSlot: false,
    specialTraits: [
      'Magic Resistance: advantage on saving throws against ALL spells and magical effects',
      'Reveler: proficiency in Performance and one musical instrument',
      'Ram: 1d4+STR unarmed strike; can push target 10 ft on hit',
      'Mirthful Leaps: add 1d8 to long and high jump distance',
    ],
    combatTraits: { magicResistance: true },
  },
  {
    id: 'yuan-ti-pureblood',
    species: 'Yuan-Ti',
    subspecies: 'Yuan-Ti Pureblood',
    abilityBonuses: { charisma: 2, intelligence: 1 },
    speed: 30,
    extraFeatSlot: false,
    specialTraits: [
      'Magic Resistance: advantage on saving throws against ALL spells and magical effects',
      'Poison Immunity: immune to poison damage and the poisoned condition',
      'Innate Spellcasting: Poison Spray at will; Animal Friendship unlimited (beasts only); Suggestion + Charm Person 1/long rest (CHA-based)',
      'Darkvision 60 ft',
    ],
    combatTraits: { magicResistance: true, poisonImmunity: true },
  },
];

// ─── Feat Pool ─────────────────────────────────────────────────────────────────

export const LORE_BARD_FEAT_POOL: FeatTemplate[] = [
  {
    name: 'War Caster',
    description: 'Advantage on Constitution saving throws to maintain concentration. Can cast spells as opportunity attacks. Perform somatic components with weapons/shields in hand.',
  },
  {
    name: 'Alert',
    description: '+5 to initiative. Cannot be surprised while conscious. Other creatures gain no advantage from being hidden when they attack you.',
  },
  {
    name: 'Inspiring Leader',
    description: 'After a 10-minute speech, grant up to 6 creatures temporary HP equal to your level + Charisma modifier (13 temp HP at level 8 with CHA +5).',
  },
  {
    name: 'Lucky',
    description: 'Gain 3 luck points per long rest. Spend 1 to roll an extra d20 on an attack, check, or save — choose which result to use. Can also force a creature to reroll an attack against you.',
  },
  {
    name: 'Resilient (CON)',
    description: '+1 Constitution and proficiency in Constitution saving throws — adds proficiency bonus (+3) to concentration saves on top of the CON modifier.',
    abilityBonus: { constitution: 1 },
  },
  {
    name: 'Actor',
    description: '+1 Charisma. Advantage on Deception and Performance checks. Can perfectly mimic voices and sounds you have heard.',
    abilityBonus: { charisma: 1 },
  },
  {
    name: 'Fey Touched',
    description: '+1 Charisma. Learn Misty Step plus one 1st-level enchantment or divination spell (e.g. Silvery Barbs). Both spells can be cast once per long rest without a spell slot.',
    abilityBonus: { charisma: 1 },
  },
  {
    name: 'Shadow Touched',
    description: '+1 Charisma. Learn Invisibility plus one 1st-level illusion or necromancy spell. Both spells can be cast once per long rest without a spell slot.',
    abilityBonus: { charisma: 1 },
  },
  {
    name: 'Telekinetic',
    description: '+1 Charisma. Learn Mage Hand (upgraded: invisible, range 30 ft, bonus action). As a bonus action, shove a creature up to 5 ft closer or farther without a spell slot.',
    abilityBonus: { charisma: 1 },
  },
  {
    name: 'Skilled',
    description: 'Gain proficiency in any combination of three skills or tools of your choice.',
  },
  {
    name: 'Tough',
    description: 'Maximum hit points increase by 2 for each level (+16 HP at level 8).',
  },
  {
    name: 'Spell Sniper',
    description: 'Double the range of spells that require an attack roll. Ignore half cover and three-quarters cover for spell attacks. Learn one attack-roll cantrip (e.g. Eldritch Blast).',
  },
];

// ─── Magic Item Pool ───────────────────────────────────────────────────────────

export const LORE_BARD_MAGIC_ITEM_POOL: MagicItemTemplate[] = [
  {
    name: 'Cloak of Protection',
    type: 'wondrous item',
    rarity: 'uncommon',
    properties: ['+1 AC', '+1 to all saving throws (requires attunement)'],
    armorClass: 1,
  },
  {
    name: 'Hat of Disguise',
    type: 'wondrous item',
    rarity: 'uncommon',
    properties: ['Cast Disguise Self at will (requires attunement)', 'Social infiltration', 'Advantage on Deception checks while in disguise'],
  },
  {
    name: '+1 Rapier',
    type: 'weapon',
    rarity: 'uncommon',
    properties: ['finesse', '+1 bonus to attack rolls and damage rolls'],
    damage: '1d8+1',
  },
  {
    name: 'Boots of Elvenkind',
    type: 'wondrous item',
    rarity: 'uncommon',
    properties: ['Advantage on Dexterity (Stealth) checks relying on movement', 'Movement makes no sound'],
  },
  {
    name: 'Periapt of Proof against Poison',
    type: 'wondrous item',
    rarity: 'uncommon',
    properties: ['Immunity to poison damage', 'Immunity to the poisoned condition (requires attunement)'],
  },
  {
    name: 'Instrument of the Bards — Canaith Mandolin',
    type: 'instrument',
    rarity: 'uncommon',
    properties: [
      '+1 to spell attack rolls and spell save DC while using as a focus',
      'Advantage on saving throws against being charmed or frightened',
      'Spells: Fly, Invisibility, Levitate, Protection from Evil and Good (1×/day each)',
      'Requires attunement by a bard',
    ],
  },
  {
    name: 'Staff of Charming',
    type: 'staff',
    rarity: 'uncommon',
    properties: [
      '10 charges (regains 1d8+2 at dawn)',
      'Expend charges to cast Charm Person (1), Command (1), or Comprehend Languages (1)',
      'If targeted by an enchantment spell: save with advantage, reflect on a failed save, regain 1 charge on success',
      'Requires attunement by a bard, cleric, druid, sorcerer, warlock, or wizard',
    ],
  },
  {
    name: 'Ring of Mind Shielding',
    type: 'ring',
    rarity: 'uncommon',
    properties: [
      'Immune to magic that reads thoughts or determines alignment',
      'Telepathic communication can only occur if you choose to allow it',
      'On death: soul can remain in ring indefinitely (requires attunement)',
    ],
  },
];

// ─── Feat Combinations Matrix ──────────────────────────────────────────────────

/**
 * Pre-selected 2-feat combinations for non-Variant-Human builds.
 * Each tuple contains feat names from LORE_BARD_FEAT_POOL.
 */
const FEAT_PAIRS: [string, string][] = [
  ['War Caster', 'Inspiring Leader'],
  ['War Caster', 'Alert'],
  ['War Caster', 'Lucky'],
  ['War Caster', 'Resilient (CON)'],
  ['War Caster', 'Fey Touched'],
  ['War Caster', 'Actor'],
  ['Alert', 'Inspiring Leader'],
  ['Alert', 'Lucky'],
  ['Alert', 'Fey Touched'],
  ['Alert', 'Resilient (CON)'],
  ['Inspiring Leader', 'Lucky'],
  ['Inspiring Leader', 'Fey Touched'],
  ['Inspiring Leader', 'Resilient (CON)'],
  ['Tough', 'War Caster'],
  ['Lucky', 'Resilient (CON)'],
];

/**
 * Pre-selected 3-feat combinations for Variant Human builds.
 * Each tuple contains feat names from LORE_BARD_FEAT_POOL.
 */
const FEAT_TRIPLES: [string, string, string][] = [
  ['Alert', 'War Caster', 'Inspiring Leader'],
  ['Alert', 'War Caster', 'Lucky'],
  ['Alert', 'War Caster', 'Fey Touched'],
  ['Alert', 'Inspiring Leader', 'Lucky'],
  ['War Caster', 'Inspiring Leader', 'Lucky'],
];

/**
 * Pre-selected magic item pair combinations from LORE_BARD_MAGIC_ITEM_POOL.
 * Ordered from most synergistic to most niche.
 */
const ITEM_PAIRS: [string, string][] = [
  ['Cloak of Protection', 'Hat of Disguise'],
  ['Cloak of Protection', '+1 Rapier'],
  ['Cloak of Protection', 'Instrument of the Bards — Canaith Mandolin'],
  ['Hat of Disguise', '+1 Rapier'],
  ['Hat of Disguise', 'Instrument of the Bards — Canaith Mandolin'],
  ['Cloak of Protection', 'Periapt of Proof against Poison'],
  ['+1 Rapier', 'Boots of Elvenkind'],
  ['Hat of Disguise', 'Staff of Charming'],
];

// ─── Standard Lore Bard Spell List ────────────────────────────────────────────

/**
 * Canonical College of Lore spell list used for all exploration builds.
 * Matches Lyra Silverstring's spell list — all core Lore Bard utility, control,
 * and social spells are present.
 */
const LORE_BARD_SPELL_LIST: BardSpell[] = [
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
];

// ─── Build Generator ───────────────────────────────────────────────────────────

/**
 * Construct a full BardCandidate object from a species template + feat list + item list.
 *
 * Base point-buy stats (27 points): STR 8 | DEX 14 | CON 14 | INT 10 | WIS 12 | CHA 15.
 * Racial bonuses are applied first, then feat ability bonuses (capped at 20).
 */
function buildLoreBardCandidate(
  species: SpeciesTemplate,
  feats: FeatTemplate[],
  magicItems: MagicItemTemplate[],
): BardCandidate {
  // 1 — Apply base point-buy stats
  const stats: BardAbilityScores = {
    strength: 8,
    dexterity: 14,
    constitution: 14,
    intelligence: 10,
    wisdom: 12,
    charisma: 15,
  };

  // 2 — Apply racial bonuses
  for (const [stat, bonus] of Object.entries(species.abilityBonuses)) {
    (stats as unknown as Record<string, number>)[stat] = Math.min(
      (stats as unknown as Record<string, number>)[stat] + (bonus as number),
      20,
    );
  }

  // 3 — Apply feat ability bonuses
  for (const feat of feats) {
    if (feat.abilityBonus) {
      for (const [stat, bonus] of Object.entries(feat.abilityBonus)) {
        (stats as unknown as Record<string, number>)[stat] = Math.min(
          (stats as unknown as Record<string, number>)[stat] + (bonus as number),
          20,
        );
      }
    }
  }

  // 4 — HP: 8d8 average (4.5 per die × 8) + CON mod × 8 + Tough feat bonus
  const conMod = Math.floor((stats.constitution - 10) / 2);
  const toughBonus = feats.some((f) => f.name === 'Tough') ? 16 : 0;
  const maxHitPoints = Math.round(4.5 * 8) + conMod * 8 + toughBonus;

  // 5 — AC: light armor (studded leather, no DEX cap) + optional Cloak (+1)
  // Note: Cloak bonus is applied in the simulation; armorClass stores the base.
  const dexMod = Math.floor((stats.dexterity - 10) / 2);
  const armorClass = 12 + dexMod; // studded leather base 12

  // 6 — Build identifier
  const featKey = feats.map((f) => f.name.replace(/\s+/g, '-').toLowerCase()).sort().join('+');
  const itemKey = magicItems.map((i) => i.name.replace(/\s+/g, '-').toLowerCase().slice(0, 12)).sort().join('+');
  const buildId = `lore-${species.id}__${featKey}__${itemKey}`;

  // 7 — Assemble equipment (mundane base gear + selected magic items)
  const equipment: BardEquipment[] = [
    { name: 'Rapier', type: 'weapon', rarity: 'common', properties: ['finesse'], damage: '1d8' },
    { name: 'Studded Leather Armor', type: 'armor', rarity: 'common', properties: [], armorClass: 12 },
    { name: 'Lute', type: 'instrument', rarity: 'common', properties: ['focus'] },
    ...magicItems,
  ];

  return {
    id: buildId,
    name: `College of Lore Bard (${species.subspecies})`,
    species: species.species,
    subspecies: species.subspecies,
    subclass: 'College of Lore',
    background: 'Sage',
    abilityScores: stats,
    armorClass,
    maxHitPoints,
    speed: species.speed,
    proficiencyBonus: 3,
    savingThrows: ['Dexterity', 'Charisma'],
    skillProficiencies: [
      'Arcana', 'History', 'Insight', 'Perception',
      'Persuasion', 'Deception', 'Performance',
    ],
    skillExpertise: ['Persuasion', 'Deception'],
    feats: feats.map((f) => ({ name: f.name, description: f.description })),
    spells: LORE_BARD_SPELL_LIST,
    equipment,
    specialTraits: [
      ...species.specialTraits,
      'Cutting Words: impose disadvantage on enemy attack rolls, ability checks, or damage',
      'Jack of All Trades: add half proficiency to all non-proficient ability checks',
      `Bardic Inspiration (d8): grant a d8 to an ally's roll (CHA mod uses per short rest)`,
      'Magical Secrets (L6): Counterspell + Dimension Door from the Wizard list',
    ],
    lore: `A College of Lore bard of ${species.subspecies} heritage. Every choice in this ` +
      `build was evaluated by Savras — The All-Seeing — across hundreds of simulated encounters.`,
    combatTraits: species.combatTraits,
  };
}

// ─── Exploration Runner ────────────────────────────────────────────────────────

/**
 * Generate all builds in the exploration matrix.
 *
 * Returns one BardCandidate per (species, feat combination, item pair) triple.
 * Non-Variant-Human species use 2-feat pairs; Variant Human uses 3-feat triples.
 */
export function generateLoreBardBuilds(): BardCandidate[] {
  const builds: BardCandidate[] = [];
  const featPool = new Map(LORE_BARD_FEAT_POOL.map((f) => [f.name, f]));
  const itemPool = new Map(LORE_BARD_MAGIC_ITEM_POOL.map((i) => [i.name, i]));

  for (const species of LORE_BARD_SPECIES_POOL) {
    const featCombos = species.extraFeatSlot ? FEAT_TRIPLES : FEAT_PAIRS;
    for (const featNames of featCombos) {
      const feats = featNames
        .map((n) => featPool.get(n))
        .filter((f): f is FeatTemplate => f !== undefined);
      for (const [item1Name, item2Name] of ITEM_PAIRS) {
        const item1 = itemPool.get(item1Name);
        const item2 = itemPool.get(item2Name);
        if (!item1 || !item2) continue;
        builds.push(buildLoreBardCandidate(species, feats, [item1, item2]));
      }
    }
  }

  return builds;
}

/**
 * Run a full exploration benchmark over all generated builds.
 *
 * Uses a configurable number of iterations per scenario (default: 25) for speed.
 * The standard benchmark (`runBardBenchmarks`) uses 200 for high accuracy;
 * the exploration trades precision for breadth across hundreds of builds.
 *
 * @param iterationsPerScenario - Simulations per combat/social/party scenario (default 25).
 * @param topN - Cap the returned ranked list to the N best builds (default 50, 0 = all).
 * @param weights - Optional scoring weights or campaign profile ID.
 *   Omit to use `DEFAULT_SCORING_WEIGHTS` (equal scenario weights, 40/40/20 categories).
 */
export function runLoreBardExploration(
  iterationsPerScenario = 25,
  topN = 50,
  weights?: Partial<ScoringWeights> | string,
): BardExplorationResult {
  const resolvedWeights = resolveWeights(weights);
  const builds = generateLoreBardBuilds();

  // Run benchmarks for every build
  const rawResults = builds.map((candidate) => {
    const combatResults = runCombatBenchmark(candidate, iterationsPerScenario);
    const socialResults = runSocialBenchmark(candidate, iterationsPerScenario);
    const partyResults = runPartySupportBenchmark(candidate, iterationsPerScenario);

    const combatScore = computeWeightedCategoryScore(
      combatResults,
      resolvedWeights.combatScenarios,
    );
    const socialScore = computeWeightedCategoryScore(
      socialResults,
      resolvedWeights.socialScenarios,
    );
    const partyScore = computeWeightedCategoryScore(
      partyResults,
      resolvedWeights.partySupportScenarios,
    );
    const compositeScore = computeCompositeScore(
      combatScore,
      socialScore,
      partyScore,
      resolvedWeights.categoryWeights,
    );

    const cha = Math.floor((candidate.abilityScores.charisma - 10) / 2);
    const magicItems = candidate.equipment
      .filter((e) => e.rarity === 'uncommon')
      .map((e) => e.name);

    const strengths = identifyStrengths(candidate, combatResults, socialResults, partyResults);
    const weaknesses = identifyWeaknesses(candidate, combatResults);

    // Brief Savras assessment for exploration builds
    const assessment = compositeScore >= 70
      ? `A strong candidate. Spell save DC ${8 + cha + 3} with ${candidate.feats.map((f) => f.name).join(' + ')} ` +
        `on ${candidate.subspecies} chassis. The paths of fate converge favourably.`
      : compositeScore >= 55
        ? `A viable candidate. Some paths remain suboptimal — examine the breakdown to locate the weakness.`
        : `Below-average performance. The combination of feats or magic items may not align with the ` +
          `demands of College of Lore at this level.`;

    return {
      rank: 0,
      buildId: candidate.id,
      species: candidate.species,
      subspecies: candidate.subspecies,
      feats: candidate.feats.map((f) => f.name),
      magicItems,
      abilityScores: candidate.abilityScores,
      armorClass: candidate.armorClass,
      maxHitPoints: candidate.maxHitPoints,
      charismaModifier: cha,
      spellSaveDC: 8 + cha + candidate.proficiencyBonus,
      compositeScore,
      combatScore,
      socialScore,
      partySupportScore: partyScore,
      strengths,
      weaknesses,
      assessment,
    } as BardBuildResult;
  });

  // Sort and assign ranks
  rawResults.sort((a, b) => b.compositeScore - a.compositeScore);
  rawResults.forEach((r, i) => { r.rank = i + 1; });

  const allBuilds = rawResults;
  const topBuilds = topN > 0 ? allBuilds.slice(0, topN) : allBuilds;

  // ── By-species breakdown ───────────────────────────────────────────────────
  const bySpecies: BardExplorationResult['bySpecies'] = {};
  for (const result of allBuilds) {
    const key = `${result.species} (${result.subspecies})`;
    if (!bySpecies[key]) {
      bySpecies[key] = { topBuild: result, averageCompositeScore: 0 };
    }
  }
  for (const key of Object.keys(bySpecies)) {
    const group = allBuilds.filter(
      (r) => `${r.species} (${r.subspecies})` === key,
    );
    const avg = group.reduce((s, r) => s + r.compositeScore, 0) / group.length;
    bySpecies[key].averageCompositeScore = parseFloat(avg.toFixed(1));
  }

  // ── By-feat-combination breakdown ─────────────────────────────────────────
  const byFeatCombination: BardExplorationResult['byFeatCombination'] = {};
  for (const result of allBuilds) {
    const key = result.feats.slice().sort().join(' + ');
    if (!byFeatCombination[key]) {
      byFeatCombination[key] = { topBuild: result, averageCompositeScore: 0 };
    }
  }
  for (const key of Object.keys(byFeatCombination)) {
    const group = allBuilds.filter(
      (r) => r.feats.slice().sort().join(' + ') === key,
    );
    const avg = group.reduce((s, r) => s + r.compositeScore, 0) / group.length;
    byFeatCombination[key].averageCompositeScore = parseFloat(avg.toFixed(1));
  }

  // ── By-magic-items breakdown ───────────────────────────────────────────────
  const byMagicItems: BardExplorationResult['byMagicItems'] = {};
  for (const result of allBuilds) {
    const key = result.magicItems.slice().sort().join(' + ');
    if (!byMagicItems[key]) {
      byMagicItems[key] = { topBuild: result, averageCompositeScore: 0 };
    }
  }
  for (const key of Object.keys(byMagicItems)) {
    const group = allBuilds.filter(
      (r) => r.magicItems.slice().sort().join(' + ') === key,
    );
    const avg = group.reduce((s, r) => s + r.compositeScore, 0) / group.length;
    byMagicItems[key].averageCompositeScore = parseFloat(avg.toFixed(1));
  }

  return {
    summary: {
      totalBuildsEvaluated: allBuilds.length,
      iterationsPerScenario,
      subclassFixed: 'College of Lore',
      level: 8,
      scoringWeightsUsed: resolvedWeights,
    },
    topBuilds,
    bySpecies,
    byFeatCombination,
    byMagicItems,
  };
}

/**
 * Return the species pool available for exploration.
 */
export function getLoreBardSpeciesPool(): SpeciesTemplate[] {
  return LORE_BARD_SPECIES_POOL;
}

/**
 * Return the feat pool available for exploration.
 */
export function getLoreBardFeatPool(): FeatTemplate[] {
  return LORE_BARD_FEAT_POOL;
}

/**
 * Return the magic item pool available for exploration.
 */
export function getLoreBardMagicItemPool(): MagicItemTemplate[] {
  return LORE_BARD_MAGIC_ITEM_POOL;
}
