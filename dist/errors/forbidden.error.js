"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const custom_error_1 = require("./custom.error");
class ForbiddenError extends custom_error_1.CustomError {
    statusCode = 403;
    constructor(message = "Access denied") {
        super(message);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    serialize() {
        return [{
                message: this.message
            }];
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbidden.error.js.map