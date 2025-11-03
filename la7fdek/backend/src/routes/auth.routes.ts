import { loginSchema, signupSchema, twoFactorSchema } from "../schemas/auth.schema.js";
import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth.controller.js";
import UserModel from "../models/user.model.js";

const userModel = new UserModel();
const authController = new AuthController(userModel);

async function authRoutes(
  fastify: FastifyInstance,
): Promise<void> {
  fastify.post("/signup", signupSchema, authController.signup);
  fastify.post("/login", loginSchema, authController.login);
  fastify.post("/two-factor", twoFactorSchema, authController.verifyTwoFactor);
  fastify.post("/refresh", authController.refreshAccessToken);
  fastify.post("/logout", authController.logout);
}

export default authRoutes;
