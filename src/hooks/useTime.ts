import { useEffect, useState } from "react";

export function useTime() {
  // live date and time
  const [liveDateTime, setLiveDateTime] = useState(new Date());

  // live timer created by ChatGPT
  useEffect(() => {
    // Update every second
    const intervalId = setInterval(() => {
      setLiveDateTime(new Date());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return {
    liveDateTime,
  };
}
