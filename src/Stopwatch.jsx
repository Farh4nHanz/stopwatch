import { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  const stop = () => {
    setIsRunning(false);
  }

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  }

  const formatTime = () => {
    const minutes = String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, "0");
    const seconds = String(Math.floor(elapsedTime / 1000) % 60).padStart(2, "0");
    const milisec = String(Math.floor(elapsedTime % 1000 / 10)).padStart(2, "0");

    return `${minutes}:${seconds}:${milisec}`;
  }

  return (
    <div className="stopwatch">
      <div className="display" ref={startTimeRef}>
        {formatTime()}
      </div>
      <div className="controls">
        <button className="start-button" onClick={start}>
          Start
        </button>
        <button className="stop-button" onClick={stop}>
          Stop
        </button>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
