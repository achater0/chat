
"use client";
import "./Chat.css"
import ChatBody from "./components/ChatBody/ChatBody"
import NavBar from "./components/NavBar/NavBar"

function Chat() {
  return (
    <div className="Chat ">
      <NavBar />
      <ChatBody />
    </div>
  )
}


export default Chat
