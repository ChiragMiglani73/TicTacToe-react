import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circlem.png';
import cross_icon from '../assets/crossm.png';

let initialData = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [data, setData] = useState([...initialData]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  
  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return;
    }

    const newData = [...data];
    newData[num] = count % 2 === 0 ? 'x' : 'o';
    setData(newData);
    setCount(count + 1);
    
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: ${winner === 'x' ? '<img src=' + cross_icon + ' />' : '<img src=' + circle_icon + ' />'} Wins`;
  };

  const reset = () => {
    setLock(false);
    setData([...initialData]);
    setCount(0);
    titleRef.current.innerHTML = 'Tic Tac Toe';
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
      <div className='board'>
        {[0, 1, 2].map((i) => (
          <div className="row" key={`row-${i}`}>
            {[i * 3, i * 3 + 1, i * 3 + 2].map((index) => (
              <div 
                className="boxes" 
                key={index} 
                onClick={() => toggle(index)}
              >
                {data[index] === 'x' ? <img src={cross_icon} alt="X" /> : data[index] === 'o' ? <img src={circle_icon} alt="O" /> : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;


