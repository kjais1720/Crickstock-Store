import { useState, useEffect } from "react";

/**
 * @param {number} time : Time duration (in seconds)
 * @returns {object} {
 * setTimerStarted : A setState function (setting it true starts the timer),
 * timeLeft : The time left,
 * timerStarted : Boolean - Tells whether the timer has started
 * }
 */
export const useTimer = (time) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [timerId, setTimerId] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((curr) => curr - 1);
    }, 1000);
    setTimerId(timerId);
    return () => clearInterval(timerId);
  }, []);

  if (timeLeft === 0) {
    clearInterval(timerId);
  }
  return { timeLeft };
};
