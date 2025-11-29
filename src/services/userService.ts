import { getRequest } from "../utils/apiRequests";
import type { User } from "../types/api";

// Cache for user data
let usersCache: User[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const userService = {
  // Get user ID by username with caching
  async getUserIdByUsername(username: string): Promise<number | null> {
    try {
      // Check if we need to refresh cache
      const now = Date.now();
      if (!usersCache || !cacheTime || (now - cacheTime) > CACHE_DURATION) {
        const response = await getRequest("/users");
        usersCache = response.data;
        cacheTime = now;
      }
      
      const user = usersCache?.find((u) => u.username === username);
      return user ? user.id : null;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return null;
    }
  },

  // Pre-load users cache
  async preloadUsers(): Promise<void> {
    try {
      const response = await getRequest("/users");
      usersCache = response.data;
      cacheTime = Date.now();
    } catch (error) {
      console.error("Error preloading users:", error);
    }
  },

  // Clear cache (useful for testing or forced refresh)
  clearCache(): void {
    usersCache = null;
    cacheTime = null;
  },
};