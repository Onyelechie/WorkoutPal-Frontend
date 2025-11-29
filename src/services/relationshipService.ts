import { getRequest, postRequest, deleteRequest } from "../utils/apiRequests";

export interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
}

export interface FollowRequest {
  id: number;
  requesterID: number;
  requestedID: number;
  status: string;
  user?: User;
  createdAt: string;
}

export interface FollowRequestStatus {
  id: number;
  requesterID: number;
  requestedID: number;
  status: string; // pending, accepted, rejected
  createdAt: string;
  updatedAt: string;
}

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

  // Follow request methods
  async sendFollowRequest(
    userIdToRequest: number,
    requesterId: number,
  ): Promise<boolean> {
    try {
      await postRequest(
        `/users/${userIdToRequest}/follow-request?requester_id=${requesterId}`,
        {},
      );
      return true;
    } catch (error) {
      console.error("Error sending follow request:", error);
      return false;
    }
  },

  async cancelFollowRequest(
    userIdRequested: number,
    requesterId: number,
  ): Promise<boolean> {
    try {
      await deleteRequest(
        `/users/${userIdRequested}/follow-request?requester_id=${requesterId}`,
      );
      return true;
    } catch (error) {
      console.error("Error cancelling follow request:", error);
      return false;
    }
  },

  async getFollowRequestStatus(
    userIdRequested: number,
    requesterId: number,
  ): Promise<FollowRequestStatus | null> {
    try {
      const response = await getRequest(
        `/users/${userIdRequested}/follow-request/status?requester_id=${requesterId}`,
      );
      return response.data;
    } catch (error) {
      // 404 means no request exists
      return null;
    }
  },

  async getPendingFollowRequests(userId: number): Promise<FollowRequest[]> {
    try {
      const response = await getRequest(`/follow-requests?user_id=${userId}`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching pending follow requests:", error);
      return [];
    }
  },

  async respondToFollowRequest(
    requestId: number,
    action: "accept" | "reject",
  ): Promise<boolean> {
    try {
      await postRequest(`/follow-requests/respond`, {
        requestID: requestId,
        action: action,
      });
      return true;
    } catch (error) {
      console.error("Error responding to follow request:", error);
      return false;
    }
  },
};
