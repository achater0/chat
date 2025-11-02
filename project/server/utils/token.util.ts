import jwt from "jsonwebtoken";

//TODO: store the jwt secret key in .env variable
const ACCESS_TOKEN_SECRET = "rIz3fI1qCbAVTdxAVhOIa44DjqIZFLlY";
const REFRESH_TOKEN_SECRET = "MmNVqEQKrWrPlvoOtbrOH8B264tIySbZ";

export interface AccessTokenPayload {
  userId: number;
  username: string;
  email: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface RefreshTokenPayload {
  username: string;
}

export function generateAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
}

export function getRefreshTokenExpiration(): Date {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7);
  return expiration;
}