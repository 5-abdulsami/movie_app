import { Response } from "express"

interface ApiResponse {
  success: boolean
  message?: string
  data?: any
  errors?: any
}

// Send a standardized API response
export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message?: string,
  data?: Record<string, any>,
  errors?: any
): Response => {
  const response: ApiResponse = { success }

  if (message) response.message = message
  if (errors) response.errors = errors
  if (data && typeof data === 'object') {
    Object.assign(response, data)       // Flattens the data object into the response
  }

  return res.status(statusCode).json(response)
}
