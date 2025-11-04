import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests"; // adjust path if needed
import type { User } from "../types/api";
import { useErrorHandler } from "./useErrorHandler";
import { USER_FETCH_FAIL } from "../app/constants/genericErrors";

export function useMe() {
  const { handleError } = useErrorHandler();

  const ENDPOINT = "/me";

  // state variables
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchMe() {
    try {
      setIsLoading(true);
      setError(null); // remove any previous error messages

      const response = await getRequest(ENDPOINT);
      setUser(response.data);
    } catch (err: any) {
      handleError(err, setError, USER_FETCH_FAIL);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMe(); // fetch on mount
  }, []);

  // Listen for external refresh requests (e.g., after follow/unfollow actions in other components)
  useEffect(() => {
    const handler = () => {
      fetchMe();
    };
    window.addEventListener("me:refresh", handler as EventListener);
    return () =>
      window.removeEventListener("me:refresh", handler as EventListener);
  }, []);

  return {
    user,
    isLoading,
    error,
    fetchMe,
  };
}
