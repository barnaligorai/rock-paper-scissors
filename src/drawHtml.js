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
