import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests"; // adjust path if needed
import type { Post, Comment, UserAchievementUnlocked } from "../types/api";

export function useActivity() {
  const POSTS_ENDPOINT = "/posts";
  const ACHIEVEMENTS_ENDPOINT = "/achievements/feed";

  // state variables
  const [activity, setActivity] = useState<
    (Post | Comment | UserAchievementUnlocked)[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchActivity() {
    try {
      setIsLoading(true);
      setError(null); // remove any previous error messages

      var data: (Post | Comment | UserAchievementUnlocked)[] = [];

      const postResponse = await getRequest(POSTS_ENDPOINT);
      data = data.concat(postResponse.data);
      const achievementResponse = await getRequest(ACHIEVEMENTS_ENDPOINT);
      data = data.concat(achievementResponse.data);
      data.sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
      );
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
