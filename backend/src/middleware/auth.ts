import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { AuthRequest } from "../types";
// Import API response constants
import {
  STATUS_UNAUTHORIZED,
  STATUS_INTERNAL_SERVER_ERROR,
  MESSAGE_AUTH_NO_TOKEN,
  MESSAGE_NO_USER_WITH_TOKEN,
  MESSAGE_AUTH_TOKEN_FAILED,
  MESSAGE_SERVER_ERROR,
} from "../constants/apiConstants"; 

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(STATUS_UNAUTHORIZED).json({
        success: false,
        message: MESSAGE_AUTH_NO_TOKEN,
      });
      return; // Explicit return to stop execution after sending response
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as { id: string }; // Ensured secret type assertion

      // Get user from token
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(STATUS_UNAUTHORIZED).json({
          success: false,
          message: MESSAGE_NO_USER_WITH_TOKEN,
        });
        return;
      }

      req.user = user as any;
      next(); // Call next to pass control to the next route handler
    } catch (error) {
      
      res.status(STATUS_UNAUTHORIZED).json({
        success: false,
        message: MESSAGE_AUTH_TOKEN_FAILED,
      });
      return;
    }
  } catch (error) {
    
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({ 
      success: false,
      message: MESSAGE_SERVER_ERROR,
    });
    return;
  }
};