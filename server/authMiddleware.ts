import { Request, Response } from "express";
import { verifyToken } from "./jwt";
import { getUserById } from "./db";
import { User } from "../drizzle/schema";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * Middleware to authenticate requests using JWT
 */
export async function authenticateRequest(
  req: AuthenticatedRequest
): Promise<User | null> {
  try {
    // Try to get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return null;
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      return null;
    }

    // Get user from database
    const user = await getUserById(payload.userId);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return null;
  }
}

/**
 * Express middleware to require authentication
 */
export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) {
  authenticateRequest(req).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "Non authentifié" });
    }
    req.user = user;
    next();
  });
}

/**
 * Express middleware to require admin role
 */
export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Accès interdit - Admin requis" });
  }
  next();
}
