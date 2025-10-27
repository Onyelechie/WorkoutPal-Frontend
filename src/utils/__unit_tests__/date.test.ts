import {describe, it, expect, vi} from 'vitest';
import { getTodayIndex } from '../date';

describe('/utils/date.ts', () => {

    // use fake timers for all date tests
    vi.useFakeTimers();

    // reusable function to test on a given day
    function testOnDay(dateString:string) {
        const mockDate = new Date(dateString);
        vi.setSystemTime(mockDate);
        return getTodayIndex();
    };

    it('getTodayIndex returns zero on a Sunday', async () => {
        const result = testOnDay('2024-01-07T12:00:00Z')
        expect(result).toBe(0);
    });

    it('getTodayIndex returns three on a Wednesday', async () => {
        const result = testOnDay('2024-01-03T12:00:00Z')
        expect(result).toBe(3);
    });
    
    it('getTodayIndex returns six on a Saturday', async () => {
        const result = testOnDay('2024-01-06T12:00:00Z')
        expect(result).toBe(6);
    });

})