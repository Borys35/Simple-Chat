import React, { useState, useEffect } from 'react';

function Login(props) {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [valid, setValid] = useState(false);

  function handleUsernameChange(e) {
    const value = e.target.value;
    if (value.length <= 16) setUsername(e.target.value);
  }

  function handleRoomNameChange(e) {
    const value = e.target.value;
    if (value.length <= 8) setRoomName(e.target.value);
  }

  useEffect(() => {
    setValid(username !== '' && roomName !== '');
  }, [username, roomName]);

  function handleSubmit() {
    if (valid === false) return;
    props.onSubmit(username, roomName);
  }

  return (
    <div className="neu login">
      <h1 className="glow title">Login</h1>
      <label className="label" htmlFor="username">
        Username
      </label>
      <input
        className="neu input"
        id="username"
        type="text"
        value={username}
        placeholder="Enter your username..."
        autoFocus
        autoComplete="off"
        onChange={handleUsernameChange}
        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
      />
      <label className="label" htmlFor="room-name">
        Room name
      </label>
      <input
        className="neu input"
        id="room-name"
        type="text"
        value={roomName}
        placeholder="Enter room name..."
        autoComplete="off"
        onChange={handleRoomNameChange}
        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
      />
      <button className="neu glow btn" disabled={!valid} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Login;
