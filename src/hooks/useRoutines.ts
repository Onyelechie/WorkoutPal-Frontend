import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests";
import type { Routine } from "../types/api";
import { useMe } from "./useMe";
import { useErrorHandler } from "./useErrorHandler";
import { ROUTINE_FETCH_FAIL } from "../app/constants/genericErrors";

export function useRoutines() {
  const { handleError } = useErrorHandler();

  const { user, error: userError } = useMe();
  // state variables
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user || userError) {
      setIsLoading(false);
      setError(userError);
      return;
    }

    async function fetchRoutines() {
      try {
        setIsLoading(true);
        setError(null); // remove any previous error messages

        const response = await getRequest(`/users/${user?.id}/routines`);
        if (response.data != null) setRoutines(response.data);
      } catch (err: any) {
        handleError(err, setError, ROUTINE_FETCH_FAIL);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoutines(); // fetch on mount
  }, [user?.id, userError]);

  return {
    routines,
    setRoutines,
    isLoading,
    error,
  };
}
