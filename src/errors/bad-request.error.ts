import { CustomError } from "./custom.error";

export class BadRequestError extends CustomError {
    statusCode: number = 400;
    constructor(message: string = "Invalid request"){
        super(message);
        Object.setPrototypeOf(this,BadRequestError.prototype);
    }
    serialize(): { message: string; field?: string; }[] {
        return [{
            message:this.message
        }]
    }
}