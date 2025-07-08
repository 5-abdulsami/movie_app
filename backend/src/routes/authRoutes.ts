import express from "express";
import { body } from "express-validator";
import { register, login, getMe, logout } from "../controllers/authController";
import { protect } from "../middleware/auth";
import type { Request, Response, NextFunction } from "express"; // Import types for clarity

const router = express.Router();

// Helper to wrap async route handlers
// Key change: Explicitly type `fn` and ensure `Promise.resolve` chain returns `void`
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | any) =>
  (req: Request, res: Response, next: NextFunction): void => { // <-- Explicitly return void
    Promise.resolve(fn(req, res, next)).catch(next); // Catch errors and pass to Express error middleware
  };

// Validation rules
const registerValidation = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Routes
// Note: You might need to adjust the controller function signatures if they're not compatible
// with the generic Request/Response types here or with your AuthRequest type.
router.post("/register", registerValidation, asyncHandler(register));
router.post("/login", loginValidation, asyncHandler(login));
router.get("/me", protect, asyncHandler(getMe));
router.post("/logout", protect, asyncHandler(logout));

export default router;