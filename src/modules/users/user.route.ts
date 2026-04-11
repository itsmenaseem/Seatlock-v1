import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "./user.controller";
import { body } from "express-validator";
import { requestValidationMiddleware } from "../../middlewares/request-validaton.middleware";


const router = Router();

// Creating user

router.post(
  "/signup",
  [
    body("name")
      .notEmpty().withMessage("Name is required")
      .bail()
      .trim()
      .isLength({min:3}).withMessage("Name must have atleast 3 charactors"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .bail()
      .isEmail().withMessage("Email should be valid")
      .trim()
      .toLowerCase(),
    body("password").notEmpty().withMessage("Password is required")
      .bail()
      .isLength({min:6}).withMessage("Password must have atleast 6 charactors")
  ],
  requestValidationMiddleware,
  createUserController,
);

// login user

router.post(
  "/login",
  [
    body("email")
      .notEmpty().withMessage("Email is required")
      .bail()
      .trim()
      .isEmail().withMessage("Email should be valid")
      .toLowerCase(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  requestValidationMiddleware,
  loginUserController,
);



export { router as UserRoutes };
