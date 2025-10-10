import { useEffect, useState } from 'react';
import { getRequest } from '../utils/apiRequests'; // adjust path if needed
import type { Post } from '../types/api';

export function usePosts() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      const response = await getRequest('/mock/posts');
      setPosts(response);
    } catch (err: any) {
      console.error('An error occurred while fetching posts:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // fetch on mount
  }, []);

  return {
    posts,
    isLoading,
    error,
    fetchPosts
  };
}