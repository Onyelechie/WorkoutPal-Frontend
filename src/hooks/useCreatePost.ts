import { useState } from "react";
import { postRequest } from "../utils/apiRequests";
import { useErrorHandler } from "./useErrorHandler";

interface CreatePostData {
  title: string;
  caption: string;
  body: string;
  status: string;
  postedBy: number;
}

export function useCreatePost() {
  const { handleError } = useErrorHandler();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function createPost(postData: CreatePostData) {
    try {
      setIsCreating(true);
      setError(null);

      const response = await postRequest("/posts", postData);
      return response.data;
    } catch (err: any) {
      handleError(err, setError, "Failed to create post");
      throw err;
    } finally {
      setIsCreating(false);
    }
  }

  return {
    createPost,
    isCreating,
    error,
  };
}