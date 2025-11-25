import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/apiRequests";
import type { Post } from "../types/api";
import { POST_FETCH_FAIL } from "../app/constants/genericErrors";
import { useErrorHandler } from "./useErrorHandler";

interface CreatePostData {
  title: string;
  caption: string;
  body: string;
  status: string;
  postedBy: number;
}

export function usePosts() {
  const { handleError } = useErrorHandler();

  // state variables
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
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

  async function createPost(postData: CreatePostData) {
    try {
      setIsCreating(true);
      setError(null);
      const response = await postRequest("/posts", postData);
      await fetchPosts(); // Refresh posts after creation
      return response.data;
    } catch (err: any) {
      handleError(err, setError, "Failed to create post");
      throw err;
    } finally {
      setIsCreating(false);
    }
  }

  return {
    posts,
    isLoading,
    isCreating,
    error,
    fetchPosts,
    createPost,
  };
}
