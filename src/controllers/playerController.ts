import { Request, Response } from "express";
import Player from "../models/Player";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler";

const getPlayers = async (req: Request, res: Response) => {
    try {
        const players = await Player.find({ isActive: true }).sort({ lastName: 1 });
        sendSuccessResponse(res, "Players retrieved successfully", { players });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const getPlayerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const player = await Player.findById(id);

        if (!player || !player.isActive) {
            return sendErrorResponse(res, "Player not found", 404);
        }

        sendSuccessResponse(res, "Player retrieved successfully", { player });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const createPlayer = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, nationality, birthDate, position, height, weight } = req.body;

        const player = new Player({
            firstName,
            lastName,
            nationality,
            birthDate,
            position,
            height,
            weight,
        });

        await player.save();
        sendSuccessResponse(res, "Player created successfully", { player });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const updatePlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, nationality, birthDate, position, height, weight } = req.body;

        const player = await Player.findByIdAndUpdate(
            id, 
            { firstName, lastName, nationality, birthDate, position, height, weight },
            { new: true }
        );

        if (!player) {
            return sendErrorResponse(res, "Player not found", 404);
        }

        sendSuccessResponse(res, "Player updated successfully", { player });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const deletePlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const player = await Player.findById(id);

        if (!player) {
            return sendErrorResponse(res, "Player not found", 404);
        }

        player.isActive = false;
        await player.save();

        sendSuccessResponse(res, "Player deactivated successfully", { player });
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

export default { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };
