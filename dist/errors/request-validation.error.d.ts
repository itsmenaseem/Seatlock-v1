import { ValidationError } from "express-validator";
import { CustomError } from "./custom.error";
export declare class RequestValidationError extends CustomError {
    private reasons;
    statusCode: number;
    constructor(reasons: ValidationError[]);
    serialize(): {
        message: string;
        field?: string;
    }[];
}
//# sourceMappingURL=request-validation.error.d.ts.map