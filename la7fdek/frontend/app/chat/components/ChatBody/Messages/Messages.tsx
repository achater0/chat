"use client";
import userImage from "../../../assets/userImage.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Messages.css";
import { useState } from "react";
import { useEffect } from "react";
import { TfiInfoAlt } from "react-icons/tfi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ImBlocked } from "react-icons/im";
import { BsSendFill } from "react-icons/bs";
import MessagesErea from "./MessagesErea";


function Messages({user, messages}: any) {

  const [menuOpen,setMenuOpen] = useState(false);
  useEffect(() => {
    setMenuOpen(false);
  }, [user]);
  if(!user)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
        Select a friend to view messages 💬
      </div>
    );
  return (
    <div className="flex flex-col" style={{width: "100%"}}>
      <div className="chatHeader flex ">
        <div className="profile flex">
          <img
            src="./userImage.png"
            className="w-13 h-13 rounded-full mr-4"
            alt={user.name}
          />
          <span className="profileName" >{user.user2_name}</span>
        </div>
        <div className="relativeParent">
          <BsThreeDotsVertical className={`dots ${menuOpen ? "active" : ""}`}
             onClick={() => setMenuOpen((prev: boolean) => !prev)}/>
          {menuOpen && (
            <div className="dotsMenu flex flex-col ">
              <button className="firstB flex items-center gap-1.5">
                <TfiInfoAlt className="text-2xl" />
                <span >View Profile</span>
              </button>
              <button className="seconB flex items-center gap-1.5">
                <IoIosAddCircleOutline className="text-3xl" />
                <span >Invte</span>
              </button>
              <button className="thirdB flex items-center gap-1.5 ">
                <ImBlocked className="text-xl " />
                <span >Block</span>
              </button>
              </div>)}
        </div>
      </div>

      <div className="chatMessagesBox">
        <div className="messages">
          <MessagesErea user={user} messages={messages} />
        </div>
        <div className="chatInput relative">
          <input type="text" 
                placeholder="Type a message..." 
                className="ph w-full bg-transparent outline-none " />
          <BsSendFill className="sendIcon"/>
        </div>
      </div> 
    </div>
  );
}

export default Messages;


// import userImage from "../../../assets/userImage.png";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import "./Messages.css";
// import { useState, useEffect } from "react";
// import { TfiInfoAlt } from "react-icons/tfi";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { ImBlocked } from "react-icons/im";
// import { BsSendFill } from "react-icons/bs";
// import MessagesErea from "./MessagesErea";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// interface MessagesProps {
//   user: {
//     name: string;
//     messages: { from: string; text: string }[];
//   } | null;
// }

// function Messages({ user }: MessagesProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);

//   useEffect(() => {
//     if (user) {
//       setMessages(user.messages);
//       setMenuOpen(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     socket.on("receive_message", (msg: string) => {
//       setMessages((prev) => [...prev, { from: "friend", text: msg }]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputValue.trim() === "") return;
//     socket.emit("send_message", inputValue);
//     setMessages((prev) => [...prev, { from: "me", text: inputValue }]);
//     setInputValue("");
//   };

//   if (!user)
//     return (
//       <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
//         Select a friend to view messages 💬
//       </div>
//     );

//   return (
//     <div className="flex flex-col" style={{ width: "100%" }}>
//       {/* Header */}
//       <div className="chatHeader flex ">
//         <div className="profile flex">
//           <img
//             src={userImage}
//             className="w-13 h-13 rounded-full mr-4"
//             alt={user.name}
//           />
//           <span className="profileName">{user.name}</span>
//         </div>
//         <div className="relativeParent">
//           <BsThreeDotsVertical
//             className={`dots ${menuOpen ? "active" : ""}`}
//             onClick={() => setMenuOpen((prev) => !prev)}
//           />
//           {menuOpen && (
//             <div className="dotsMenu flex flex-col ">
//               <button className="firstB flex items-center gap-1.5">
//                 <TfiInfoAlt className="text-2xl" />
//                 <span>View Profile</span>
//               </button>
//               <button className="seconB flex items-center gap-1.5">
//                 <IoIosAddCircleOutline className="text-3xl" />
//                 <span>Invite</span>
//               </button>
//               <button className="thirdB flex items-center gap-1.5 ">
//                 <ImBlocked className="text-xl " />
//                 <span>Block</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="chatMessagesBox">
//         <div className="messages">
//           <MessagesErea user={{ ...user, messages }} />
//         </div>

//         {/* Input */}
//         <div className="chatInput relative">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="ph w-full bg-transparent outline-none"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <BsSendFill className="sendIcon" onClick={sendMessage} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Messages;
