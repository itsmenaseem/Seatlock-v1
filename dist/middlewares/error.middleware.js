"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const custom_error_1 = require("../errors/custom.error");
function errorMiddleware(err, req, res, next) {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serialize() });
    }
    const message = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).send({
        errors: [{
                message
            }]
    });
}
//# sourceMappingURL=error.middleware.js.map