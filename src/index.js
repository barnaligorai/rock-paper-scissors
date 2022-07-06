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

const randomChoice = (choices) => {
  return choices[randomInt(choices.length)];
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

  getAllChoices() {
    return this.#choices.map(choice => choice.getInfo().id);
  }
};

const removeEventListeners = (game) => {
  const choices = game.getAllChoices();
  choices.forEach(choice => {
    const htmlElement = document.getElementById(choice);
    htmlElement.onclick = null;
  });
};

const addEventListeners = (game, startGame) => {
  const choices = game.getAllChoices();
  choices.forEach(choice => {
    const htmlElement = document.getElementById(choice);
    htmlElement.onclick = (event) => {
      const playerChoice = event.target.id;
      startGame(game, playerChoice);
    };
  });
};

const startGame = (game, pChoice) => {
  const randChoice = randomChoice(['rock', 'paper', 'scissors']);
  const path = `images/${randChoice}.png`;
  const cChoice = new Choice(randChoice, path);

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
  addEventListeners(game, startGame);
};
