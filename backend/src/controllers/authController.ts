import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/User"
import { generateToken } from "../utils/jwt"
import type { AuthRequest } from "../types"
// import api constants
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
import { sendResponse } from "../utils/responseHandler"

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendResponse(res, STATUS_BAD_REQUEST, false, MESSAGE_VALIDATION_FAILED, undefined, errors.array())
    }

    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return sendResponse(res, STATUS_BAD_REQUEST, false, MESSAGE_USER_EXISTS)
    }

    // Create user
    const user = await User.create({ name, email, password })

    // Generate token
    const token = generateToken(String(user._id))

    return sendResponse(res, STATUS_CREATED, true, MESSAGE_USER_REGISTERED, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    return sendResponse(res, STATUS_INTERNAL_SERVER_ERROR, false, MESSAGE_SERVER_ERROR)
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
      return sendResponse(res, STATUS_BAD_REQUEST, false, MESSAGE_VALIDATION_FAILED, undefined, errors.array())
    }

    const { email, password } = req.body

    // Check if user exists and include password
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return sendResponse(res, STATUS_UNAUTHORIZED, false, MESSAGE_INVALID_CREDENTIALS)
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      return sendResponse(res, STATUS_UNAUTHORIZED, false, MESSAGE_INVALID_CREDENTIALS)
    }

    // Generate token
    const token = generateToken(String(user._id))

    return sendResponse(res, STATUS_OK, true, MESSAGE_LOGIN_SUCCESS, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
})
  } catch (error: any) {
    return sendResponse(res, STATUS_INTERNAL_SERVER_ERROR, false, MESSAGE_SERVER_ERROR)
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // User is attached by the protect middleware
    const user = req.user

    return sendResponse(res, STATUS_OK, true, undefined, {
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
      },
    })
  } catch (error: any) {
    return sendResponse(res, STATUS_INTERNAL_SERVER_ERROR, false, MESSAGE_SERVER_ERROR)
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response) => {
  try {
    return sendResponse(res, STATUS_OK, true, MESSAGE_USER_LOGGED_OUT)
  } catch (error: any) {
    return sendResponse(res, STATUS_INTERNAL_SERVER_ERROR, false, MESSAGE_SERVER_ERROR)
  }
}