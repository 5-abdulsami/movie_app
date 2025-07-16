import mongoose from "mongoose"

// establish a connection to the MongoDB database
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!)
  } catch (error: any) {
    process.exit(1)
  }
}

export default connectDB
