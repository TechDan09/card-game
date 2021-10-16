const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 5000;

app.use(
  session({
    secret: 'secure pass',
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
  socket.on('drop', (id) => {
    io.emit('drop', id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
