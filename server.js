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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('message', 'You are connected');

  socket.on('drop', (id, dropzoneId) => {
    io.emit('drop', id, dropzoneId);
  });

  socket.on('disconnect', function () {
    console.log('A player disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
