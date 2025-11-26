import { useEffect, useRef, useState } from "react";

// default initial countdown set to 5 seconds
export function useTime(initialCountdownMs: number = 5000) {

  // live date and time
  const [liveDateTime, setLiveDateTime] = useState(new Date());

  // live timer and countdown timer created by ChatGPT
  // small modifications made to suit our needs
  // countdown state
  const [countdownStart, setCountdownStart] = useState(initialCountdownMs);
  const [countdown, setCountdown] = useState(initialCountdownMs);
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setLiveDateTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  function startCountdown() {
    if (intervalRef.current !== null) return; // already running

    // Determine end time based on remaining countdown
    endTimeRef.current = Date.now() + countdown;

    intervalRef.current = window.setInterval(() => {
      const remaining = (endTimeRef.current ?? 0) - Date.now();

      if (remaining <= 0) {
        setCountdown(0);
        stopCountdown();
        return;
      }

      setCountdown(remaining);
    }, 10); // update every 10ms
  }

  function stopCountdown() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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

  return {
    liveDateTime,
    countdown,
    startCountdown,
    stopCountdown,
    resetCountdown,
    setCountdownMs,
  };
}
