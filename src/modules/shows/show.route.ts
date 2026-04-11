import { Router } from "express";
import { requestValidationMiddleware } from "../../middlewares/request-validaton.middleware";
import { body, param, query } from "express-validator";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createShowController, getAllShowsController, getShowByIdController, searchShowsController } from "./show.controller";

const router = Router();

// create event 
router.post("/",[
    authMiddleware,
    body("title")
        .notEmpty().withMessage("Title is required")
        .bail()
        .isLength({min:3}).withMessage("Title must be at least 3 characters long"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .bail()
        .isLength({min:10}).withMessage("Description must be at least 10 characters long")
],
    requestValidationMiddleware,
    createShowController
)

// get all shows

router.get("/",[
    query("page")
    .optional()
    .isInt({min:1}).withMessage("Page must be a positive integer"),
    query("limit")
    .optional()
    .isInt({min:1}).withMessage("Limit must be a positive integer")
],requestValidationMiddleware,getAllShowsController)

// search shows 

router.get("/search",[
    query("query")
    .trim()
    .notEmpty().withMessage("search query is required"),
    query("page")
    .optional()
    .isInt({min:1}).withMessage("Page must be a positive integer"),
    query("limit")
    .optional()
    .isInt({min:1}).withMessage("Limit must be a positive integer")
],requestValidationMiddleware,searchShowsController)

// get a show by id

router.get("/:id",[
    param("id")
    .isMongoId().withMessage("Invalid show id")
],requestValidationMiddleware,getShowByIdController)

export {router as ShowRoutes}