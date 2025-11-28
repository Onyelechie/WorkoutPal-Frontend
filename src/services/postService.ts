import { getRequest } from "../utils/apiRequests";

export const postService = {
  getUserPosts: async (userId: number) => {
    const response = await getRequest(`/posts/user/${userId}`);
    return response.data;
  },
};
