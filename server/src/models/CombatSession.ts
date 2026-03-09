import mongoose, { Document, Schema } from 'mongoose';

export interface IAction {
  type: string;
  description: string;
  roll?: number;
  target?: string;
  damage?: number;
  result: string;
}

export interface ITurn {
  participantId: string;
  participantName: string;
  actions: IAction[];
}

export interface IRound {
  roundNumber: number;
  turns: ITurn[];
}

export interface ILogEntry {
  timestamp: Date;
  message: string;
  type: 'action' | 'damage' | 'heal' | 'death' | 'condition' | 'info';
}

export interface IResult {
  outcome: 'victory' | 'defeat' | 'retreat';
  survivingCharacters: string[];
  killedCharacters: string[];
  xpAwarded: number;
  duration: number;
}

export interface IParticipant {
  id: string;
  name: string;
  type: 'character' | 'enemy';
  initiative: number;
  hp: number;
  maxHp: number;
  ac: number;
  isAlive: boolean;
}

export interface ICombatSession extends Document {
  encounterId: mongoose.Types.ObjectId;
  participants: IParticipant[];
  status: 'pending' | 'active' | 'completed' | 'abandoned';
  rounds: IRound[];
  log: ILogEntry[];
  result?: IResult;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

const ActionSchema = new Schema<IAction>({
  type: { type: String, required: true },
  description: { type: String, required: true },
  roll: { type: Number },
  target: { type: String },
  damage: { type: Number },
  result: { type: String, required: true },
}, { _id: false });

const TurnSchema = new Schema<ITurn>({
  participantId: { type: String, required: true },
  participantName: { type: String, required: true },
  actions: [ActionSchema],
}, { _id: false });

const RoundSchema = new Schema<IRound>({
  roundNumber: { type: Number, required: true },
  turns: [TurnSchema],
}, { _id: false });

const LogEntrySchema = new Schema<ILogEntry>({
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['action', 'damage', 'heal', 'death', 'condition', 'info'],
    required: true,
  },
}, { _id: false });

const ResultSchema = new Schema<IResult>({
  outcome: { type: String, enum: ['victory', 'defeat', 'retreat'], required: true },
  survivingCharacters: [{ type: String }],
  killedCharacters: [{ type: String }],
  xpAwarded: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
}, { _id: false });

const ParticipantSchema = new Schema<IParticipant>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['character', 'enemy'], required: true },
  initiative: { type: Number, default: 0 },
  hp: { type: Number, required: true },
  maxHp: { type: Number, required: true },
  ac: { type: Number, required: true },
  isAlive: { type: Boolean, default: true },
}, { _id: false });

const CombatSessionSchema = new Schema<ICombatSession>(
  {
    encounterId: { type: Schema.Types.ObjectId, ref: 'Encounter', required: true },
    participants: [ParticipantSchema],
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'abandoned'],
      default: 'pending',
    },
    rounds: [RoundSchema],
    log: [LogEntrySchema],
    result: ResultSchema,
    startedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export const CombatSession = mongoose.model<ICombatSession>('CombatSession', CombatSessionSchema);
export default CombatSession;
