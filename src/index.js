import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isStart, setIsStart] = useState(false);
  let timerInterval = null;

  const handleStartTimer = () => {
    setTimer(timer * 1000);
    setIsStart(true);
  };

  useEffect(() => {
    console.log("run effect");

    if (isStart) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const nextSec = prevSeconds - 1;
          if (isStart && nextSec === 0) {
            setIsStart(false);
          }
          return nextSec;
        });
      }, 1000);
    }

    return () => {
      console.log("unmount");
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isStart]);

  const handleOnChange = (event) => {
    setSeconds(event.target.value);
  };

  return (
    <div className="App">
      <div className="Heading">
        <h1>Countdown Timer</h1>
      </div>
      <div className="Input">
        <span>{"Seconds: "}</span>
        <input
          type="number"
          value={seconds}
          placeholder="Seconds"
          name="timer"
          onChange={handleOnChange}
        />
      </div>

      <div>
        <button onClick={handleStartTimer} className="StartBtn">
          Start
        </button>
      </div>
      <div>
        <h3>{seconds} Seconds left</h3>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
