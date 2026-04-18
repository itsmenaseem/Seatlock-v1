import { CustomError } from "./custom.error";
export declare class UnauthorizedError extends CustomError {
    statusCode: number;
    constructor(message?: string);
    serialize(): {
        message: string;
        field?: string;
    }[];
}
//# sourceMappingURL=unautorized.error.d.ts.map