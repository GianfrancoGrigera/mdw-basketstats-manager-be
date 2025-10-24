import { Request, Response } from "express";
import User from "../models/User";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, email, role, firebaseUid } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = new User({
            name,
            lastName,
            email,
            role: role || "user",
        });

        await user.save();
        res.status(201).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error
        })
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, lastName, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        if (name) {
            user.name = name;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        await user.save();
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error 
        });
    }
};

const softDeleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.isActive) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        user.isActive = false;
        await user.save();

        res.status(200).json({
            message: "User soft-deleted",
            user
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error 
        });
    }
};

const hardDeleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        res.status(200).json({ 
            message: "User permanently deleted" 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error 
        });
    }
};

export default { registerUser, getUsers, getUserById, updateUser, softDeleteUser, hardDeleteUser };