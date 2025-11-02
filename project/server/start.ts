import Fastify, {FastifyInstance, FastifyError, FastifyRequest, FastifyReply} from "fastify";
import authRoutes from './routes/auth.routes.js'
import {Database} from 'sqlite3'
import ServerController from "./controllers/server.controller.js";

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
  }
}

const serverOptions = {
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
};

const app: FastifyInstance = Fastify(serverOptions);

app.setErrorHandler(async (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {

  request.log.error(error);

  const statusCode = error.validation ? 400 : (error.statusCode || 500);

  let errorMessage = error.message;
  if (error.validation) {
    const firstError = error.validation[0];
    if (firstError) {
      errorMessage = `${firstError.instancePath.replace('/body/', '')} ${firstError.message}`;
    }
  }

  reply.code(statusCode).send({
    success: false,
    error: errorMessage
  });
});

const serverController = new ServerController();

async function main() {

  await serverController.initializeApp();

  await app.register(authRoutes, {prefix: '/api/auth'});

  await serverController.startServer();
}

export {app};

main().catch((err) => {
  console.error(`Error during startup : ${err}`);
  process.exit(1);
});