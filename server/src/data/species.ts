export interface SpecialAbility {
  name: string;
  description: string;
}

export interface AbilityScoreBonuses {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  /** Used when a species grants +1 to any two ability scores of the player's choice */
  anyTwo?: number;
  /** Used when a species grants +1 to all ability scores */
  all?: number;
}

export interface Species {
  name: string;
  traits: string;
  abilityScoreBonuses: AbilityScoreBonuses;
  speed: number;
  /** Some species have additional movement modes; stored as a description string */
  additionalMovement?: string;
  size: string;
  languages: string[];
  darkvision: number;
  specialAbilities: SpecialAbility[];
}

export const species: Species[] = [
  // ─── Core PHB Species ──────────────────────────────────────────────────────

  {
    name: "Human",
    traits:
      "Humans are the most adaptable and ambitious people among the common races. They have widely varying tastes, morals, and customs in the many different lands where they have settled.",
    abilityScoreBonuses: { all: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "One extra language of your choice"],
    darkvision: 0,
    specialAbilities: [
      {
        name: "Extra Language",
        description:
          "You can speak, read, and write one extra language of your choice.",
      },
    ],
  },

  {
    name: "High Elf",
    traits:
      "High elves have a keen mind and a mastery of at least the basics of magic. They are slender and graceful, with sharp features and perceptive senses.",
    abilityScoreBonuses: { dexterity: 2, intelligence: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Elvish", "One extra language of your choice"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Fey Ancestry",
        description:
          "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
      },
      {
        name: "Trance",
        description:
          "Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day. While meditating, you can dream after a fashion. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
      },
      {
        name: "Keen Senses",
        description: "You have proficiency in the Perception skill.",
      },
      {
        name: "Elf Weapon Training",
        description:
          "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
      },
      {
        name: "Cantrip",
        description:
          "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.",
      },
    ],
  },

  {
    name: "Wood Elf",
    traits:
      "Wood elves have keen senses and intuition, and their fleet feet carry them quickly and stealthily through their native forests.",
    abilityScoreBonuses: { dexterity: 2, wisdom: 1 },
    speed: 35,
    size: "Medium",
    languages: ["Common", "Elvish"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Fey Ancestry",
        description:
          "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
      },
      {
        name: "Trance",
        description:
          "Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
      },
      {
        name: "Keen Senses",
        description: "You have proficiency in the Perception skill.",
      },
      {
        name: "Elf Weapon Training",
        description:
          "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
      },
      {
        name: "Fleet of Foot",
        description: "Your base walking speed increases to 35 feet.",
      },
      {
        name: "Mask of the Wild",
        description:
          "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
      },
    ],
  },

  {
    name: "Drow",
    traits:
      "Drow, also known as dark elves, dwell in the subterranean depths of the world. Centuries of survival in the Underdark have sharpened their senses to a razor's edge.",
    abilityScoreBonuses: { dexterity: 2, charisma: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Elvish", "Undercommon"],
    darkvision: 120,
    specialAbilities: [
      {
        name: "Fey Ancestry",
        description:
          "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
      },
      {
        name: "Trance",
        description:
          "Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
      },
      {
        name: "Keen Senses",
        description: "You have proficiency in the Perception skill.",
      },
      {
        name: "Drow Weapon Training",
        description:
          "You have proficiency with rapiers, shortswords, and hand crossbows.",
      },
      {
        name: "Sunlight Sensitivity",
        description:
          "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
      },
      {
        name: "Drow Magic",
        description:
          "You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.",
      },
    ],
  },

  {
    name: "Mountain Dwarf",
    traits:
      "Bold and hardy, mountain dwarves are skilled fighters and craftspeople, well known for their toughness and resolve.",
    abilityScoreBonuses: { strength: 2, constitution: 2 },
    speed: 25,
    size: "Medium",
    languages: ["Common", "Dwarvish"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Dwarven Resilience",
        description:
          "You have advantage on saving throws against poison, and you have resistance against poison damage.",
      },
      {
        name: "Stonecunning",
        description:
          "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check.",
      },
      {
        name: "Dwarven Combat Training",
        description:
          "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
      },
      {
        name: "Tool Proficiency",
        description:
          "You gain proficiency with the artisan's tools of your choice: Smith's tools, brewer's supplies, or mason's tools.",
      },
      {
        name: "Dwarven Armor Training",
        description: "You have proficiency with light and medium armor.",
      },
    ],
  },

  {
    name: "Hill Dwarf",
    traits:
      "Hill dwarves are noted for their keen intuition and exceptional toughness. They are found in many surface kingdoms and are common across civilized lands.",
    abilityScoreBonuses: { constitution: 2, wisdom: 1 },
    speed: 25,
    size: "Medium",
    languages: ["Common", "Dwarvish"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Dwarven Resilience",
        description:
          "You have advantage on saving throws against poison, and you have resistance against poison damage.",
      },
      {
        name: "Stonecunning",
        description:
          "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check.",
      },
      {
        name: "Dwarven Combat Training",
        description:
          "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
      },
      {
        name: "Tool Proficiency",
        description:
          "You gain proficiency with the artisan's tools of your choice: Smith's tools, brewer's supplies, or mason's tools.",
      },
      {
        name: "Dwarven Toughness",
        description:
          "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.",
      },
    ],
  },

  {
    name: "Lightfoot Halfling",
    traits:
      "Lightfoot halflings are inclined to be affable and get along well with others. They have a talent for finding the bright side of a situation and a knack for avoiding trouble.",
    abilityScoreBonuses: { dexterity: 2, charisma: 1 },
    speed: 25,
    size: "Small",
    languages: ["Common", "Halfling"],
    darkvision: 0,
    specialAbilities: [
      {
        name: "Lucky",
        description:
          "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
      },
      {
        name: "Brave",
        description:
          "You have advantage on saving throws against being frightened.",
      },
      {
        name: "Halfling Nimbleness",
        description:
          "You can move through the space of any creature that is of a size larger than yours.",
      },
      {
        name: "Naturally Stealthy",
        description:
          "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.",
      },
    ],
  },

  {
    name: "Stout Halfling",
    traits:
      "Stout halflings are hardier than their lightfoot cousins and have some resistance to poison, possibly a distant connection to dwarf blood.",
    abilityScoreBonuses: { dexterity: 2, constitution: 1 },
    speed: 25,
    size: "Small",
    languages: ["Common", "Halfling"],
    darkvision: 0,
    specialAbilities: [
      {
        name: "Lucky",
        description:
          "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
      },
      {
        name: "Brave",
        description:
          "You have advantage on saving throws against being frightened.",
      },
      {
        name: "Halfling Nimbleness",
        description:
          "You can move through the space of any creature that is of a size larger than yours.",
      },
      {
        name: "Stout Resilience",
        description:
          "You have advantage on saving throws against poison, and you have resistance against poison damage.",
      },
    ],
  },

  {
    name: "Forest Gnome",
    traits:
      "Forest gnomes are small but clever folk who live in hidden woodland communities. They have a natural gift for illusion and an ease with animals.",
    abilityScoreBonuses: { intelligence: 2, dexterity: 1 },
    speed: 25,
    size: "Small",
    languages: ["Common", "Gnomish"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Gnome Cunning",
        description:
          "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
      },
      {
        name: "Natural Illusionist",
        description:
          "You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.",
      },
      {
        name: "Speak with Small Beasts",
        description:
          "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts.",
      },
    ],
  },

  {
    name: "Rock Gnome",
    traits:
      "Rock gnomes are the most commonly encountered gnomes in the surface world. They are natural tinkers and inventors, always curious about how things work.",
    abilityScoreBonuses: { intelligence: 2, constitution: 1 },
    speed: 25,
    size: "Small",
    languages: ["Common", "Gnomish"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Gnome Cunning",
        description:
          "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
      },
      {
        name: "Artificer's Lore",
        description:
          "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
      },
      {
        name: "Tinker",
        description:
          "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours unless you spend 1 hour repairing it.",
      },
    ],
  },

  {
    name: "Half-Elf",
    traits:
      "Half-elves walk in two worlds but truly belong to neither, combining what some say are the best qualities of both their human and elven heritage.",
    abilityScoreBonuses: { charisma: 2, anyTwo: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Elvish", "One extra language of your choice"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Fey Ancestry",
        description:
          "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
      },
      {
        name: "Skill Versatility",
        description:
          "You gain proficiency in two skills of your choice.",
      },
    ],
  },

  {
    name: "Half-Orc",
    traits:
      "Half-orcs inherit a tendency toward chaos from their orc parentage and are not strongly inclined toward good. They are fierce, determined, and often misunderstood.",
    abilityScoreBonuses: { strength: 2, constitution: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Orc"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Menacing",
        description: "You gain proficiency in the Intimidation skill.",
      },
      {
        name: "Relentless Endurance",
        description:
          "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
      },
      {
        name: "Savage Attacks",
        description:
          "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
      },
    ],
  },

  {
    name: "Tiefling",
    traits:
      "Tieflings bear the mark of their infernal heritage through subtle physical signs and an innate connection to infernal magic. They are self-reliant and suspicious of those who claim to accept them.",
    abilityScoreBonuses: { charisma: 2, intelligence: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Infernal"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Hellish Resistance",
        description: "You have resistance to fire damage.",
      },
      {
        name: "Infernal Legacy",
        description:
          "You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.",
      },
    ],
  },

  {
    name: "Dragonborn",
    traits:
      "Dragonborn look very much like dragons standing erect in humanoid form. They are proud and honor-bound, driven to excel in all that they do.",
    abilityScoreBonuses: { strength: 2, charisma: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Draconic"],
    darkvision: 0,
    specialAbilities: [
      {
        name: "Draconic Ancestry",
        description:
          "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type.",
      },
      {
        name: "Breath Weapon",
        description:
          "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw (DC 8 + your Constitution modifier + your proficiency bonus). A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can't use it again until you finish a short or long rest.",
      },
      {
        name: "Damage Resistance",
        description:
          "You have resistance to the damage type associated with your draconic ancestry.",
      },
    ],
  },

  // ─── Supplemental Species ──────────────────────────────────────────────────

  {
    name: "Aasimar",
    traits:
      "Aasimar bear within their souls the light of the heavens. They are descended from humans with a touch of the power of Mount Celestia.",
    abilityScoreBonuses: { charisma: 2, wisdom: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Celestial"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Celestial Resistance",
        description:
          "You have resistance to necrotic damage and radiant damage.",
      },
      {
        name: "Healing Hands",
        description:
          "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
      },
      {
        name: "Light Bearer",
        description:
          "You know the light cantrip. Charisma is your spellcasting ability for it.",
      },
      {
        name: "Radiant Soul",
        description:
          "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and two luminous, incorporeal wings to sprout from your back. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level.",
      },
    ],
  },

  {
    name: "Tabaxi",
    traits:
      "Hailing from a strange and distant land, tabaxi are feline humanoids driven by curiosity to collect interesting artifacts, gather tales, and lay eyes on all the world's wonders.",
    abilityScoreBonuses: { dexterity: 2, charisma: 1 },
    speed: 30,
    additionalMovement: "Climb speed 20 ft.",
    size: "Medium",
    languages: ["Common", "One extra language of your choice"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Feline Agility",
        description:
          "Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can't use it again until you move 0 feet on one of your turns.",
      },
      {
        name: "Cat's Claws",
        description:
          "Because of your claws, you have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
      },
      {
        name: "Cat's Talents",
        description:
          "You have proficiency in the Perception and Stealth skills.",
      },
    ],
  },

  // ─── Genasi Variants ───────────────────────────────────────────────────────

  {
    name: "Genasi (Earth)",
    traits:
      "Earth genasi are patient and resolute like the stone of their heritage. They often move and speak slowly, preferring careful deliberation over rash action.",
    abilityScoreBonuses: { constitution: 2, strength: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Primordial"],
    darkvision: 0,
    specialAbilities: [
      {
        name: "Earth Walk",
        description:
          "You can move across difficult terrain made of earth or stone without expending extra movement.",
      },
      {
        name: "Merge with Stone",
        description:
          "You can cast the pass without trace spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.",
      },
    ],
  },

  {
    name: "Genasi (Fire)",
    traits:
      "Fire genasi are aggressive and passionate, quick to action and slow to cool. Their fiery personalities and resistance to heat set them apart from other races.",
    abilityScoreBonuses: { constitution: 2, intelligence: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Primordial"],
    darkvision: 60,
    specialAbilities: [
      {
        name: "Darkvision",
        description:
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. Your ties to the Elemental Plane of Fire make your darkvision unusual: everything you see in darkness is in a shade of red.",
      },
      {
        name: "Fire Resistance",
        description: "You have resistance to fire damage.",
      },
      {
        name: "Reach to the Blaze",
        description:
          "You know the produce flame cantrip. Once you reach 3rd level, you can cast the burning hands spell once with this trait as a 1st-level spell, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.",
      },
    ],
  },

  {
    name: "Genasi (Water)",
    traits:
      "Water genasi are calm and thoughtful, flowing around obstacles rather than crashing through them. Their amphibious nature and affinity for water shapes their outlook.",
    abilityScoreBonuses: { constitution: 2, wisdom: 1 },
    speed: 30,
    additionalMovement: "Swim speed 30 ft.",
    size: "Medium",
    languages: ["Common", "Primordial"],
    darkvision: 0,
    specialAbilities: [
      {
        name: "Amphibious",
        description: "You can breathe air and water.",
      },
      {
        name: "Swim",
        description: "You have a swimming speed of 30 feet.",
      },
      {
        name: "Call to the Wave",
        description:
          "You know the shape water cantrip. When you reach 3rd level, you can cast the create or destroy water spell as a 2nd-level spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.",
      },
    ],
  },

  {
    name: "Genasi (Air)",
    traits:
      "Air genasi are quick and agile, as changeable as the wind. They tend to speak quickly and jump from topic to topic, reflecting the mercurial nature of the element they are tied to.",
    abilityScoreBonuses: { constitution: 2, dexterity: 1 },
    speed: 30,
    size: "Medium",
    languages: ["Common", "Primordial"],
    darkvision: 0,
    specialAbilities: [
      {
        name: "Unending Breath",
        description:
          "You can hold your breath indefinitely while you're not incapacitated.",
      },
      {
        name: "Mingle with the Wind",
        description:
          "You can cast the levitate spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.",
      },
    ],
  },
];

export function getSpecies(name: string): Species | undefined {
  return species.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
}
