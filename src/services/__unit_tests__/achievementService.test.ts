import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRequest, postRequest } from "../../utils/apiRequests";
import type { Achievement, UserAchievementUnlocked } from "../../types/api";
import {
  getLockedAchievements,
  unlockAchievement,
} from "../achievementService";

// NOTE: This test will only test the two functions
// - getLockedAchievements()
// - unlockAchievement()
// These functions have logic that filters an array.

// Mock the API requests
vi.mock("../../utils/apiRequests", () => ({
  getRequest: vi.fn(),
  postRequest: vi.fn(),
}));

// Tests created with the help of ChatGPT
describe("achievementService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // ------------------------
  // Tests for getLockedAchievements
  // ------------------------
  describe("getLockedAchievements", () => {
    const allAchievements: Achievement[] = [
      { id: 1, title: "Achievement 1", description: "desc", badgeIcon: "1" },
      { id: 2, title: "Achievement 2", description: "desc", badgeIcon: "2" },
      { id: 3, title: "Achievement 3", description: "desc", badgeIcon: "3" },
    ];

    it("returns only achievements that are not unlocked", async () => {
      const unlocked: UserAchievementUnlocked[] = [
        {
          id: 1,
          title: "Achievement 1",
          description: "desc",
          badgeIcon: "1",
          date: "2025-01-01",
          userId: 1,
          username: "username",
        },
      ];

      (getRequest as any).mockImplementation((endpoint: string) => {
        if (endpoint === "/achievements")
          return Promise.resolve({ data: allAchievements });
        if (endpoint === "/achievements/unlocked")
          return Promise.resolve({ data: unlocked });
        return Promise.resolve({ data: [] });
      });

      const locked = await getLockedAchievements();

      expect(getRequest).toHaveBeenCalledTimes(2);
      expect(locked).toHaveLength(2);
      expect(locked.map((a) => a.id)).toEqual([2, 3]);
    });

    it("returns empty array if all achievements are unlocked", async () => {
      const unlocked: UserAchievementUnlocked[] = allAchievements.map((a) => ({
        ...a,
        date: "2025-01-01",
        userId: 1,
        username: "username",
      }));

      (getRequest as any).mockImplementation((endpoint: string) => {
        if (endpoint === "/achievements")
          return Promise.resolve({ data: allAchievements });
        if (endpoint === "/achievements/unlocked")
          return Promise.resolve({ data: unlocked });
        return Promise.resolve({ data: [] });
      });

      const locked = await getLockedAchievements();

      expect(locked).toEqual([]);
    });
  });

  // ------------------------
  // Tests for unlockAchievement
  // ------------------------
  describe("unlockAchievement", () => {
    it("calls postRequest if the achievement is not unlocked", async () => {
      const unlocked: UserAchievementUnlocked[] = [
        {
          id: 1,
          title: "Achievement 1",
          description: "desc",
          badgeIcon: "1",
          date: "2025-01-01",
          userId: 1,
          username: "username",
        },
      ];

      (getRequest as any).mockResolvedValue({ data: unlocked });
      (postRequest as any).mockResolvedValue({
        data: {
          id: 2,
          title: "Achievement 2",
          description: "desc",
          badgeIcon: "2",
          date: "2025-11-04",
        },
      });

      const result = await unlockAchievement(2, 123);

      expect(postRequest).toHaveBeenCalledWith("/achievements", {
        achievementId: 2,
        userId: 123,
      });
      expect(result).toEqual({
        id: 2,
        title: "Achievement 2",
        description: "desc",
        badgeIcon: "2",
        date: "2025-11-04",
      });
    });

    it("does not call postRequest if the achievement is already unlocked", async () => {
      const unlocked: UserAchievementUnlocked[] = [
        {
          id: 1,
          title: "Achievement 1",
          description: "desc",
          badgeIcon: "1",
          date: "2025-01-01",
          userId: 1,
          username: "username",
        },
      ];

      (getRequest as any).mockResolvedValue({ data: unlocked });

      const result = await unlockAchievement(1, 123);

      expect(postRequest).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
