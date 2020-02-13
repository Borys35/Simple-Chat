import React from 'react';

function ChatBox(props) {
  return (
    <div className="chat-box">
      <ul>
        {props.messages.map((m, i) => {
          return (
            <li key={i} className="chat-message">
              {m}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChatBox;
