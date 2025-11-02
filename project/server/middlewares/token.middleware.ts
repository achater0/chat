import { FastifyReply, FastifyRequest } from "fastify";
import { verifyAccessToken } from "../utils/token.util.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: number;
      username: string;
      email: string;
    };
  }
}

export async function tokenMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const accessToken = request.cookies["access_token"];

    if (!accessToken) {
      return reply.code(401).send({
        success: false,
        error: "Authentication required",
        code: "NO_TOKEN",
      });
    }

    const payload = verifyAccessToken(accessToken);

    request.user = payload;

  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return reply.code(401).send({
        success: false,
        error: "Access token expired",
        code: "TOKEN_EXPIRED",
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return reply.code(401).send({
        success: false,
        error: 'Invalid access token',
        code: 'INVALID_TOKEN',
      });
    }

    request.log.error(error);
    return reply.code(500).send({
      success: false,
      error: "Unexcpected error",
    });
  }
}
