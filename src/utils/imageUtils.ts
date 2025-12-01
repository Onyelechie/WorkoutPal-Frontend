/**
 * Get the avatar image data
 * @param avatarData - The avatar data from the API (base64 encoded image)
 * @returns Base64 avatar data or null if no avatar
 */
export const getAvatarUrl = (avatarData: string | null | undefined): string | null => {
  if (!avatarData) return null;
  
  // If it's already base64 data (starts with data:image/), return as is
  if (avatarData.startsWith('data:image/')) {
    return avatarData;
  }
  
  // If it's an old URL format, return null to show placeholder
  // (This handles migration from old URL-based avatars)
  return null;
};

/**
 * Get avatar data or null for placeholder
 * @param avatarData - The avatar data from the API
 * @returns Base64 avatar data or null for placeholder
 */
export const getAvatarUrlOrNull = (avatarData: string | null | undefined): string | null => {
  return getAvatarUrl(avatarData);
};