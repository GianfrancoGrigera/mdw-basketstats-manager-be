import { Request, Response } from "express";
import League from "../models/League";
import Team from "../models/Team";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler";
import TeamLeague from "../models/TeamLeague";

const registerTeamInLeague = async (req: Request, res: Response) => {
    try {
        const { teamId, leagueId } = req.body;
        
        const team = await Team.findById(teamId);
        const league = await League.findById(leagueId);

        if (!team || !league) {
            return sendErrorResponse(res, "Team or League not found", 404);
        }

        // Buscar si hay participaciones del equipo en la misma temporada
        const existingTeam = await TeamLeague.find({ team: teamId, season: league.season}).populate("league");

        // Validaciones
        for (const participation of existingTeam) {
            const existingLeague = participation.league as any;

            if (existingLeague.type === "Liga" && league.type === "Liga") {
                return sendErrorResponse(res, "Team already in a national league this season", 400);
            }

            if (existingLeague.type === "Copa" && league.type === "Copa") {
                return sendErrorResponse(res, "Team already in a domestic cup this season", 400);
            }
        }

        const teamLeague = new TeamLeague({
            team: teamId,
            league: leagueId,
            season: league.season
        });

        await teamLeague.save();

        sendSuccessResponse(res, "Team successfully registered in league", { teamLeague });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const getTeamsByLeague = async (req: Request, res: Response) => {
    try {
        const { leagueId } = req.params;

        const teamsLeague = await TeamLeague.find({ league: leagueId }).populate("team").populate("league");

        if (!teamsLeague || teamsLeague.length === 0) {
            return sendSuccessResponse(res, "No teams found for this league", {
                league: null,
                teams: [],
            });
        }

        const league = teamsLeague[0].league;

        const teamsToDisplay: any[] = [];

        teamsLeague.forEach((tl) => {
            teamsToDisplay.push(tl.team);
        });

        sendSuccessResponse(res, "Teams in league retrieved successfully", { league: league, teams: teamsToDisplay });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const removeTeamFromLeague = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const participation = await TeamLeague.findByIdAndDelete(id);
        if (!participation) {
            return sendErrorResponse(res, "Participation not found", 404);
        }

        sendSuccessResponse(res, "Team removed from league successfully", { participation });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

export default { registerTeamInLeague, getTeamsByLeague, removeTeamFromLeague };
