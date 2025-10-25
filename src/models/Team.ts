import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITeam extends Document {
    name: string;
    city: string;
    country: string;
    coach?: string;
    isActive: boolean;
}

const teamSchema: Schema = new Schema<ITeam>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    coach: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ITeam>("Team", teamSchema);