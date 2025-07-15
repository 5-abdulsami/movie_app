import jwt from "jsonwebtoken";
// Import type for JWT secret
import type { StringValue } from "ms";

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET as string;

  // infer as ms.StringValue | number | undefined
  const expiresIn: StringValue | number = (process.env.JWT_EXPIRE as StringValue) || "7d";

  return jwt.sign({ id }, secret, { expiresIn });
};
