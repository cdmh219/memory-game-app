import { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import Player from './components/Player/Player';
import './App.css'

const letters = ['A','A','B','B','C','C',
                 'D','D','E','E','F','F',
                 'G','G','H','H','I','I',
                 'J','J','K','K','L','L',
                 'M','M','N','N','O','O',
                 'P','P','Q','Q','R','R'];

  const initBoard = () => [...letters].sort(() => Math.random()-0.5).map(letter => (
    { id: crypto.randomUUID(), value: letter, flipped: false }
  ))

function App() {
  const [turnCount, setTurnCount] = useState(0);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [boardData, setBoardData] = useState(initBoard());
  const [selectedCards, setSelectedCards] = useState([]);

  const isPlayer1 = (turnCount % 2 === 0);

  const resetGame = () => {
    setTurnCount(0);
    setP1Score(0);
    setP2Score(0);
    setGameOver(false);
    setBoardData(initBoard());
    setSelectedCards([]);
  };

  const handleCardSelection = (card) => {  
    if (selectedCards.length < 2) {
      setBoardData(boardData.map(item => {
        if (item.id === card.id) {
          return {...item, flipped: !item.flipped};
        }
        return item;
      }));  

      setSelectedCards([...selectedCards, { id: card.id, value: card.value }]);
    }
  };

  useEffect(() => {
    const getAllFlippedCards = () => boardData.filter(card => card.flipped === true);

    const updatePlayerScore = () => {
      if(isPlayer1) {
        setP1Score(ps => ps+1)
      }
      else{
        setP2Score(ps => ps+1)
      }
    };

    const resetFlippedCards = () => {
      const selectedIds = selectedCards.map(card => card.id);
      setBoardData(boardData.map(item => {
        if (selectedIds.includes(item.id)) {
          return {...item, flipped: false};
        }
        return item;
      }));
      setSelectedCards([]); 
      setTurnCount(t => t+1);
    };

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const handleSecondCardSelection = async() => {
      //if this is 2nd selection:
      if (selectedCards.length === 2) {
        await delay(1000);
        //if cards match:
        if (selectedCards[0].value === selectedCards[1].value) {
          updatePlayerScore();
          //if all cards are unplayable, then game over
          const unplayableCards = getAllFlippedCards();
          if (unplayableCards.length === boardData.length) {
            setGameOver(true);
          }
          setSelectedCards([]); 
          setTurnCount(t => t+1);
        }
        else {
          resetFlippedCards();
        }
      };
    }

    handleSecondCardSelection();

    return () => clearTimeout(delay);

  }, [selectedCards, boardData, isPlayer1])


  return (
    <div className="app">
      <h1>Memory!</h1>
      <p>Find as many card matches as possible. The player with the most matches at the end wins.</p>
      <div className="app__players">
        <Player name="Player 1" score={p1Score} isActive={isPlayer1} />
        <Player name="Player 2" score={p2Score} isActive={!isPlayer1} />
      </div>
      
      <button onClick={resetGame}>Reset Game</button>
      { (gameOver && p1Score > p2Score) && <p>Player 1 WINS!!!</p> }
      { (gameOver && p2Score > p1Score) && <p>Player 2 WINS!!!</p> }
      { (gameOver && p1Score === p2Score) && <p>It's a tie :-/</p> }
      
      <Board data={boardData} onCardSelection={handleCardSelection}/>
    </div>
  )
}

export default App;
