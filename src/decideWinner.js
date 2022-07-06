const checkWinningChoice = (choice1, choice2) => {
  const choiceCombinations = {
    rock: { rock: 0, scissors: 1, paper: 2 },
    paper: { paper: 0, rock: 1, scissors: 2 },
    scissors: { scissors: 0, paper: 1, rock: 2 }
  };

  return choiceCombinations[choice1][choice2];
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
