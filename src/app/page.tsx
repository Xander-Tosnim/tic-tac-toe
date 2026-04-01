'use client'

import { useEffect, useState } from "react";

export default function Home() {
  
  type Player = "X" | "O" | null;

  const [ board   , setBoard   ] = useState<Player[]>(Array(9).fill(null));
  const [ isXTurn , setIsXTurn ] = useState<boolean>(true);

  const toWinCombination: number[][] = [
    // for horizontal
    [ 0 , 1 , 2 ],
    [ 3 , 4 , 5 ],
    [ 6 , 7 , 8 ],
    // for vertical
    [ 0 , 3 , 6 ],
    [ 1 , 4 , 7 ],
    [ 2 , 5 , 8 ],
    // for cross-ways
    [ 0 , 4 , 8 ],
    [ 2 , 4 , 6 ]
  ]

  const getWinner = (squares: Player[]) => {
    for(let combination of toWinCombination) {
      const [ a , b , c ] = combination;

      if(
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] 
      ) return squares[a]
    }

    return null;
  }

  const handleSquareClick = (i: number): void => {
    if( board[i] || getWinner(board) ) return;

    const updatedBoard = [...board];
    updatedBoard[i] = isXTurn ? "X" : "O";

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn); 
  }

  const resetGame = ():void => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  const getGameStatus = (): string => {
    const winner = getWinner(board);

    if(winner) return `Winner: ${winner}`;

    if(board.every((square) => square !== null)) return "It's a Draw!"

    return `Turn For Player: ${isXTurn ? "X" : "O"}`;
  }
  
  useEffect(() => {
    const winner = getWinner(board);
    const draw = board.every((square) => square !== null);

    if( winner || draw ) setTimeout(() => { resetGame() }, 2000) ;

  }, [board]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="w-full max-w-md mx-5">
        <h1 className="text-5xl font-semibold text-white mb-8 text-center">TIC TAC TOE</h1>

        <div className={`text-center mb-6 ${getWinner(board) ? "text-2xl font-bold text-green-400 animate-bounce" : "text-xl text-white"}`}>
          {getGameStatus()}
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map(( square , index ) => (
            <button 
              key={index} 
              onClick={() => handleSquareClick(index)} 
              className={`h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-700 ${square === "X" ? "text-white" : "text-slate-400"}`}
            >
              {square}
            </button>
          ))}
        </div>

        <button 
          className="w-full py-3 text-lg text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
          onClick={() => resetGame()}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
