import { Request, Response } from "express";
import User from "../models/User";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHandler";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, email, role, firebaseUid } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return sendErrorResponse(res, "User already exists", 400);
        }

        const user = new User({
            name,
            lastName,
            email,
            role: role || "user",
        });

        await user.save();
        sendSuccessResponse(res, "User registered successfully", { user }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        sendSuccessResponse(res, "Users retrieved successfully", { users }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        sendSuccessResponse(res, "User retrieved successfully", { user }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        if (name) {
            user.name = name;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        await user.save();
        sendSuccessResponse(res, "User updated successfully", { user }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const softDeleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.isActive) {
            return sendErrorResponse(res, "User not found", 404);
        }

        user.isActive = false;
        await user.save();

        sendSuccessResponse(res, "User soft-deleted successfully", { user }, null);
    } catch (error) {
        sendErrorResponse(res, "Server error", 500, error);
    }
};

const hardDeleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        sendSuccessResponse(res, "User permanently deleted successfully", null, null);
    } catch (error) {
        sendErrorResponse(res, "Server Error", 500, error);
    }
};

export default { registerUser, getUsers, getUserById, updateUser, softDeleteUser, hardDeleteUser };