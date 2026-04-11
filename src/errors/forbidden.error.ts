import { CustomError } from "./custom.error";

export class ForbiddenError extends CustomError {
    statusCode: number = 403;
    constructor(message: string = "Access denied"){
        super(message);
        Object.setPrototypeOf(this,ForbiddenError.prototype);
    }
    serialize(): { message: string; field?: string; }[] {
        return [{
            message:this.message
        }]
    }
}