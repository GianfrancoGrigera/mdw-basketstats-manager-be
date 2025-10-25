import { Request, Response } from "express";
import Team from "../models/Team";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler";
import League from "../models/League";

const getTeams = async (req: Request, res: Response) => {
    try {
        const { leagueId } = req.query;
        const filter = leagueId ? { league: leagueId } : { };
        const teams = await Team.find(filter).populate("league", "name");
        sendSuccessResponse(res, "Teams retrieved successfully", { teams }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await Team.findById(id).populate("league", "name");
    if (!team) {
        return sendErrorResponse(res, "Team not found", 404);
    }

    sendSuccessResponse(res, "Team retrieved successfully", { team }, null);
};

const createTeam = async (req: Request, res: Response) => {
    try {
        const { name, city, coach, league } = req.body;

        const leagueExists = await League.findById(league);
        if (!leagueExists) {
            return sendErrorResponse(res, "League not found", 404);
        }

        const team = new Team({
            name,
            city,
            coach,
            league
        });
        await team.save();

        sendSuccessResponse(res, "Team registered successfully", { team });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const updateTeam = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, city, coach, league } = req.body;

        const team = await Team.findByIdAndUpdate(id, { name, city, coach, league }, { new: true});
        if (!team) {
            return sendErrorResponse(res, "Team not found", 404)
        }

        sendSuccessResponse(res, "Team updated succesfully", { team }, null);
    } catch (error) {
        sendErrorResponse(res, "Server Error", 500, error);
    }
};

const deleteTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
        const team = await Team.findById(id);
        if (!team) {
            return sendErrorResponse(res, "Team not found", 404)
        }

        team.isActive = false;
        await team.save();

        sendSuccessResponse(res, "Team deactivate successfully", { team }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

export default { getTeams, getTeamById, createTeam, updateTeam, deleteTeam };