
import "./MessagesErea.css";

interface MessagesProps {
  user: {
    name: string;
    messages: { from: string; text: string }[];
  } | null;
}

function MessagesErea({user}: MessagesProps) {

  if (!user) {
    return ;
  }
  if (user.messages.length === 0) {
    return (
      <div className="emptyMessages">
        No messages yet — say hi to {user.name} 👋
      </div>
    );
  }

  return (
    <div className="messagesArea">
      {user.messages.map((msg, index) => (
        <div
          key={index}
          className={`messageRow ${
            msg.from === "me" ? "sent" : "received"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}


export default MessagesErea;