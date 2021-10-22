const socket = io();
const getCardsPlayer1 = document.getElementById('get-player1-cards');
const getCardsPlayer2 = document.getElementById('get-player2-cards');
var clientRoom;

getCardsPlayer1.addEventListener('click', () => {
  fetch('http://localhost:5000/get-heroes')
    .then((response) => response.json())
    .then((data) => {
      let selectedCards = getRandom(data, 6);
      socket.emit('getCardsPlayer1', selectedCards, clientRoom);
    });
});

getCardsPlayer2.addEventListener('click', () => {
  fetch('http://localhost:5000/get-heroes')
    .then((response) => response.json())
    .then((data) => {
      let selectedCards = getRandom(data, 6);
      socket.emit('getCardsPlayer2', selectedCards, clientRoom);
    });
});

socket.on('getCardsPlayer1', (data) => {
  Ui.pastePlayer1Cards(data);
});

socket.on('getCardsPlayer2', (data) => {
  Ui.pastePlayer2Cards(data);
});

function getRandom(arr, n) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function handleBoxDragOver(e) {
  e.preventDefault();
}

socket.on('message', (msg) => {
  document.getElementById('result').innerText = msg;
});

socket.on('room-no', (roomNo) => {
  console.log(roomNo);
  clientRoom = roomNo;
});

function handleBoxDrop(e) {
  const id = e.dataTransfer.getData('text');
  let dropzoneId = e.target.id;
  console.log(dropzoneId);
  socket.emit('drop', id, dropzoneId, clientRoom);
  e.dataTransfer.clearData();
}

socket.on('drop', (id, dropzoneId) => {
  console.log('todrop: ' + id);
  console.log(dropzoneId);
  let droppable = document.getElementById(id);
  let dropzone = document.getElementById(dropzoneId);
  dropzone.appendChild(droppable);
});

document.addEventListener('DOMContentLoaded', (event) => {
  let dropZoneBox = document.querySelectorAll('.drop-zone');
  dropZoneBox.forEach((item) => {
    item.addEventListener('drop', handleBoxDrop);
    item.addEventListener('dragover', handleBoxDragOver);
  });

  document
    .querySelector('.player1-box')
    .addEventListener('drop', handleBoxDrop);
  document
    .querySelector('.player2-box')
    .addEventListener('drop', handleBoxDrop);
  document
    .querySelector('.player1-box')
    .addEventListener('dragover', handleBoxDragOver);
  document
    .querySelector('.player2-box')
    .addEventListener('dragover', handleBoxDragOver);
});
