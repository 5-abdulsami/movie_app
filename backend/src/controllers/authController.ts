import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/User"
import { generateToken } from "../utils/jwt"
import type { AuthRequest } from "../types"
// Import API response constants
import {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_INTERNAL_SERVER_ERROR,
  MESSAGE_USER_EXISTS,
  MESSAGE_USER_REGISTERED,
  MESSAGE_INVALID_CREDENTIALS,
  MESSAGE_SERVER_ERROR,
  MESSAGE_USER_LOGGED_OUT,
  MESSAGE_VALIDATION_FAILED,
  MESSAGE_LOGIN_SUCCESS,
} from "../constants/apiConstants"

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(STATUS_BAD_REQUEST).json({
        success: false,
        message: MESSAGE_VALIDATION_FAILED, 
        errors: errors.array(),
      })
    }

    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(STATUS_BAD_REQUEST).json({
        success: false,
        message: MESSAGE_USER_EXISTS,
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    // Generate token
    const token = generateToken(String(user._id))

    res.status(STATUS_CREATED).json({
      success: true,
      message: MESSAGE_USER_REGISTERED,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGE_SERVER_ERROR,
    })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(STATUS_BAD_REQUEST).json({
        success: false,
        message: MESSAGE_VALIDATION_FAILED, 
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    // Check if user exists and include password
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(STATUS_UNAUTHORIZED).json({
        success: false,
        message: MESSAGE_INVALID_CREDENTIALS,
      })
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      return res.status(STATUS_UNAUTHORIZED).json({
        success: false,
        message: MESSAGE_INVALID_CREDENTIALS,
      })
    }

    // Generate token
    const token = generateToken(String(user._id))

    res.status(STATUS_OK).json({
      success: true,
      message: MESSAGE_LOGIN_SUCCESS, 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGE_SERVER_ERROR,
    })
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // User is attached by the protect middleware
    const user = req.user

    res.status(STATUS_OK).json({
      success: true,
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
      },
    })
  } catch (error: any) {
    
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGE_SERVER_ERROR,
    })
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response) => {
  try {
    res.status(STATUS_OK).json({
      success: true,
      message: MESSAGE_USER_LOGGED_OUT,
    })
  } catch (error: any) {
    
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGE_SERVER_ERROR,
    })
  }
}