import React, { Component, useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isStart, setIsStart] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [work, setWork] = useState(true);

  useEffect(() => {
    if (!isStart && work) {
      if (workTime >= 0) {
        var timer = setTimeout(() => {
          setWorkTime(workTime - 1);
        }, 1000);
      } else if (!isReset) {
        clearTimeout(timer);
      } else {
        setWork(false);
        clearTimeout(timer);
        setWorkTime(workDuration * 60);
        alert("Work-Time Finishes");
      }
    }
    if (!isStart && !work) {
      if (breakTime >= 0) {
        var breakTimer = setTimeout(() => {
          setBreakTime(breakTime - 1);
          console.log(breakTime);
        }, 1000);
      } else if (!isReset) {
        clearTimeout(breakTimer);
      } else {
        setWork(true);
        clearTimeout(breakTimer);
        setBreakTime(breakDuration * 60);
        alert("Break-Time Finishes");
      }
    }
  }, [
    workDuration,
    breakDuration,
    isStart,
    isReset,
    workTime,
    breakTime,
    work,
  ]);

  let startFn = () => {
    setIsStart(false);
    setIsReset(true);
  };
  let stopFn = () => {
    setIsStart(true);
  };
  let resetFn = () => {
    setWork(true);
    setIsReset(false);
    setIsStart(true);
    setWorkDuration(25);
    setBreakDuration(5);
    setWorkTime(1500);
    setBreakTime(300);
  };

  let submitHandler = (event) => {
    event.preventDefault();
    if (
      (workDuration == 0 || workDuration == "") &&
      (breakDuration == 0 || breakDuration == "")
    ) {
      setWorkDuration(25);
      setBreakDuration(5);
    } else {
      setIsReset(true);
      setWorkTime(workDuration * 60);
      setBreakTime(breakDuration * 60);
    }
  };
  let validate = (value) => {
    if (value < 0) {
      return false;
    } else {
      return true;
    }
  };
  let convertTime = (seconds) => {
    let m = parseInt(seconds / 60).toString();
    let s = parseInt(seconds % 60).toString();
    if (m.length == 1) m = "0" + m;
    if (s.length == 1) s = "0" + s;
    return m + ":" + s;
  };
  return (
    <div id="main">
      <div className="indicator">
        <h3 style={{ color: `${work ? "green" : "red"}` }}>
          {work ? "Work" : "Break"}-Time
        </h3>
        <h1>{work ? convertTime(workTime) : convertTime(breakTime)}</h1>
      </div>
      <div className="buttons">
        <button
          className="btns"
          data-testid="start-btn"
          onClick={startFn}
          disabled={!isStart}
        >
          Start
        </button>
        <button
          className="btns"
          data-testid="stop-btn"
          onClick={stopFn}
          disabled={isStart}
        >
          Stop
        </button>
        <button
          className="btns"
          data-testid="reset-btn"
          onClick={resetFn}
          disabled={!isReset}
        >
          Reset
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="number"
            className="inputs"
            data-testid="work-duration"
            value={workDuration}
            onChange={(event) => {
              let t = validate(event.target.value);
              if (t == true) {
                setWorkDuration(event.target.value);
              } else {
                setWorkDuration("");
              }
            }}
            disabled={!isStart}
            required
          />
        </div>
        <div>
          <input
            type="number"
            className="inputs"
            data-testid="break-duration"
            value={breakDuration}
            onChange={(event) => {
              let t = validate(event.target.value);
              if (t == true) {
                setBreakDuration(event.target.value);
              } else {
                setBreakDuration("");
              }
            }}
            disabled={!isStart}
            required
          />
        </div>
        <button
          className="btns"
          data-testid="set-btn"
          type="submit"
          disabled={!isStart}
        >
          Set
        </button>
      </form>
    </div>
  );
};

export default App;
