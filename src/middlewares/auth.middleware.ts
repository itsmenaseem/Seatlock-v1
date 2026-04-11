import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwt.config";
import { BadRequestError } from "../errors/bad-request.error";
import { UnauthorizedError } from "../errors/unautorized.error";
import { User } from "../modules/users/user.model";

interface jwtPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload
        }
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const payload = jwt.verify(token, jwtConfig.JWT_SECRET!) as jwtPayload;
        req.user = payload;
        const exists = await User.exists({ _id: payload.id });

        if (!exists) throw new UnauthorizedError();
        next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError)throw new BadRequestError(error.message);
        throw error;
    }
} 