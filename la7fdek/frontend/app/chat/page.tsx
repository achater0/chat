
"use client";
import "./Chat.css"
import "../home/home.css"
import ChatBody from "./components/ChatBody/ChatBody"
import NavBar from "../ui/NavBar"

function Chat() {
  return (
    <div className="Chat ">
      <NavBar />
      <ChatBody />
    </div>
  )
}


export default Chat
