const socket = io();

function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

let items = document.querySelectorAll('.card');
items.forEach(function (item) {
  item.addEventListener('dragstart', onDragStart);
});

function handleBoxDragOver(e) {
  e.preventDefault();
}

socket.on('message', (msg) => {
  console.log(msg);
});

function handleBoxDrop(e) {
  const id = e.dataTransfer.getData('text');
  // const draggableElement = document.getElementById(id);
  let dropzone = e.target;
  // console.log(draggableElement.outerHTML);
  socket.emit('drop', id);
  // console.log(dropZone);
  // dropzone.appendChild(draggableElement);

  socket.on('drop', (id) => {
    console.log('todrop: ' + id);
    let temp = document.getElementById(id);
    console.log(e.target);
    e.target.appendChild(temp);
  });

  e.dataTransfer.clearData();
}

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
