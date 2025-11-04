import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests"; // adjust path if needed
import type { Schedule } from "../types/api";
import { SCHEDULE_FETCH_FAIL } from "../app/constants/genericErrors";
import { useErrorHandler } from "./useErrorHandler";

export function useSchedules() {
  const { handleError } = useErrorHandler();

  // state variables
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchSchedules() {
    try {
      setIsLoading(true);
      setError(null); // remove any previous error messages

      const response = await getRequest("/schedules");
      if (response?.data != null) setSchedules(response.data);
    } catch (err: any) {
      handleError(err, setError, SCHEDULE_FETCH_FAIL);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSchedules(); // fetch on mount
  }, []);

  return {
    schedules,
    setSchedules,
    isLoading,
    error,
    fetchSchedules,
  };
}
