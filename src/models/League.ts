import mongoose, { Schema } from "mongoose";

export interface ILeague extends Document {
    name: string;
    description?: string;
    type: "Liga" | "Copa";
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}

const leagueSchema: Schema = new Schema<ILeague>({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["Liga", "Copa"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ILeague>("Leagues", leagueSchema);