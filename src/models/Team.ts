import mongoose, { Schema, Types } from "mongoose";

export interface ITeam extends Document {
    name: string;
    city: string;
    coach?: string;
    league: Types.ObjectId;
    isActive: boolean;
}

const teamSchema: Schema = new Schema<ITeam>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    coach: { type: String },
    league: { type: Schema.Types.ObjectId, ref: "Leagues", required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ITeam>("Team", teamSchema);