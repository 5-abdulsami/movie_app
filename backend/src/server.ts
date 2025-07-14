import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database"
import authRoutes from "./routes/authRoutes"
import {
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  MESSAGE_SERVER_HEALTH_OK,
  MESSAGE_SOMETHING_WENT_WRONG,
  MESSAGE_ROUTE_NOT_FOUND,
} from "./constants/apiConstants" // Import constants

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? ["https://your-frontend-domain.com"] : ["http://localhost:3000"],
    credentials: true,
  }),
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.status(STATUS_OK).json({
    success: true,
    message: MESSAGE_SERVER_HEALTH_OK,
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(STATUS_INTERNAL_SERVER_ERROR).json({
    success: false,
    message: MESSAGE_SOMETHING_WENT_WRONG,
  })
})

// Handle 404
app.use((req, res) => {
  res.status(STATUS_NOT_FOUND).json({ 
    success: false,
    message: MESSAGE_ROUTE_NOT_FOUND, 
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})