import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const WIN_COMBINATIONS = [
  [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}],
  [{row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2}],
  [{row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2}],
  [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}],
  [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}],
  [{row: 0, col: 2}, {row: 1, col: 2}, {row: 2, col: 2}],
  [{row: 0, col: 0}, {row: 1, col: 1}, {row: 2, col: 2}],
  [{row: 0, col: 2}, {row: 1, col: 1}, {row: 2, col: 0}],
]

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playersName, setPlayersName] = useState(
    {
      'X': "Player 1",
      'O': "Player 2"
    }
  )
  let winner;
  let draw = gameTurns.length === 9;
  let gameBoard = initialGameBoard.map(X => {
    return [...X];
  });

  for (const turn of gameTurns) {
    const {location, player} = turn;
    const { row, col} = location;
    gameBoard[row][col] = player;
  }

  for(const combination of WIN_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    if(firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = (firstSquareSymbol === 'X'? playersName.X : playersName.O);
    }
  }

  let activePlayer = 'X';
  if(gameTurns && gameTurns.length > 0) {
    if(gameTurns[0].player == 'X')  activePlayer = 'O' 
  };

  function handleSelectSquare(rowIndex, colIndex){
    let curPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X') curPlayer = 'O';

    setGameTurns((prevTurns) => {
      const updatedTurns = [
        {location: {row: rowIndex, col: colIndex}, player: curPlayer},
        ... prevTurns];
      return updatedTurns;
    });
  
  }

  function handleRestart() {
    setGameTurns([]);
  }
  
  function handleChangePlayerName(symbol, newName) {
    setPlayersName(prevName => {
      return {
        ...prevName,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={playersName.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handleChangePlayerName} 
          />
          <Player 
            initialName={playersName.O} 
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handleChangePlayerName}
          />
        </ol>

        {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>

      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
