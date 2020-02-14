import React, { useEffect, useRef } from 'react';

function ChatBox(props) {
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current.scrollIntoView();
  }, [props.messages]);

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
      <div ref={chatEnd}></div>
    </div>
  );
}

export default ChatBox;
