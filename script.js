const Gameboard = (() => {
  const board = ["","","","","","","","",""];

  const getBoard = () => board;

  const makeMove = (index, player) => {
      if (board[index] === "") {
          board[index] = player;
          return true;
      }
      return false;
  }

  const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
          board[i] = "";
      }
  }
  return {getBoard, makeMove, resetBoard}
})();

const Player = (playerName, symbol) => {
  return {playerName, symbol}
}

const DisplayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const resultDisplay = document.querySelector('.result');

  const updateDisplay = () => {
    Gameboard.getBoard().forEach((value, index) => {
      cells[index].textContent = value;
    });
  };

  const resetDisplay = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  const bindCellClick = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        if (Gameboard.makeMove(index, Game.getCurrentPlayer().symbol)) {
          updateDisplay();
          if (Game.checkForWinner(Game.getCurrentPlayer().symbol)) {
            displayResult(`${Game.getCurrentPlayer().playerName} wins!`);
            Game.resetGame();
          } else if (Game.isBoardFull()) {
            displayResult("It's a tie!");
            Game.resetGame();
          } else {
            Game.switchPlayer();
          }
        }
      });
    });
  };

  const displayResult = (result) => {
    resultDisplay.textContent = result;
  };

  return { updateDisplay, resetDisplay, bindCellClick };
})();

  
  // Game flow controller
  const Game = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
  
    const startGame = () => {
      DisplayController.bindCellClick();
    };
  
    const checkForWinner = (symbol) => {
        const board = Gameboard.getBoard()

        //Chech for row
        for (let i = 0; i < 9; i+=3) {
            if (board[i] === symbol && board[i+1] === symbol && board[i+2] === symbol) {
                return symbol;
            };
        };

        //Check for column
        for (let i = 0; i < 3; i++) {
            if (board[i] === symbol && board[i+3] === symbol && board[i+6] === symbol) {
                return symbol;
            };
        };

        //Check for diagonal
        if (board[0] === symbol && board[4] === symbol && board[8] === symbol ||
            board[2] === symbol && board[4] === symbol && board[6] === symbol) {
            return symbol
        }
        return null;
    };
  
    const isBoardFull = () => {
        const board = Gameboard.getBoard()
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                return false;
            };
        };
        return true;
    };
  
    const resetGame = () => {
      Gameboard.resetBoard();
      DisplayController.resetDisplay();
      currentPlayer = player1;
    };

    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1; 
    }

    const getCurrentPlayer = () => currentPlayer;
  
    return { startGame, resetGame, checkForWinner, isBoardFull, switchPlayer, getCurrentPlayer };
  })();
  
  // Initialize the game
  Game.startGame();

