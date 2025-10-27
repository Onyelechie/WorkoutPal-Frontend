import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests"; // adjust path if needed
import type { Schedule } from "../types/api";

export function useSchedules() {
  const ENDPOINT = "/schedules";

  // state variables
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchSchedules() {
    try {
      setIsLoading(true);
      setError(null); // remove any previous error messages

      const response = await getRequest(ENDPOINT);
      setSchedules(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSchedules(); // fetch on mount
  }, []);

  return {
    schedules,
    isLoading,
    error,
    fetchSchedules
  };
}
