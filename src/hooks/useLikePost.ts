import { useState } from "react";
import { postRequest } from "../utils/apiRequests";
import { useErrorHandler } from "./useErrorHandler";

export function useLikePost() {
  const { handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function likePost(postId: number, userId: number) {
    try {
      setIsLoading(true);
      setError(null);
      await postRequest("/posts/like", { postId, userId });
    } catch (err: any) {
      handleError(err, setError, "Failed to like post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function unlikePost(postId: number, userId: number) {
    try {
      setIsLoading(true);
      setError(null);
      await postRequest("/posts/unlike", { postId, userId });
    } catch (err: any) {
      handleError(err, setError, "Failed to unlike post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    likePost,
    unlikePost,
    isLoading,
    error,
  };
}