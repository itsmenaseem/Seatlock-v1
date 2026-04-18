"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowRoutes = void 0;
const express_1 = require("express");
const request_validaton_middleware_1 = require("../../middlewares/request-validaton.middleware");
const express_validator_1 = require("express-validator");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const show_controller_1 = require("./show.controller");
const router = (0, express_1.Router)();
exports.ShowRoutes = router;
// create event 
router.post("/", [
    auth_middleware_1.authMiddleware,
    (0, express_validator_1.body)("title")
        .notEmpty().withMessage("Title is required")
        .bail()
        .isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    (0, express_validator_1.body)("description")
        .notEmpty().withMessage("Description is required")
        .bail()
        .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long")
], request_validaton_middleware_1.requestValidationMiddleware, show_controller_1.createShowController);
// get all shows
router.get("/", [
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1 }).withMessage("Limit must be a positive integer")
], request_validaton_middleware_1.requestValidationMiddleware, show_controller_1.getAllShowsController);
// search shows 
router.get("/search", [
    (0, express_validator_1.query)("query")
        .trim()
        .notEmpty().withMessage("search query is required"),
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1 }).withMessage("Limit must be a positive integer")
], request_validaton_middleware_1.requestValidationMiddleware, show_controller_1.searchShowsController);
// get a show by id
router.get("/:id", [
    (0, express_validator_1.param)("id")
        .isMongoId().withMessage("Invalid show id")
], request_validaton_middleware_1.requestValidationMiddleware, show_controller_1.getShowByIdController);
//# sourceMappingURL=show.route.js.map