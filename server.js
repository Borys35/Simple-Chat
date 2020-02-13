const server = require('http').createServer();
const io = require('socket.io')(server);

// DABATABE TO IMPLEMENT IN FUTURE
const rooms = [];

io.on('connection', socket => {
  let user;
  let room;

  socket.on('connected', (username, roomName) => {
    user = username;

    const i = rooms.findIndex(r => r.name === roomName);
    if (i === -1) {
      const l = rooms.push({
        name: roomName,
        users: [user]
      });
      room = rooms[l - 1];
    } else {
      rooms[i].users.push(user);
      room = rooms[i];
    }

    socket.join(room.name);
    socket.emit('init', room.users, user);
    socket.to(room.name).emit('connected', user);
  });

  socket.on('disconnect', () => {
    const i = room.users.indexOf(user);
    room.users.splice(i, 1);
    io.emit('disconnected', room.users);
  });

  socket.on('send message', (msg, username) => {
    socket.to(room.name).emit('send message', msg, username);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
