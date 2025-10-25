import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

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
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/followers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching followers:', error);
      return [];
    }
  },

  async getFollowing(userId: number): Promise<User[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/following`);
      return response.data;
    } catch (error) {
      console.error('Error fetching following:', error);
      return [];
    }
  }
};