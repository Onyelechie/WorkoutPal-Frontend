import { useEffect, useState } from "react";
import { getRequest } from "../utils/apiRequests"; // adjust path if needed
import type { Post } from "../types/api";
import { POST_FETCH_FAIL } from "../app/constants/genericErrors";
import { useErrorHandler } from "./useErrorHandler";

export function usePosts() {
  const { handleError } = useErrorHandler();

  // state variables
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null); // remove any previous error messages

      const response = await getRequest("/posts");
      setPosts(response.data);
    } catch (err: any) {
      handleError(err, setError, POST_FETCH_FAIL);
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
