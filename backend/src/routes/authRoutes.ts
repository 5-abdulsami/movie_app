import express from "express";
import { body } from "express-validator";
import { register, login, getMe, logout } from "../controllers/authController";
import { protect } from "../middleware/auth";
import type { Request, Response, NextFunction } from "express";
import {
  MESSAGE_VALIDATION_NAME_LENGTH,
  MESSAGE_VALIDATION_INVALID_EMAIL,
  MESSAGE_VALIDATION_PASSWORD_MIN_LENGTH,
  MESSAGE_VALIDATION_PASSWORD_REQUIRED,
  // Import API endpoint constants
  PATH_REGISTER,
  PATH_LOGIN,
  PATH_ME,
  PATH_LOGOUT,
} from "../constants/apiConstants";

const router = express.Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | any) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Validation rules
const registerValidation = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage(MESSAGE_VALIDATION_NAME_LENGTH),
  body("email").isEmail().normalizeEmail().withMessage(MESSAGE_VALIDATION_INVALID_EMAIL),
  body("password").isLength({ min: 6 }).withMessage(MESSAGE_VALIDATION_PASSWORD_MIN_LENGTH),
];

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage(MESSAGE_VALIDATION_INVALID_EMAIL),
  body("password").notEmpty().withMessage(MESSAGE_VALIDATION_PASSWORD_REQUIRED),
];

// Routes
router.post(PATH_REGISTER, registerValidation, asyncHandler(register));
router.post(PATH_LOGIN, loginValidation, asyncHandler(login));
router.get(PATH_ME, protect, asyncHandler(getMe));
router.post(PATH_LOGOUT, protect, asyncHandler(logout));

export default router;