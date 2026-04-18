import { NextFunction, Request, Response } from "express";
interface jwtPayload {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload;
        }
    }
}
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map