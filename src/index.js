class Choice {
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

const randomInt = (num) => Math.floor(Math.random() * num);

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

const drawComputerChoice = (choice) => {
  const computerChoiceElement = document.getElementById('computer-choice');
  const computerCardElement = document.getElementById('computer');
  computerChoiceElement.innerText = '';

  const { path, id } = choice.getInfo();
  const imgTag = document.createElement('img');
  imgTag.src = path;
  computerChoiceElement.appendChild(imgTag);

  const divTag = document.createElement('div');
  divTag.innerText = `Computer's choice : ${id}`;
  computerCardElement.appendChild(divTag);
};

const displayPlayerChoice = (choice) => {
  const playerChoiceElement = document.getElementById('player-choice');
  playerChoiceElement.innerText = `Your choice : ${choice}`;
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

class Game {
  #choices;
  #rock;
  #paper;
  #scissors;
  constructor(rock, paper, scissors) {
    this.#rock = rock;
    this.#paper = paper;
    this.#scissors = scissors;
    this.#choices = [rock, paper, scissors];
  }

  randomChoice() {
    return this.#choices[randomInt(this.#choices.length)];
  }

  getIds() {
    return this.#choices.map(choice => choice.getInfo().id);
  }
};

const removeEventListeners = (game) => {
  const ids = game.getIds();
  ids.forEach(id => {
    const htmlElement = document.getElementById(id);
    htmlElement.onclick = null;
  });
};

const addEventListeners = (game, startGame) => {
  const ids = game.getIds();
  ids.forEach(id => {
    const htmlElement = document.getElementById(id);
    htmlElement.onclick = (event) => {
      const playerChoice = event.target.id;
      startGame(playerChoice);
    };
  });
};

const main = (game) =>
  (pChoice) => {
    const cChoice = game.randomChoice();

    drawComputerChoice(cChoice);
    displayPlayerChoice(pChoice);

    const winner = decideWinner(pChoice, cChoice.getInfo().id);
    declareWinner(winner);
    removeEventListeners(game);
  };

const setUpGame = () => {
  const rock = new Choice('rock', 'images/rock.png');
  const paper = new Choice('paper', 'images/paper.png');
  const scissors = new Choice('scissors', 'images/scissors.png');

  const game = new Game(rock, paper, scissors);
  return game;
};

window.onload = () => {
  const game = setUpGame();
  addEventListeners(game, main(game));
};
