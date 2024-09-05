import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => setTime(0);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Timer: {formatTime(time)}</h1>
      <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={toggleDarkMode}>Toggle {isDarkMode ? 'Light' : 'Dark'} Mode</button>
    </div>
  );
}

export default App;