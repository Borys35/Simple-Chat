import React, { Component } from 'react';
import io from 'socket.io-client';
import UsersList from './UsersList';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

class Chat extends Component {
  state = {
    users: [],
    messages: []
  };

  constructor(props) {
    super(props);

    this.socket = io('http://localhost:5000');
    this.socket.emit('connected', props.username, props.roomName);

    this.socket.on('init', (users, username) => {
      this.setState({ users: [...this.state.users, ...users] });
      this.setState({
        messages: [...this.state.messages, `${username} has joined`]
      });
    });

    this.socket.on('connected', username => {
      this.setState({ users: [...this.state.users, username] });
      this.setState({
        messages: [...this.state.messages, `${username} has joined`]
      });
    });

    this.socket.on('send message', (msg, username) => {
      const finalMsg = `${username}: ${msg}`;
      this.setState({ messages: [...this.state.messages, finalMsg] });
    });

    this.socket.on('disconnected', users => {
      this.setState({ users });
    });
  }

  handleSend(msg) {
    this.socket.emit('send message', msg, this.props.username);
    const finalMsg = `${this.props.username} (You): ${msg}`;
    this.setState({ messages: [...this.state.messages, finalMsg] });
  }

  render() {
    return (
      <div className="neu content-grid">
        <UsersList
          className="list"
          users={this.state.users}
          roomName={this.props.roomName}
        />
        <ChatBox className="box" messages={this.state.messages} />
        <ChatInput className="input" onSend={this.handleSend.bind(this)} />
      </div>
    );
  }
}

export default Chat;
