"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom.error");
class RequestValidationError extends custom_error_1.CustomError {
    reasons;
    statusCode = 400;
    constructor(reasons) {
        super("Invalid input");
        this.reasons = reasons;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serialize() {
        return this.reasons.map(err => {
            if (err.type === "field") {
                return {
                    message: err.msg,
                    field: err.path
                };
            }
            return {
                message: err.msg
            };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request-validation.error.js.map