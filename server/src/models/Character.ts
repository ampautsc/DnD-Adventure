import mongoose, { Document, Schema } from 'mongoose';

export interface IAbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface IAbilityScoreImprovement {
  level: number;
  stat: string;
  amount: number;
}

export interface IFeat {
  name: string;
  description: string;
  source: string;
}

export interface ISpell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
}

export interface IEquipment {
  name: string;
  type: string;
  quantity: number;
  weight: number;
  value: number;
  properties: string[];
}

export interface IInventoryItem {
  name: string;
  quantity: number;
  description: string;
}

export interface IHitPoints {
  max: number;
  current: number;
}

export interface IDeathSaves {
  successes: number;
  failures: number;
}

export interface ICombatStats {
  totalEncounters: number;
  wins: number;
  losses: number;
  kills: number;
  damageDone: number;
  damageReceived: number;
  healingDone: number;
  knockedOut: number;
}

export interface ICharacter extends Document {
  name: string;
  level: number;
  species: string;
  subspecies?: string;
  characterClass: string;
  subclass?: string;
  background: string;
  abilityScores: IAbilityScores;
  abilityScoreImprovements: IAbilityScoreImprovement[];
  feats: IFeat[];
  spells: ISpell[];
  equipment: IEquipment[];
  inventory: IInventoryItem[];
  proficiencies: string[];
  savingThrows: string[];
  skills: string[];
  hitPoints: IHitPoints;
  armorClass: number;
  speed: number;
  passivePerception: number;
  inspiration: boolean;
  exhaustionLevel: number;
  deathSaves: IDeathSaves;
  combatStats: ICombatStats;
  createdAt: Date;
  updatedAt: Date;
}

const AbilityScoresSchema = new Schema<IAbilityScores>({
  strength: { type: Number, required: true, default: 10 },
  dexterity: { type: Number, required: true, default: 10 },
  constitution: { type: Number, required: true, default: 10 },
  intelligence: { type: Number, required: true, default: 10 },
  wisdom: { type: Number, required: true, default: 10 },
  charisma: { type: Number, required: true, default: 10 },
}, { _id: false });

const AbilityScoreImprovementSchema = new Schema<IAbilityScoreImprovement>({
  level: { type: Number, required: true },
  stat: { type: String, required: true },
  amount: { type: Number, required: true, default: 1 },
}, { _id: false });

const FeatSchema = new Schema<IFeat>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  source: { type: String, required: true },
}, { _id: false });

const SpellSchema = new Schema<ISpell>({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: { type: String, required: true },
  castingTime: { type: String, required: true },
  range: { type: String, required: true },
  components: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const EquipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  weight: { type: Number, required: true, default: 0 },
  value: { type: Number, required: true, default: 0 },
  properties: [{ type: String }],
}, { _id: false });

const InventoryItemSchema = new Schema<IInventoryItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  description: { type: String, default: '' },
}, { _id: false });

const DeathSavesSchema = new Schema<IDeathSaves>({
  successes: { type: Number, default: 0 },
  failures: { type: Number, default: 0 },
}, { _id: false });

const CombatStatsSchema = new Schema<ICombatStats>({
  totalEncounters: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  kills: { type: Number, default: 0 },
  damageDone: { type: Number, default: 0 },
  damageReceived: { type: Number, default: 0 },
  healingDone: { type: Number, default: 0 },
  knockedOut: { type: Number, default: 0 },
}, { _id: false });

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 1, max: 20, default: 1 },
    species: { type: String, required: true },
    subspecies: { type: String },
    characterClass: { type: String, required: true },
    subclass: { type: String },
    background: { type: String, required: true },
    abilityScores: { type: AbilityScoresSchema, required: true },
    abilityScoreImprovements: [AbilityScoreImprovementSchema],
    feats: [FeatSchema],
    spells: [SpellSchema],
    equipment: [EquipmentSchema],
    inventory: [InventoryItemSchema],
    proficiencies: [{ type: String }],
    savingThrows: [{ type: String }],
    skills: [{ type: String }],
    hitPoints: {
      max: { type: Number, required: true, default: 10 },
      current: { type: Number, required: true, default: 10 },
    },
    armorClass: { type: Number, required: true, default: 10 },
    speed: { type: Number, required: true, default: 30 },
    passivePerception: { type: Number, required: true, default: 10 },
    inspiration: { type: Boolean, default: false },
    exhaustionLevel: { type: Number, default: 0, min: 0, max: 6 },
    deathSaves: { type: DeathSavesSchema, default: () => ({ successes: 0, failures: 0 }) },
    combatStats: { type: CombatStatsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export const Character = mongoose.model<ICharacter>('Character', CharacterSchema);
export default Character;
