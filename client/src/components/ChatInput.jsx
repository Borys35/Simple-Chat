import React, { useState } from 'react';

function ChatInput(props) {
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSend() {
    props.onSend(message);
    setMessage('');
  }

  return (
    <div className="input">
      <input
        className="neu"
        type="text"
        value={message}
        placeholder="Enter your message..."
        autoFocus
        onChange={handleChange}
        onKeyPress={e => e.key === 'Enter' && handleSend()}
      />
      <button className="neu glow" onClick={handleSend}></button>
    </div>
  );
}

export default ChatInput;
