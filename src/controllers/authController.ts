import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler";
import axios from "axios";

const loginWithEmailPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendErrorResponse(res, "Email and password are required", 400);
        }

        const apiKey = process.env.FIREBASE_API_KEY;
        if (!apiKey) {
            return sendErrorResponse(res, "Firebase API Key not configured", 500);
        }

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        const response = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });



        return sendSuccessResponse(res, "User logged in successfully", {
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            localId: response.data.localId
        });
    } catch (error: any) {
        const message = error.response?.data?.error?.message || "Invalid email or password";
        return sendErrorResponse(res, message, 401, error.response?.data || error.message);
    }
};

export default { loginWithEmailPassword };