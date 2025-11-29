import { describe, it, expect, vi, beforeEach } from "vitest";
import { postService } from "../postService";
import { getRequest } from "../../utils/apiRequests";

vi.mock("../../utils/apiRequests");

describe("postService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getUserPosts", () => {
    it("fetches posts for a user", async () => {
      const mockPosts = [
        {
          id: 1,
          postedBy: "testuser",
          title: "Test Post",
          caption: "Test caption",
          body: "Test body",
          date: "2025-01-01",
          likes: 5,
          status: "active",
          comments: [],
        },
      ];
      (getRequest as any).mockResolvedValue({ data: mockPosts });

      const result = await postService.getUserPosts(123);

      expect(getRequest).toHaveBeenCalledWith("/posts/user/123");
      expect(result).toEqual(mockPosts);
    });
  });
});
