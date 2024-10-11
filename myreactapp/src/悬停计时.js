import './App.css';
import React, { useRef, useState } from 'react';

function 悬停计时() {
  const [mouseOnTime, setMouseOnTime] = useState(0);
  let timer = useRef(undefined);


  const handleMouseEnter = () => {
    if (timer !== undefined) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      setMouseOnTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const mutex = {
    locked: false,
    lock() {
      this.locked = true;
    },
    unlock() {
      this.locked = false;
    },
  };

  const handleMouseEnterWithMutex = () => {
    if (mutex.locked) return;
    mutex.lock();
    handleMouseEnter();
    return () => {
      clearInterval(timer.current);
    }
  };

  const handleMouseLeaveWithMutex = () => {
    handleMouseLeave();
    mutex.unlock();
  };

  const handleMouseLeave = () => {
    clearInterval(timer.current);
  };
  return (
    <div className="App">
      <h1>My React App</h1>
      <h1
        id="time"
        onMouseOver={handleMouseEnterWithMutex}
        onMouseOut={handleMouseLeaveWithMutex}
      >
        {mouseOnTime}
      </h1>
    </div>
  );
}
export default App;

