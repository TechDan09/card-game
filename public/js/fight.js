const fightBtn = document.getElementById('fight');
const zone1 = document.getElementById('zone1');
const zone2 = document.getElementById('zone2');
const zone3 = document.getElementById('zone3');
const zone4 = document.getElementById('zone4');
const result = document.getElementById('result');

function handleFight() {
  console.log(clientRoom);

  const zone1AttackPoints = zone1.children[0].children[1].innerHTML || 0;
  const zone2AttackPoints = zone2.children[0].children[1].innerHTML || 0;

  const zone1DefencePoints = zone1.children[0].children[2].innerHTML || 0;
  const zone2DefencePoints = zone2.children[0].children[2].innerHTML || 0;

  let player1Attack = Number(zone1AttackPoints) + Number(zone2AttackPoints);
  let player1Defense = Number(zone1DefencePoints) + Number(zone2DefencePoints);

  const zone3AttackPoints = zone3.children[0].children[1].innerHTML || 0;
  const zone4AttackPoints = zone4.children[0].children[1].innerHTML || 0;

  const zone3DefensePoints = zone3.children[0].children[2].innerHTML || 0;
  const zone4DefensePoints = zone4.children[0].children[2].innerHTML || 0;

  let player2Attack = Number(zone3AttackPoints) + Number(zone4AttackPoints);
  let player2Defense = Number(zone3DefensePoints) + Number(zone4DefensePoints);

  let player1Damage = player1Attack - player2Defense;
  let player2Damage = player2Attack - player1Defense;

  console.log(player1Damage);
  console.log(player2Damage);

  let msg;

  if (player1Damage > player2Damage) {
    msg = `Player 1 Wins This Round`;
    socket.emit('winner', msg, clientRoom);
  } else if (player2Damage > player1Damage) {
    msg = `Player 2 Wins This Round`;
    socket.emit('winner', msg, clientRoom);
  } else if (player2Damage === player1Damage) {
    msg = `Round Was A Tie`;
    socket.emit('winner', msg, clientRoom);
  }
}

socket.on('winner', (msg) => {
  result.textContent = msg;
  clearDropZones();
});

function clearDropZones() {
  zone1.innerHTML = '';
  zone2.innerHTML = '';
  zone3.innerHTML = '';
  zone4.innerHTML = '';
}

fightBtn.addEventListener('click', handleFight);
