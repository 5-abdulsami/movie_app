import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { AuthRequest } from "../types";
import {
  STATUS_UNAUTHORIZED,
  STATUS_INTERNAL_SERVER_ERROR,
  MESSAGE_AUTH_NO_TOKEN,
  MESSAGE_NO_USER_WITH_TOKEN,
  MESSAGE_AUTH_TOKEN_FAILED,
  MESSAGE_SERVER_ERROR,
} from "../constants/apiConstants"; // Import your constants

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      // **FIX 1: Removed 'return' here**
      res.status(STATUS_UNAUTHORIZED).json({
        success: false,
        message: MESSAGE_AUTH_NO_TOKEN,
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
        res.status(STATUS_UNAUTHORIZED).json({
          success: false,
          message: MESSAGE_NO_USER_WITH_TOKEN,
        });
        return; // Added an explicit return to stop execution after sending response
      }

      req.user = user as any; // No 'as any' needed if AuthRequest is properly defined
      next(); // Call next to pass control to the next middleware/route handler
    } catch (error) {
      // Log the error for debugging, but don't expose sensitive info to client
      
      // **FIX 3: Removed 'return' here**
      res.status(STATUS_UNAUTHORIZED).json({
        success: false,
        message: MESSAGE_AUTH_TOKEN_FAILED,
      });
      return; // Added an explicit return to stop execution after sending response
    }
  } catch (error) {
    
    // **FIX 4: Removed 'return' here**
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ 
      success: false,
      message: MESSAGE_SERVER_ERROR,
    });
    return;
  }
};