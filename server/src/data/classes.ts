export interface SubClass {
  name: string;
  description: string;
}

export interface CharacterClass {
  name: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  numSkillChoices: number;
  /** Maps character level (1–20) to the list of features gained at that level */
  features: Record<number, string[]>;
  subclasses: SubClass[];
}

export const classes: CharacterClass[] = [
  // ── 1. Barbarian ────────────────────────────────────────────────────────────
  {
    name: "Barbarian",
    hitDie: 12,
    primaryAbility: ["Strength"],
    savingThrows: ["Strength", "Constitution"],
    armorProficiencies: ["Light armor", "Medium armor", "Shields"],
    weaponProficiencies: ["Simple weapons", "Martial weapons"],
    skillChoices: [
      "Animal Handling",
      "Athletics",
      "Intimidation",
      "Nature",
      "Perception",
      "Survival",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Rage", "Unarmored Defense"],
      2: ["Reckless Attack", "Danger Sense"],
      3: ["Primal Path"],
      4: ["Ability Score Improvement"],
      5: ["Extra Attack", "Fast Movement"],
      6: ["Path Feature"],
      7: ["Feral Instinct"],
      8: ["Ability Score Improvement"],
      9: ["Brutal Critical (1 die)"],
      10: ["Path Feature"],
      11: ["Relentless Rage"],
      12: ["Ability Score Improvement"],
      13: ["Brutal Critical (2 dice)"],
      14: ["Path Feature"],
      15: ["Persistent Rage"],
      16: ["Ability Score Improvement"],
      17: ["Brutal Critical (3 dice)"],
      18: ["Indomitable Might"],
      19: ["Ability Score Improvement"],
      20: ["Primal Champion"],
    },
    subclasses: [
      {
        name: "Path of the Berserker",
        description:
          "For some barbarians, rage is a means to an end — that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker's rage, you thrill in the chaos of battle.",
      },
      {
        name: "Path of the Totem Warrior",
        description:
          "The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration. In battle, your totem spirit fills you with supernatural might.",
      },
      {
        name: "Path of the Ancestral Guardian",
        description:
          "Some barbarians hail from cultures that revere their ancestors. These barbarians summon the spirits of their honored dead to aid them in battle.",
      },
      {
        name: "Path of the Storm Herald",
        description:
          "Barbarians who walk the Path of the Storm Herald learn to transform their rage into a mantle of primal magic, which swirls around them. When in a fury, a barbarian of this path taps into the forces of nature to create powerful, magical effects.",
      },
      {
        name: "Path of the Zealot",
        description:
          "Some deities inspire their followers to pitch themselves into a ferocious battle fury. These barbarians are zealots — warriors who channel their rage into powerful displays of divine power.",
      },
      {
        name: "Path of the Beast",
        description:
          "Barbarians who walk the Path of the Beast draw their rage from a bestial spark burning within their souls. That beast bursts forth in the throes of rage, physically transforming the barbarian.",
      },
      {
        name: "Path of Wild Magic",
        description:
          "Many places in the multiverse abound with beauty, intense emotion, and rampant magic; the Feywild, the Upper Planes, and other magical realms. The barbarians who draw on this path may enter their rage while experiencing an overwhelming surge of wild magic.",
      },
    ],
  },

  // ── 2. Bard ─────────────────────────────────────────────────────────────────
  {
    name: "Bard",
    hitDie: 8,
    primaryAbility: ["Charisma"],
    savingThrows: ["Dexterity", "Charisma"],
    armorProficiencies: ["Light armor"],
    weaponProficiencies: [
      "Simple weapons",
      "Hand crossbows",
      "Longswords",
      "Rapiers",
      "Shortswords",
    ],
    skillChoices: [
      "Acrobatics",
      "Animal Handling",
      "Arcana",
      "Athletics",
      "Deception",
      "History",
      "Insight",
      "Intimidation",
      "Investigation",
      "Medicine",
      "Nature",
      "Perception",
      "Performance",
      "Persuasion",
      "Religion",
      "Sleight of Hand",
      "Stealth",
      "Survival",
    ],
    numSkillChoices: 3,
    features: {
      1: ["Bardic Inspiration (d6)", "Spellcasting"],
      2: ["Jack of All Trades", "Song of Rest (d6)"],
      3: ["Bard College", "Expertise"],
      4: ["Ability Score Improvement"],
      5: ["Bardic Inspiration (d8)", "Font of Inspiration"],
      6: ["Countercharm", "Bard College Feature"],
      7: [],
      8: ["Ability Score Improvement"],
      9: ["Song of Rest (d8)"],
      10: ["Bardic Inspiration (d10)", "Expertise", "Magical Secrets"],
      11: [],
      12: ["Ability Score Improvement"],
      13: ["Song of Rest (d10)"],
      14: ["Magical Secrets", "Bard College Feature"],
      15: ["Bardic Inspiration (d12)"],
      16: ["Ability Score Improvement"],
      17: ["Song of Rest (d12)"],
      18: ["Magical Secrets"],
      19: ["Ability Score Improvement"],
      20: ["Superior Inspiration"],
    },
    subclasses: [
      {
        name: "College of Lore",
        description:
          "Bards of the College of Lore know something about most things, collecting bits of knowledge from sources as diverse as scholarly tomes and peasant tales. They use their knowledge and versatility to undermine enemies' spells and abilities.",
      },
      {
        name: "College of Valor",
        description:
          "Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past, and thereby inspire a new generation of heroes.",
      },
      {
        name: "College of Glamour",
        description:
          "The College of Glamour is the home of bards who mastered their craft in the vibrant, dangerous realm of the Feywild. Tutored by satyrs, eladrin, and other fey, these bards learn to use their magic to delight and captivate others.",
      },
      {
        name: "College of Swords",
        description:
          "Bards of the College of Swords are called blades, and they entertain through daring feats of weapon prowess. They combine magical aptitude with martial skill, often performing in arenas or on the battlefield.",
      },
      {
        name: "College of Whispers",
        description:
          "Most folk are happy to welcome a bard into their midst. Bards of the College of Whispers use this to their advantage. They appear to be like other bards, sharing news, singing songs, and telling tales to delight and illuminate. In truth, the College of Whispers teaches its students that they are wolves among sheep.",
      },
      {
        name: "College of Creation",
        description:
          "Bards believe the cosmos is a work of art—the creation of the first dragons and gods. Bards of the College of Creation draw on that primeval creativity, giving form to songs and poetry.",
      },
      {
        name: "College of Eloquence",
        description:
          "Adherents of the College of Eloquence master the art of oratory. Persuasion is considered a high art, and these bards are the pinnacle of that art.",
      },
    ],
  },

  // ── 3. Cleric ───────────────────────────────────────────────────────────────
  {
    name: "Cleric",
    hitDie: 8,
    primaryAbility: ["Wisdom"],
    savingThrows: ["Wisdom", "Charisma"],
    armorProficiencies: ["Light armor", "Medium armor", "Shields"],
    weaponProficiencies: ["Simple weapons"],
    skillChoices: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
    numSkillChoices: 2,
    features: {
      1: ["Spellcasting", "Divine Domain"],
      2: ["Channel Divinity (1/rest)", "Divine Domain Feature"],
      3: [],
      4: ["Ability Score Improvement"],
      5: ["Destroy Undead (CR 1/2)"],
      6: ["Channel Divinity (2/rest)", "Divine Domain Feature"],
      7: [],
      8: ["Ability Score Improvement", "Destroy Undead (CR 1)", "Divine Domain Feature"],
      9: [],
      10: ["Divine Intervention"],
      11: ["Destroy Undead (CR 2)"],
      12: ["Ability Score Improvement"],
      13: [],
      14: ["Destroy Undead (CR 3)"],
      15: [],
      16: ["Ability Score Improvement"],
      17: ["Destroy Undead (CR 4)", "Divine Domain Feature"],
      18: ["Channel Divinity (3/rest)"],
      19: ["Ability Score Improvement"],
      20: ["Divine Intervention Improvement"],
    },
    subclasses: [
      {
        name: "Life Domain",
        description:
          "The Life domain focuses on the vibrant positive energy — one of the fundamental forces of the universe — that sustains all life. It provides powerful healing magic.",
      },
      {
        name: "Light Domain",
        description:
          "Gods of light — including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakhty — promote the ideals of rebirth and renewal.",
      },
      {
        name: "Trickery Domain",
        description:
          "Gods of trickery — such as Tymora, Beshaba, Olidammara, the Traveler, Garl Glittergold, and Loki — are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals.",
      },
      {
        name: "War Domain",
        description:
          "War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage.",
      },
      {
        name: "Knowledge Domain",
        description:
          "The gods of knowledge — including Oghma, Boccob, Gilean, Aureon, and Thoth — value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities.",
      },
      {
        name: "Nature Domain",
        description:
          "Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests to friendly deities associated with particular springs and groves.",
      },
      {
        name: "Tempest Domain",
        description:
          "Gods whose portfolios include the Tempest domain govern storms, sea, and sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage.",
      },
      {
        name: "Death Domain",
        description:
          "The Death domain is concerned with the forces that cause death, as well as the negative energy that gives rise to undead creatures. Gods of death preside over the forces of life, death, and the boundary between them.",
      },
      {
        name: "Forge Domain",
        description:
          "The gods of the forge are patrons of artisans who work with metal, from a humble blacksmith who keeps a village in horseshoes and plow blades to the divine craftmakers responsible for the universe.",
      },
      {
        name: "Grave Domain",
        description:
          "Gods of the grave watch over the line between life and death. They oppose the machinations of undead and those who would unnaturally extend their life spans.",
      },
      {
        name: "Order Domain",
        description:
          "The Order domain represents discipline, as well as devotion to a society or order. The Order domain puts its followers in the service of those who wield just authority.",
      },
      {
        name: "Peace Domain",
        description:
          "The balm of peace thrives at the heart of healthy communities, between friendly nations, and in the souls of the kindhearted. The gods of peace inspire people of goodwill everywhere.",
      },
      {
        name: "Twilight Domain",
        description:
          "The twilight domain governs the transition and journey into the night. Twilight is a time of rest, and gods who rule over it ease the passage of souls, protect those who wander at night, and watch over sleep.",
      },
    ],
  },

  // ── 4. Druid ────────────────────────────────────────────────────────────────
  {
    name: "Druid",
    hitDie: 8,
    primaryAbility: ["Wisdom"],
    savingThrows: ["Intelligence", "Wisdom"],
    armorProficiencies: [
      "Light armor (non-metal)",
      "Medium armor (non-metal)",
      "Shields (non-metal)",
    ],
    weaponProficiencies: [
      "Clubs",
      "Daggers",
      "Darts",
      "Javelins",
      "Maces",
      "Quarterstaffs",
      "Scimitars",
      "Sickles",
      "Slings",
      "Spears",
    ],
    skillChoices: [
      "Arcana",
      "Animal Handling",
      "Insight",
      "Medicine",
      "Nature",
      "Perception",
      "Religion",
      "Survival",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Druidic", "Spellcasting"],
      2: ["Wild Shape", "Druid Circle"],
      3: [],
      4: ["Wild Shape Improvement", "Ability Score Improvement"],
      5: [],
      6: ["Druid Circle Feature"],
      7: [],
      8: ["Wild Shape Improvement", "Ability Score Improvement"],
      9: [],
      10: ["Druid Circle Feature"],
      11: [],
      12: ["Ability Score Improvement"],
      13: [],
      14: ["Druid Circle Feature"],
      15: [],
      16: ["Ability Score Improvement"],
      17: [],
      18: ["Timeless Body", "Beast Spells"],
      19: ["Ability Score Improvement"],
      20: ["Archdruid"],
    },
    subclasses: [
      {
        name: "Circle of the Land",
        description:
          "The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic.",
      },
      {
        name: "Circle of the Moon",
        description:
          "Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings. They are fierce protectors of nature who spend much of their time in beast form.",
      },
      {
        name: "Circle of Dreams",
        description:
          "Druids who are members of the Circle of Dreams hail from regions that have strong ties to the Feywild and its dreamlike realms. The druids' guardianship of the natural world makes for a natural alliance with good-aligned fey.",
      },
      {
        name: "Circle of the Shepherd",
        description:
          "Druids of the Circle of the Shepherd commune with the spirits of nature, especially the spirits of beasts and the fey, and call to those spirits for aid.",
      },
      {
        name: "Circle of Spores",
        description:
          "The Circle of Spores finds beauty in decay. It perceives all living things as part of a grand cycle, from the moment of their birth to the corruption of their flesh and the return of their essence to the earth.",
      },
      {
        name: "Circle of Stars",
        description:
          "The Circle of Stars allows druids to draw on the power of starlight. These druids have tracked heavenly patterns since time immemorial, discovering secrets hidden amid the constellations of the night sky.",
      },
      {
        name: "Circle of Wildfire",
        description:
          "Druids within the Circle of Wildfire understand that destruction is sometimes the precursor of creation, such as when a forest fire promotes later growth. These druids bond with a fiery spirit to harness the beauty and power of flames.",
      },
    ],
  },

  // ── 5. Fighter ──────────────────────────────────────────────────────────────
  {
    name: "Fighter",
    hitDie: 10,
    primaryAbility: ["Strength", "Dexterity"],
    savingThrows: ["Strength", "Constitution"],
    armorProficiencies: [
      "All armor",
      "Shields",
    ],
    weaponProficiencies: ["Simple weapons", "Martial weapons"],
    skillChoices: [
      "Acrobatics",
      "Animal Handling",
      "Athletics",
      "History",
      "Insight",
      "Intimidation",
      "Perception",
      "Survival",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Fighting Style", "Second Wind"],
      2: ["Action Surge (1 use)"],
      3: ["Martial Archetype"],
      4: ["Ability Score Improvement"],
      5: ["Extra Attack (2)"],
      6: ["Ability Score Improvement"],
      7: ["Martial Archetype Feature"],
      8: ["Ability Score Improvement"],
      9: ["Indomitable (1 use)"],
      10: ["Martial Archetype Feature"],
      11: ["Extra Attack (3)"],
      12: ["Ability Score Improvement"],
      13: ["Indomitable (2 uses)"],
      14: ["Ability Score Improvement"],
      15: ["Martial Archetype Feature"],
      16: ["Ability Score Improvement"],
      17: ["Action Surge (2 uses)", "Indomitable (3 uses)"],
      18: ["Martial Archetype Feature"],
      19: ["Ability Score Improvement"],
      20: ["Extra Attack (4)"],
    },
    subclasses: [
      {
        name: "Champion",
        description:
          "The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.",
      },
      {
        name: "Battle Master",
        description:
          "Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. A Battle Master might be a fighter who studied under a master duelist, a warrior trained in a great academy, or a veteran who developed techniques after long years of combat.",
      },
      {
        name: "Eldritch Knight",
        description:
          "The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards.",
      },
      {
        name: "Arcane Archer",
        description:
          "An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects.",
      },
      {
        name: "Banneret",
        description:
          "A Banneret strives to inspire greatness in others by committing brave deeds in battle. These fighters have mastered techniques to protect their allies and motivate them to push harder.",
      },
      {
        name: "Cavalier",
        description:
          "The archetypal Cavalier excels at mounted combat. Usually born among the nobility and raised at court, a Cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner.",
      },
      {
        name: "Echo Knight",
        description:
          "A mysterious and feared frontline warrior of the Kryn Dynasty, the Echo Knight has mastered the art of using dunamis to summon the fading shades of unrealized timelines to aid them in battle.",
      },
      {
        name: "Psi Warrior",
        description:
          "Awake to the psionic power within, a Psi Warrior is a fighter who augments their physical might with psi-infused weapon strikes, telekinetic lashes, and barriers of mental force.",
      },
      {
        name: "Rune Knight",
        description:
          "Rune Knights enhance their martial prowess using the supernatural power of runes, an ancient practice that originated with giants. Rune cutters can be found among any family of giants, and you likely learned your methods first or secondhand from such a mystical artisan.",
      },
      {
        name: "Samurai",
        description:
          "The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies. A Samurai's resolve is nearly unbreakable, and the enemies in a Samurai's path have two choices: yield or die fighting.",
      },
    ],
  },

  // ── 6. Monk ─────────────────────────────────────────────────────────────────
  {
    name: "Monk",
    hitDie: 8,
    primaryAbility: ["Dexterity", "Wisdom"],
    savingThrows: ["Strength", "Dexterity"],
    armorProficiencies: [],
    weaponProficiencies: ["Simple weapons", "Shortswords"],
    skillChoices: [
      "Acrobatics",
      "Athletics",
      "History",
      "Insight",
      "Religion",
      "Stealth",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Unarmored Defense", "Martial Arts"],
      2: ["Ki", "Unarmored Movement"],
      3: ["Monastic Tradition", "Deflect Missiles"],
      4: ["Ability Score Improvement", "Slow Fall"],
      5: ["Extra Attack", "Stunning Strike"],
      6: ["Ki-Empowered Strikes", "Monastic Tradition Feature"],
      7: ["Evasion", "Stillness of Mind"],
      8: ["Ability Score Improvement"],
      9: ["Unarmored Movement Improvement"],
      10: ["Purity of Body"],
      11: ["Monastic Tradition Feature"],
      12: ["Ability Score Improvement"],
      13: ["Tongue of the Sun and Moon"],
      14: ["Diamond Soul"],
      15: ["Timeless Body"],
      16: ["Ability Score Improvement"],
      17: ["Monastic Tradition Feature"],
      18: ["Empty Body"],
      19: ["Ability Score Improvement"],
      20: ["Perfect Self"],
    },
    subclasses: [
      {
        name: "Way of the Open Hand",
        description:
          "Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed. They learn techniques to push and trip their opponents, manipulate ki to heal damage to their bodies.",
      },
      {
        name: "Way of Shadow",
        description:
          "Monks of the Way of Shadow follow a tradition that values stealth and subterfuge. These monks might be called ninjas or shadowdancers, and they serve as spies and assassins.",
      },
      {
        name: "Way of the Four Elements",
        description:
          "You follow a monastic tradition that teaches you to harness the elements. When you focus your ki, you can align yourself with the forces of creation and bend the four elements to your will, using them as an extension of your body.",
      },
      {
        name: "Way of the Drunken Master",
        description:
          "The Way of the Drunken Master teaches its students to move with the jerky, unpredictable movements of a drunkard. A drunken master sways from one attacker to the next, blocking a punch from one enemy while throwing a kick at another.",
      },
      {
        name: "Way of the Kensei",
        description:
          "Monks of the Way of the Kensei train relentlessly with their weapons, to the point where the weapon becomes an extension of the body. Founded on a mastery of sword fighting, the tradition has expanded to include many different weapons.",
      },
      {
        name: "Way of the Sun Soul",
        description:
          "Monks of the Way of the Sun Soul learn to channel their life energy into searing bolts of light. They teach that meditation can unlock the ability to unleash the indomitable light shed by the soul of every living creature.",
      },
      {
        name: "Way of the Astral Self",
        description:
          "A monk who follows the Way of the Astral Self believes their body is an illusion. They see their ki as a representation of their true form, an astral self, and they learn to manifest that power.",
      },
      {
        name: "Way of Mercy",
        description:
          "Monks of the Way of Mercy learn to manipulate the life force of others to bring aid to those in need. They are wandering physicians to the poor and hurt, but also grim reapers.",
      },
      {
        name: "Way of the Ascendant Dragon",
        description:
          "The dragon god Bahamut is known to travel the Material Plane in the guise of a venerable monk, and some monks seek to emulate Bahamut, taking the Way of the Ascendant Dragon as they awaken the draconic spirit within themselves.",
      },
    ],
  },

  // ── 7. Paladin ──────────────────────────────────────────────────────────────
  {
    name: "Paladin",
    hitDie: 10,
    primaryAbility: ["Strength", "Charisma"],
    savingThrows: ["Wisdom", "Charisma"],
    armorProficiencies: ["All armor", "Shields"],
    weaponProficiencies: ["Simple weapons", "Martial weapons"],
    skillChoices: [
      "Athletics",
      "Insight",
      "Intimidation",
      "Medicine",
      "Persuasion",
      "Religion",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Divine Sense", "Lay on Hands"],
      2: ["Fighting Style", "Spellcasting", "Divine Smite"],
      3: ["Divine Health", "Sacred Oath"],
      4: ["Ability Score Improvement"],
      5: ["Extra Attack"],
      6: ["Aura of Protection"],
      7: ["Sacred Oath Feature"],
      8: ["Ability Score Improvement"],
      9: [],
      10: ["Aura of Courage"],
      11: ["Improved Divine Smite"],
      12: ["Ability Score Improvement"],
      13: [],
      14: ["Cleansing Touch"],
      15: ["Sacred Oath Feature"],
      16: ["Ability Score Improvement"],
      17: [],
      18: ["Aura Improvements"],
      19: ["Ability Score Improvement"],
      20: ["Sacred Oath Feature"],
    },
    subclasses: [
      {
        name: "Oath of Devotion",
        description:
          "The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, white knights, or holy warriors, these paladins meet the ideal of the knight in shining armor.",
      },
      {
        name: "Oath of the Ancients",
        description:
          "The Oath of the Ancients is as old as the race of elves and the rituals of the druids. Sometimes called fey knights, green knights, or horned knights, paladins who swear this oath cast their lot with the side of the light in the cosmic struggle against darkness.",
      },
      {
        name: "Oath of Vengeance",
        description:
          "The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin. When evil forces slaughter helpless villagers, when an entire people turns against the will of the gods, when a thieves' guild grows too violent and powerful, when a dragon rampages through the countryside — at times like these, paladins arise and swear an Oath of Vengeance.",
      },
      {
        name: "Oath of Conquest",
        description:
          "The Oath of Conquest calls to paladins who seek glory in battle and the subjugation of their enemies. It isn't enough for these paladins to establish order. They must crush the forces of chaos.",
      },
      {
        name: "Oath of Redemption",
        description:
          "The Oath of Redemption sets a paladin on a difficult path, one that requires a holy warrior to use violence only as a last resort. Paladins who dedicate themselves to this oath believe that any person can be redeemed and that the path of benevolence and justice is one that anyone can walk.",
      },
      {
        name: "Oath of Glory",
        description:
          "Paladins who take the Oath of Glory believe they and their companions are destined to achieve glory through deeds of heroism. They train diligently and encourage their companions so they're all ready when destiny calls.",
      },
      {
        name: "Oath of the Watchers",
        description:
          "The Oath of the Watchers binds paladins to protect mortal realms from the predations of extraplanar creatures, many of whom can lay waste to mortal soldiers. The sworn paladins of this oath dedicate themselves to a grim task.",
      },
      {
        name: "Oathbreaker",
        description:
          "An Oathbreaker is a paladin who breaks their sacred oaths to pursue some dark ambition or who falls into corruption. Whatever light burned in the paladin's heart has been extinguished. Only darkness remains.",
      },
    ],
  },

  // ── 8. Ranger ───────────────────────────────────────────────────────────────
  {
    name: "Ranger",
    hitDie: 10,
    primaryAbility: ["Dexterity", "Wisdom"],
    savingThrows: ["Strength", "Dexterity"],
    armorProficiencies: ["Light armor", "Medium armor", "Shields"],
    weaponProficiencies: ["Simple weapons", "Martial weapons"],
    skillChoices: [
      "Animal Handling",
      "Athletics",
      "Insight",
      "Investigation",
      "Nature",
      "Perception",
      "Stealth",
      "Survival",
    ],
    numSkillChoices: 3,
    features: {
      1: ["Favored Enemy", "Natural Explorer"],
      2: ["Fighting Style", "Spellcasting"],
      3: ["Ranger Archetype", "Primeval Awareness"],
      4: ["Ability Score Improvement"],
      5: ["Extra Attack"],
      6: ["Favored Enemy Improvement", "Natural Explorer Improvement"],
      7: ["Ranger Archetype Feature"],
      8: ["Ability Score Improvement", "Land's Stride"],
      9: [],
      10: ["Natural Explorer Improvement", "Hide in Plain Sight"],
      11: ["Ranger Archetype Feature"],
      12: ["Ability Score Improvement"],
      13: [],
      14: ["Favored Enemy Improvement", "Vanish"],
      15: ["Ranger Archetype Feature"],
      16: ["Ability Score Improvement"],
      17: [],
      18: ["Feral Senses"],
      19: ["Ability Score Improvement"],
      20: ["Foe Slayer"],
    },
    subclasses: [
      {
        name: "Hunter",
        description:
          "Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness. As you walk the Hunter's path, you learn specialized techniques for fighting the threats you face.",
      },
      {
        name: "Beast Master",
        description:
          "The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world. United in focus, beast and ranger work as one to fight the monstrous foes that threaten civilization and the wilderness alike.",
      },
      {
        name: "Gloom Stalker",
        description:
          "Gloom Stalkers are at home in the darkest places: deep under the earth, in gloomy alleyways, in primeval forests, and wherever else the light dims. Most folk enter such places with trepidation, but a Gloom Stalker ventures boldly into the darkness, seeking to ambush threats before they can reach the broader world.",
      },
      {
        name: "Horizon Walker",
        description:
          "Horizon Walkers guard the world against threats that originate from other planes or that seek to ravage the mortal realm with otherworldly magic. They seek out planar portals and keep watch over them, venturing to the Inner Planes and the Outer Planes as needed to pursue their foes.",
      },
      {
        name: "Monster Slayer",
        description:
          "You have dedicated yourself to hunting down creatures of the night and wielders of grim magic. A Monster Slayer seeks out vampires, dragons, evil fey, fiends, and other magical threats. Trained in supernatural techniques to overcome such monsters, slayers are experts at unearthing and defeating mighty, mystical foes.",
      },
      {
        name: "Fey Wanderer",
        description:
          "A fey mystique surrounds you, thanks to the boon of an archfey, the shimmering influence of the Feywild that touched you, or your having visited that place of wonders. Your presence mixes disquieting magic with the ability to enchant.",
      },
      {
        name: "Swarmkeeper",
        description:
          "Feeling a deep connection to the environment around them, some rangers reach out through their magical connection to the world and bond with a swarm of nature spirits. The swarm becomes a potent force in battle, as well as helpful in other situations.",
      },
      {
        name: "Drakewarden",
        description:
          "Your connection to the natural world takes the form of a draconic spirit, which can manifest in physical form as a drake. As your bond with your drake grows, your drake grows as well, blossoming from a small hatchling to a full-sized dragon.",
      },
    ],
  },

  // ── 9. Rogue ────────────────────────────────────────────────────────────────
  {
    name: "Rogue",
    hitDie: 8,
    primaryAbility: ["Dexterity"],
    savingThrows: ["Dexterity", "Intelligence"],
    armorProficiencies: ["Light armor"],
    weaponProficiencies: [
      "Simple weapons",
      "Hand crossbows",
      "Longswords",
      "Rapiers",
      "Shortswords",
    ],
    skillChoices: [
      "Acrobatics",
      "Athletics",
      "Deception",
      "Insight",
      "Intimidation",
      "Investigation",
      "Perception",
      "Performance",
      "Persuasion",
      "Sleight of Hand",
      "Stealth",
    ],
    numSkillChoices: 4,
    features: {
      1: ["Expertise", "Sneak Attack", "Thieves' Cant"],
      2: ["Cunning Action"],
      3: ["Roguish Archetype"],
      4: ["Ability Score Improvement"],
      5: ["Uncanny Dodge"],
      6: ["Expertise"],
      7: ["Evasion"],
      8: ["Ability Score Improvement"],
      9: ["Roguish Archetype Feature"],
      10: ["Ability Score Improvement"],
      11: ["Reliable Talent"],
      12: ["Ability Score Improvement"],
      13: ["Roguish Archetype Feature"],
      14: ["Blindsense"],
      15: ["Slippery Mind"],
      16: ["Ability Score Improvement"],
      17: ["Roguish Archetype Feature"],
      18: ["Elusive"],
      19: ["Ability Score Improvement"],
      20: ["Stroke of Luck"],
    },
    subclasses: [
      {
        name: "Thief",
        description:
          "You hone your skills in the larcenous arts. Burglars, bandits, cutpurses, and other criminals typically follow this archetype, but so do rogues who prefer to think of themselves as professional treasure seekers, explorers, delvers, and investigators.",
      },
      {
        name: "Assassin",
        description:
          "You focus your training on the grim art of death. Those who adhere to this archetype are diverse: hired killers, spies, bounty hunters, and even specially anointed priests trained to exterminate the enemies of their deity.",
      },
      {
        name: "Arcane Trickster",
        description:
          "Some rogues enhance their fine-honed skills of stealth and agility with magic, learning tricks of enchantment and illusion. These rogues include pickpockets and burglars, but also pranksters, mischief-makers, and a significant number of adventurers.",
      },
      {
        name: "Inquisitive",
        description:
          "As an archetypal Inquisitive, you excel at rooting out secrets and unraveling mysteries. You rely on your sharp eye for detail, but also on your finely honed ability to read the words and deeds of other creatures to determine their true intent.",
      },
      {
        name: "Mastermind",
        description:
          "Your focus is on people and on the influence and secrets they have. Many spies, courtiers, and schemers follow this archetype, leading lives of intrigue. Words are your weapons as often as knives or poison, and secrets feel as vital to your survival as a rogue's usual tricks.",
      },
      {
        name: "Phantom",
        description:
          "Many rogues walk a fine line between life and death, risking their own lives and taking the lives of others. While adventuring on that line, some rogues discover a mystical connection to death itself.",
      },
      {
        name: "Scout",
        description:
          "You are skilled in stealth and surviving far from the streets of a city, allowing you to scout ahead of your companions during expeditions. Rogues who embrace this archetype are at home in the wilderness and among barbarians and rangers.",
      },
      {
        name: "Soulknife",
        description:
          "Most assassins strike with physical weapons, and many burglars and spies use similar methods. For the Soulknife, the mind is the weapon. This rogue focuses psionic energy into blades of pure mental energy.",
      },
      {
        name: "Swashbuckler",
        description:
          "As a Swashbuckler, you focus on the art of the blade combined with fancy footwork. You rely on charm and wit to make your way through a fight rather than brute strength, and you look good doing it.",
      },
    ],
  },

  // ── 10. Sorcerer ────────────────────────────────────────────────────────────
  {
    name: "Sorcerer",
    hitDie: 6,
    primaryAbility: ["Charisma"],
    savingThrows: ["Constitution", "Charisma"],
    armorProficiencies: [],
    weaponProficiencies: [
      "Daggers",
      "Darts",
      "Slings",
      "Quarterstaffs",
      "Light crossbows",
    ],
    skillChoices: [
      "Arcana",
      "Deception",
      "Insight",
      "Intimidation",
      "Persuasion",
      "Religion",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Spellcasting", "Sorcerous Origin"],
      2: ["Font of Magic"],
      3: ["Metamagic"],
      4: ["Ability Score Improvement"],
      5: [],
      6: ["Sorcerous Origin Feature"],
      7: [],
      8: ["Ability Score Improvement"],
      9: [],
      10: ["Metamagic"],
      11: [],
      12: ["Ability Score Improvement"],
      13: [],
      14: ["Sorcerous Origin Feature"],
      15: [],
      16: ["Ability Score Improvement"],
      17: ["Metamagic"],
      18: ["Sorcerous Origin Feature"],
      19: ["Ability Score Improvement"],
      20: ["Sorcerous Restoration"],
    },
    subclasses: [
      {
        name: "Draconic Bloodline",
        description:
          "Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a dragon or who might even have claimed a dragon parent.",
      },
      {
        name: "Wild Magic",
        description:
          "Your innate magic comes from the wild forces of chaos that underlie the order of creation. You might have endured exposure to some form of raw magic, perhaps through a planar portal leading to Limbo, the Elemental Planes, or the mysterious Far Realm.",
      },
      {
        name: "Divine Soul",
        description:
          "Sometimes the spark of magic that fuels a sorcerer comes from a divine source that glimmers within the soul. Having such a blessed soul is a sign that your innate magic might come from a distant but powerful familial connection to a divine being.",
      },
      {
        name: "Shadow Magic",
        description:
          "You are a creature of shadow, for your innate magic comes from the Shadowfell itself. You might trace your lineage to an entity from that place, or perhaps you were exposed to its fell energy and transformed by it.",
      },
      {
        name: "Storm Sorcery",
        description:
          "Your innate magic comes from the power of elemental air. Many with this power can trace their magic back to a near-death experience caused by the Great Rain, but perhaps you were born during a howling gale so powerful that folk still tell stories of it.",
      },
      {
        name: "Aberrant Mind",
        description:
          "An alien influence has wrapped its tendrils around your mind, giving you psionic power. You can now touch other minds with that power and alter the world around you by using it to control the magical energy of the multiverse.",
      },
      {
        name: "Clockwork Soul",
        description:
          "The cosmic force of order has suffused you with magic. You might have endured exposure to raw Mechanus, the Plane of Law, perhaps through a planar portal, or perhaps you were influenced by a modron.",
      },
      {
        name: "Lunar Sorcery",
        description:
          "On many worlds, the moon is a revered celestial body with magical properties. You or someone from your lineage has been blessed with power that ebbs and flows with the lunar cycle.",
      },
    ],
  },

  // ── 11. Warlock ─────────────────────────────────────────────────────────────
  {
    name: "Warlock",
    hitDie: 8,
    primaryAbility: ["Charisma"],
    savingThrows: ["Wisdom", "Charisma"],
    armorProficiencies: ["Light armor"],
    weaponProficiencies: ["Simple weapons"],
    skillChoices: [
      "Arcana",
      "Deception",
      "History",
      "Intimidation",
      "Investigation",
      "Nature",
      "Religion",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Otherworldly Patron", "Pact Magic"],
      2: ["Eldritch Invocations"],
      3: ["Pact Boon"],
      4: ["Ability Score Improvement"],
      5: [],
      6: ["Otherworldly Patron Feature"],
      7: [],
      8: ["Ability Score Improvement"],
      9: [],
      10: ["Otherworldly Patron Feature"],
      11: ["Mystic Arcanum (6th level)"],
      12: ["Ability Score Improvement"],
      13: ["Mystic Arcanum (7th level)"],
      14: ["Otherworldly Patron Feature"],
      15: ["Mystic Arcanum (8th level)"],
      16: ["Ability Score Improvement"],
      17: ["Mystic Arcanum (9th level)"],
      18: [],
      19: ["Ability Score Improvement"],
      20: ["Eldritch Master"],
    },
    subclasses: [
      {
        name: "The Archfey",
        description:
          "Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born. This being's motivations are often inscrutable, and sometimes whimsical, and might involve a striving for greater magical power or the settling of age-old grudges.",
      },
      {
        name: "The Fiend",
        description:
          "You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you.",
      },
      {
        name: "The Great Old One",
        description:
          "Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality. It might come from the Far Realm, the space beyond reality, or it could be one of the elder gods known only in legends.",
      },
      {
        name: "The Undying",
        description:
          "Death holds no sway over your patron, who has unlocked the secrets of everlasting life, although such a prize — like all power — comes at a price. Once mortal, the Undying has seen mortal lifetimes pass like the seasons, like the flicker of endless days and nights.",
      },
      {
        name: "The Celestial",
        description:
          "Your patron is a powerful being of the Upper Planes. You have bound yourself to an ancient empyrean, solar, ki-rin, unicorn, or other entity that resides in the planes of everlasting bliss.",
      },
      {
        name: "The Hexblade",
        description:
          "You have made your pact with a mysterious entity from the Shadowfell — a force that manifests in sentient magic weapons carved from the stuff of shadow. The strange, sentient magic that permeates such weapons can offer a pact to those skilled enough to wield them.",
      },
      {
        name: "The Fathomless",
        description:
          "You have plunged into a pact with the depths. An entity of the ocean, the Elemental Plane of Water, or another otherworldly sea now allows you to draw on its thalassic power.",
      },
      {
        name: "The Genie",
        description:
          "You have made a pact with one of the rarest kinds of genie, a noble genie. Such entities rule vast fiefs on the Elemental Planes and have great influence over lesser genies and elemental creatures.",
      },
      {
        name: "The Undead",
        description:
          "You have made a pact with a deathless being, a mighty undead who lurks on the Negative Energy Plane, or one who wanders the planes, such as a death knight, vampire, lich, or mummy lord.",
      },
    ],
  },

  // ── 12. Wizard ──────────────────────────────────────────────────────────────
  {
    name: "Wizard",
    hitDie: 6,
    primaryAbility: ["Intelligence"],
    savingThrows: ["Intelligence", "Wisdom"],
    armorProficiencies: [],
    weaponProficiencies: [
      "Daggers",
      "Darts",
      "Slings",
      "Quarterstaffs",
      "Light crossbows",
    ],
    skillChoices: [
      "Arcana",
      "History",
      "Insight",
      "Investigation",
      "Medicine",
      "Religion",
    ],
    numSkillChoices: 2,
    features: {
      1: ["Spellcasting", "Arcane Recovery"],
      2: ["Arcane Tradition"],
      3: [],
      4: ["Ability Score Improvement"],
      5: [],
      6: ["Arcane Tradition Feature"],
      7: [],
      8: ["Ability Score Improvement"],
      9: [],
      10: ["Arcane Tradition Feature"],
      11: [],
      12: ["Ability Score Improvement"],
      13: [],
      14: ["Arcane Tradition Feature"],
      15: [],
      16: ["Ability Score Improvement"],
      17: [],
      18: ["Spell Mastery"],
      19: ["Ability Score Improvement"],
      20: ["Signature Spell"],
    },
    subclasses: [
      {
        name: "School of Abjuration",
        description:
          "The School of Abjuration emphasizes magic that blocks, banishes, or protects. Detractors of this school say that its magic is about denial, negation rather than positive assertion. You understand, however, that ending harmful effects, protecting the weak, and banishing evil influences is anything but a philosophical void.",
      },
      {
        name: "School of Conjuration",
        description:
          "As a conjurer, you favor spells that produce objects and creatures out of thin air. You can conjure billowing clouds of daggers and petals, teleport yourself and your companions across vast distances, and even call upon creatures from other planes of existence to fight on your behalf.",
      },
      {
        name: "School of Divination",
        description:
          "The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. As a diviner, you strive to part the veils of space, time, and consciousness so that you can see clearly.",
      },
      {
        name: "School of Enchantment",
        description:
          "As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy.",
      },
      {
        name: "School of Evocation",
        description:
          "You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid. Some evocationists find employment in military forces, serving as artillery to blast enemy armies from afar.",
      },
      {
        name: "School of Illusion",
        description:
          "You focus your studies on magic that dazzles the senses, befuddles the mind, and tricks even the wisest folk. Your magic is subtle, but the illusions crafted by your keen mind make the impossible seem real.",
      },
      {
        name: "School of Necromancy",
        description:
          "The School of Necromancy explores the cosmic forces of life, death, and undeath. As you focus your studies in this tradition, you learn to manipulate the energy that animates all living things.",
      },
      {
        name: "School of Transmutation",
        description:
          "You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. You wield the raw stuff of creation and learn to alter both physical forms and mental qualities.",
      },
      {
        name: "Bladesinging",
        description:
          "Bladesingers master a tradition of wizardry that incorporates swordplay and dance. Originally created by elves, this tradition has been adopted by non-elf practitioners, who honor and expand on the elven ways.",
      },
      {
        name: "Order of Scribes",
        description:
          "Magic of the spellbook is a common thread that unites all wizards, regardless of their magical specialties. The Order of Scribes arose from wizards who wanted to experience that magic more fully, and such wizards are among the most scholarly of their kind.",
      },
      {
        name: "Chronurgy Magic",
        description:
          "Focusing on the manipulation of time, those who follow the Chronurgy tradition learn to alter the pace of reality to their liking. Using the principles of dunamancy, these mages can slow and stop time itself.",
      },
      {
        name: "Graviturgy Magic",
        description:
          "Understanding and mastering the forces that draw bodies of matter together or drive them apart, the Graviturgy tradition is one that aligns with the dunamantic principles of binding and unbinding.",
      },
    ],
  },
];

export function getClass(name: string): CharacterClass | undefined {
  return classes.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}
