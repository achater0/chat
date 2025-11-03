

"use client";
import "./Friends.css";
import ChatList from "./chatlist";

interface FriendsProps {
  users: any[];
  onSelectUser: (user: any) => void;
  selectedUser: any;
}

function Friends({ users, onSelectUser, selectedUser } : FriendsProps) {
  return (
    <div className="friends">
      <input
        type="text"
        placeholder="Search"
        className="search text-center"
      />
      <div className="item">
        <p className="message text-bold text-[24px] mb-3">Messages</p>
        <ChatList
          users={users}
          onSelectUser={onSelectUser}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
}

export default Friends;
