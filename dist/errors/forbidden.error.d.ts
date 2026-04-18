import { CustomError } from "./custom.error";
export declare class ForbiddenError extends CustomError {
    statusCode: number;
    constructor(message?: string);
    serialize(): {
        message: string;
        field?: string;
    }[];
}
//# sourceMappingURL=forbidden.error.d.ts.map