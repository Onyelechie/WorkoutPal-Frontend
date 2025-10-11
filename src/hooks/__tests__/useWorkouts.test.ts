import { renderHook, waitFor } from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import { getRequest } from '../../utils/apiRequests';
import { useWorkouts } from '../useWorkouts';

describe('/hooks/useWorkouts.ts', () => {

    // Mock axios
    vi.mock('../../utils/apiRequests');
    const getRequestMocked = vi.mocked(getRequest);

    beforeEach(() => {
        vi.resetAllMocks();
    });

    /* 
        NO TESTS ON THE DATA RETRIEVED FROM fetchWorkouts() YET. 
        This is because the workoutNames and exerciseNames state variables have a temporary data format
        and is only for viewing purposes in the WeeklyGrid.tsx component
    */

    it('fetchWorkouts has error data on fail', async () => {
        const mockError = new Error('error');
        getRequestMocked.mockRejectedValueOnce(mockError);
        const { result } = renderHook(() => useWorkouts());

        // make sure error is null first
        await waitFor(() => {
            expect(result.current.error).toBeNull();
        });

        // make sure error has error
        await waitFor(() => {
            expect(result.current.error).toBe(mockError);
        });
    });

    it('fetchWorkouts isLoading on fetch', async () => {
        const { result } = renderHook(() => useWorkouts());

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