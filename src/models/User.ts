import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    lastName: string;
    email: string;
    role: "admin" | "manager" | "user";
    isActive: boolean;
}

const userSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IUser>("User", userSchema);