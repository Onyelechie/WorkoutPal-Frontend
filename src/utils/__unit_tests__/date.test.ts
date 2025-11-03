import { describe, it, expect, vi } from 'vitest';
import { getTodayIndex, formatApiTime, minutesToHours } from '../date';

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

    it('formatApiTime returns string with format HH:MM', async () => {
        const sampleApiTime = "0000-01-01T18:00:00Z"; // a sample of the time we receive from the backend
        const testTime = formatApiTime(sampleApiTime);
        
        expect(testTime).toBe("18:00");
    });

    it('formatApiTime with an invalid time returns NaN:NaN', async () => {
        const invalidTime = "20:15"; // invalid time
        const testTime = formatApiTime(invalidTime);
        
        expect(testTime).toBe("NaN:NaN");
    });

    it ('minutesToHours converts 60 minutes to 1 hour', async () => {
        const sampleMinutes = 60;
        const testHours = minutesToHours(sampleMinutes);

        expect(testHours).toBe('1.00'); // must be in two decimal places
    });

    it ('minutesToHours returns string conversion, rounded up with two decimal places', async () => {
        const sampleMinutes = 1234;
        const testHours = minutesToHours(sampleMinutes);

        // 1234 minutes to hours is 20.5666666667
        expect(testHours).toBe('20.57'); // must be in two decimal places
    }); 

})