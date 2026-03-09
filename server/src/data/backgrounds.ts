export interface BackgroundFeature {
  name: string;
  description: string;
}

export interface Background {
  name: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];
  equipment: string[];
  feature: BackgroundFeature;
  suggestedCharacteristics?: string;
}

export const backgrounds: Background[] = [
  {
    name: "Acolyte",
    description: "You have spent your life in service to a temple",
    skillProficiencies: ["Insight", "Religion"],
    toolProficiencies: [],
    languages: ["Two of your choice"],
    equipment: [
      "Holy symbol",
      "Prayer book or prayer wheel",
      "5 sticks of incense",
      "Vestments",
      "Common clothes",
      "Belt pouch (15 gp)",
    ],
    feature: {
      name: "Shelter of the Faithful",
      description:
        "As an acolyte, you command the respect of those who share your faith. You and your companions can receive free healing and care at a temple, shrine, or other established presence of your faith. When you are in need, your fellow faithful will provide you with simple accommodations.",
    },
    suggestedCharacteristics:
      "Acolytes are shaped by their experience in temple service. Their study of the history and tenets of their faith and their relationships to temples, shrines, or hierarchies affect their mannerisms and ideals.",
  },
  {
    name: "Criminal",
    description:
      "You are an experienced criminal with a history of breaking the law",
    skillProficiencies: ["Deception", "Stealth"],
    toolProficiencies: ["One type of gaming set", "Thieves' tools"],
    languages: [],
    equipment: ["Crowbar", "Dark common clothes with a hood", "Belt pouch (15 gp)"],
    feature: {
      name: "Criminal Contact",
      description:
        "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.",
    },
    suggestedCharacteristics:
      "Criminals might seem like villains on the surface, and many of them are villainous to the core. But some have an abundance of endearing, if not redeeming, characteristics.",
  },
  {
    name: "Folk Hero",
    description:
      "You come from a humble social rank but are destined for so much more",
    skillProficiencies: ["Animal Handling", "Survival"],
    toolProficiencies: ["One type of artisan's tools", "Vehicles (land)"],
    languages: [],
    equipment: [
      "Artisan's tools (one of your choice)",
      "Shovel",
      "Iron pot",
      "Common clothes",
      "Belt pouch (10 gp)",
    ],
    feature: {
      name: "Rustic Hospitality",
      description:
        "Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.",
    },
    suggestedCharacteristics:
      "A folk hero is one of the common people, for better or for worse. Most folk heroes look on their humble origins as a virtue, not a shortcoming.",
  },
  {
    name: "Noble",
    description: "You understand wealth, power, and privilege",
    skillProficiencies: ["History", "Persuasion"],
    toolProficiencies: ["One type of gaming set"],
    languages: ["One of your choice"],
    equipment: [
      "Fine clothes",
      "Signet ring",
      "Scroll of pedigree",
      "Purse (25 gp)",
    ],
    feature: {
      name: "Position of Privilege",
      description:
        "Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you and avoid your displeasure, and other people of high birth treat you as a member of the same social sphere.",
    },
    suggestedCharacteristics:
      "Nobles are born and raised to a very different lifestyle than most people ever experience, and their personalities reflect that upbringing.",
  },
  {
    name: "Sage",
    description: "You spent years learning the lore of the multiverse",
    skillProficiencies: ["Arcana", "History"],
    toolProficiencies: [],
    languages: ["Two of your choice"],
    equipment: [
      "Bottle of black ink",
      "Quill",
      "Small knife",
      "Letter from a dead colleague posing a question you haven't yet been able to answer",
      "Common clothes",
      "Belt pouch (10 gp)",
    ],
    feature: {
      name: "Researcher",
      description:
        "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this information comes from a library, scriptorium, university, or a sage or other learned person or creature. Your DM might rule that the knowledge you seek is secreted away in an almost inaccessible place.",
    },
    suggestedCharacteristics:
      "Sages are defined by their extensive studies, and their characteristics reflect this life of study. Devoted to scholarly pursuits, a sage values knowledge highly.",
  },
  {
    name: "Soldier",
    description:
      "War has been your life for as long as you care to remember",
    skillProficiencies: ["Athletics", "Intimidation"],
    toolProficiencies: ["One type of gaming set", "Vehicles (land)"],
    languages: [],
    equipment: [
      "Insignia of rank",
      "Trophy taken from a fallen enemy",
      "Set of bone dice or deck of cards",
      "Common clothes",
      "Belt pouch (10 gp)",
    ],
    feature: {
      name: "Military Rank",
      description:
        "You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use.",
    },
    suggestedCharacteristics:
      "The horrors of war combined with the rigid discipline of military service leave their mark on all soldiers, shaping their ideals, creating strong bonds, and often leaving them scarred.",
  },
  {
    name: "Urchin",
    description: "You grew up on the streets alone, orphaned, and poor",
    skillProficiencies: ["Sleight of Hand", "Stealth"],
    toolProficiencies: ["Disguise kit", "Thieves' tools"],
    languages: [],
    equipment: [
      "Small knife",
      "Map of the city you grew up in",
      "Pet mouse",
      "Token to remember your parents by",
      "Common clothes",
      "Belt pouch (10 gp)",
    ],
    feature: {
      name: "City Secrets",
      description:
        "You know the secret patterns and flow of cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.",
    },
    suggestedCharacteristics:
      "Urchins are shaped by lives of desperate poverty, for good and for ill. They tend to be driven either by a commitment to the people with whom they shared life on the street or by a burning desire to find a better life.",
  },
  {
    name: "Entertainer",
    description: "You thrive in front of an audience",
    skillProficiencies: ["Acrobatics", "Performance"],
    toolProficiencies: ["Disguise kit", "One musical instrument of your choice"],
    languages: [],
    equipment: [
      "Musical instrument (one of your choice)",
      "The favor of an admirer (love letter, lock of hair, or trinket)",
      "Costume",
      "Belt pouch (15 gp)",
    ],
    feature: {
      name: "By Popular Demand",
      description:
        "You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble's court. At such a place, you receive free lodging and food of a modest or comfortable standard (depending on the quality of the establishment), as long as you perform each night.",
    },
    suggestedCharacteristics:
      "Successful entertainers have to be able to capture and hold an audience's attention, so they tend to have flamboyant or forceful personalities.",
  },
  {
    name: "Guild Artisan",
    description: "You are a member of an artisan's guild",
    skillProficiencies: ["Insight", "Persuasion"],
    toolProficiencies: ["One type of artisan's tools of your choice"],
    languages: ["One of your choice"],
    equipment: [
      "Artisan's tools (one of your choice)",
      "Letter of introduction from your guild",
      "Traveler's clothes",
      "Belt pouch (15 gp)",
    ],
    feature: {
      name: "Guild Membership",
      description:
        "As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guild hall offers a central place to meet other members of your profession.",
    },
    suggestedCharacteristics:
      "Guild artisans are among the most ordinary people in the world—until they set down their tools and take up an adventuring career. They understand the value of hard work and the importance of community.",
  },
  {
    name: "Hermit",
    description:
      "You lived in seclusion for a formative part of your life",
    skillProficiencies: ["Medicine", "Religion"],
    toolProficiencies: ["Herbalism kit"],
    languages: ["One of your choice"],
    equipment: [
      "Scroll case stuffed full of notes from your studies or prayers",
      "Winter blanket",
      "Common clothes",
      "Herbalism kit",
      "Belt pouch (5 gp)",
    ],
    feature: {
      name: "Discovery",
      description:
        "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature.",
    },
    suggestedCharacteristics:
      "Some hermits are well suited to a life of seclusion, whereas others chafe against it and long for company. Whether they embrace solitude or long to escape it, the hermit life shapes their attitudes and ideals.",
  },
  {
    name: "Outlander",
    description: "You grew up in the wilds far from civilization",
    skillProficiencies: ["Athletics", "Survival"],
    toolProficiencies: ["One musical instrument of your choice"],
    languages: ["One of your choice"],
    equipment: [
      "Staff",
      "Hunting trap",
      "Trophy from an animal you killed",
      "Traveler's clothes",
      "Belt pouch (10 gp)",
    ],
    feature: {
      name: "Wanderer",
      description:
        "You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.",
    },
    suggestedCharacteristics:
      "Often considered rude and uncouth among civilized folk, outlanders have little respect for and little knowledge of town or city life. Wild at heart, they prefer to live by their own code.",
  },
  {
    name: "Charlatan",
    description:
      "You always had a way with people, and you know how to sweet-talk, fast-talk, feign, and defraud",
    skillProficiencies: ["Deception", "Sleight of Hand"],
    toolProficiencies: ["Disguise kit", "Forgery kit"],
    languages: [],
    equipment: [
      "Set of fine clothes",
      "Disguise kit",
      "Tools of the con of your choice",
      "Belt pouch (15 gp)",
    ],
    feature: {
      name: "False Identity",
      description:
        "You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.",
    },
    suggestedCharacteristics:
      "Charlatans are colorful characters who conceal their true selves behind the masks they construct. They reflect what people want to see, what they want to believe, and how they see the world.",
  },
];

export function getBackground(name: string): Background | undefined {
  return backgrounds.find(
    (b) => b.name.toLowerCase() === name.toLowerCase()
  );
}
