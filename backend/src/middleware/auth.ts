import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { AuthRequest } from "../types";

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      // **FIX 1: Removed 'return' here**
      res.status(401).json({
        success: false,
        message: "Not authorized to access this route (No token provided)", // More specific message
      });
      return; // Added an explicit return to stop execution after sending response
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as { id: string }; // Ensured secret type assertion

      // Get user from token
      const user = await User.findById(decoded.id);

      if (!user) {
        // **FIX 2: Removed 'return' here**
        res.status(401).json({
          success: false,
          message: "No user found with this token",
        });
        return; // Added an explicit return to stop execution after sending response
      }

      req.user = user as any; // No 'as any' needed if AuthRequest is properly defined
      next(); // Call next to pass control to the next middleware/route handler
    } catch (error) {
      // Log the error for debugging, but don't expose sensitive info to client
      console.error("Token verification or user lookup failed:", error);
      // **FIX 3: Removed 'return' here**
      res.status(401).json({
        success: false,
        message: "Not authorized to access this route (Invalid token)", // More specific message
      });
      return; // Added an explicit return to stop execution after sending response
    }
  } catch (error) {
    console.error("Protect middleware error:", error); // More specific logging
    // **FIX 4: Removed 'return' here**
    res.status(500).json({
      success: false,
      message: "Server Error during authentication process", // More specific message
    });
    return; // Added an explicit return to stop execution after sending response
  }
};