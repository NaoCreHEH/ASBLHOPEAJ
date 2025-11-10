import express from "express";
import { rateLimit } from "express-rate-limit";
import { authenticateUser, createUser } from "./auth";
import { generateToken, verifyToken } from "./jwt";
import { getUserById } from "./db";

const router = express.Router();

// Rate limiter: 50 requests per 10 minutes
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Trop de tentatives, réessayez plus tard",
});

/**
 * POST /auth/register
 * Register a new user (admin only in production)
 */
router.post("/register", authLimiter, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // In production, you might want to restrict registration
    // or require an admin token to create accounts

    await createUser(
      name,
      email,
      password,
      role === "admin" ? "admin" : "user"
    );

    return res.json({ ok: true, message: "Compte créé avec succès" });
  } catch (error: any) {
    if (error.message.includes("existe déjà")) {
      return res.status(409).json({ error: error.message });
    }
    console.error("Register error:", error);
    return res.status(500).json({ error: "Erreur lors de la création du compte" });
  }
});

/**
 * POST /auth/login
 * Login with email and password
 */
router.post("/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const user = await authenticateUser(email.trim().toLowerCase(), password);

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe invalide" });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Erreur lors de la connexion" });
  }
});

/**
 * POST /auth/verify
 * Verify a JWT token
 */
router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token requis" });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({ error: "Token invalide ou expiré" });
    }

    // Get fresh user data
    const user = await getUserById(payload.userId);

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({ error: "Erreur lors de la vérification" });
  }
});

/**
 * GET /auth/me
 * Get current user from token
 */
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({ error: "Token invalide" });
    }

    const user = await getUserById(payload.userId);

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Me error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
