"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const custom_error_1 = require("./custom.error");
class UnauthorizedError extends custom_error_1.CustomError {
    statusCode = 401;
    constructor(message = "Not authenticated") {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    serialize() {
        return [{
                message: this.message
            }];
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unautorized.error.js.map