import { CustomError } from "./custom.error";

export class UnauthorizedError extends CustomError {
    statusCode: number = 401;
    constructor(message: string = "Not authenticated"){
        super(message);
        Object.setPrototypeOf(this,UnauthorizedError.prototype);
    }
    serialize(): { message: string; field?: string; }[] {
        return [{
            message:this.message
        }]
    }
}