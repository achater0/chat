import Fastify from "fastify";
import cors from "@fastify/cors";
import Database from "better-sqlite3";
import { use } from "react";

const fastify = Fastify({ logger: true });
await fastify.register(cors, { origin: "*" });

const db = new Database("chat.db");
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();


db.prepare(`
  CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user1_id INTEGER NOT NULL,
    user2_id INTEGER NOT NULL,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
  )
`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  message TEXT DEFAULT '[]',
  conversation_id INTEGER NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)

)`).run();


["Abderrafik", "Youssef", "Ahmed", "Sara", "Lina", "Omar"].forEach((name) => {
  const exists = db.prepare(`SELECT 1 FROM users WHERE name = ?`).get(name);
  if (!exists) {
    db.prepare(`INSERT INTO users (name) VALUES (?)`).run(name);
  }
});
// print all users id and name
const users = db.prepare(`SELECT * FROM users`).all();
users.forEach((user:any) => {
  console.log(`User ID: ${user.id}, Name: ${user.name}`)});

db.prepare(`INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)`).run(1, 2);
db.prepare(`INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)`).run(1, 3);
db.prepare(`INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)`).run(1, 4);

db.prepare(`INSERT INTO messages (sender_id, message, conversation_id) VALUES (?, ?, ?)`).run(3, 'si rachid lhna', 1);
db.prepare(`INSERT INTO messages (sender_id, message, conversation_id) VALUES (?, ?, ?)`).run(1, 'lhna lhmdolilah', 1);
db.prepare(`INSERT INTO messages (sender_id, message, conversation_id) VALUES (?, ?, ?)`).run(1, 'ama kiy yak tfjijt', 1);
db.prepare(`INSERT INTO messages (sender_id, message, conversation_id) VALUES (?, ?, ?)`).run(3, 'akihfd rbi agmano', 1);




fastify.get("/api/users", async () => {
  const users = db.prepare("SELECT * FROM users").all();
  return users;
});
fastify.get("/api/conversations", async () => {
  const conversations = db.prepare(`
    SELECT 
      c.id,
      c.user1_id,
      c.user2_id,
      u1.name as user1_name,
      u2.name as user2_name
    FROM conversations c
    JOIN users u1 ON c.user1_id = u1.id
    JOIN users u2 ON c.user2_id = u2.id
  `).all();
  return conversations;
});

fastify.get("/api/conversations/:id", async (req : any, res : any) => {
  const conversation_id = req.params.id;
  console.log("Fetching messages for conversation ID:", conversation_id);
  const messages = db.prepare(`
    SELECT 
      m.id,
      m.sender_id,
      u.name as sender_name,
      m.message
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.conversation_id = ?
    ORDER BY m.id ASC
  `).all(conversation_id);
  

  return messages;

});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server running at ${address}`);
});