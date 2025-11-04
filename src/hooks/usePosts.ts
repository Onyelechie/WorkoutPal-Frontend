import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests"; // adjust path if needed
import type { Post } from "../types/api";

export function usePosts() {
  const ENDPOINT = "/posts";

  // state variables
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null); // remove any previous error messages

      const response = await getRequest(ENDPOINT);
      setPosts(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts(); // fetch on mount
  }, []);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
  };
}
