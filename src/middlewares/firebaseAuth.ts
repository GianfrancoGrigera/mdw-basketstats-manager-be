import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/responseHandler";
import admin from "../config/firebase";

export const authenticateFirebase = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendErrorResponse(res, "No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    console.log("Verifying token:", token);

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).firebaseUid = decodedToken.uid;
        next();
    } catch (error) {
        console.error("Firebase verifyIdToken error:", error);
        return sendErrorResponse(res, "Invalid or expired token", 401, error);
    }
};