class Icon {
  #id;
  #path;
  constructor(id, path) {
    this.#id = id;
    this.#path = path;
  }

  getInfo() {
    return { id: this.#id, path: this.#path };
  }
};

const checkWinningChoice = (choice1, choice2) => {
  if (choice1 === choice2) {
    return 0;
  }

  if (choice1 === 'rock' && choice2 === 'scissors' ||
    choice1 === 'paper' && choice2 === 'rock' ||
    choice1 === 'scissors' && choice2 === 'paper') {
    return 1;
  }

  return 2;
};

const decideWinner = (choice1, choice2) => {
  const winningChoice = checkWinningChoice(choice1, choice2);

  if (winningChoice === 0) {
    return 'draw';
  }

  if (winningChoice === 1) {
    return 'Player';
  }

  return 'Computer';
};

const drawComputerChoice = (choice, icons) => {
  const computerChoiceElement = document.getElementById('computer-choice');
  const computerCardElement = document.getElementById('computer');
  computerChoiceElement.innerText = '';

  const { path, id } = icons[choice].getInfo();
  const imgTag = document.createElement('img');
  imgTag.src = path;
  computerChoiceElement.appendChild(imgTag);

  const divTag = document.createElement('div');
  divTag.innerText = `Computer's choice : ${id}`;
  computerCardElement.appendChild(divTag);
};

const displayPlayerChoice = (pChoice) => {
  const playerChoiceElement = document.getElementById('player-choice');
  playerChoiceElement.innerText = `Your choice : ${pChoice}`;
};

const declareWinner = (winner) => {
  let innerText = `${winner} won this round.`;
  if (winner === 'draw') {
    innerText = 'Match drawn !!!';
  }

  const divTag = document.createElement('div');
  const h2Tag = document.createElement('h2');
  h2Tag.style.color = '#480CA8';
  divTag.id = 'winner';
  h2Tag.innerText = innerText;

  const displayElement = document.getElementById('game-area');
  divTag.append(h2Tag);
  displayElement.appendChild(divTag);
};

const startGame = () => {
  const rock = new Icon('rock', 'images/rock.png');
  const paper = new Icon('paper', 'images/paper.png');
  const scissors = new Icon('scissors', 'images/scissors.png');

  const icons = { rock, paper, scissors };

  const pChoice = 'rock'; // get from event
  const cChoice = 'scissors'; // generate computer's choice
  drawComputerChoice(cChoice, icons);
  displayPlayerChoice(pChoice);

  const winner = decideWinner(pChoice, cChoice);
  declareWinner(winner);

};

window.onload = startGame;