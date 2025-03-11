import Die from "./components/Die";
import { useState , useEffect ,useRef } from "react";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function App() {
  function generateAllNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.ceil(Math.random() * 6);
      arr.push({ value: randomNumber, isHeld: false, id: nanoid() });
    }
    return arr;
  }
  const restartGameRef = useRef(null)
  const [randomDice, setRandomdice] = useState(() => generateAllNewDice());

  const gameWon =
    randomDice.every((die) => die.isHeld) &&
    randomDice.every((die) => die.value === randomDice[0].value);

  const { width, height } = useWindowSize();

  useEffect(()=>{
    if(gameWon){
      restartGameRef.current.focus();
    }
  } ,[gameWon])
  

  function hold(editedId) {
    setRandomdice((prev) => {
      return prev.map((die) => {
        return die.id === editedId ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function rollDice() {
    if(gameWon){
      setRandomdice(generateAllNewDice());
      return;
    }
    setRandomdice((prev) => {
      return prev.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      });
    });
  }

  const dice = randomDice.map((die, index) => {
    return <Die data={die} key={die.id} hold={hold} />;
  });

  return (
    <main>
      {gameWon && <Confetti width={width - 1} height={height - 1} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dice}</div>
      <button className="roll-button" onClick={rollDice} ref={restartGameRef}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
