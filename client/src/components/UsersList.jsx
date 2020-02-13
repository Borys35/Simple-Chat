import React from 'react';

function UsersList(props) {
  return (
    <div className="users-list">
      <h2 className="glow center">Room: {props.roomName}</h2>
      <ul>
        {props.users.map((u, i) => {
          return <li key={i}>{u}</li>;
        })}
      </ul>
    </div>
  );
}

export default UsersList;
