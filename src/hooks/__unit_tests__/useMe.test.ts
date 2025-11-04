import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMe } from '../useMe';
import { getRequest } from '../../utils/apiRequests';
import { USER_FETCH_FAIL } from '../../app/constants/genericErrors';

vi.mock('../../utils/apiRequests');
// Mock the hook before importing useMe (if it imports useAlertDialog directly)
vi.mock('../useDialog', () => ({
  useAlertDialog: () => ({
    showAlert: vi.fn(), // mock function
  }),
}));

describe('useMe hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches user data on mount', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      age: 25
    };
    (getRequest as any).mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useMe());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.error).toBe(null);
    });

    expect(getRequest).toHaveBeenCalledWith('/me');
  });

  it('handles fetch error', async () => {
    const mockError = new Error('Failed to fetch');
    (getRequest as any).mockRejectedValue(mockError);

    const { result } = renderHook(() => useMe());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.user).toBe(null);
      expect(result.current.error).toEqual(new Error(USER_FETCH_FAIL)); // Expect a user friendly message instead of mockError
    });
  });

  it('refetches data when fetchMe is called', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      age: 25
    };
    (getRequest as any).mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useMe());

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });

    // Call fetchMe again
    await result.current.fetchMe();

    expect(getRequest).toHaveBeenCalledTimes(2);
  });
});