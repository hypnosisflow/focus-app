import { useState, useRef } from "react";

export const useTimer = (time: number) => {
  const [timeRunning, setTimeRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time);
  const [isStarted, setIsStarted] = useState(false);

  const timerRef = useRef(null);

  let initial = time;

  let newVal;

  function startTimer() {
    //@ts-ignore
    timerRef.current = setInterval(() => {
      newVal = --initial;
      setTimeLeft(newVal);
      setIsStarted(true);
    }, 1000);
    setTimeRunning(true);
  }

  function stopTimer() {
    //@ts-ignore
    clearInterval(timerRef.current);
    setTimeRunning(false);
  }

  function restartTimer() {
    //@ts-ignore
    let l = timeLeft;
    //@ts-ignore
    timerRef.current = setInterval(() => {
      newVal = --l;
      setTimeLeft(newVal);
    }, 1000);
    setTimeRunning(true);
  }

  function control() {
    isStarted ? restartTimer() : startTimer();
  }

  return { startTimer, stopTimer, timeLeft, control, timeRunning };
};
