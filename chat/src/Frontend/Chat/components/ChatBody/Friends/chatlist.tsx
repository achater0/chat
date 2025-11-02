

import "./chatlist.css";
import userImage from "../../../assets/userImage.png";


interface ChatListProps {
    users: any[];
    onSelectUser: (user: any) => void;
    selectedUser: any;
    }

function ChatList({ users, onSelectUser, selectedUser } : ChatListProps) {
  return (
    <ul className="overflow-y-auto" style={{ height: "calc(100vh - 200px)" }}>
      {users.map((user, index) => (
        <li
          key={index}
          onClick={() => onSelectUser(user)}
          className={`element flex ${
            selectedUser?.id === user.id ? "active" : ""
          }`}
        >
          <img
            src={userImage}
            className="w-12 h-12 rounded-full mr-4"
            alt={user.name}
          />
          <div className="flex flex-col justify-center">
            <span className="name">{user.user2_name}</span>
            <span className="lastMessage ">
              {/* {user.lastMessage ?? "Start a conversation"} */}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ChatList;
