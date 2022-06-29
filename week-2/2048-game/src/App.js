import Header from "./Header";
import Game from "./Game";
import Footer from "./Footer";
import CustomModal from "./CustomModal";
import React, { useRef, useState } from "react";
import "./App.css";

let curScore = 0;
let bestScore = 0;

function App() {
  const childRef = useRef();
  const modalRef = useRef();

  if (localStorage.getItem("best")) {
    bestScore = parseInt(localStorage.getItem("best"));
  }

  const [score, setScore] = useState(curScore);
  const [best, setBest] = useState(bestScore);

  const handleCallback = (childData) => {
    curScore += childData;
    setScore(curScore);
    console.log("score : ", score);
    if (bestScore < curScore) {
      bestScore = curScore;
      setBest(curScore);
      localStorage.setItem("best", "" + bestScore);
    }
  };

  const newGamePressed = () => {
    setScore(0);
    childRef.current.newGame();
  };

  const gameOver = () => {
    modalRef.current.handleShow();
  };

  return (
    <React.StrictMode>
      <div className="mainContainer">
        <CustomModal ref={modalRef} />
        <Header parentCallback={newGamePressed} score={score} best={best} />
        <Game
          parentCallback={handleCallback}
          gameOver={gameOver}
          ref={childRef}
        />
        <Footer />
      </div>
    </React.StrictMode>
  );
}

export default App;
