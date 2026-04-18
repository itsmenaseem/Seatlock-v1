"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom.error");
class NotFoundError extends custom_error_1.CustomError {
    statusCode = 404;
    constructor(message = "Resource not found") {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serialize() {
        return [{
                message: this.message
            }];
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found.error.js.map