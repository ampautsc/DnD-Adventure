export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface MonsterAttack {
  name: string;
  attackBonus: number;
  reach?: number;
  range?: string;
  damage: string;
  damageType: string;
  description?: string;
}

export interface MonsterTrait {
  name: string;
  description: string;
}

export interface LegendaryAction {
  name: string;
  cost: number;
  description: string;
}

export interface MonsterSenses {
  darkvision?: number;
  blindsight?: number;
  truesight?: number;
  tremorsense?: number;
  passivePerception: number;
}

export interface Monster {
  name: string;
  cr: string;
  xp: number;
  hp: number;
  maxHp: number;
  ac: number;
  acDescription?: string;
  speed: string;
  size: string;
  type: string;
  subtype?: string;
  alignment: string;
  abilityScores: AbilityScores;
  savingThrows?: Partial<Record<string, number>>;
  skills?: Partial<Record<string, number>>;
  damageImmunities: string[];
  damageResistances: string[];
  damageVulnerabilities: string[];
  conditionImmunities: string[];
  senses: MonsterSenses;
  languages: string[];
  attacks: MonsterAttack[];
  traits: MonsterTrait[];
  legendaryActions?: LegendaryAction[];
  spells?: string[];
  proficiencyBonus: number;
  multiattack?: string;
}

