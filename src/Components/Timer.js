import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
  const [workTimeLeft, setWorkTimeLeft] = useState(0);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [workInput, setWorkInput] = useState('');
  const [breakInput, setBreakInput] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState('work');
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        if (currentTimer === 'work') {
          setWorkTimeLeft((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              if (breakTimeLeft > 0) {
                setCurrentTimer('break');
              }else {
                setStartButtonDisabled(false);
                setStopButtonDisabled(false);}
              return 0;
            }
          });
        } else if (currentTimer === 'break') {
          setBreakTimeLeft((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              setIsTimerRunning(false);
              setCurrentTimer('work');
              setStartButtonDisabled(false);
              setStopButtonDisabled(false);
              return 0;
            }
          });
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
      
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, currentTimer, breakTimeLeft]);

  const handleWorkTimeChange = (event) => {
    const inputTime = event.target.value;
    if (inputTime === '' || !isNaN(inputTime)) {
      setWorkInput(inputTime);
    }
  };

  const handleBreakTimeChange = (event) => {
    const inputTime = event.target.value;
    if (inputTime === '' || !isNaN(inputTime)) {
      setBreakInput(inputTime);
    }
  };

  const resetInputs = () => {
    setWorkInput('');
    setBreakInput('');
  };
  const handleStart = () => {
    const workInputValue = parseInt(workInput);
    const breakInputValue = parseInt(breakInput);

    if (workInput > 0 && breakInput >= 0) {
      setWorkTimeLeft(workInputValue); 
      setBreakTimeLeft(breakInputValue); 
      
    }
      if(!stopButtonDisabled){
        setIsTimerRunning(true);
        setStartButtonDisabled(true);
      }else{
        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        setIsTimerRunning(true);
      }
     
  };

  
  const handleStop = () => {
    setIsTimerRunning(false);
    setStartButtonDisabled(false);
    setStopButtonDisabled(true);
  
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setWorkTimeLeft(0);
    setBreakTimeLeft(0);
    setCurrentTimer('work');
    resetInputs();
    setStartButtonDisabled(false);
    setStopButtonDisabled(false); 
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };
  

  return (
    <div>
      <h1>Timer App</h1>
      <h2>{formatTime(currentTimer === 'work' ? workTimeLeft : breakTimeLeft)}</h2>
      <p className='ppp'>{currentTimer === 'work' ? 'Work Time' : 'Break Time'}</p>
      <div className="input-container">
        <div>
          <h3>Work Duration</h3>
          <input
            type="number"
            placeholder="Enter in Seconds"
            value={workInput}
            onChange={handleWorkTimeChange}
          />
        </div>
        <div>
          <h3>Break Duration</h3>
          <input
            type="number"
            placeholder="Enter in Seconds"
            value={breakInput}
            onChange={handleBreakTimeChange}
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => { handleStart(); resetInputs(); }
        }disabled={startButtonDisabled}>Start</button>
        <button onClick={handleStop} disabled={stopButtonDisabled}>Stop</button>
        <button onClick={() => { handleReset(); resetInputs(); }}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;

