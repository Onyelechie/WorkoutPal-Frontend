import { getRequest } from "../utils/apiRequests";

export interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
}

import { postRequest } from "../utils/apiRequests";

export const relationshipService = {
  async getFollowers(userId: number): Promise<User[]> {
    try {
      const response = await getRequest(`/users/${userId}/followers`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching followers:", error);
      return [];
    }
  },

  async getFollowing(userId: number): Promise<User[]> {
    try {
      const response = await getRequest(`/users/${userId}/following`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching following:", error);
      return [];
    }
  },

  async followUser(
    userIdToFollow: number,
    followerId: number,
  ): Promise<boolean> {
    try {
      await postRequest(
        `/users/${userIdToFollow}/follow?follower_id=${followerId}`,
        {},
      );
      return true;
    } catch (error) {
      console.error("Error following user:", error);
      return false;
    }
  },

  async unfollowUser(
    userIdToUnfollow: number,
    followerId: number,
  ): Promise<boolean> {
    try {
      await postRequest(
        `/users/${userIdToUnfollow}/unfollow?follower_id=${followerId}`,
        {},
      );
      return true;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      return false;
    }
  },
};
