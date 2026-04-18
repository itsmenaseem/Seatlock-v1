import { CustomError } from "./custom.error";
export declare class NotFoundError extends CustomError {
    statusCode: number;
    constructor(message?: string);
    serialize(): {
        message: string;
        field?: string;
    }[];
}
//# sourceMappingURL=not-found.error.d.ts.map