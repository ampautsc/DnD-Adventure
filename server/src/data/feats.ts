export interface Feat {
  name: string;
  description: string;
  prerequisite?: string;
  abilityScoreBonus?: Partial<Record<string, number>>;
  benefits: string[];
}

export const feats: Feat[] = [
  {
    name: "Alert",
    description:
      "Always on the lookout for danger, you gain the following benefits:",
    benefits: [
      "+5 bonus to initiative",
      "You can't be surprised while you are conscious",
      "Other creatures don't gain advantage on attack rolls against you as a result of being hidden from you",
    ],
  },
  {
    name: "Athlete",
    description:
      "You have undergone extensive physical training to gain the following benefits:",
    abilityScoreBonus: { Strength: 1 },
    benefits: [
      "+1 to Strength or Dexterity (your choice)",
      "When you are prone, standing up uses only 5 feet of your movement",
      "Climbing doesn't cost you extra movement",
      "You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet",
    ],
  },
  {
    name: "Charger",
    description:
      "When you are engaged in combat using the Dash action, you gain the following benefits:",
    benefits: [
      "When you use the Dash action, you can use a bonus action to make one melee weapon attack or to shove a creature",
      "If you move at least 10 feet in a straight line before making the attack, add +5 to the attack's damage roll or push the target up to 10 feet away from you",
    ],
  },
  {
    name: "Crossbow Expert",
    description:
      "Thanks to extensive practice with the crossbow, you gain the following benefits:",
    benefits: [
      "You ignore the loading quality of crossbows with which you are proficient",
      "Being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls",
      "When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a hand crossbow you are holding",
    ],
  },
  {
    name: "Defensive Duelist",
    description:
      "When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.",
    prerequisite: "Dexterity 13 or higher",
    benefits: [
      "When wielding a finesse weapon you are proficient with, use your reaction to add your proficiency bonus to your AC against one melee attack that would hit you",
    ],
  },
  {
    name: "Dual Wielder",
    description:
      "You master fighting with two weapons, gaining the following benefits:",
    benefits: [
      "You gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand",
      "You can use two-weapon fighting even when the one-handed melee weapons you are wielding aren't light",
      "You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one",
    ],
  },
  {
    name: "Dungeon Delver",
    description:
      "Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:",
    benefits: [
      "Advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors",
      "Advantage on saving throws made to avoid or resist traps",
      "Resistance to the damage dealt by traps",
      "You can search for traps while traveling at a normal pace, instead of only at a slow pace",
    ],
  },
  {
    name: "Durable",
    description:
      "Hardy and resilient, you gain the following benefits:",
    abilityScoreBonus: { Constitution: 1 },
    benefits: [
      "+1 to Constitution (maximum of 20)",
      "When you roll a Hit Die to regain hit points, the minimum number of hit points you regain from the roll equals twice your Constitution modifier (minimum of 2)",
    ],
  },
  {
    name: "Elemental Adept",
    description:
      "When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder. Spells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.",
    prerequisite: "The ability to cast at least one spell",
    benefits: [
      "Spells you cast ignore resistance to the chosen damage type (acid, cold, fire, lightning, or thunder)",
      "When you roll damage for a spell of the chosen type, treat any 1 on a damage die as a 2",
      "You can select this feat multiple times, choosing a different damage type each time",
    ],
  },
  {
    name: "Great Weapon Master",
    description:
      "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:",
    benefits: [
      "On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action",
      "Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage",
    ],
  },
  {
    name: "Healer",
    description:
      "You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:",
    benefits: [
      "When you use a healer's kit to stabilize a dying creature, that creature also regains 1 hit point",
      "As an action, you can spend one use of a healer's kit to tend to a creature and restore 1d6 + 4 hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. The creature can't regain hit points from this feat again until it finishes a short or long rest",
    ],
  },
  {
    name: "Heavy Armor Master",
    description:
      "You can use your armor to deflect strikes that would kill others. You gain the following benefits:",
    prerequisite: "Proficiency with heavy armor",
    abilityScoreBonus: { Strength: 1 },
    benefits: [
      "+1 to Strength (maximum of 20)",
      "While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from nonmagical weapons is reduced by 3",
    ],
  },
  {
    name: "Inspiring Leader",
    description:
      "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest.",
    prerequisite: "Charisma 13 or higher",
    benefits: [
      "Spend 10 minutes to grant up to 6 friendly creatures within 30 feet temporary hit points equal to your level + Charisma modifier",
      "Each creature can benefit from this feat only once per short or long rest",
    ],
  },
  {
    name: "Keen Mind",
    description:
      "You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits:",
    abilityScoreBonus: { Intelligence: 1 },
    benefits: [
      "+1 to Intelligence (maximum of 20)",
      "You always know which way is north",
      "You always know the number of hours left before the next sunrise or sunset",
      "You can accurately recall anything you have seen or heard within the past month",
    ],
  },
  {
    name: "Lucky",
    description:
      "You have inexplicable luck that seems to kick in at just the right moment. You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw. You can also spend one luck point when an attack roll is made against you. Roll a d20, and then choose whether the attack uses the attacker's roll or yours. Your luck points are replenished when you finish a long rest.",
    benefits: [
      "You have 3 luck points, which are replenished after a long rest",
      "Spend a luck point to roll an additional d20 when making an attack roll, ability check, or saving throw, then choose which d20 to use",
      "Spend a luck point when an attack roll is made against you to roll a d20 and choose which roll is used",
    ],
  },
  {
    name: "Mage Slayer",
    description:
      "You have practiced techniques useful in melee combat against spellcasters, gaining the following benefits:",
    benefits: [
      "When a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature",
      "When you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration",
      "You have advantage on saving throws against spells cast by creatures within 5 feet of you",
    ],
  },
  {
    name: "Magic Initiate",
    description:
      "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list. In addition, choose one 1st-level spell from that same list. You learn that spell and can cast it at its lowest level. Once you cast it, you must finish a long rest before you can cast it that way again. Your spellcasting ability for these spells depends on the class you chose.",
    benefits: [
      "Learn 2 cantrips from your chosen class's spell list",
      "Learn one 1st-level spell from that same class's spell list",
      "Cast the 1st-level spell once per long rest without a spell slot",
      "Use the spellcasting ability of the chosen class for these spells",
    ],
  },
  {
    name: "Martial Adept",
    description:
      "You have martial training that allows you to perform special combat maneuvers. You gain the following benefits:",
    benefits: [
      "You learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class",
      "You gain one superiority die (a d6) which is used to fuel your maneuvers",
      "The superiority die is expended when you use it, and is regained when you finish a short or long rest",
    ],
  },
  {
    name: "Mobile",
    description:
      "You are exceptionally speedy and agile. You gain the following benefits:",
    benefits: [
      "Your speed increases by 10 feet",
      "When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn",
      "When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether or not the attack hits",
    ],
  },
  {
    name: "Mounted Combatant",
    description:
      "You are a dangerous foe to face while mounted. While you are mounted and aren't incapacitated, you gain the following benefits:",
    benefits: [
      "You have advantage on melee attack rolls against any unmounted creature that is smaller than your mount",
      "You can force an attack targeted at your mount to target you instead",
      "If your mount is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails",
    ],
  },
  {
    name: "Observant",
    description:
      "Quick to notice details of your environment, you gain the following benefits:",
    abilityScoreBonus: { Intelligence: 1 },
    benefits: [
      "+1 to Intelligence or Wisdom (your choice)",
      "If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips",
      "+5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores",
    ],
  },
  {
    name: "Polearm Master",
    description:
      "You can keep your enemies at bay with reach weapons. You gain the following benefits:",
    benefits: [
      "When you take the Attack action and attack with only a glaive, halberd, or quarterstaff, you can use a bonus action to make a melee attack with the opposite end of the weapon (damage: 1d4 bludgeoning)",
      "While you are wielding a glaive, halberd, pike, or quarterstaff, other creatures provoke an opportunity attack from you when they enter your reach",
    ],
  },
  {
    name: "Resilient",
    description:
      "Choose one ability score. You gain the following benefits:",
    benefits: [
      "+1 to the chosen ability score (maximum of 20)",
      "You gain proficiency in saving throws using the chosen ability",
    ],
  },
  {
    name: "Ritual Caster",
    description:
      "You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them. When you choose this feat, you acquire a ritual book holding two 1st-level spells of your choice.",
    prerequisite: "Intelligence or Wisdom 13 or higher",
    benefits: [
      "You acquire a ritual book holding two 1st-level spells of your choice that have the ritual tag",
      "You can cast those spells as rituals; you cannot cast them as regular spells unless you've learned them by other means",
      "If you come across a spell in written form, you might be able to add it to your ritual book (the spell must be on the spell list for the class you chose at the time you took the feat, must be of a level you can cast, and must have the ritual tag)",
    ],
  },
  {
    name: "Savage Attacker",
    description:
      "Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total.",
    benefits: [
      "Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total",
    ],
  },
  {
    name: "Sentinel",
    description:
      "You have mastered techniques to take advantage of every drop in any enemy's guard, gaining the following benefits:",
    benefits: [
      "When you hit a creature with an opportunity attack, the creature's speed becomes 0 for the rest of the turn",
      "Creatures within 5 feet of you provoke opportunity attacks from you even if they take the Disengage action before leaving your reach",
      "When a creature within 5 feet of you makes an attack against a target other than you (and that target doesn't have this feat), you can use your reaction to make a melee weapon attack against the attacking creature",
    ],
  },
  {
    name: "Sharpshooter",
    description:
      "You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits:",
    benefits: [
      "Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls",
      "Your ranged weapon attacks ignore half cover and three-quarters cover",
      "Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage",
    ],
  },
  {
    name: "Shield Master",
    description:
      "You use shields not just for protection but also for offense. You gain the following benefits while you are wielding a shield:",
    benefits: [
      "If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield",
      "If you aren't incapacitated, you can add your shield's AC bonus to any Dexterity saving throw you make against a spell or other harmful effect",
      "If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw",
    ],
  },
  {
    name: "Skilled",
    description:
      "You gain proficiency in any combination of three skills or tools of your choice.",
    benefits: [
      "Gain proficiency in any combination of 3 skills or tools of your choice",
    ],
  },
  {
    name: "Skulker",
    description:
      "You are expert at slinking through shadows. You gain the following benefits:",
    prerequisite: "Dexterity 13 or higher",
    benefits: [
      "You can try to hide when you are lightly obscured from the creature from which you are hiding",
      "When you are hidden from a creature and miss it with a ranged weapon attack, making the attack doesn't reveal your position",
      "Dim light doesn't impose disadvantage on your Wisdom (Perception) checks relying on sight",
    ],
  },
  {
    name: "Spell Sniper",
    description:
      "You have learned techniques to enhance your attacks with certain kinds of spells, gaining the following benefits:",
    prerequisite: "The ability to cast at least one spell",
    benefits: [
      "When you cast a spell that requires you to make an attack roll, the spell's range is doubled",
      "Your ranged spell attacks ignore half cover and three-quarters cover",
      "You learn one cantrip that requires an attack roll; choose the cantrip from the bard, cleric, druid, sorcerer, warlock, or wizard spell list",
    ],
  },
  {
    name: "Tavern Brawler",
    description:
      "Accustomed to rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits:",
    abilityScoreBonus: { Strength: 1 },
    benefits: [
      "+1 to Strength or Constitution (your choice)",
      "You are proficient with improvised weapons and unarmed strikes",
      "Your unarmed strike uses a d4 for damage",
      "When you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target",
    ],
  },
  {
    name: "Tough",
    description:
      "Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.",
    benefits: [
      "Your hit point maximum increases by 2 for each level you have attained",
      "Whenever you gain a level, your hit point maximum increases by an additional 2 hit points",
    ],
  },
  {
    name: "War Caster",
    description:
      "You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:",
    prerequisite: "The ability to cast at least one spell",
    benefits: [
      "You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage",
      "You can perform the somatic components of spells even when you have weapons or a shield in one or both hands",
      "When a hostile creature's movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack (the spell must have a casting time of 1 action and must target only that creature)",
    ],
  },
  {
    name: "Weapon Master",
    description:
      "You have practiced extensively with a variety of weapons, gaining the following benefits:",
    abilityScoreBonus: { Strength: 1 },
    benefits: [
      "+1 to Strength or Dexterity (your choice)",
      "You gain proficiency with four weapons of your choice. Each one must be a simple or a martial weapon",
    ],
  },
  {
    name: "Actor",
    description:
      "Skilled at mimicry and dramatics, you gain the following benefits:",
    abilityScoreBonus: { Charisma: 1 },
    benefits: [
      "+1 to Charisma (maximum of 20)",
      "You have advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person",
      "You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute",
    ],
  },
  {
    name: "Linguist",
    description:
      "You have studied languages and codes, gaining the following benefits:",
    abilityScoreBonus: { Intelligence: 1 },
    benefits: [
      "+1 to Intelligence (maximum of 20)",
      "You learn three languages of your choice",
      "You can imbue messages with hidden meaning. You and others you teach can write in such a way that a non-proficient creature can't decipher it without a successful Intelligence check (DC equal to your Intelligence score + your proficiency bonus)",
    ],
  },
];

export function getFeat(name: string): Feat | undefined {
  return feats.find((f) => f.name.toLowerCase() === name.toLowerCase());
}
