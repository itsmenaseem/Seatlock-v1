import { ValidationError } from "express-validator";
import { CustomError } from "./custom.error";

export class RequestValidationError extends CustomError {
    statusCode: number = 400;
    constructor(private reasons: ValidationError[]){
        super("Invalid input");
        Object.setPrototypeOf(this,RequestValidationError.prototype)
    }
    serialize(): { message: string; field?: string; }[] {
        return this.reasons.map(err=>{
            if(err.type === "field"){
                return {
                    message:err.msg,
                    field:err.path
                }
            }
            return {
                message:err.msg
            }
        })
    }
}