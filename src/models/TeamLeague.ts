import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeamLeague extends Document {
    team: Types.ObjectId;
    league: Types.ObjectId;
    season: string;
    registeredAt: Date;
}

const teamLeagueSchema: Schema = new Schema<ITeamLeague>({
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    league: { type: Schema.Types.ObjectId, ref: "Leagues", required: true },
    season: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
  }, { timestamps: true }
);

teamLeagueSchema.index({ team: 1, league: 1, season: 1 }, { unique: true });

export default mongoose.model<ITeamLeague>("TeamLeague", teamLeagueSchema);