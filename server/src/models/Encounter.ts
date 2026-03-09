import mongoose, { Document, Schema } from 'mongoose';

export interface IEnemy {
  name: string;
  count: number;
  cr: string;
  type: string;
  notes?: string;
}

export interface IRewards {
  xp: number;
  gold: number;
  items: string[];
}

export interface IEncounter extends Document {
  name: string;
  description: string;
  difficulty: 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly' | 'boss';
  type: 'combat' | 'social' | 'mixed';
  minPartySize: number;
  maxPartySize: number;
  minLevel: number;
  maxLevel: number;
  enemies: IEnemy[];
  environment: string;
  objectives: string[];
  rewards: IRewards;
  tags: string[];
  isLibraryEncounter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EnemySchema = new Schema<IEnemy>({
  name: { type: String, required: true },
  count: { type: Number, required: true, default: 1 },
  cr: { type: String, required: true },
  type: { type: String, required: true },
  notes: { type: String },
}, { _id: false });

const RewardsSchema = new Schema<IRewards>({
  xp: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  items: [{ type: String }],
}, { _id: false });

const EncounterSchema = new Schema<IEncounter>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['trivial', 'easy', 'medium', 'hard', 'deadly', 'boss'],
      required: true,
    },
    type: {
      type: String,
      enum: ['combat', 'social', 'mixed'],
      required: true,
    },
    minPartySize: { type: Number, required: true, default: 1 },
    maxPartySize: { type: Number, required: true, default: 6 },
    minLevel: { type: Number, required: true, default: 1 },
    maxLevel: { type: Number, required: true, default: 20 },
    enemies: [EnemySchema],
    environment: { type: String, required: true },
    objectives: [{ type: String }],
    rewards: { type: RewardsSchema, default: () => ({ xp: 0, gold: 0, items: [] }) },
    tags: [{ type: String }],
    isLibraryEncounter: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Encounter = mongoose.model<IEncounter>('Encounter', EncounterSchema);
export default Encounter;
