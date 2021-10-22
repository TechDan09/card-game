class Ui {
  constructor() {}

  static pastePlayer1Cards(arr) {
    // console.log(arr);
    const player1Box = document.getElementById('player1-box');
    let markup = '';

    arr.forEach((card) => {
      markup += `<div class="card" id="card-${card.id}" draggable="true">
              <img src="./assets/avengers/${card.image}" draggable="false">
              <p id="attack">${card.attack}</p>
              <p id="defence">${card.defense}</p>
              <p id="cost">${card.cost}</p>
              <h6 id="name">${card.heroname}</h6>
            </div>`;
    });
    player1Box.innerHTML = markup;

    let items = document.querySelectorAll('.card');
    items.forEach(function (item) {
      item.addEventListener('dragstart', onDragStart);
    });
  }

  static pastePlayer2Cards(arr) {
    // console.log(arr);
    const player2Box = document.getElementById('player2-box');
    let markup = '';
    arr.forEach((card) => {
      markup += `<div class="card" id="card-${card.id}" draggable="true">
              <img src="./assets/avengers/${card.image}" draggable="false">
              <p id="attack">${card.attack}</p>
              <p id="defence">${card.defense}</p>
              <p id="cost">${card.cost}</p>
              <h6 id="name">${card.heroname}</h6>
            </div>`;
    });
    player2Box.innerHTML = markup;
    let items = document.querySelectorAll('.card');
    items.forEach(function (item) {
      item.addEventListener('dragstart', onDragStart);
    });
  }
}
