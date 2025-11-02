import { app } from "../start.js";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import sqlite3 from "sqlite3";

const COOKIE_SECRET = "rIz3fI1qCbAVTdxAVhOIa44DjqIZFLlY";
const PORT = 8080;
const HOST = "0.0.0.0";

class ServerController {
  async setupCors() {
    await app.register(cors, {
      origin: "http://localhost:5173",
      credentials: true,
    });
  }

  async setupCookies() {
    await app.register(fastifyCookie, {
      secret: COOKIE_SECRET,
    });
  }

  setupDatabase() {
    const db = new sqlite3.Database("./sqlite.db", (err) => {
      if (err) {
        app.log.error(`Failed to connect to database: ${err}`);
        process.exit(1);
      }
      app.log.info("Connected to SQLite database");
    });

    db.serialize(() => {
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            two_factor_enabled BOOLEAN DEFAULT 0,
            two_factor_code TEXT,
            two_factor_code_expires DATETIME
          )
        `, (err) => {
          if (err) {
            app.log.error(`Failed to create users table ${err}`);
          } else {
            app.log.info('Users table created successfully');
          }
        });

        db.run(`
        CREATE TABLE IF NOT EXISTS refresh_tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          token TEXT UNIQUE NOT NULL,
          expires_at DATETIME NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        `, (err) => {
          if (err) {
            app.log.error(`Failed to create refresh_tokens table ${err}`);
          } else {
            app.log.info('Refresh tokens table created successfully');
          }
        })
      });
    
    app.decorate("db", db);
  }

  async initializeApp() {
    try {
      await this.setupCors();
      await this.setupCookies();
      this.setupDatabase();
    } catch (err) {
      app.log.error(`Failed to initialize app: ${err}`);
      process.exit(1);
    }
  }

  async startServer() {
    try {
      const address = await app.listen({ port: PORT, host: HOST });
      app.log.info(`Server is now listening on ${address}`);
    } catch (err) {
      app.log.error(`Failed to start server: ${err}`);
      process.exit(1);
    }
  }
}

export default ServerController;
