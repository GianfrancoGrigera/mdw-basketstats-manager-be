import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IPlayerTeam extends Document {
    player: Types.ObjectId;
    team: Types.ObjectId;
    season: string;
    jerseyNumber?: number;
    joinedAt?: Date;
    leftAt?: Date;
    isActive: boolean;
}

const playerTeamSchema = new Schema<IPlayerTeam>({
    player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    season: { type: String, required: true },
    jerseyNumber: { type: Number },
    joinedAt: { type: Date },
    leftAt: { type: Date },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IPlayerTeam>("PlayerTeam", playerTeamSchema);