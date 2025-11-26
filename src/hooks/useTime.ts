import { useEffect, useRef, useState } from "react";

// majority of the functionality here has been created by ChatGPT
// some modifications were made to suit our needs
export function useTime(initialCountdownMs: number = 5000) {
  // Live date/time
  const [liveDateTime, setLiveDateTime] = useState(new Date());

  // -------------------------
  // COUNTDOWN
  // -------------------------
  const [countdownStart, setCountdownStart] = useState(initialCountdownMs);
  const [countdown, setCountdown] = useState(initialCountdownMs);
  const countdownIntervalRef = useRef<number | null>(null);
  const countdownEndTimeRef = useRef<number | null>(null);

  // -------------------------
  // STOPWATCH
  // -------------------------
  const [stopwatch, setStopwatch] = useState(0); // ms elapsed
  const stopwatchIntervalRef = useRef<number | null>(null);
  const stopwatchStartRef = useRef<number | null>(null); // timestamp

  // Live date/time tick
  useEffect(() => {
    const id = setInterval(() => setLiveDateTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // -------------------------
  // COUNTDOWN FUNCTIONS
  // -------------------------
  function startCountdown() {
    if (countdownIntervalRef.current !== null) return;

    countdownEndTimeRef.current = Date.now() + countdown;

    countdownIntervalRef.current = window.setInterval(() => {
      const remaining = (countdownEndTimeRef.current ?? 0) - Date.now();

      if (remaining <= 0) {
        setCountdown(0);
        stopCountdown();
        return;
      }
      setCountdown(remaining);
    }, 10);
  }

  function stopCountdown() {
    if (countdownIntervalRef.current !== null) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }

  function resetCountdown() {
    stopCountdown();
    setCountdown(countdownStart);
  }

  function setCountdownMs(ms: number) {
    setCountdown(ms);
    setCountdownStart(ms);
  }

  // -------------------------
  // STOPWATCH FUNCTIONS
  // -------------------------
  function startStopwatch() {
    if (stopwatchIntervalRef.current !== null) return; // already running

    // Track when we started (adjust for pause/resume)
    stopwatchStartRef.current = Date.now() - stopwatch;

    stopwatchIntervalRef.current = window.setInterval(() => {
      setStopwatch(Date.now() - (stopwatchStartRef.current ?? 0));
    }, 10);
  }

  function stopStopwatch() {
    if (stopwatchIntervalRef.current !== null) {
      clearInterval(stopwatchIntervalRef.current);
      stopwatchIntervalRef.current = null;
    }
  }

  function resetStopwatch() {
    stopStopwatch();
    setStopwatch(0);
  }

  // -------------------------
  // EXPORT API
  // -------------------------
  return {
    liveDateTime,

    // countdown
    countdown,
    startCountdown,
    stopCountdown,
    resetCountdown,
    setCountdownMs,

    // stopwatch
    stopwatch,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
  };
}
