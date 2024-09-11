import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TaskManager from './TaskManager';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputTime, setInputTime] = useState('00:00');
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      setInputTime('00:00');
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);
 
  const toggleTimer = () => {
    if (!isRunning) {
      const [minutes, seconds] = inputTime.split(':').map(Number);
      const totalSeconds = minutes * 60 + seconds;
      if (totalSeconds > 0) {
        setTime(totalSeconds);
        setIsRunning(true);
      }
    } else {
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime('00:00');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    let cursorPosition = e.target.selectionStart;

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    const minutes = value.slice(0, 2).padStart(2, '0');
    const seconds = value.slice(2).padStart(2, '0');

    const newValue = `${minutes}:${seconds}`;
    setInputTime(newValue);

    // Adjust cursor position
    if (cursorPosition === 3) cursorPosition = 4;
    setTimeout(() => e.target.setSelectionRange(cursorPosition, cursorPosition), 0);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="timer">
        {isRunning || time > 0 ? (
          formatTime(time)
        ) : (
          <input
            type="text"
            value={inputTime}
            onChange={handleInputChange}
            placeholder="00:00"
            className="timer-input"
          />
        )}
      </div>
      <div className="controls">
        <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <TaskManager isDarkMode={isDarkMode} />
      <div className="toggle-switch-container">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider">
            <span className="emoji">☀️</span>
            <span className="emoji">🌙</span>
          </span>
        </label>
      </div>
      <audio ref={audioRef} src="/chimetime.mp3" />
    </div>
  );
}

export default App;