

import { useState } from "react";
import Friends from "./Friends/Friends";
import Messages from "./Messages/Messages";

function ChatBody() {
 
  const users = [
    {
      id:1,
      name: "Alice",
      lastMessage: "Hey, how are you? ",
      messages: [
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!All good, just working on something!All good, just working on something!All good, just working on something!All good, just working on something!" },
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!" },
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!" },
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!" },
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!" },
      ],
    },
    {
      id:2,
      name: "Bob",
      lastMessage: "See you tomorrow!",
      messages: [
        { from: "Bob", text: "See you tomorrow!" },
        { from: "me", text: "Sure thing!" },
      ],
    },
    {
      id:3,
      name: "Charlie",
      lastMessage: "Start a conversation",
      messages: [],
    },
    {
      id:4,
      name: "Alice",
      lastMessage: "Hey, how are you?",
      messages: [
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!" },
      ],
    },
    {
      id:5,
      name: "Bob",
      lastMessage: "See you tomorrow!",
      messages: [
        { from: "Bob", text: "See you tomorrow!" },
        { from: "me", text: "Sure thing!" },
      ],
    },
    {
      id:6,
      name: "Charlie",
      lastMessage: "Start a conversation",
      messages: [],
    }, {
      id:7,
      name: "Alice",
      lastMessage: "Hey, how are you?",
      messages: [
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!" },
      ],
    },
    {
      id:8,
      name: "Bob",
      lastMessage: "See you tomorrow!",
      messages: [
        { from: "Bob", text: "See you tomorrow!" },
        { from: "me", text: "Sure thing!" },
      ],
    },
    {
      id:9,
      name: "Charlie",
      lastMessage: "Start a conversation",
      messages: [],
    }, {
      id:11,
      name: "Alice",
      lastMessage: "Hey, how are you?",
      messages: [
        { from: "Alice", text: "Hey, how are you?" },
        { from: "me", text: "I'm great! You?" },
        { from: "Alice", text: "All good, just working on something!" },
      ],
    },
    {
      id:10,
      name: "Bob",
      lastMessage: "See you tomorrow!",
      messages: [
        { from: "Bob", text: "See you tomorrow!" },
        { from: "me", text: "Sure thing!" },
      ],
    },
    {
      id:12,
      name: "Charlie",
      lastMessage: "Start a conversation",
      messages: [],
    },
  ];


  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex" style={{height: "calc(100vh - 80px)"}}>
      <Friends
        users={users}
        onSelectUser={setSelectedUser}
        selectedUser={selectedUser}
      />
      <Messages user={selectedUser} />
    </div>
  );
}

export default ChatBody;

