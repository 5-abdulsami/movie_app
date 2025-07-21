import express from "express"
import cors from "cors"
import dotenv from "dotenv"
// Load environment variables
dotenv.config()

import connectDB from "./config/database"
import authRoutes from "./routes/authRoutes"
import movieRoutes from "./routes/movieRoutes"

// Import API response constants
import {
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  MESSAGE_SERVER_HEALTH_OK,
  MESSAGE_SOMETHING_WENT_WRONG,
  MESSAGE_ROUTE_NOT_FOUND,
} from "./constants/apiConstants"

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
app.use("/api/movies", movieRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.status(STATUS_OK).json({
    success: true,
    message: MESSAGE_SERVER_HEALTH_OK,
    timestamp: new Date().toISOString(),
  });
});

// If a request reaches this point, it means no previous route handler has responded.
app.use((req, res) => {
  res.status(STATUS_NOT_FOUND).json({
    success: false,
    message: MESSAGE_ROUTE_NOT_FOUND,
    path: req.originalUrl, // Optional: return the path that was not found
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = err.status || STATUS_INTERNAL_SERVER_ERROR;
  const message = process.env.NODE_ENV === "production"
    ? MESSAGE_SOMETHING_WENT_WRONG
    : err.message || MESSAGE_SOMETHING_WENT_WRONG;

  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
});