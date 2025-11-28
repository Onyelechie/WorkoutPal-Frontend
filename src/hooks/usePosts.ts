import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/apiRequests";
import type { Post } from "../types/api";

import { POST_FETCH_FAIL } from "../app/constants/genericErrors";
import {
  POST_CREATE_FAIL,
  POST_LIKE_FAIL,
  POST_UNLIKE_FAIL,
  POST_COMMENT_FAIL,
  POST_REPLY_FAIL,
} from "../app/constants/genericErrors";

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

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getRequest("/posts");
      setPosts(response.data);
    } catch (err: any) {
      handleError(err, setError, POST_FETCH_FAIL);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function createPost(postData: CreatePostData) {
    try {
      setIsCreating(true);
      setError(null);
      const response = await postRequest("/posts", postData);
      await fetchPosts();
      return response.data;
    } catch (err: any) {
      handleError(err, setError, POST_CREATE_FAIL);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }

  async function likePost(postId: number, userId: number) {
    try {
      setError(null);
      await postRequest("/posts/like", { postId, userId });
    } catch (err: any) {
      handleError(err, setError, POST_LIKE_FAIL);
      throw err;
    }
  }

  async function unlikePost(postId: number, userId: number) {
    try {
      setError(null);
      await postRequest("/posts/unlike", { postId, userId });
    } catch (err: any) {
      handleError(err, setError, POST_UNLIKE_FAIL);
      throw err;
    }
  }

  async function addComment(postId: number, userId: number, comment: string) {
    try {
      setError(null);
      await postRequest("/posts/comment", { postId, userId, comment });
      await fetchPosts();
    } catch (err: any) {
      handleError(err, setError, POST_COMMENT_FAIL);
      throw err;
    }
  }

  async function replyToComment(postId: number, commentId: number, userId: number, comment: string) {
    try {
      setError(null);
      await postRequest("/posts/comment/reply", {
        postId,
        commentId,
        userId,
        comment,
      });
      await fetchPosts();
    } catch (err: any) {
      handleError(err, setError, POST_REPLY_FAIL);
      throw err;
    }
  }

  return {
    posts,
    isLoading,
    isCreating,
    error,
    fetchPosts,
    createPost,
    likePost,
    unlikePost,
    addComment,
    replyToComment,
  };
}
