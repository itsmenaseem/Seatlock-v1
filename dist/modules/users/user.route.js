"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const express_validator_1 = require("express-validator");
const request_validaton_middleware_1 = require("../../middlewares/request-validaton.middleware");
const router = (0, express_1.Router)();
exports.UserRoutes = router;
// Creating user
router.post("/signup", [
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("Name is required")
        .bail()
        .trim()
        .isLength({ min: 3 }).withMessage("Name must have atleast 3 charactors"),
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Email should be valid")
        .trim()
        .toLowerCase(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 6 }).withMessage("Password must have atleast 6 charactors")
], request_validaton_middleware_1.requestValidationMiddleware, user_controller_1.createUserController);
// login user
router.post("/login", [
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .trim()
        .isEmail().withMessage("Email should be valid")
        .toLowerCase(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
], request_validaton_middleware_1.requestValidationMiddleware, user_controller_1.loginUserController);
router.get("/logout", user_controller_1.logout);
//# sourceMappingURL=user.route.js.map