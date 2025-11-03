import { FastifyInstance } from "fastify";
import { app } from "../start.js";

async function chatRoutes(fastify: FastifyInstance) {
  fastify.get("/conversations", async () => {
    const conversations = app.db
      .prepare(
        `
          SELECT 
            c.id,
            c.user1_id,
            c.user2_id,
            u1.name as user1_name,
            u2.name as user2_name
          FROM conversations c
          JOIN users u1 ON c.user1_id = u1.id
          JOIN users u2 ON c.user2_id = u2.id
        `
      )
      .all();
    return conversations;
  });
  fastify.get("/conversations/:id", async (req: any) => {
    const conversation_id = req.params.id;
    console.log("Fetching messages for conversation ID:", conversation_id);
    const messages = app.db
      .prepare(
        `
          SELECT 
            m.id,
            m.sender_id,
            u.name as sender_name,
            m.message
          FROM messages m
          JOIN users u ON m.sender_id = u.id
          WHERE m.conversation_id = ?
          ORDER BY m.id ASC
        `
      )
      .all(conversation_id);

    return messages;
  });
}

export default chatRoutes;
