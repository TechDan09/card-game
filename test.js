const io = require('./io').io();

io.on('connection', (socket) => {
  players++;
  console.log('a user connected');
  console.log(`Players on server ${players}`);
  socket.emit('message', 'You are connected, Join a room');

  socket.on('createRoom', () => {
    let roomId = generateRoomId();
    socket.join(roomId);
    // socket.room = roomId;
    console.log(socket.rooms);
    socket.emit('getRoomId', roomId);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(socket.rooms);
  });

  socket.on('drop', (id, dropzoneId) => {
    io.emit('drop', id, dropzoneId);
  });

  socket.on('disconnect', function () {
    players--;
    console.log('A player disconnected');
    console.log(`Players on server ${players}`);
  });
});
