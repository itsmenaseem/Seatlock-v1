import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom.error";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if(err instanceof CustomError){
        return res.status(err.statusCode).send({errors:err.serialize()})
    }
    const message =
    err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).send({
        errors:[{
            message
        }]
    })
}