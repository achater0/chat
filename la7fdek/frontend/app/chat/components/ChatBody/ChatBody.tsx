"use client";
import { useState, useEffect } from "react";
import Friends from "./Friends/Friends";
import Messages from "./Messages/Messages";

function ChatBody() {
  const [conversation, setconversation] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/conversations")
      .then((res) => res.json())
      .then((data) => setconversation(data))
      .catch((err) => console.error("Failed to fetch conversation:", err));
  }, []);
  const client_id = 1; // Replace with actual logged-in user ID
  console.log("Conversations:", conversation);

  useEffect(() => {
    console.log("Selected user changed:", selectedUser);
    const id = client_id === selectedUser?.user1_id ? selectedUser?.user2_id : selectedUser?.user1_id;
    if (selectedUser) {
      const conversationId = conversation.find((conv: any) => {
        if ((conv.user2_id === id && conv.user1_id === client_id) || (conv.user1_id === id && conv.user2_id === client_id)) {
          return conv.id;
        }
        return 0;
      });
      if (!conversationId) {
        console.error("Conversation not found for selected user:", selectedUser);
        return;
      }
      console.log("Selected conversation ID:", conversationId.id);
      fetch(`http://localhost:8080/api/conversations/${conversationId.id}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((err) => console.error("Failed to fetch messages:", err));
    }
  }, [selectedUser]);

  return (
    <div className="flex" style={{ height: "calc(100vh - 80px)" }}>
      <Friends
        users={conversation}
        onSelectUser={setSelectedUser}
        selectedUser={selectedUser}
      />
      <Messages user={selectedUser} messages={messages}  />
    

    </div>
  );
}

export default ChatBody;