export const monsters: Monster[] = [
  // ─── CR 1/8 ───────────────────────────────────────────────────────────────
  {
    name: "Bandit",
    cr: "1/8",
    xp: 25,
    hp: 11,
    maxHp: 11,
    ac: 12,
    acDescription: "leather armor",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "human",
    alignment: "chaotic neutral",
    abilityScores: { strength: 11, dexterity: 12, constitution: 12, intelligence: 10, wisdom: 10, charisma: 10 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { passivePerception: 10 },
    languages: ["any one language (usually Common)"],
    attacks: [
      {
        name: "Scimitar",
        attackBonus: 3,
        reach: 5,
        damage: "1d6+1",
        damageType: "slashing",
      },
      {
        name: "Light Crossbow",
        attackBonus: 3,
        range: "80/320",
        damage: "1d8+1",
        damageType: "piercing",
      },
    ],
    traits: [],
    proficiencyBonus: 2,
  },
  {
    name: "Cultist",
    cr: "1/8",
    xp: 25,
    hp: 9,
    maxHp: 9,
    ac: 12,
    acDescription: "leather armor",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "human",
    alignment: "neutral evil",
    abilityScores: { strength: 11, dexterity: 12, constitution: 10, intelligence: 10, wisdom: 11, charisma: 10 },
    skills: { deception: 2, religion: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { passivePerception: 10 },
    languages: ["any one language (usually Common)"],
    attacks: [
      {
        name: "Scimitar",
        attackBonus: 3,
        reach: 5,
        damage: "1d6+1",
        damageType: "slashing",
      },
    ],
    traits: [
      {
        name: "Dark Devotion",
        description: "The cultist has advantage on saving throws against being frightened or charmed.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Guard",
    cr: "1/8",
    xp: 25,
    hp: 11,
    maxHp: 11,
    ac: 16,
    acDescription: "chain mail, shield",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "human",
    alignment: "any alignment",
    abilityScores: { strength: 13, dexterity: 12, constitution: 12, intelligence: 10, wisdom: 11, charisma: 10 },
    skills: { perception: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { passivePerception: 12 },
    languages: ["any one language (usually Common)"],
    attacks: [
      {
        name: "Spear",
        attackBonus: 3,
        reach: 5,
        range: "20/60",
        damage: "1d6+1",
        damageType: "piercing",
        description: "Can be used as melee or ranged attack.",
      },
    ],
    traits: [],
    proficiencyBonus: 2,
  },
  {
    name: "Giant Rat",
    cr: "1/8",
    xp: 25,
    hp: 7,
    maxHp: 7,
    ac: 12,
    speed: "30 ft., swim 30 ft.",
    size: "Small",
    type: "beast",
    alignment: "unaligned",
    abilityScores: { strength: 7, dexterity: 15, constitution: 11, intelligence: 2, wisdom: 10, charisma: 4 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 10 },
    languages: [],
    attacks: [
      {
        name: "Bite",
        attackBonus: 4,
        reach: 5,
        damage: "1d4+2",
        damageType: "piercing",
      },
    ],
    traits: [
      {
        name: "Keen Smell",
        description: "The rat has advantage on Wisdom (Perception) checks that rely on smell.",
      },
      {
        name: "Pack Tactics",
        description: "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 feet of the creature and the ally isn't incapacitated.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Kobold",
    cr: "1/8",
    xp: 25,
    hp: 5,
    maxHp: 5,
    ac: 12,
    acDescription: "leather armor",
    speed: "30 ft.",
    size: "Small",
    type: "humanoid",
    subtype: "koboldoid",
    alignment: "lawful evil",
    abilityScores: { strength: 7, dexterity: 15, constitution: 9, intelligence: 8, wisdom: 7, charisma: 8 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 8 },
    languages: ["Common", "Draconic"],
    attacks: [
      {
        name: "Dagger",
        attackBonus: 4,
        reach: 5,
        damage: "1d4+2",
        damageType: "piercing",
      },
      {
        name: "Sling",
        attackBonus: 4,
        range: "30/120",
        damage: "1d4+2",
        damageType: "bludgeoning",
      },
    ],
    traits: [
      {
        name: "Pack Tactics",
        description: "The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally isn't incapacitated.",
      },
      {
        name: "Sunlight Sensitivity",
        description: "While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
      },
    ],
    proficiencyBonus: 2,
  },

  // ─── CR 1/4 ───────────────────────────────────────────────────────────────
  {
    name: "Goblin",
    cr: "1/4",
    xp: 50,
    hp: 7,
    maxHp: 7,
    ac: 15,
    acDescription: "leather armor, shield",
    speed: "30 ft.",
    size: "Small",
    type: "humanoid",
    subtype: "goblinoid",
    alignment: "neutral evil",
    abilityScores: { strength: 8, dexterity: 14, constitution: 10, intelligence: 10, wisdom: 8, charisma: 8 },
    skills: { stealth: 6 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 9 },
    languages: ["Common", "Goblin"],
    attacks: [
      {
        name: "Scimitar",
        attackBonus: 4,
        reach: 5,
        damage: "1d6+2",
        damageType: "slashing",
      },
      {
        name: "Shortbow",
        attackBonus: 4,
        range: "80/320",
        damage: "1d6+2",
        damageType: "piercing",
      },
    ],
    traits: [
      {
        name: "Nimble Escape",
        description: "The goblin can take the Disengage or Hide action as a bonus action on each of its turns.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Skeleton",
    cr: "1/4",
    xp: 50,
    hp: 13,
    maxHp: 13,
    ac: 13,
    acDescription: "armor scraps",
    speed: "30 ft.",
    size: "Medium",
    type: "undead",
    alignment: "lawful evil",
    abilityScores: { strength: 10, dexterity: 14, constitution: 15, intelligence: 6, wisdom: 8, charisma: 5 },
    damageImmunities: ["poison"],
    damageResistances: [],
    damageVulnerabilities: ["bludgeoning"],
    conditionImmunities: ["exhaustion", "poisoned"],
    senses: { darkvision: 60, passivePerception: 9 },
    languages: ["understands all languages it knew in life but can't speak"],
    attacks: [
      {
        name: "Shortsword",
        attackBonus: 4,
        reach: 5,
        damage: "1d6+2",
        damageType: "piercing",
      },
      {
        name: "Shortbow",
        attackBonus: 4,
        range: "80/320",
        damage: "1d6+2",
        damageType: "piercing",
      },
    ],
    traits: [],
    proficiencyBonus: 2,
  },
  {
    name: "Wolf",
    cr: "1/4",
    xp: 50,
    hp: 11,
    maxHp: 11,
    ac: 13,
    acDescription: "natural armor",
    speed: "40 ft.",
    size: "Medium",
    type: "beast",
    alignment: "unaligned",
    abilityScores: { strength: 12, dexterity: 15, constitution: 12, intelligence: 3, wisdom: 12, charisma: 6 },
    skills: { perception: 3, stealth: 4 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { passivePerception: 13 },
    languages: [],
    attacks: [
      {
        name: "Bite",
        attackBonus: 4,
        reach: 5,
        damage: "2d4+2",
        damageType: "piercing",
        description: "If the target is a creature of Large size or smaller, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
      },
    ],
    traits: [
      {
        name: "Keen Hearing and Smell",
        description: "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
      },
      {
        name: "Pack Tactics",
        description: "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated.",
      },
    ],
    proficiencyBonus: 2,
  },

  // ─── CR 1/2 ───────────────────────────────────────────────────────────────
  {
    name: "Orc",
    cr: "1/2",
    xp: 100,
    hp: 15,
    maxHp: 15,
    ac: 13,
    acDescription: "hide armor",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "orc",
    alignment: "chaotic evil",
    abilityScores: { strength: 16, dexterity: 12, constitution: 16, intelligence: 7, wisdom: 11, charisma: 10 },
    skills: { intimidation: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 10 },
    languages: ["Common", "Orc"],
    attacks: [
      {
        name: "Greataxe",
        attackBonus: 5,
        reach: 5,
        damage: "1d12+3",
        damageType: "slashing",
      },
      {
        name: "Javelin",
        attackBonus: 5,
        reach: 5,
        range: "30/120",
        damage: "1d6+3",
        damageType: "piercing",
      },
    ],
    traits: [
      {
        name: "Aggressive",
        description: "As a bonus action, the orc can move up to its speed toward a hostile creature that it can see.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Zombie",
    cr: "1/4",
    xp: 50,
    hp: 22,
    maxHp: 22,
    ac: 8,
    speed: "20 ft.",
    size: "Medium",
    type: "undead",
    alignment: "neutral evil",
    abilityScores: { strength: 13, dexterity: 6, constitution: 16, intelligence: 3, wisdom: 6, charisma: 5 },
    savingThrows: { wisdom: 0 },
    damageImmunities: ["poison"],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: ["poisoned"],
    senses: { darkvision: 60, passivePerception: 8 },
    languages: ["understands all languages it knew in life but can't speak"],
    attacks: [
      {
        name: "Slam",
        attackBonus: 3,
        reach: 5,
        damage: "1d6+1",
        damageType: "bludgeoning",
      },
    ],
    traits: [
      {
        name: "Undead Fortitude",
        description: "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Hobgoblin",
    cr: "1/2",
    xp: 100,
    hp: 11,
    maxHp: 11,
    ac: 18,
    acDescription: "chain mail, shield",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "goblinoid",
    alignment: "lawful evil",
    abilityScores: { strength: 13, dexterity: 12, constitution: 12, intelligence: 10, wisdom: 10, charisma: 9 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 10 },
    languages: ["Common", "Goblin"],
    attacks: [
      {
        name: "Longsword",
        attackBonus: 3,
        reach: 5,
        damage: "1d8+1",
        damageType: "slashing",
      },
      {
        name: "Longbow",
        attackBonus: 3,
        range: "150/600",
        damage: "1d8+1",
        damageType: "piercing",
      },
    ],
    traits: [
      {
        name: "Martial Advantage",
        description: "Once per turn, the hobgoblin can deal an extra 7 (2d6) damage to a creature it hits with a weapon attack if that creature is within 5 feet of an ally of the hobgoblin that isn't incapacitated.",
      },
    ],
    proficiencyBonus: 2,
  },

  // ─── CR 1 ─────────────────────────────────────────────────────────────────
  {
    name: "Bugbear",
    cr: "1",
    xp: 200,
    hp: 27,
    maxHp: 27,
    ac: 16,
    acDescription: "hide armor, shield",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "goblinoid",
    alignment: "chaotic evil",
    abilityScores: { strength: 15, dexterity: 14, constitution: 13, intelligence: 8, wisdom: 11, charisma: 9 },
    skills: { stealth: 6, survival: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 10 },
    languages: ["Common", "Goblin"],
    attacks: [
      {
        name: "Morningstar",
        attackBonus: 4,
        reach: 5,
        damage: "2d8+2",
        damageType: "piercing",
      },
      {
        name: "Javelin",
        attackBonus: 4,
        reach: 5,
        range: "30/120",
        damage: "1d6+2",
        damageType: "piercing",
      },
    ],
    traits: [
      {
        name: "Brute",
        description: "A melee weapon deals one extra die of its damage when the bugbear hits with it (already included in the attack).",
      },
      {
        name: "Surprise Attack",
        description: "If the bugbear surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 7 (2d6) damage from the attack.",
      },
      {
        name: "Heart of Hruggek",
        description: "The bugbear has advantage on saving throws against being frightened.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Imp",
    cr: "1",
    xp: 200,
    hp: 10,
    maxHp: 10,
    ac: 13,
    acDescription: "natural armor",
    speed: "20 ft., fly 40 ft.",
    size: "Tiny",
    type: "fiend",
    subtype: "devil",
    alignment: "lawful evil",
    abilityScores: { strength: 6, dexterity: 17, constitution: 13, intelligence: 11, wisdom: 12, charisma: 14 },
    skills: { deception: 4, insight: 3, persuasion: 4, stealth: 5 },
    damageImmunities: ["fire", "poison"],
    damageResistances: ["cold", "bludgeoning, piercing, and slashing from nonmagical attacks"],
    damageVulnerabilities: [],
    conditionImmunities: ["poisoned"],
    senses: { darkvision: 120, passivePerception: 11 },
    languages: ["Infernal", "Common"],
    attacks: [
      {
        name: "Sting",
        attackBonus: 5,
        reach: 5,
        damage: "1d4+3",
        damageType: "piercing",
        description: "The target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much on a successful one.",
      },
    ],
    traits: [
      {
        name: "Shapechanger",
        description: "The imp can use its action to polymorph into a beast form that resembles a rat (speed 20 ft.), a raven (20 ft., fly 60 ft.), or a spider (20 ft., climb 20 ft.), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. It reverts to its true form if it dies.",
      },
      {
        name: "Devil's Sight",
        description: "Magical darkness doesn't impede the imp's darkvision.",
      },
      {
        name: "Magic Resistance",
        description: "The imp has advantage on saving throws against spells and other magical effects.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Ghoul",
    cr: "1",
    xp: 200,
    hp: 22,
    maxHp: 22,
    ac: 12,
    speed: "30 ft.",
    size: "Medium",
    type: "undead",
    alignment: "chaotic evil",
    abilityScores: { strength: 13, dexterity: 15, constitution: 10, intelligence: 7, wisdom: 10, charisma: 6 },
    damageImmunities: ["poison"],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: ["charmed", "exhaustion", "poisoned"],
    senses: { darkvision: 60, passivePerception: 10 },
    languages: ["Common"],
    attacks: [
      {
        name: "Bite",
        attackBonus: 2,
        reach: 5,
        damage: "2d6+2",
        damageType: "piercing",
      },
      {
        name: "Claws",
        attackBonus: 4,
        reach: 5,
        damage: "2d4+2",
        damageType: "slashing",
        description: "If the target is a creature other than an undead or elf, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
      },
    ],
    traits: [],
    proficiencyBonus: 2,
  },
  {
    name: "Specter",
    cr: "1",
    xp: 200,
    hp: 22,
    maxHp: 22,
    ac: 12,
    speed: "0 ft., fly 50 ft. (hover)",
    size: "Medium",
    type: "undead",
    alignment: "chaotic evil",
    abilityScores: { strength: 1, dexterity: 14, constitution: 11, intelligence: 10, wisdom: 10, charisma: 11 },
    damageImmunities: ["cold", "necrotic", "poison"],
    damageResistances: [
      "acid",
      "fire",
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical attacks",
    ],
    damageVulnerabilities: [],
    conditionImmunities: [
      "charmed",
      "exhaustion",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
    ],
    senses: { darkvision: 60, passivePerception: 10 },
    languages: ["understands all languages it knew in life but can't speak"],
    attacks: [
      {
        name: "Life Drain",
        attackBonus: 4,
        reach: 5,
        damage: "3d6",
        damageType: "necrotic",
        description: "The target must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the creature finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
      },
    ],
    traits: [
      {
        name: "Incorporeal Movement",
        description: "The specter can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.",
      },
      {
        name: "Sunlight Sensitivity",
        description: "While in sunlight, the specter has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
      },
    ],
    proficiencyBonus: 2,
  },

  // ─── CR 2 ─────────────────────────────────────────────────────────────────
  {
    name: "Ogre",
    cr: "2",
    xp: 450,
    hp: 59,
    maxHp: 59,
    ac: 11,
    acDescription: "hide armor",
    speed: "40 ft.",
    size: "Large",
    type: "giant",
    alignment: "chaotic evil",
    abilityScores: { strength: 19, dexterity: 8, constitution: 16, intelligence: 5, wisdom: 7, charisma: 7 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 8 },
    languages: ["Common", "Giant"],
    attacks: [
      {
        name: "Greatclub",
        attackBonus: 6,
        reach: 5,
        damage: "2d8+4",
        damageType: "bludgeoning",
      },
      {
        name: "Javelin",
        attackBonus: 6,
        reach: 5,
        range: "30/120",
        damage: "2d6+4",
        damageType: "piercing",
      },
    ],
    traits: [],
    proficiencyBonus: 2,
  },
  {
    name: "Bandit Captain",
    cr: "2",
    xp: 450,
    hp: 65,
    maxHp: 65,
    ac: 15,
    acDescription: "studded leather",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "human",
    alignment: "non-lawful",
    abilityScores: { strength: 15, dexterity: 16, constitution: 14, intelligence: 14, wisdom: 11, charisma: 14 },
    savingThrows: { strength: 4, dexterity: 5, wisdom: 2 },
    skills: { athletics: 4, deception: 4 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { passivePerception: 10 },
    languages: ["any two languages"],
    attacks: [
      {
        name: "Scimitar",
        attackBonus: 5,
        reach: 5,
        damage: "1d6+3",
        damageType: "slashing",
      },
      {
        name: "Dagger",
        attackBonus: 5,
        reach: 5,
        range: "20/60",
        damage: "1d4+3",
        damageType: "piercing",
      },
    ],
    traits: [],
    multiattack: "The bandit captain makes three attacks: two with its scimitar and one with its dagger.",
    proficiencyBonus: 2,
  },
  {
    name: "Cult Fanatic",
    cr: "2",
    xp: 450,
    hp: 33,
    maxHp: 33,
    ac: 13,
    acDescription: "leather armor",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "human",
    alignment: "non-good",
    abilityScores: { strength: 11, dexterity: 14, constitution: 12, intelligence: 10, wisdom: 13, charisma: 14 },
    savingThrows: { wisdom: 3 },
    skills: { deception: 4, persuasion: 4, religion: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { passivePerception: 11 },
    languages: ["any one language (usually Common)"],
    attacks: [
      {
        name: "Dagger",
        attackBonus: 4,
        reach: 5,
        range: "20/60",
        damage: "1d4+2",
        damageType: "piercing",
      },
    ],
    traits: [
      {
        name: "Dark Devotion",
        description: "The cult fanatic has advantage on saving throws against being frightened or charmed.",
      },
      {
        name: "Spellcasting",
        description: "The cult fanatic is a 4th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). It has the following cleric spells prepared: Cantrips (at will): sacred flame, light, thaumaturgy. 1st level (4 slots): command, inflict wounds. 2nd level (3 slots): hold person, spiritual weapon.",
      },
    ],
    spells: ["sacred flame", "light", "thaumaturgy", "command", "inflict wounds", "hold person", "spiritual weapon"],
    proficiencyBonus: 2,
  },

  // ─── CR 3 ─────────────────────────────────────────────────────────────────
  {
    name: "Hobgoblin Captain",
    cr: "3",
    xp: 700,
    hp: 52,
    maxHp: 52,
    ac: 17,
    acDescription: "half plate",
    speed: "30 ft.",
    size: "Medium",
    type: "humanoid",
    subtype: "goblinoid",
    alignment: "lawful evil",
    abilityScores: { strength: 15, dexterity: 14, constitution: 14, intelligence: 12, wisdom: 10, charisma: 13 },
    savingThrows: { intelligence: 3, wisdom: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 10 },
    languages: ["Common", "Goblin"],
    attacks: [
      {
        name: "Greatsword",
        attackBonus: 4,
        reach: 5,
        damage: "2d6+2",
        damageType: "slashing",
      },
      {
        name: "Javelin",
        attackBonus: 4,
        reach: 5,
        range: "30/120",
        damage: "1d6+2",
        damageType: "piercing",
      },
    ],
    traits: [
      {
        name: "Martial Advantage",
        description: "Once per turn, the hobgoblin captain can deal an extra 10 (3d6) damage to a creature it hits with a weapon attack if that creature is within 5 feet of an ally of the hobgoblin that isn't incapacitated.",
      },
      {
        name: "Leadership",
        description: "For 1 minute, the hobgoblin captain can utter a special command or warning whenever a nonhostile creature that it can see within 30 feet makes an attack roll or a saving throw. The creature can add a d4 to its roll provided it can hear and understand the hobgoblin. A creature can benefit from only one Leadership die at a time. This effect ends if the hobgoblin captain is incapacitated.",
      },
    ],
    multiattack: "The hobgoblin captain makes two greatsword attacks.",
    proficiencyBonus: 2,
  },
  {
    name: "Wight",
    cr: "3",
    xp: 700,
    hp: 45,
    maxHp: 45,
    ac: 14,
    acDescription: "studded leather",
    speed: "30 ft.",
    size: "Medium",
    type: "undead",
    alignment: "neutral evil",
    abilityScores: { strength: 15, dexterity: 14, constitution: 16, intelligence: 10, wisdom: 13, charisma: 15 },
    savingThrows: { wisdom: 3 },
    skills: { perception: 3, stealth: 4 },
    damageImmunities: ["cold", "necrotic", "poison"],
    damageResistances: [
      "bludgeoning, piercing, and slashing from nonmagical, nonsilvered attacks",
    ],
    damageVulnerabilities: [],
    conditionImmunities: ["exhaustion", "poisoned"],
    senses: { darkvision: 60, passivePerception: 13 },
    languages: ["the languages it knew in life"],
    attacks: [
      {
        name: "Longsword",
        attackBonus: 4,
        reach: 5,
        damage: "1d8+2",
        damageType: "slashing",
      },
      {
        name: "Longbow",
        attackBonus: 4,
        range: "150/600",
        damage: "1d8+2",
        damageType: "piercing",
      },
      {
        name: "Life Drain",
        attackBonus: 4,
        reach: 5,
        damage: "3d6+2",
        damageType: "necrotic",
        description: "The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
      },
    ],
    traits: [
      {
        name: "Sunlight Sensitivity",
        description: "While in sunlight, the wight has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
      },
      {
        name: "Create Undead",
        description: "A humanoid slain by the wight rises as a zombie under the wight's control 24 hours after dying.",
      },
    ],
    proficiencyBonus: 2,
  },
  {
    name: "Doppelganger",
    cr: "3",
    xp: 700,
    hp: 52,
    maxHp: 52,
    ac: 14,
    speed: "30 ft.",
    size: "Medium",
    type: "monstrosity",
    subtype: "shapechanger",
    alignment: "neutral",
    abilityScores: { strength: 11, dexterity: 18, constitution: 14, intelligence: 11, wisdom: 12, charisma: 14 },
    skills: { deception: 6, insight: 3 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: ["charmed"],
    senses: { passivePerception: 11 },
    languages: ["Common"],
    attacks: [
      {
        name: "Slam",
        attackBonus: 6,
        reach: 5,
        damage: "1d6+4",
        damageType: "bludgeoning",
      },
    ],
    traits: [
      {
        name: "Shapechanger",
        description: "The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.",
      },
      {
        name: "Ambusher",
        description: "In the first round of a combat, the doppelganger has advantage on attack rolls against any creature it has surprised.",
      },
      {
        name: "Surprise Attack",
        description: "If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.",
      },
      {
        name: "Read Thoughts",
        description: "The doppelganger magically reads the surface thoughts of one creature within 60 feet of it. The effect can penetrate barriers, but 3 feet of wood or dirt, 2 feet of stone, 2 inches of metal, or a thin sheet of lead blocks it. While the target is in range, the doppelganger can continue reading its thoughts, as long as the doppelganger's concentration isn't broken. A DC 13 Wisdom saving throw negates the effect.",
      },
    ],
    multiattack: "The doppelganger makes two slam attacks.",
    proficiencyBonus: 2,
  },

  // ─── CR 5 ─────────────────────────────────────────────────────────────────
  {
    name: "Troll",
    cr: "5",
    xp: 1800,
    hp: 84,
    maxHp: 84,
    ac: 15,
    acDescription: "natural armor",
    speed: "30 ft.",
    size: "Large",
    type: "giant",
    alignment: "chaotic evil",
    abilityScores: { strength: 18, dexterity: 13, constitution: 20, intelligence: 7, wisdom: 9, charisma: 7 },
    skills: { perception: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: ["acid", "fire"],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 12 },
    languages: ["Giant"],
    attacks: [
      {
        name: "Bite",
        attackBonus: 7,
        reach: 5,
        damage: "1d6+4",
        damageType: "piercing",
      },
      {
        name: "Claw",
        attackBonus: 7,
        reach: 5,
        damage: "2d6+4",
        damageType: "slashing",
      },
    ],
    traits: [
      {
        name: "Keen Smell",
        description: "The troll has advantage on Wisdom (Perception) checks that rely on smell.",
      },
      {
        name: "Regeneration",
        description: "The troll regains 10 hit points at the start of its turn. If the troll takes acid or fire damage, this trait doesn't function at the start of the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate.",
      },
    ],
    multiattack: "The troll makes one bite attack and two claw attacks.",
    proficiencyBonus: 3,
  },
  {
    name: "Wraith",
    cr: "5",
    xp: 1800,
    hp: 67,
    maxHp: 67,
    ac: 13,
    speed: "0 ft., fly 60 ft. (hover)",
    size: "Medium",
    type: "undead",
    alignment: "neutral evil",
    abilityScores: { strength: 6, dexterity: 16, constitution: 16, intelligence: 12, wisdom: 14, charisma: 15 },
    damageImmunities: ["cold", "necrotic", "poison"],
    damageResistances: [
      "acid",
      "fire",
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical attacks",
    ],
    damageVulnerabilities: [],
    conditionImmunities: [
      "charmed",
      "exhaustion",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
    ],
    senses: { darkvision: 60, truesight: 10, passivePerception: 12 },
    languages: ["the languages it knew in life"],
    attacks: [
      {
        name: "Life Drain",
        attackBonus: 6,
        reach: 5,
        damage: "4d8+3",
        damageType: "necrotic",
        description: "The target must succeed on a DC 14 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
      },
      {
        name: "Create Specter",
        attackBonus: 0,
        reach: 5,
        damage: "0",
        damageType: "necrotic",
        description: "The wraith targets a humanoid within 10 feet of it that has been dead for no longer than 1 minute and died violently. That creature's spirit rises as a specter in the space of its corpse or in the nearest unoccupied space. The specter is under the wraith's control.",
      },
    ],
    traits: [
      {
        name: "Incorporeal Movement",
        description: "The wraith can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.",
      },
      {
        name: "Sunlight Sensitivity",
        description: "While in sunlight, the wraith has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
      },
    ],
    proficiencyBonus: 3,
  },
  {
    name: "Hill Giant",
    cr: "5",
    xp: 1800,
    hp: 105,
    maxHp: 105,
    ac: 13,
    acDescription: "natural armor",
    speed: "40 ft.",
    size: "Huge",
    type: "giant",
    alignment: "chaotic evil",
    abilityScores: { strength: 21, dexterity: 8, constitution: 19, intelligence: 5, wisdom: 9, charisma: 6 },
    skills: { perception: 2 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { passivePerception: 12 },
    languages: ["Giant", "Common"],
    attacks: [
      {
        name: "Greatclub",
        attackBonus: 8,
        reach: 10,
        damage: "3d8+5",
        damageType: "bludgeoning",
      },
      {
        name: "Rock",
        attackBonus: 8,
        range: "60/240",
        damage: "3d10+5",
        damageType: "bludgeoning",
      },
    ],
    traits: [],
    multiattack: "The hill giant makes two greatclub attacks.",
    proficiencyBonus: 3,
  },

  // ─── CR 7 ─────────────────────────────────────────────────────────────────
  {
    name: "Stone Giant",
    cr: "7",
    xp: 2900,
    hp: 126,
    maxHp: 126,
    ac: 17,
    acDescription: "natural armor",
    speed: "40 ft.",
    size: "Huge",
    type: "giant",
    alignment: "neutral",
    abilityScores: { strength: 23, dexterity: 15, constitution: 20, intelligence: 10, wisdom: 12, charisma: 9 },
    savingThrows: { dexterity: 5, constitution: 8, wisdom: 4 },
    skills: { athletics: 12, perception: 4 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 60, passivePerception: 14 },
    languages: ["Giant"],
    attacks: [
      {
        name: "Greatclub",
        attackBonus: 9,
        reach: 15,
        damage: "3d8+6",
        damageType: "bludgeoning",
      },
      {
        name: "Rock",
        attackBonus: 9,
        range: "60/240",
        damage: "4d10+6",
        damageType: "bludgeoning",
      },
    ],
    traits: [
      {
        name: "Stone Camouflage",
        description: "The giant has advantage on Dexterity (Stealth) checks made to hide in rocky terrain.",
      },
    ],
    multiattack: "The stone giant makes two greatclub attacks.",
    proficiencyBonus: 3,
  },
  {
    name: "Mind Flayer",
    cr: "7",
    xp: 2900,
    hp: 71,
    maxHp: 71,
    ac: 15,
    acDescription: "natural armor",
    speed: "30 ft.",
    size: "Medium",
    type: "aberration",
    alignment: "lawful evil",
    abilityScores: { strength: 11, dexterity: 12, constitution: 12, intelligence: 19, wisdom: 17, charisma: 17 },
    savingThrows: { intelligence: 7, wisdom: 6, charisma: 6 },
    skills: { arcana: 7, deception: 6, insight: 6, perception: 6, persuasion: 6, stealth: 4 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 120, passivePerception: 16 },
    languages: ["Deep Speech", "Undercommon", "telepathy 120 ft."],
    attacks: [
      {
        name: "Tentacles",
        attackBonus: 7,
        reach: 5,
        damage: "2d10+4",
        damageType: "psychic",
        description: "The target is grappled (escape DC 15). Until this grapple ends, the target is restrained. The mind flayer can only grapple one creature at a time.",
      },
      {
        name: "Extract Brain",
        attackBonus: 7,
        reach: 5,
        damage: "10d10",
        damageType: "piercing",
        description: "Melee weapon attack against a Medium or smaller creature grappled by the mind flayer. If this attack reduces the target to 0 HP, the mind flayer kills it by extracting and devouring its brain.",
      },
      {
        name: "Mind Blast",
        attackBonus: 0,
        range: "60",
        damage: "4d8+4",
        damageType: "psychic",
        description: "Recharge 5-6. The mind flayer magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 15 Intelligence saving throw or take 22 (4d8+4) psychic damage and be stunned for 1 minute.",
      },
    ],
    traits: [
      {
        name: "Magic Resistance",
        description: "The mind flayer has advantage on saving throws against spells and other magical effects.",
      },
      {
        name: "Innate Spellcasting",
        description: "The mind flayer's innate spellcasting ability is Intelligence (spell save DC 15). It can innately cast the following spells, requiring no components: At will: detect thoughts, levitate. 1/day each: dominate monster, plane shift (self only), astral projection (self only).",
      },
    ],
    spells: ["detect thoughts", "levitate", "dominate monster", "plane shift", "astral projection"],
    proficiencyBonus: 3,
  },

  // ─── CR 10 ────────────────────────────────────────────────────────────────
  {
    name: "Young Red Dragon",
    cr: "10",
    xp: 5900,
    hp: 178,
    maxHp: 178,
    ac: 18,
    acDescription: "natural armor",
    speed: "40 ft., fly 80 ft.",
    size: "Large",
    type: "dragon",
    alignment: "chaotic evil",
    abilityScores: { strength: 23, dexterity: 10, constitution: 21, intelligence: 14, wisdom: 11, charisma: 19 },
    savingThrows: { dexterity: 4, constitution: 9, wisdom: 4, charisma: 8 },
    skills: { perception: 8, stealth: 4 },
    damageImmunities: ["fire"],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { blindsight: 30, darkvision: 120, passivePerception: 18 },
    languages: ["Common", "Draconic"],
    attacks: [
      {
        name: "Bite",
        attackBonus: 10,
        reach: 10,
        damage: "2d10+6",
        damageType: "piercing",
      },
      {
        name: "Claw",
        attackBonus: 10,
        reach: 5,
        damage: "2d6+6",
        damageType: "slashing",
      },
      {
        name: "Fire Breath",
        attackBonus: 0,
        range: "30",
        damage: "16d6",
        damageType: "fire",
        description: "Recharge 5-6. The dragon exhales fire in a 30-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much on a successful one.",
      },
    ],
    traits: [],
    multiattack: "The dragon makes three attacks: one with its bite and two with its claws.",
    proficiencyBonus: 4,
  },

  // ─── CR 13 ────────────────────────────────────────────────────────────────
  {
    name: "Vampire",
    cr: "13",
    xp: 10000,
    hp: 144,
    maxHp: 144,
    ac: 16,
    acDescription: "natural armor",
    speed: "30 ft.",
    size: "Medium",
    type: "undead",
    subtype: "shapechanger",
    alignment: "lawful evil",
    abilityScores: { strength: 18, dexterity: 18, constitution: 18, intelligence: 17, wisdom: 15, charisma: 18 },
    savingThrows: { dexterity: 9, wisdom: 7, charisma: 9 },
    skills: { perception: 7, stealth: 9 },
    damageImmunities: [],
    damageResistances: [
      "necrotic",
      "bludgeoning, piercing, and slashing from nonmagical, nonsilvered attacks",
    ],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { darkvision: 120, passivePerception: 17 },
    languages: ["the languages it knew in life"],
    attacks: [
      {
        name: "Unarmed Strike",
        attackBonus: 9,
        reach: 5,
        damage: "1d8+4",
        damageType: "bludgeoning",
        description: "Instead of dealing damage, the vampire can grapple the target (escape DC 18).",
      },
      {
        name: "Bite",
        attackBonus: 9,
        reach: 5,
        damage: "1d6+4",
        damageType: "piercing",
        description: "The target must be grappled, incapacitated, or willing. The target takes 3d6 necrotic damage in addition to the piercing damage, and the vampire regains hit points equal to the necrotic damage dealt.",
      },
    ],
    traits: [
      {
        name: "Shapechanger",
        description: "If the vampire isn't in sunlight or running water, it can use its action to polymorph into a Tiny bat or a Medium cloud of mist, or back into its true form.",
      },
      {
        name: "Legendary Resistance (3/Day)",
        description: "If the vampire fails a saving throw, it can choose to succeed instead.",
      },
      {
        name: "Misty Escape",
        description: "When it drops to 0 hit points outside its resting place, the vampire transforms into a cloud of mist instead of falling unconscious, provided it isn't in sunlight or running water.",
      },
      {
        name: "Regeneration",
        description: "The vampire regains 20 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or running water. If the vampire takes radiant damage or damage from holy water, this trait doesn't function at the start of the vampire's next turn.",
      },
      {
        name: "Spider Climb",
        description: "The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
      },
      {
        name: "Vampire Weaknesses",
        description: "The vampire has the following flaws: Forbiddance (can't enter a residence without an invitation), Harmed by Running Water (takes 20 acid damage when it ends its turn in running water), Stake to the Heart (is destroyed if a piercing weapon made of wood is driven into its heart while incapacitated), Sunlight Hypersensitivity (takes 20 radiant damage when it starts its turn in sunlight and has disadvantage on attacks and ability checks).",
      },
    ],
    legendaryActions: [
      { name: "Move", cost: 1, description: "The vampire moves up to its speed without provoking opportunity attacks." },
      { name: "Unarmed Strike", cost: 1, description: "The vampire makes one unarmed strike." },
      { name: "Bite (Costs 2 Actions)", cost: 2, description: "The vampire makes one bite attack." },
    ],
    multiattack: "The vampire makes two attacks, only one of which can be a bite attack.",
    proficiencyBonus: 5,
  },
  {
    name: "Beholder",
    cr: "13",
    xp: 10000,
    hp: 180,
    maxHp: 180,
    ac: 18,
    acDescription: "natural armor",
    speed: "0 ft., fly 20 ft. (hover)",
    size: "Large",
    type: "aberration",
    alignment: "lawful evil",
    abilityScores: { strength: 10, dexterity: 14, constitution: 18, intelligence: 17, wisdom: 15, charisma: 17 },
    savingThrows: { intelligence: 8, wisdom: 7, charisma: 8 },
    skills: { perception: 12 },
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: ["prone"],
    senses: { darkvision: 120, passivePerception: 22 },
    languages: ["Deep Speech", "Undercommon"],
    attacks: [
      {
        name: "Bite",
        attackBonus: 5,
        reach: 5,
        damage: "4d6",
        damageType: "piercing",
      },
      {
        name: "Eye Rays",
        attackBonus: 0,
        range: "120",
        damage: "varies",
        damageType: "varies",
        description: "The beholder shoots three of the following magical eye rays at random (reroll duplicates), choosing one to three targets it can see within 120 feet. Ray DC is 16. Rays include: Charm Ray, Paralyzing Ray, Fear Ray, Slowing Ray, Enervation Ray, Telekinetic Ray, Sleep Ray, Petrification Ray, Disintegration Ray, Death Ray.",
      },
    ],
    traits: [
      {
        name: "Antimagic Cone",
        description: "The beholder's central eye creates an area of antimagic, as in the antimagic field spell, in a 150-foot cone. At the start of each of its turns, the beholder decides which way the cone faces and whether the cone is active.",
      },
      {
        name: "Legendary Resistance (3/Day)",
        description: "If the beholder fails a saving throw, it can choose to succeed instead.",
      },
    ],
    legendaryActions: [
      { name: "Eye Ray", cost: 1, description: "The beholder uses one random eye ray." },
    ],
    proficiencyBonus: 5,
  },

  // ─── CR 17 ────────────────────────────────────────────────────────────────
  {
    name: "Death Knight",
    cr: "17",
    xp: 18000,
    hp: 180,
    maxHp: 180,
    ac: 20,
    acDescription: "plate, shield",
    speed: "30 ft.",
    size: "Medium",
    type: "undead",
    alignment: "chaotic evil",
    abilityScores: { strength: 20, dexterity: 11, constitution: 20, intelligence: 12, wisdom: 16, charisma: 18 },
    savingThrows: { dexterity: 6, wisdom: 9, charisma: 10 },
    damageImmunities: ["necrotic", "poison"],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: ["exhaustion", "frightened", "poisoned"],
    senses: { darkvision: 120, passivePerception: 13 },
    languages: ["Abyssal", "Common"],
    attacks: [
      {
        name: "Longsword",
        attackBonus: 11,
        reach: 5,
        damage: "1d8+5",
        damageType: "slashing",
        description: "On a hit, the longsword deals an additional 18 (4d8) cold damage.",
      },
      {
        name: "Hellfire Orb",
        attackBonus: 0,
        range: "120",
        damage: "10d10",
        damageType: "fire",
        description: "Recharge 5-6. The death knight hurls a magical ball of fire that explodes at a point it can see within 120 feet of it. Each creature in a 20-foot-radius sphere centered on that point must make a DC 18 Dexterity saving throw. The sphere spreads around corners. A creature takes 35 (10d10) fire damage and 35 (10d10) necrotic damage on a failed save, or half as much on a successful one.",
      },
    ],
    traits: [
      {
        name: "Marshal Undead",
        description: "Unless the death knight is incapacitated, it and undead creatures of its choice within 60 feet of it have advantage on saving throws against features that turn undead.",
      },
      {
        name: "Magic Resistance",
        description: "The death knight has advantage on saving throws against spells and other magical effects.",
      },
      {
        name: "Spellcasting",
        description: "The death knight is a 19th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 18, +10 to hit with spell attacks). The death knight has the following paladin spells prepared: 1st level (4 slots): command, compelled duel, searing smite. 2nd level (3 slots): hold person, magic weapon. 3rd level (3 slots): dispel magic, elemental weapon. 4th level (3 slots): banishment, staggering smite. 5th level (2 slots): animate dead (as 9th-level spell), destructive wave (necrotic).",
      },
    ],
    spells: ["animate dead", "banishment", "bestow curse", "finger of death", "hold person", "dispel magic"],
    multiattack: "The death knight makes three longsword attacks.",
    proficiencyBonus: 6,
  },

  // ─── CR 21 ────────────────────────────────────────────────────────────────
  {
    name: "Lich",
    cr: "21",
    xp: 33000,
    hp: 135,
    maxHp: 135,
    ac: 17,
    acDescription: "natural armor",
    speed: "30 ft.",
    size: "Medium",
    type: "undead",
    alignment: "neutral evil",
    abilityScores: { strength: 11, dexterity: 16, constitution: 16, intelligence: 20, wisdom: 14, charisma: 16 },
    savingThrows: { constitution: 10, intelligence: 12, wisdom: 9 },
    skills: { arcana: 18, history: 12, insight: 9, perception: 9 },
    damageImmunities: ["cold", "lightning", "necrotic", "poison"],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: ["charmed", "exhaustion", "frightened", "paralyzed", "poisoned"],
    senses: { truesight: 120, passivePerception: 19 },
    languages: ["Common", "plus up to five other languages"],
    attacks: [
      {
        name: "Paralyzing Touch",
        attackBonus: 12,
        reach: 5,
        damage: "3d6",
        damageType: "cold",
        description: "The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
      },
    ],
    traits: [
      {
        name: "Legendary Resistance (3/Day)",
        description: "If the lich fails a saving throw, it can choose to succeed instead.",
      },
      {
        name: "Rejuvenation",
        description: "If it has a phylactery, a destroyed lich gains a new body in 1d10 days, regaining all its hit points and becoming active again. The new body appears within 5 feet of the phylactery.",
      },
      {
        name: "Turn Resistance",
        description: "The lich has advantage on saving throws against any effect that turns undead.",
      },
      {
        name: "Spellcasting",
        description: "The lich is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 20, +12 to hit with spell attacks). The lich has the following wizard spells prepared: Cantrips (at will): mage hand, prestidigitation, ray of frost, toll the dead. 1st level (4 slots): detect magic, magic missile, shield, thunderwave. 2nd level (3 slots): detect thoughts, invisibility, mirror image, misty step. 3rd level (3 slots): animate dead, counterspell, dispel magic, fireball. 4th level (3 slots): blight, dimension door. 5th level (3 slots): cloudkill, scrying. 6th level (1 slot): disintegrate, globe of invulnerability. 7th level (1 slot): finger of death, plane shift. 8th level (1 slot): dominate monster, power word stun. 9th level (1 slot): power word kill, time stop.",
      },
    ],
    legendaryActions: [
      { name: "Cantrip", cost: 1, description: "The lich casts a cantrip." },
      { name: "Paralyzing Touch (Costs 2 Actions)", cost: 2, description: "The lich uses its Paralyzing Touch." },
      { name: "Frightening Gaze (Costs 2 Actions)", cost: 2, description: "The lich fixes its gaze on one creature it can see within 10 feet of it. The target must succeed on a DC 18 Wisdom saving throw against this magic or become frightened for 1 minute." },
      { name: "Disrupt Life (Costs 3 Actions)", cost: 3, description: "Each non-undead creature within 20 feet of the lich must make a DC 18 Constitution saving throw against this magic, taking 21 (6d6) necrotic damage on a failed save, or half as much on a successful one." },
    ],
    spells: [
      "mage hand", "prestidigitation", "ray of frost", "toll the dead",
      "fireball", "lightning bolt", "magic missile", "shield",
      "detect magic", "dispel magic", "counterspell", "animate dead",
      "cloudkill", "dimension door", "wall of fire", "disintegrate",
      "finger of death", "power word kill", "time stop",
    ],
    proficiencyBonus: 7,
  },

  // ─── CR 24 ────────────────────────────────────────────────────────────────
  {
    name: "Ancient Red Dragon",
    cr: "24",
    xp: 62000,
    hp: 546,
    maxHp: 546,
    ac: 22,
    acDescription: "natural armor",
    speed: "40 ft., fly 80 ft.",
    size: "Gargantuan",
    type: "dragon",
    alignment: "chaotic evil",
    abilityScores: { strength: 30, dexterity: 10, constitution: 29, intelligence: 18, wisdom: 15, charisma: 23 },
    savingThrows: { dexterity: 7, constitution: 16, wisdom: 9, charisma: 13 },
    skills: { perception: 16, stealth: 7 },
    damageImmunities: ["fire"],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    senses: { blindsight: 60, darkvision: 120, passivePerception: 26 },
    languages: ["Common", "Draconic"],
    attacks: [
      {
        name: "Bite",
        attackBonus: 17,
        reach: 15,
        damage: "2d10+10",
        damageType: "piercing",
        description: "On a hit, the target also takes 14 (4d6) fire damage.",
      },
      {
        name: "Claw",
        attackBonus: 17,
        reach: 10,
        damage: "2d6+10",
        damageType: "slashing",
      },
      {
        name: "Tail",
        attackBonus: 17,
        reach: 20,
        damage: "2d8+10",
        damageType: "bludgeoning",
      },
      {
        name: "Fire Breath",
        attackBonus: 0,
        range: "90",
        damage: "26d6",
        damageType: "fire",
        description: "Recharge 5-6. The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much on a successful one.",
      },
    ],
    traits: [
      {
        name: "Legendary Resistance (3/Day)",
        description: "If the dragon fails a saving throw, it can choose to succeed instead.",
      },
    ],
    legendaryActions: [
      { name: "Detect", cost: 1, description: "The dragon makes a Wisdom (Perception) check." },
      { name: "Tail Attack", cost: 1, description: "The dragon makes a tail attack." },
      { name: "Wing Attack (Costs 2 Actions)", cost: 2, description: "The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6+10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed." },
    ],
    multiattack: "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
    proficiencyBonus: 7,
  },
];

export function getMonster(name: string): Monster | undefined {
  return monsters.find((m) => m.name.toLowerCase() === name.toLowerCase());
}

export function getMonstersByCR(cr: string): Monster[] {
  return monsters.filter((m) => m.cr === cr);
}

export function getMonstersForLevel(partyLevel: number): Monster[] {
  const crToNumber = (cr: string): number => {
    if (cr === "0") return 0;
    if (cr === "1/8") return 0.125;
    if (cr === "1/4") return 0.25;
    if (cr === "1/2") return 0.5;
    return parseFloat(cr);
  };

  let minCR: number;
  let maxCR: number;

  if (partyLevel <= 4) {
    minCR = 0;
    maxCR = 2;
  } else if (partyLevel <= 10) {
    minCR = 0.25;
    maxCR = 8;
  } else if (partyLevel <= 16) {
    minCR = 4;
    maxCR = 14;
  } else {
    minCR = 10;
    maxCR = Infinity;
  }

  return monsters.filter((m) => {
    const numericCR = crToNumber(m.cr);
    return numericCR >= minCR && numericCR <= maxCR;
  });
}
