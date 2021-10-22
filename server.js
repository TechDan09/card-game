const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const http = require('http');
const fs = require('fs');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 5000;
const config = fs.readFileSync(path.resolve(__dirname, 'config.json'));
const parsed = JSON.parse(config);
const mysql = require('mysql2/promise');
var MySQLStore = require('express-mysql-session')(session);
const connection = mysql.createPool(parsed);
const Hero = require('./models/hero');
const hero = new Hero();
const sessionStore = new MySQLStore(
  {
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: 'sessiontbl',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  connection
);

app.use(
  session({
    key: 'securepass',
    secret: 'securepass',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(router);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let players = 0;

function generateRoomId() {
  return Math.random().toString(36).substring(2, 13);
}

io.on('connection', (socket) => {
  players++;
  console.log('a user connected');
  console.log(`Players on server ${players}`);

  if (players % 2 !== 0) {
    socket.emit('message', 'You are player 1');
  } else {
    socket.emit('message', 'You are player 2');
  }

  socket.join(Math.round(players / 2));
  socket.emit('room-no', Math.round(players / 2));

  // socket.on('createRoom', () => {
  //   let roomId = generateRoomId();
  //   socket.join(roomId);
  //   // socket.room = roomId;
  //   console.log(socket.rooms);
  //   socket.emit('getRoomId', roomId);
  // });

  // socket.on('joinRoom', (roomId) => {
  //   socket.join(roomId);
  //   console.log(socket.rooms);
  //   socket.emit('joinRoom', roomId);
  // });

  socket.on('getCardsPlayer1', (selectedCards, clientRoom) => {
    io.to(clientRoom).emit('getCardsPlayer1', selectedCards);
  });

  socket.on('getCardsPlayer2', (selectedCards, clientRoom) => {
    io.to(clientRoom).emit('getCardsPlayer2', selectedCards);
  });

  socket.on('winner', (msg, clientRoom) => {
    console.log(msg);
    io.to(clientRoom).emit('winner', msg);
  });

  socket.on('drop', (id, dropzoneId, clientRoom) => {
    console.log(clientRoom);
    io.to(clientRoom).emit('drop', id, dropzoneId);
  });

  socket.on('disconnect', function () {
    players--;
    console.log('A player disconnected');
    console.log(`Players on server ${players}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
