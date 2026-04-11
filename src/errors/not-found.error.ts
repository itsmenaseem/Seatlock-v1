import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
    statusCode: number = 404;
    constructor(message: string = "Resource not found"){
        super(message);
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }
    serialize(): { message: string; field?: string; }[] {
        return [{
            message:this.message
        }]
    }
}