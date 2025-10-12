import { renderHook, waitFor } from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import { getRequest } from '../../utils/apiRequests';
import { usePosts } from '../usePosts';

describe('/hooks/usePosts.ts', () => {

    // Mock axios
    vi.mock('../../utils/apiRequests');
    const getRequestMocked = vi.mocked(getRequest);
    const mockData = {someData: "fakeData", more: "fakeDataHere"};

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('fetchPosts has posts data on success', async () => {
        getRequestMocked.mockResolvedValueOnce(mockData);
        const { result } = renderHook(() => usePosts());
        
        await waitFor(() => {
            expect(result.current.posts).toEqual(mockData);
        });
    });

    it('fetchPosts has error data on fail', async () => {
        const mockError = new Error('error');
        getRequestMocked.mockRejectedValueOnce(mockError);
        const { result } = renderHook(() => usePosts());

        // make sure error is null first
        await waitFor(() => {
            expect(result.current.error).toBeNull();
        });

        // make sure error has error
        await waitFor(() => {
            expect(result.current.error).toBe(mockError);
        });
    });

    it('fetchPosts isLoading on fetch', async () => {
        const { result } = renderHook(() => usePosts());

        // make sure it starts loading
        await waitFor(() => {
            expect(result.current.isLoading).toBe(true); 
        });

        // make sure it stops loading
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
    });

});