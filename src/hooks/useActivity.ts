import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests"; // adjust path if needed
import type { Achievement, Post } from "../types/api";

export function useActivity() {
  const POSTS_ENDPOINT = "/posts";
  const ACHIEVEMENTS_ENDPOINT = "/achievements";

  // state variables
  const [activity, setActivity] = useState<(Post | Achievement)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchActivity() {
    try {
      setIsLoading(true);
      setError(null); // remove any previous error messages

      const data = [];

      const postResponse = await getRequest(POSTS_ENDPOINT);
      data.push(postResponse.data);
      const achievementResponse = await getRequest(ACHIEVEMENTS_ENDPOINT);
      data.push(achievementResponse.data);
      alert(JSON.stringify(data));
      setActivity(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchActivity(); // fetch on mount
  }, []);

  return {
    activity,
    isLoading,
    error,
    fetchActivity,
  };
}
