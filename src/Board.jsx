import React, { useEffect, useState } from "react";

export default function Board() {
  const cells = Array.from({ length: 100 }, (_, i) => i + 1).reverse();

  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  const [mssg, setMssg] = useState('')
  const [dice, setDice] = useState();

  function rollDice(p) {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    if (p == 1)
      setPlayer1((prev) => {
        if (prev + diceNumber > 100) return prev;
        else return prev + diceNumber;
      });
    if (p == 2)
      setPlayer2((prev) => {
        if (prev + diceNumber > 100) return prev;
        else return prev + diceNumber;
      });
    setDice(diceNumber);
  }

  function checkWin() {
    if (player1 >= 100) {
      console.log("Player 1 win");
      setPlayer1(1);
      setPlayer2(1);
    } else if (player2 >= 100) {
      console.log("Player 2 win");
      setPlayer1(1);
      setPlayer2(1);
    }
  }

  function snakeBite() {
    if (player1 == 50){ setPlayer1(12); setMssg('Player1 Killed by Snake')}
    if (player2 == 50) { setPlayer2(12); setMssg('Player2 Killed by Snake')};

    if (player1 == 99) { setPlayer1(76); setMssg('Player1 Killed by Snake')};
    if (player2 == 99) { setPlayer2(76); setMssg('Player2 Killed by Snake')};

    if (player1 == 11) { setPlayer1(4); setMssg('Player1 Killed by Snake')};
    if (player2 == 11) { setPlayer2(4); setMssg('Player2 Killed by Snake')};
  }

  useEffect(() => {
    snakeBite();
    checkWin();
  }, [player1, player2]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "q" || e.key === "Q") {
        rollDice(1); 
      }
      if (e.key === "m" || e.key === "M") {
        rollDice(2); 
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex-col max-w-150">
      <div className="p-4">
        <div className="grid grid-cols-10 gap-1 ">
          {cells.map((cell) => (
            <div
              key={cell}
              className={`py-4 text-center rounded-lg shadow transition-all duration-1000 h-10 w-10 m-0.5 ${
                player1 === cell
                  ? "bg-yellow-400 text-black font-bold scale-110"
                  : "bg-blue-800 text-white"
              } ${
                player2 === cell
                  ? "bg-red-500 text-black font-bold scale-110"
                  : "bg-blue-800 text-white"
              }`}
            >
              {cell === 50 || cell == 99 || cell == 11 ? "🐍" : cell}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded flex flex-col justify-center items-center">
        <div>
          <button
            onClick={() => rollDice(1)}
            className="border m-2 p-5 rounded bg-yellow-400 hover:scale-105 transition-all ease-out"
          >
            Player1
          </button>
          <button
            onClick={() => rollDice(2)}
            className="border p-5 rounded bg-red-500 hover:scale-105 transition-all ease-out"
          >
            Player2
          </button>
        </div>
        <span className="font-bold text-3xl">{dice}</span>
        <h6>{mssg}</h6>
      </div>
    </div>
  );
}
