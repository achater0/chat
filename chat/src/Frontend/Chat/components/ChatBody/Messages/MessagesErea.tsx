
import "./MessagesErea.css";


function MessagesErea({user, messages}: any ) {

  if (!user) {
    return ;
  }
  if (messages.length === 0) {
    return (
      <div className="emptyMessages">
        No messages yet — say hi to {user.name} 👋
      </div>
    );
  }

  return (
    <div className="messagesArea">
      {messages.map((msg : any, index : number) => (
        <div
          key={index}
          className={`messageRow ${
            msg.sender_id == user.id ? "received" : "sent"
          }`}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
}


export default MessagesErea;