import { describe, it, expect, vi, beforeEach } from 'vitest';
import { relationshipService } from '../../services/relationshipService';
import { getRequest, postRequest } from '../apiRequests';

vi.mock('../apiRequests');

describe('relationshipService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getFollowers', () => {
    it('fetches followers for a user', async () => {
      const mockFollowers = [
        { id: 1, name: 'Follower 1', username: 'follower1', avatar: '' }
      ];
      (getRequest as any).mockResolvedValue({ data: mockFollowers });

      const result = await relationshipService.getFollowers(123);

      expect(getRequest).toHaveBeenCalledWith('/users/123/followers');
      expect(result).toEqual(mockFollowers);
    });
  });

  describe('getFollowing', () => {
    it('fetches following for a user', async () => {
      const mockFollowing = [
        { id: 2, name: 'Following 1', username: 'following1', avatar: '' }
      ];
      (getRequest as any).mockResolvedValue({ data: mockFollowing });

      const result = await relationshipService.getFollowing(123);

      expect(getRequest).toHaveBeenCalledWith('/users/123/following');
      expect(result).toEqual(mockFollowing);
    });
  });

  describe('followUser', () => {
    it('follows a user', async () => {
      (postRequest as any).mockResolvedValue({ data: { message: 'success' } });

      await relationshipService.followUser(456);

      expect(postRequest).toHaveBeenCalledWith('/users/456/follow?follower_id=undefined', {});
    });
  });

  describe('unfollowUser', () => {
    it('unfollows a user', async () => {
      (postRequest as any).mockResolvedValue({ data: { message: 'success' } });

      await relationshipService.unfollowUser(456);

      expect(postRequest).toHaveBeenCalledWith('/users/456/unfollow?follower_id=undefined', {});
    });
  });


});