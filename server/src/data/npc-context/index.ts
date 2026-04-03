/**
 * NPC World-Context Data — Faerûn, 1492 DR
 *
 * A flat collection of world-knowledge entries written at the "worldly adult
 * Faerûnian" baseline: what any literate or well-travelled commoner would know.
 * Entries carry one or more category tags so callers can load only the subset
 * relevant to a given NPC archetype.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type NpcContextCategory =
  | 'geography'   // Regions, roads, cities, landmarks
  | 'religion'    // Gods, temples, clergy, afterlife
  | 'economy'     // Currency, wages, trade, guilds
  | 'magic'       // The Weave, spellcasters, magical goods
  | 'faction'     // Political organisations and armed forces
  | 'danger'      // Monsters, banditry, undead, wilderness hazards
  | 'daily-life'  // Housing, markets, food, travel, literacy
  | 'cosmology'   // Planes of existence, divine manifestation
  | 'calendar'    // Calendar of Harptos, festivals, recent history
  | 'society';    // Class, race relations, law, social norms

export interface NpcContextEntry {
  id: string;
  categories: NpcContextCategory[];
  /** Plain prose suitable for direct injection into an NPC prompt. */
  content: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────

export const npcContext: NpcContextEntry[] = [

  // ── GEOGRAPHY ──────────────────────────────────────────────────────────────

  {
    id: 'geo-sword-coast',
    categories: ['geography'],
    content:
      'The Sword Coast is the main trade corridor along the western edge of ' +
      'Faerûn, running from Baldur\'s Gate in the south through Waterdeep and ' +
      'on to Neverwinter and Luskan in the north. The Sea of Swords lies to ' +
      'the west; most overland commerce moves along the High Road or the Trade Way.',
  },
  {
    id: 'geo-major-cities',
    categories: ['geography'],
    content:
      'Waterdeep — the City of Splendors — is the largest and most powerful ' +
      'city in the North. Baldur\'s Gate is the wealthiest trading port on the ' +
      'Sword Coast. Neverwinter is rebuilding after a devastating volcanic event ' +
      'decades ago. Luskan, in the far north, has a dark reputation for pirates ' +
      'and the Arcane Brotherhood.',
  },
  {
    id: 'geo-roads',
    categories: ['geography', 'daily-life'],
    content:
      'The High Road follows the coast and is patrolled, making it safer but ' +
      'slower. The Trade Way cuts inland and sees heavy merchant traffic between ' +
      'Baldur\'s Gate and Waterdeep. Both roads have inns spaced a day\'s ride apart, ' +
      'though the quality varies enormously.',
  },
  {
    id: 'geo-underdark',
    categories: ['geography', 'danger'],
    content:
      'The Underdark is a vast network of tunnels and caverns beneath Faerûn. ' +
      'Drow, mind flayers, beholders, and creatures worse than nightmares dwell ' +
      'there. Surface entrances are rare and usually guarded or sealed. Respectable ' +
      'folk go nowhere near them.',
  },
  {
    id: 'geo-north',
    categories: ['geography', 'danger'],
    content:
      'The North is the broad, sparsely settled region above Waterdeep. Towns ' +
      'like Neverwinter, Mirabar, and Silverymoon anchor civilization. Between them ' +
      'stretch leagues of wilderness, ancient ruins, and monster-haunted forests. ' +
      'The Spine of the World mountains mark the edge of the known North; Icewind ' +
      'Dale lies beyond, frozen and largely empty.',
  },
  {
    id: 'geo-interior',
    categories: ['geography'],
    content:
      'East of the Sword Coast lie the interior lands: Cormyr (a stable kingdom), ' +
      'the Dalelands (farming communities near the ancient Elven Court), and the ' +
      'great Anauroch desert where the Netherese empire once stood. These are distant ' +
      'to most Sword Coast folk — known by name but rarely visited.',
  },
  {
    id: 'geo-moonshae',
    categories: ['geography'],
    content:
      'The Moonshae Isles sit west of the Sword Coast across the Sea of Swords. ' +
      'They are inhabited by humans of Northlander and Ffolk descent, alongside ' +
      'fey creatures and old druidic powers. Trade ships call there for wool, timber, ' +
      'and fish.',
  },

  // ── RELIGION ───────────────────────────────────────────────────────────────

  {
    id: 'rel-pantheon-overview',
    categories: ['religion'],
    content:
      'Faerûn has many gods, and most folk honour several rather than one. It is ' +
      'normal to pray to Tymora before a journey, Chauntea before planting, and ' +
      'Kelemvor when someone dies. Exclusive devotion to a single deity is the mark ' +
      'of a cleric or paladin, not common folk.',
  },
  {
    id: 'rel-tymora',
    categories: ['religion', 'daily-life'],
    content:
      'Tymora is the goddess of good fortune and adventurers\' luck. Common folk ' +
      'flip a coin to Lady Luck before gambling, signing contracts, or setting out on ' +
      'any journey of consequence. Her temples are cheerful places, usually staffed ' +
      'by pragmatic clerics who charge modest fees for healing.',
  },
  {
    id: 'rel-helm',
    categories: ['religion', 'faction'],
    content:
      'Helm is the god of guardians and vigilance. Guards, soldiers, and anyone ' +
      'whose work is protective often wear his symbol — an eye in an upturned gauntlet. ' +
      'His clergy do not seek glory; they stand watch. Helm\'s temples are austere, ' +
      'functional, and keep careful records.',
  },
  {
    id: 'rel-tyr',
    categories: ['religion', 'society'],
    content:
      'Tyr is the god of justice and law. His temples function as courts in many ' +
      'cities. Oaths sworn before Tyr\'s altar are binding; breaking them is both a ' +
      'crime and a religious transgression. His clerics are magistrates as often as ' +
      'they are healers.',
  },
  {
    id: 'rel-mystra',
    categories: ['religion', 'magic'],
    content:
      'Mystra is the goddess of magic and the Weave itself. Without her, spells ' +
      'would not function. She died during the catastrophe called the Spellplague ' +
      '(1385 DR) and was restored at the Second Sundering (circa 1487 DR). All ' +
      'magic flickered and warped during her absence. Most wizards and sorcerers ' +
      'pay her reverence even if they do not actively worship her.',
  },
  {
    id: 'rel-kelemvor',
    categories: ['religion', 'cosmology'],
    content:
      'Kelemvor judges the dead. His priests run mortuaries and conduct funerary ' +
      'rites. They oppose undead — not out of battle-lust, but because undead are ' +
      'souls refusing their rightful judgment. A Kelemvorite cemetery is a safe ' +
      'place; the priests keep it clean of risen dead.',
  },
  {
    id: 'rel-chauntea',
    categories: ['religion', 'daily-life'],
    content:
      'Chauntea is the Great Mother, goddess of agriculture and the earth. Every ' +
      'farming village has at least a roadside shrine to her. Farmers pray to her at ' +
      'planting and harvest. Her worship requires no elaborate ceremony — a handful ' +
      'of seed returned to the earth is offering enough.',
  },
  {
    id: 'rel-selune-shar',
    categories: ['religion', 'cosmology'],
    content:
      'Selûne (the Moonmaiden) and Shar (the goddess of darkness and secrets) are ' +
      'ancient rivals, twin sisters born at the dawn of creation. Their conflict ' +
      'shapes the night sky: Selûne\'s moonfire against Shar\'s encroaching shadow. ' +
      'Worshippers of the two faiths regard each other as mortal enemies.',
  },
  {
    id: 'rel-temples',
    categories: ['religion', 'economy'],
    content:
      'Temples provide healing, but it is rarely free. Standard practice is an ' +
      'offering commensurate with the service — a few coppers for a minor wound, ' +
      'several gold for restoration of lost limbs or curing disease. Wealthy patrons ' +
      'who donate generously receive preferential treatment; this is not considered ' +
      'corruption, merely proper reverence.',
  },

  // ── ECONOMY ────────────────────────────────────────────────────────────────

  {
    id: 'eco-currency',
    categories: ['economy'],
    content:
      'The standard currencies are copper pieces (cp), silver pieces (sp), gold ' +
      'pieces (gp), and platinum pieces (pp), in ascending value: 10 cp = 1 sp, ' +
      '10 sp = 1 gp, 10 gp = 1 pp. Gold is used for large purchases and trade ' +
      'contracts. Silver handles most daily commerce. Copper is the poor folk\'s coin.',
  },
  {
    id: 'eco-wages',
    categories: ['economy', 'society'],
    content:
      'In 1492 DR, an unskilled laborer earns roughly 1-2 silver pieces per day. ' +
      'A skilled craftsman (blacksmith, carpenter, mason) earns 2-5 silver. A ' +
      'trained soldier in city service earns about 5 silver per day plus lodging. ' +
      'Adventurers can earn in a single dungeon what a laborer earns in a year — ' +
      'if they survive.',
  },
  {
    id: 'eco-guilds',
    categories: ['economy', 'faction'],
    content:
      'Guilds control most skilled trades in larger cities. Attempting to practice ' +
      'a guild trade without membership risks fines, confiscation of tools, or worse. ' +
      'Joining a guild requires fees and often a period of apprenticeship. In ' +
      'Waterdeep, the guilds are powerful enough to influence city politics.',
  },
  {
    id: 'eco-trade',
    categories: ['economy', 'geography'],
    content:
      'The Lords\' Alliance was formed in part to promote stable trade between its ' +
      'member cities. Caravans traveling under Lords\' Alliance charter receive better ' +
      'treatment at member city gates and can appeal to alliance arbitrators in ' +
      'commercial disputes. Zhentarim caravans compete on price but carry more risk.',
  },
  {
    id: 'eco-magical-goods',
    categories: ['economy', 'magic'],
    content:
      'Magical goods are expensive. A basic healing potion costs 50 gold pieces or ' +
      'more in most markets. Enchanted weapons and armor are heirlooms or trophies — ' +
      'ordinary people do not own them. Magical services (divination, remove curse, ' +
      'raise dead) from temples can cost hundreds or thousands of gold pieces.',
  },
  {
    id: 'eco-moneylenders',
    categories: ['economy', 'society'],
    content:
      'Moneylenders operate in every city. Interest rates are high — 20% or more ' +
      'per month is not unusual. Most folk distrust them but turn to them in ' +
      'desperation. Debt slavery is illegal in Waterdeep and Baldur\'s Gate, but ' +
      'enforcement is imperfect, and the consequences of defaulting can be severe.',
  },
  {
    id: 'eco-taxes',
    categories: ['economy', 'faction'],
    content:
      'City governments and lords tax commerce. Waterdeep charges entry fees, ' +
      'harbor duties, and guild levies. Baldur\'s Gate taxes goods in transit and ' +
      'maintains the Flaming Fist partly through merchant tithes. Travelers learn ' +
      'quickly to budget for tolls on bridges and through city gates.',
  },

  // ── MAGIC ──────────────────────────────────────────────────────────────────

  {
    id: 'mag-the-weave',
    categories: ['magic'],
    content:
      'Magic flows through an invisible structure called the Weave, maintained by ' +
      'Mystra. Spellcasters do not generate magic themselves — they channel the ' +
      'Weave. When Mystra died, the Weave frayed and spells misfired or failed ' +
      'unpredictably. Since the Second Sundering (circa 1487 DR), the Weave has been ' +
      'restored and magic functions reliably again.',
  },
  {
    id: 'mag-spellcasters',
    categories: ['magic', 'society'],
    content:
      'Spellcasters are rare. Most people live their entire lives without learning ' +
      'a single spell. In cities, wizards and sorcerers are unusual but not ' +
      'shocking. In rural areas, a spellcaster may be the only one in ten villages. ' +
      'Common folk are respectful and wary in roughly equal measure.',
  },
  {
    id: 'mag-cantrips',
    categories: ['magic', 'daily-life'],
    content:
      'Minor magical effects — cantrips — are used by street performers, market ' +
      'vendors, and hedge wizards to attract attention or ease small tasks. Magical ' +
      'light, prestidigitation (small cleaning or flavoring effects), and simple ' +
      'illusions are the most commonly witnessed. They are impressive to country ' +
      'folk; city dwellers take them as normal background noise.',
  },
  {
    id: 'mag-enchanted-items',
    categories: ['magic', 'economy'],
    content:
      'An enchanted weapon glows faintly in darkness. A glowing blade at a soldier\'s ' +
      'hip is an immediate signal of wealth, power, or serious adventuring experience. ' +
      'Common guards do not carry magic weapons. Officers in elite forces might.',
  },
  {
    id: 'mag-wild-magic',
    categories: ['magic'],
    content:
      'During the Spellplague (1385-1395 DR), wild magic surges — uncontrolled ' +
      'magical eruptions — were common. A generation later, some folk still flinch ' +
      'when they see spellcasting, expecting something to go wrong. This anxiety has ' +
      'faded in the cities but lingers in isolated communities that were badly ' +
      'affected.',
  },
  {
    id: 'mag-arcane-sources',
    categories: ['magic'],
    content:
      'Wizards learn magic through study; sorcerers are born with innate power; ' +
      'warlocks make pacts with powerful beings; clerics and paladins draw power ' +
      'from their gods; druids channel nature itself. Common folk rarely distinguish ' +
      'between these sources — to them, "wizard" is a catch-all term for anyone who ' +
      'throws fire or speaks in strange tongues.',
  },

  // ── FACTION ────────────────────────────────────────────────────────────────

  {
    id: 'fac-lords-alliance',
    categories: ['faction'],
    content:
      'The Lords\' Alliance is a coalition of city-states (including Waterdeep, ' +
      'Neverwinter, Baldur\'s Gate, and Silverymoon) that cooperate on defense and ' +
      'trade. Member cities contribute to shared military responses against major ' +
      'threats. The Alliance is political and sometimes fractious, but it has held ' +
      'together for over a century.',
  },
  {
    id: 'fac-zhentarim',
    categories: ['faction', 'economy'],
    content:
      'The Zhentarim — also called the Black Network — are a mercenary and trading ' +
      'organization with a reputation for ruthlessness and results. They hire out ' +
      'as guards and assassins, smuggle goods past city tariffs, and enforce ' +
      'contracts in ways the city watch cannot. Not illegal everywhere, but never ' +
      'entirely trusted.',
  },
  {
    id: 'fac-harpers',
    categories: ['faction'],
    content:
      'The Harpers are a semi-secret network of agents dedicated to opposing tyranny ' +
      'and preserving knowledge. They recruit adventurers and scholars. Their symbol ' +
      'is a silver harp. They claim to serve the greater good; their enemies call ' +
      'them meddling spies. The truth is somewhere between.',
  },
  {
    id: 'fac-order-gauntlet',
    categories: ['faction', 'religion'],
    content:
      'The Order of the Gauntlet is a relatively new faction formed after the ' +
      'Second Sundering. Its members — mostly paladins, clerics, and devout warriors — ' +
      'believe evil must be proactively confronted, not merely reacted to. They are ' +
      'zealous and principled, sometimes to a fault.',
  },
  {
    id: 'fac-emerald-enclave',
    categories: ['faction'],
    content:
      'The Emerald Enclave is a loose brotherhood of druids, rangers, and nature ' +
      'wardens who protect the natural world from corruption — whether magical, ' +
      'monstrous, or simply human. They do not oppose civilization but enforce the ' +
      'boundary between settled land and wilderness.',
  },
  {
    id: 'fac-flaming-fist',
    categories: ['faction', 'geography'],
    content:
      'The Flaming Fist is Baldur\'s Gate\'s mercenary army and de facto city guard. ' +
      'They are disciplined, well-equipped, and operate well beyond the city walls — ' +
      'taking contracts across the Sword Coast. A Flaming Fist badge is recognized ' +
      'authority in most of the region.',
  },
  {
    id: 'fac-city-watch',
    categories: ['faction', 'society'],
    content:
      'Every significant city maintains a watch or guard force. Quality varies ' +
      'enormously: Waterdeep\'s City Watch is professional and incorruptible by ' +
      'most standards; smaller city guards may be poorly paid, undertrained, and ' +
      'susceptible to bribes. Travelers learn quickly which city\'s law is worth ' +
      'appealing to.',
  },

  // ── DANGER ─────────────────────────────────────────────────────────────────

  {
    id: 'dan-bandits',
    categories: ['danger', 'geography'],
    content:
      'Banditry on the roads is a constant hazard. Traveling alone is unwise on ' +
      'any route outside a city\'s immediate patrol range. Caravans hire guards; ' +
      'solo travelers try to attach to larger groups. The problem has worsened since ' +
      'the Sundering disrupted the old political order.',
  },
  {
    id: 'dan-goblinoids',
    categories: ['danger'],
    content:
      'Goblins, hobgoblins, and bugbears raid farms and travelers throughout the ' +
      'North. Goblin bands are nuisances; hobgoblin warbands are genuine military ' +
      'threats with tactics and discipline. Both are smart enough to ambush, smart ' +
      'enough to retreat, and common enough that most frontier folk have faced them.',
  },
  {
    id: 'dan-undead',
    categories: ['danger', 'religion'],
    content:
      'Undead have been more active since the Sundering. Graveyards near old ruins ' +
      'require regular consecration. Skeletons and zombies are typically the product ' +
      'of negligent or malicious necromancy. Vampires are rare but real; a vampire ' +
      'near a village is cause for evacuation, not heroics, unless the heroes are ' +
      'very well-prepared.',
  },
  {
    id: 'dan-gnolls',
    categories: ['danger'],
    content:
      'Gnolls are hyena-headed humanoids who serve the demon lord Yeenoghu. They ' +
      'raid in packs, are more organized than goblins, and more savage than ' +
      'hobgoblins. A gnoll warband does not take prisoners for ransom — they take ' +
      'them for the next meal. Encountering gnoll signs means leaving the area quickly.',
  },
  {
    id: 'dan-dragons',
    categories: ['danger'],
    content:
      'Dragons are real, rare, and terrifying. A confirmed dragon sighting near a ' +
      'settlement triggers one of three responses: evacuation, tribute negotiations, ' +
      'or the hiring of very expensive adventurers. Small folk do not fight dragons. ' +
      'The chromatic varieties (red, black, blue, green, white) are destructive and ' +
      'malevolent. The metallic varieties (gold, silver, bronze, copper, brass) are ' +
      'less immediately hostile but still dangerous.',
  },
  {
    id: 'dan-wilderness',
    categories: ['danger', 'geography'],
    content:
      'The wilderness between settlements is genuinely dangerous. Wolves, owlbears, ' +
      'displacer beasts, and wyverns are regional hazards. Old ruins are almost ' +
      'certainly occupied by something hostile. Even cleared roads can become ' +
      'dangerous if the patrol schedule lapses. No one travels the wilderness alone ' +
      'without good reason.',
  },

  // ── DAILY LIFE ─────────────────────────────────────────────────────────────

  {
    id: 'dl-housing',
    categories: ['daily-life', 'society'],
    content:
      'Most urban folk live in tenements of two or three rooms housing an entire ' +
      'family. Sleeping in a shared room is normal. Privacy is a luxury. Wealthier ' +
      'citizens own townhouses; the truly wealthy maintain estates within and outside ' +
      'the city. In small towns, most homes are single-storey with a combined living ' +
      'and cooking space.',
  },
  {
    id: 'dl-taverns',
    categories: ['daily-life'],
    content:
      'The tavern is the community center of Faerûnian towns. News travels by rumor ' +
      'and conversation over ale. Job postings, bounty notices, and merchant ' +
      'advertisements are nailed to the common room wall or announced by the barkeep. ' +
      'Storytellers, bards, and traveling merchants bring news from beyond the ' +
      'village. A night at the tavern is cheap, sociable, and often informative.',
  },
  {
    id: 'dl-inns',
    categories: ['daily-life'],
    content:
      'Inns charge by the bed, not the room. A common room bed costs a few copper ' +
      'pieces per night; a private room is silver. Sharing a bed with a stranger is ' +
      'standard for common travelers. Innkeepers take note of their guests and are ' +
      'sometimes the best source of local intelligence — they see everyone passing through.',
  },
  {
    id: 'dl-literacy',
    categories: ['daily-life', 'society'],
    content:
      'Most Faerûnian common folk cannot read. Literacy is common among merchants, ' +
      'clergy, nobility, and anyone who has had formal schooling. In cities, street ' +
      'signs use pictures alongside words. Literate people are valued — sometimes ' +
      'hired specifically to read or write contracts and correspondence on behalf of ' +
      'others.',
  },
  {
    id: 'dl-markets',
    categories: ['daily-life', 'economy'],
    content:
      'Markets open at dawn and close at dusk. Buying or selling after dark in a ' +
      'market district is suspicious; night commerce typically means black-market or ' +
      'fence activity. Permanent shops occupy the ground floors of buildings on ' +
      'main streets; traveling vendors set up stalls in open squares or just outside ' +
      'city gates.',
  },
  {
    id: 'dl-messages',
    categories: ['daily-life'],
    content:
      'There is no official postal service. Messages are carried by hired messengers, ' +
      'by travelers heading in the right direction, or through merchant caravan ' +
      'networks. Reliable message delivery across a hundred miles can take a week or ' +
      'more. Important letters are sealed with wax; a broken seal means the message ' +
      'was read by someone unauthorized.',
  },
  {
    id: 'dl-water',
    categories: ['daily-life'],
    content:
      'Clean water is not guaranteed. Cities draw from wells and river intakes; ' +
      'both are vulnerable to upstream contamination. Periodic illness from bad ' +
      'water is accepted as a fact of life. Wealthier folk boil water or drink ' +
      'watered-down wine. Adventurers learn quickly to use Create or Purify Food ' +
      'and Water if anyone in the party can cast it.',
  },
  {
    id: 'dl-festivals',
    categories: ['daily-life', 'calendar', 'religion'],
    content:
      'Festivals tied to religious and agricultural calendars break the monotony of ' +
      'hard work. Most settlements celebrate four to six major days per year with ' +
      'feasting, games, and temple ceremonies. These events also serve as informal ' +
      'economic fairs — merchants travel specifically to attend larger festivals.',
  },

  // ── COSMOLOGY ──────────────────────────────────────────────────────────────

  {
    id: 'cos-planes-overview',
    categories: ['cosmology'],
    content:
      'The universe has multiple planes of existence. The Material Plane (where ' +
      'mortals live) is surrounded by the Astral Sea. Beyond that lie the Outer ' +
      'Planes — where the gods dwell in their divine domains — and the Inner Planes ' +
      '— roiling elemental realms of fire, water, earth, and air. The Feywild and ' +
      'Shadowfell are mirror-reflections of the Material Plane: one vibrant and ' +
      'fey-touched, one dark and death-adjacent.',
  },
  {
    id: 'cos-afterlife',
    categories: ['cosmology', 'religion'],
    content:
      'After death, a mortal\'s soul travels to the Fugue Plane — a gray limbo — ' +
      'and waits for judgment by Kelemvor. Souls of the faithful are claimed by ' +
      'their deity\'s servants and taken to that god\'s realm. Souls without clear ' +
      'faith remain in the Fugue Plane as petitioners until claimed or assigned. ' +
      'Undead are souls refusing or prevented from completing this journey.',
  },
  {
    id: 'cos-shadowfell',
    categories: ['cosmology', 'danger'],
    content:
      'The Shadowfell is a colorless, decaying reflection of the Material Plane. ' +
      'It is the source of necromantic energy and the home of shadow creatures. ' +
      'The Negative Energy Plane bleeds into it. Places of great death or grief ' +
      'sometimes develop thin spots where Shadowfell energy bleeds through, causing ' +
      'vegetation to wither and animals to flee.',
  },
  {
    id: 'cos-feywild',
    categories: ['cosmology'],
    content:
      'The Feywild is a vibrant, exaggerated reflection of the world, inhabited by ' +
      'fey creatures: pixies, dryads, satyrs, and the powerful Archfey who rule them. ' +
      'Time moves strangely there. Mortals who wander in — usually through thinning ' +
      'at forest boundaries — may emerge having lost or gained months. The fey are ' +
      'not evil, but they are alien, capricious, and dangerous in their own way.',
  },
  {
    id: 'cos-divine-manifestation',
    categories: ['cosmology', 'religion'],
    content:
      'Gods rarely manifest physically. They communicate through dreams, omens, ' +
      'clerical visions, and the voices of their prophets. A god physically ' +
      'stepping onto the Material Plane is an apocalyptic event — the surrounding ' +
      'area would be transformed, and bystanders killed or changed forever. Tread ' +
      'carefully around anyone who claims a god spoke to them directly; they are ' +
      'either lying, mad, or both at once extremely blessed and extremely dangerous.',
  },

  // ── CALENDAR ───────────────────────────────────────────────────────────────

  {
    id: 'cal-calendar',
    categories: ['calendar'],
    content:
      'The Calendar of Harptos divides the year into twelve months of thirty days ' +
      'each, with five standalone festival days inserted between certain months. The ' +
      'months in order: Hammer, Alturiak, Ches, Tarsakh, Mirtul, Kythorn, Flamerule, ' +
      'Eleasis, Eleint, Marpenoth, Uktar, Nightal.',
  },
  {
    id: 'cal-festival-days',
    categories: ['calendar', 'religion', 'daily-life'],
    content:
      'The five festival days of the Calendar of Harptos: Midwinter (between Hammer ' +
      'and Alturiak), Greengrass (between Tarsakh and Mirtul, marking the start of ' +
      'spring), Midsummer (between Flamerule and Eleasis), Highharvestide (between ' +
      'Eleint and Marpenoth, the harvest feast), and the Feast of the Moon (between ' +
      'Uktar and Nightal, when the dead are honored).',
  },
  {
    id: 'cal-current-year',
    categories: ['calendar'],
    content:
      'The current year is 1492 DR (Dale Reckoning). The "DR" calendar counts from ' +
      'the founding of Dalereckoning by the dalesfolk and the Elven Court. Most ' +
      'common folk use it without knowing its origin; they simply know what year it ' +
      'is the same way they know the month.',
  },
  {
    id: 'cal-sundering',
    categories: ['calendar', 'magic', 'cosmology'],
    content:
      'The Second Sundering (roughly 1482-1487 DR) was a recent cosmic upheaval that ' +
      'reshaped the planes, restored several dead gods (including Mystra), and ended ' +
      'the chaotic Spellplague. Folk who lived through it remember disrupted weather, ' +
      'failed magic, and strange planar bleeds. The world has stabilized since, but ' +
      'the memory is fresh — most adults lived through it.',
  },
  {
    id: 'cal-seasons',
    categories: ['calendar', 'daily-life'],
    content:
      'Winter (Hammer through Alturiak) brings the worst weather; mountain passes ' +
      'close and northern roads become treacherous. Spring (Ches through Mirtul) is ' +
      'planting season. Summer (Kythorn through Eleasis) is the peak travel and ' +
      'trade season. Autumn (Eleint through Uktar) is harvest and preparation time. ' +
      'Nightal is the dark month before the year turns.',
  },

  // ── SOCIETY ────────────────────────────────────────────────────────────────

  {
    id: 'soc-class',
    categories: ['society'],
    content:
      'The class divide between wealthy merchants or nobles and common laborers is ' +
      'vast and largely accepted as natural. Social mobility exists — a skilled ' +
      'craftsman can become wealthy, a wealthy merchant can buy a title in some ' +
      'cities — but it requires exceptional effort or exceptional luck. Most folk ' +
      'are born into their station and die in it.',
  },
  {
    id: 'soc-nobility',
    categories: ['society', 'faction'],
    content:
      'Nobility is hereditary in most city-states and kingdoms. Landed titles ' +
      'pass through bloodlines; marrying into a noble family is one of the few ' +
      'reliable paths to elevation. In Waterdeep, the masked Lords system means ' +
      'that noble names and political power do not always align — a mystery that ' +
      'fuels endless speculation.',
  },
  {
    id: 'soc-adventurers',
    categories: ['society'],
    content:
      'Adventurers occupy an unusual social position: respected for their capability ' +
      'and feared for their power, distrusted for their lawlessness, and envied for ' +
      'their potential wealth. City folk treat them as necessary but slightly ' +
      'alarming. Rural folk are more openly impressed. Most inns have a policy on ' +
      'whether they allow weapons at the table.',
  },
  {
    id: 'soc-racial-tensions',
    categories: ['society'],
    content:
      'Racial attitudes vary by region. Elves and dwarves are generally respected ' +
      'in most civilized areas — ancient and trustworthy, if aloof. Half-orcs face ' +
      'mistrust in many settlements; their orcish features read as threatening to ' +
      'folk who have fought off orc raids. Tieflings (carrying the visible mark of ' +
      'fiendish heritage) face suspicion in religious communities. Gnomes are ' +
      'regarded as clever and eccentric. Halflings are seen as cheerful and harmless — ' +
      'an underestimation they sometimes exploit.',
  },
  {
    id: 'soc-slavery',
    categories: ['society', 'faction'],
    content:
      'Slavery is practiced in some southern nations — Amn and Calimshan maintain ' +
      'it openly. It is illegal in Waterdeep, Neverwinter, and most Lords\' Alliance ' +
      'cities. The Zhentarim have historically trafficked in people; they are not ' +
      'the only ones. Escaped slaves in northern cities occupy a legal grey area; ' +
      'enforcement of their freedom depends entirely on which magistrate they face.',
  },
  {
    id: 'soc-law',
    categories: ['society', 'faction'],
    content:
      'Law is local. Waterdeep\'s Code Legal is one of the most comprehensive in ' +
      'Faerûn. Baldur\'s Gate\'s law is heavily influenced by its wealthy merchant ' +
      'families. Smaller towns follow whatever the local lord or council decides. ' +
      'In practice, justice in most places correlates with wealth and influence more ' +
      'than with any written code.',
  },
  {
    id: 'soc-women',
    categories: ['society'],
    content:
      'Women\'s social standing varies sharply by region. In Waterdeep, female ' +
      'merchants, guild-masters, and lords are unremarkable. In more conservative ' +
      'inland regions, social advancement for women requires navigating male-dominated ' +
      'structures. Temples are often more egalitarian than secular society — Tymora, ' +
      'Selûne, Sune, and Lliira are all goddess-led faiths with large female clergy.',
  },
  {
    id: 'soc-identity-documents',
    categories: ['society', 'faction'],
    content:
      'In larger cities, identity documents matter. Waterdeep requires citizens ' +
      'to carry papers confirming guild membership, residency, or noble affiliation ' +
      'if they wish to access certain districts or services. Adventurers without ' +
      'papers are not illegal, but they are treated with more scrutiny at gates and ' +
      'by the watch. A letter of introduction from a recognized faction changes the ' +
      'conversation considerably.',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns all entries that carry at least one of the requested categories.
 * Pass an empty array to receive all entries.
 */
export function filterByCategory(categories: NpcContextCategory[]): NpcContextEntry[] {
  if (categories.length === 0) return npcContext;
  return npcContext.filter((entry) =>
    categories.some((cat) => entry.categories.includes(cat)),
  );
}

/**
 * Returns all unique IDs present in the dataset.
 * Useful for validating that a stored ID still exists after edits.
 */
export function getAllContextIds(): string[] {
  return npcContext.map((entry) => entry.id);
}
