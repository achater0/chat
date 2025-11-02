import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody, SignupBody } from "../schemas/auth.schema.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiration,
} from "../utils/token.util.js";

class AuthController {
  private userModel: UserModel;
  constructor(userModel: UserModel) {
    this.userModel = userModel;

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.verifyTwoFactor = this.verifyTwoFactor.bind(this);
    this.refreshAccessToken = this.refreshAccessToken.bind(this);
    this.logout = this.logout.bind(this);
  }
  async signup(
    request: FastifyRequest<{ Body: SignupBody }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { username, email, password } = request.body;

      const existingUser = await this.userModel.findByUsername(username);
      if (existingUser) {
        return reply
          .code(400)
          .send({ success: false, error: "Username is already taken" });
      }

      const existingEmail = await this.userModel.findByEmail(email);
      if (existingEmail) {
        return reply
          .code(400)
          .send({ success: false, error: "Email is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      const user = await this.userModel.findById(userId);
      if (!user) {
        return reply.code(400).send({
          success: false,
          error: "User not found",
        })
      }

      const accessToken = generateAccessToken({
        userId: user.id,
        username: user.username,
        email: user.email,
      });
    
      const refreshToken = generateRefreshToken({
        username: user.username,
      });

      const RefreshTokenExpiration = getRefreshTokenExpiration();

      await this.userModel.storeRefreshToken(
        user.id,
        refreshToken,
        RefreshTokenExpiration,
      )
    
      reply.setCookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 60,
        path: "/",
        signed: true,
      });
    
      reply.setCookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        signed: true,
      });

      reply.code(201).send({
        success: true,
        message: "User registered successfully",
        data: { userId },
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: "An error occurred during registration",
      });
    }
  }

  async login(
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { username, password } = request.body;

      const user = await this.userModel.findByUsername(username);
      if (!user) {
        return reply.code(401).send({
          success: false,
          error: "Invalid username or password",
        });
      }
      if (!user.password) {
        return reply.code(500).send({
          success: false,
          error: "An error occurred during login",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return reply.code(401).send({
          success: false,
          error: "Invalid username or password",
        });
      }

      console.log("is the user enabled two factor code : ", user.two_factor_enabled);

      if (user.two_factor_enabled) {
        console.log("inside the condition");
        const twoFactorCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000).toISOString();
  
        await this.userModel.update(user.id, {
          two_factor_code: twoFactorCode,
          two_factor_code_expires: expiresAt,
        });
  
        //!Temporary 2fa code log __ to remove later
        request.log.info(`2FA code for ${username}: ${twoFactorCode}`);
  
        reply.setCookie("2fa_pending", user.id.toString(), {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 3 * 60,
          path: "/",
          signed: true,
        });

        console.log("will return the two factor true");
  
        return reply.code(200).send({
          success: true,
          message: "2FA code required",
          data: {
            requiresTwoFactor: true,
          },
        });
      } else {
        const accessToken = generateAccessToken({
          userId: user.id,
          username: user.username,
          email: user.email,
        });
      
        const refreshToken = generateRefreshToken({
          username: user.username,
        });
  
        const RefreshTokenExpiration = getRefreshTokenExpiration();
  
        await this.userModel.storeRefreshToken(
          user.id,
          refreshToken,
          RefreshTokenExpiration,
        )
      
        reply.setCookie("access_token", accessToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 10 * 60,
          path: "/",
          signed: true,
        });
      
        reply.setCookie("refresh_token", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
          signed: true,
        });

        console.log("will return the two factor false");

        return reply.code(200).send({
          success: true,
          message: "Login successfully",
          data: {
            requiresTwoFactor: false,
          },
        });
      }

    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: "An error occurred during login",
      });
    }
  }

  async verifyTwoFactor(
    request: FastifyRequest<{ Body: { code: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const pendingUserId = request.cookies["2fa_pending"];
      if (!pendingUserId) {
        return reply.code(401).send({
          success: false,
          error: "2FA session expired or invalid",
        });
      }

      const userId = parseInt(pendingUserId, 10);
      if (isNaN(userId)) {
        return reply.code(401).send({
          success: false,
          error: "Invalid 2FA session",
        });
      }

      const user = await this.userModel.findById(userId);
      if (!user) {
        return reply.code(401).send({
          success: false,
          error: "User not found",
        });
      }

      if (!user.two_factor_code || !user.two_factor_code_expires) {
        return reply.code(401).send({
          success: false,
          error: "2FA code not found",
        });
      }

      const now = new Date();
      const expiresAt = new Date(user.two_factor_code_expires);
      if (now > expiresAt) {
        return reply.code(401).send({
          success: false,
          error: "2FA code has expired",
        });
      }

      const { code } = request.body;
      console.log(code);
      if (code !== user.two_factor_code) {
        return reply.code(401).send({
          success: false,
          error: "Invalid 2FA code",
        });
      }

      await this.userModel.update(userId, {
        two_factor_code: null,
        two_factor_code_expires: null,
      });

      reply.clearCookie("2fa_pending");

      const accessToken = generateAccessToken({
        userId: user.id,
        username: user.username,
        email: user.email,
      });
    
      const refreshToken = generateRefreshToken({
        username: user.username,
      });

      const RefreshTokenExpiration = getRefreshTokenExpiration();

      await this.userModel.storeRefreshToken(
        user.id,
        refreshToken,
        RefreshTokenExpiration,
      )
    
      reply.setCookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 60,
        path: "/",
        signed: true,
      });
    
      reply.setCookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        signed: true,
      });

      reply.code(200).send({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        },
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({
        success: false,
        error: "An error occurred during 2FA verification",
      });
    }
  }

  async refreshAccessToken(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const refreshToken = request.cookies["refresh_token"];
      if (!refreshToken) {
        return reply.code(401).send({
          success: false,
          error: "No refresh token provided",
        });
      }

      const tokenData = await this.userModel.findRefreshToken(refreshToken);
      if (!tokenData) {
        return reply.code(401).send({
          success: false,
          error: "Invalid refresh token",
        });
      }

      const now = new Date();
      const expiresAt = new Date(tokenData.expiresAt);
      if (now > expiresAt) {
        await this.userModel.deleteRefreshToken(refreshToken);
        return reply.code(401).send({
          success: false,
          error: "Refresh token has expired",
        });
      }

      const user = await this.userModel.findById(tokenData.userId);
      if (!user) {
        return reply.code(401).send({
          success: false,
          error: "User not found",
        });
      }

      const newAccessToken = generateAccessToken({
        userId: user.id,
        username: user.username,
        email: user.email,
      });

      reply.setCookie("access_token", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 60,
        path: "/",
        signed: true,
      });

      return reply.code(200).send({
        success: true,
        message: "Token refreshed!",
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        error: "An error occured during refresh token",
      });
    }
  }

  async logout(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const refreshToken = request.cookies["refresh_token"];
      if (refreshToken) {
        await this.userModel.deleteRefreshToken(refreshToken);
      }

      reply.clearCookie("access_token", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });

      reply.clearCookie("refresh_token", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });

      return reply.code(200).send({
        success: true,
        message: "Logged out successfully",
      });
    } catch(error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        error: "An error occurred during logout",
      });
    }
  }
}

export default AuthController;
