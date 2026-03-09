import mongoose, { Document, Schema } from 'mongoose';

/**
 * ISavedProfile — a user-defined campaign profile persisted in MongoDB.
 *
 * Mirrors the structure of `CampaignProfile` from BardBenchmarkService, but stored
 * in the database so it persists across server restarts and can be referenced by ID.
 * Built-in code profiles (all-purpose, dungeon-crawl, etc.) are not stored here —
 * only profiles created by the user through the API.
 */
export interface ISavedProfile extends Document {
  name: string;
  description: string;
  weights: {
    combatScenarios: Record<string, number>;
    socialScenarios: Record<string, number>;
    partySupportScenarios: Record<string, number>;
    categoryWeights: {
      combat: number;
      social: number;
      partySupport: number;
    };
  };
  /** Running count of how many times this profile has been used via profileId in /benchmark or /explore. */
  usageCount: number;
  /** Timestamp of the most recent use via profileId, or null if never used. */
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const categoryWeightsSchema = new Schema(
  {
    combat: { type: Number, required: true },
    social: { type: Number, required: true },
    partySupport: { type: Number, required: true },
  },
  { _id: false },
);

const savedProfileSchema = new Schema<ISavedProfile>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    weights: {
      combatScenarios: { type: Schema.Types.Mixed, default: {} },
      socialScenarios: { type: Schema.Types.Mixed, default: {} },
      partySupportScenarios: { type: Schema.Types.Mixed, default: {} },
      categoryWeights: { type: categoryWeightsSchema, required: true },
    },
    usageCount: { type: Number, default: 0 },
    lastUsedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const SavedProfile = mongoose.model<ISavedProfile>('SavedProfile', savedProfileSchema);
