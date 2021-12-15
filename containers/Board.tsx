import { useState, useEffect } from "react";
import Square from "../components/Square";
type Player = 'X' | 'O' | 'BOTH' | null

function calculateWinner(squares: Player[]) {
  console.log(squares);
  
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 9],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] && 
      squares[a] === squares[b] && 
      squares[a] === squares[c]
      ) {
        return squares[a]
    }
  }
  return null
}


function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  // console.log(Array(9).fill(null)); INI AKAN MEMBUAT ARRAY SEBANYAK 9 DAN VALUE NYA null
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  )
  
  const [winner, setWinner] = useState<Player>(null)

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer
      }

      return val
    })

    setSquares(newData);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    
  }


  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
  }

  useEffect(() => {
    const w = calculateWinner(squares);
    console.log(w);
    
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length ) {
      setWinner('BOTH')
    }
  })

  return (
  <div>
    {!winner && <p>Hey {currentPlayer} its your turn</p>}
    {winner && winner !== 'BOTH' && <p>Congratulations {winner}</p>}
    {winner && winner === 'BOTH' && <p>Congratulations your both winners</p>}
    <div className="grid">
    {
      Array(9).fill(null).map((_, i) => {
        return <Square 
        key={i}
        value={squares[i]}
        onClick={() => setSquareValue(i)}
        winner={winner}
        />
      })
    }
    </div>
    <button className="reset" onClick={reset} >Reset</button>
  </div>
    )
}

export default Board;