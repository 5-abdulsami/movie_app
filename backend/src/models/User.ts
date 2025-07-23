import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"
// Import mongoose schema validation constants
import {
  MESSAGE_USER_NAME_REQUIRED,
  MESSAGE_USER_NAME_MAX_LENGTH,
  MESSAGE_USER_EMAIL_REQUIRED,
  MESSAGE_USER_EMAIL_VALID,
  MESSAGE_USER_PASSWORD_REQUIRED,
  MESSAGE_USER_PASSWORD_MIN_LENGTH,
} from "../constants/apiConstants"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
  favorites: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, MESSAGE_USER_NAME_REQUIRED],
      trim: true,
      maxlength: [50, MESSAGE_USER_NAME_MAX_LENGTH],
    },
    email: {
      type: String,
      required: [true, MESSAGE_USER_EMAIL_REQUIRED],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, MESSAGE_USER_EMAIL_VALID],
    },
    password: {
      type: String,
      required: [true, MESSAGE_USER_PASSWORD_REQUIRED],
      minlength: [6, MESSAGE_USER_PASSWORD_MIN_LENGTH],
      select: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUser>("User", UserSchema)