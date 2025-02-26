import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config";

interface AuthRequest extends Request{
    userId?: string
}
export function middleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? ""; //if auth key is not passed make it a string

    const decoded = jwt.verify(token, JWT_TOKEN);

    if (decoded && typeof decoded === "object" && "userId" in decoded) {
        req.userId = decoded.userId as string;
        next();
    }
    else{
        res.status(401).json({ error: "Invalid token" });
    }
}