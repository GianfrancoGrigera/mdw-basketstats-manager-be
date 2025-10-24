import { Response } from "express";

export const sendSuccessResponse = (res: Response, message: string, data?: any, meta?: any) => {
    res.json({
        status: "success",
        error: false,
        message,
        data: data || null,
        meta: meta || null,
    });
};

export const sendErrorResponse = (res: Response, message: string, statusCode: number = 500, data?: any) => {
    res.status(statusCode).json({
        status: "error",
        error: true,
        message,
        data: data || null,
    });
};

export default { sendSuccessResponse, sendErrorResponse };