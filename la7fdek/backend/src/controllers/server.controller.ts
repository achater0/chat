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
      origin: "http://localhost:3000",
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
      db.run(
        `
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            two_factor_enabled BOOLEAN DEFAULT 0,
            two_factor_code TEXT,
            two_factor_code_expires DATETIME
          )
        `,
        (err) => {
          if (err) {
            app.log.error(`Failed to create users table ${err}`);
          } else {
            app.log.info("Users table created successfully");
          }
        }
      );

      db.run(
        `
        CREATE TABLE IF NOT EXISTS refresh_tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          token TEXT UNIQUE NOT NULL,
          expires_at DATETIME NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        `,
        (err) => {
          if (err) {
            app.log.error(`Failed to create refresh_tokens table ${err}`);
          } else {
            app.log.info("Refresh tokens table created successfully");
          }
        }
      );

      db.run(
        `
        CREATE TABLE IF NOT EXISTS conversations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user1_id INTEGER NOT NULL,
          user2_id INTEGER NOT NULL,
          FOREIGN KEY (user1_id) REFERENCES users(id),
          FOREIGN KEY (user2_id) REFERENCES users(id)
        )
        `,
        (err) => {
          if (err) {
            app.log.error(`Failed to create conversations table ${err}`);
          } else {
            app.log.info("Conversations table created successfully");
          }
        }
      );

      db.run(
        `
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sender_id INTEGER NOT NULL,
          message TEXT DEFAULT '[]',
          conversation_id INTEGER NOT NULL,
          FOREIGN KEY (sender_id) REFERENCES users(id),
          FOREIGN KEY (conversation_id) REFERENCES conversations(id)
        )
        `,
        (err) => {
          if (err) {
            app.log.error(`Failed to create messages table ${err}`);
          } else {
            app.log.info("messages table created successfully");
          }
        }
      );

      //insert sample data (temporary)
  //     db.run(
  //       `
  //   INSERT INTO users (username, email, password, two_factor_enabled)
  //   VALUES 
  //     ('alice', 'alice@example.com', 'hashed_password_1', 0),
  //     ('bob', 'bob@example.com', 'hashed_password_2', 1),
  //     ('charlie', 'charlie@example.com', 'hashed_password_3', 0)
  // `,
  //       (err) => {
  //         if (err) console.error("Error inserting users:", err);
  //         else console.log("✅ Users inserted");
  //       }
  //     );

  //     // insert refresh tokens
  //     db.run(
  //       `
  //   INSERT INTO refresh_tokens (user_id, token, expires_at)
  //   VALUES
  //     (1, 'token_alice_123', datetime('now', '+7 days')),
  //     (2, 'token_bob_123', datetime('now', '+7 days')),
  //     (3, 'token_charlie_123', datetime('now', '+7 days'))
  // `,
  //       (err) => {
  //         if (err) console.error("Error inserting refresh tokens:", err);
  //         else console.log("✅ Refresh tokens inserted");
  //       }
  //     );

  //     // insert sample conversations
  //     db.run(
  //       `
  //   INSERT INTO conversations (user1_id, user2_id)
  //   VALUES
  //     (1, 2),
  //     (2, 3),
  //     (1, 3)
  // `,
  //       (err) => {
  //         if (err) console.error("Error inserting conversations:", err);
  //         else console.log("✅ Conversations inserted");
  //       }
  //     );

  //     // insert sample messages
  //     db.run(
  //       `
  //   INSERT INTO messages (sender_id, message, conversation_id)
  //   VALUES
  //     (1, 'Hey Bob! How are you?', 1),
  //     (2, 'Hey Alice! Doing great, thanks.', 1),
  //     (2, 'Charlie, wanna play later?', 2),
  //     (3, 'Sure Bob! Let’s do it.', 2),
  //     (1, 'Hey Charlie, long time no see!', 3),
  //     (3, 'Hey Alice, indeed! How’s everything?', 3)
  // `,
  //       (err) => {
  //         if (err) console.error("Error inserting messages:", err);
  //         else console.log("✅ Messages inserted");
  //       }
  //     );

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
