import { getRequest } from '../utils/apiRequests';

export interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
}

export const relationshipService = {
  async getFollowers(userId: number): Promise<User[]> {
    try {
      const response = await getRequest(`/users/${userId}/followers`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching followers:', error);
      return [];
    }
  },

  async getFollowing(userId: number): Promise<User[]> {
    try {
      const response = await getRequest(`/users/${userId}/following`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching following:', error);
      return [];
    }
  }
};