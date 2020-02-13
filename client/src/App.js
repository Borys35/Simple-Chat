import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';

function App() {
  const [username, setUsername] = useState(null);
  const [roomName, setRoomName] = useState(null);

  function handleSubmit(newUsername, newRoomName) {
    setUsername(newUsername);
    setRoomName(newRoomName);
  }

  return (
    <div className="container">
      <Router>
        <Redirect to="" />
      </Router>
      {username === null ? (
        <Login onSubmit={handleSubmit} />
      ) : (
        <Chat username={username} roomName={roomName} />
      )}
    </div>
  );
}

export default App;
