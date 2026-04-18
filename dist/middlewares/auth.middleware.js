"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../configs/jwt.config");
const bad_request_error_1 = require("../errors/bad-request.error");
const unautorized_error_1 = require("../errors/unautorized.error");
const user_model_1 = require("../modules/users/user.model");
async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.JWT_SECRET);
        req.user = payload;
        const exists = await user_model_1.User.exists({ _id: payload.id });
        if (!exists)
            throw new unautorized_error_1.UnauthorizedError();
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError)
            throw new bad_request_error_1.BadRequestError(error.message);
        throw error;
    }
}
//# sourceMappingURL=auth.middleware.js.map