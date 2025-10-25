import { Request, Response } from "express";
import PlayerTeam from "../models/PlayerTeam";
import Player from "../models/Player";
import Team from "../models/Team";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler";

const getPlayersByTeam = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;
        const { season } = req.query;

        console.log("SEASON: ", season);

        const filter: any = { team: teamId, isActive: true };
        if (season) {
            filter.season = season;
        }

        const players = await PlayerTeam.find(filter).populate("player").populate("team");

        sendSuccessResponse(res, "Players in team retrieved successfully", { players });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const createPlayerTeam = async (req: Request, res: Response) => {
    try {
        const { playerId, teamId, season, jerseyNumber, joinedAt } = req.body;

        const playerExists = await Player.findById(playerId);
        if (!playerExists || !playerExists.isActive) {
            return sendErrorResponse(res, "Player not found or inactive", 404);
        }

        const teamExists = await Team.findById(teamId);
        if (!teamExists || !teamExists.isActive) {
            return sendErrorResponse(res, "Team not found or inactive", 404);
        }

        const alreadyExists = await PlayerTeam.findOne({ player: playerId, team: teamId, season });
        if (alreadyExists) {
            return sendErrorResponse(res, "Player is already registered in this team for the season", 400);
        }

        const playerTeam = new PlayerTeam({
            player: playerId,
            team: teamId,
            season,
            jerseyNumber,
            joinedAt,
        });

        await playerTeam.save();

        sendSuccessResponse(res, "Player added to team successfully", { playerTeam });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const deletePlayerTeam = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const playerTeam = await PlayerTeam.findById(id);
        if (!playerTeam) {
            return sendErrorResponse(res, "PlayerTeam not found", 404);
        }

        playerTeam.isActive = false;
        playerTeam.leftAt = new Date();
        await playerTeam.save();

        sendSuccessResponse(res, "Player removed from team successfully", { playerTeam });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

export default { getPlayersByTeam, createPlayerTeam, deletePlayerTeam };
