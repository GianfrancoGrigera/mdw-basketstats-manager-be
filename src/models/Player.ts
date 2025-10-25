import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
    firstName: string;
    lastName: string;
    nationality: string;
    birthDate: Date;
    position: "Base" | "Escolta" | "Alero" | "Ala-Pivot" | "Pivot";
    height?: number;
    weight?: number;
    isActive: boolean;
}

const playerSchema = new Schema<IPlayer>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationality: { type: String, required: true },
    birthDate: { type: Date, required: true },
    position: { type: String, enum: ["Base", "Escolta", "Alero", "Ala-Pivot", "Pivot"], required: true },
    height: { type: Number },
    weight: { type: Number },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IPlayer>("Player", playerSchema);