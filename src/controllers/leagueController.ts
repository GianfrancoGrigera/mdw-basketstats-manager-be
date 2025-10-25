import { Request, Response } from "express";
import League from "../models/League";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler";

const getLeagues = async (req: Request, res: Response) => {
    const leagues = await League.find().sort({ startDate: -1 });
    return sendSuccessResponse(res, "Leagues retrieved successfully", { leagues }, null);
};

const getLeagueById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const league = await League.findById(id);
    if (!league) {
        return sendErrorResponse(res, "League not found", 404);
    }

    sendSuccessResponse(res, "League retrieved successfully", { league }, null);
};
  
const createLeague = async (req: Request, res: Response) => {
    const { name, description, type, startDate, endDate } = req.body;
    try {
        const league = new League({
            name,
            description,
            type,
            startDate,
            endDate
        });
        
        await league.save();
        
        sendSuccessResponse(res, "League registered successfully", { league });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};
  
const updateLeague = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, type, startDate, endDate } = req.body;
    
    try {
        const league = await League.findByIdAndUpdate(id, { name, description, type, startDate, endDate }, { new: true });
        if (!league) {
            return sendErrorResponse(res, "League not found", 404)
        }

        sendSuccessResponse(res, "League updated succesfully", { league }, null);
    } catch (error) {
        sendErrorResponse(res, "Server Error", 500, error);
    }
};
  
const deleteLeague = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
        const league = await League.findById(id);
        if (!league) {
            return sendErrorResponse(res, "League not found", 404)
        }

        league.isActive = false;
        await league.save();

        sendSuccessResponse(res, "League deactivate successfully", { league }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

export default { getLeagues, getLeagueById, createLeague, updateLeague, deleteLeague };