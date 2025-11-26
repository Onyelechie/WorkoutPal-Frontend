import { describe, it, expect, vi } from "vitest";
import {
  getTodayIndex,
  formatApiTime,
  formatMs,
  getMinutes,
  getSeconds,
  minutesAndSecondsToMs,
  minutesToHours,
  daysShortForm,
  daysLongForm
} from "../dateTime";

describe("/utils/dateTime.ts", () => {
  // use fake timers for all date tests
  vi.useFakeTimers();

  // reusable function to test on a given day
  function testOnDay(dateString: string) {
    const mockDate = new Date(dateString);
    vi.setSystemTime(mockDate);
    return getTodayIndex();
  }

  it("getTodayIndex returns zero on a Sunday", async () => {
    const result = testOnDay("2024-01-07T12:00:00Z");
    expect(result).toBe(0);
  });

  it("getTodayIndex returns three on a Wednesday", async () => {
    const result = testOnDay("2024-01-03T12:00:00Z");
    expect(result).toBe(3);
  });

  it("getTodayIndex returns six on a Saturday", async () => {
    const result = testOnDay("2024-01-06T12:00:00Z");
    expect(result).toBe(6);
  });

  it("formatApiTime returns string with format HH:MM", async () => {
    const sampleApiTime = "0000-01-01T18:00:00Z"; // a sample of the time we receive from the backend
    const testTime = formatApiTime(sampleApiTime);

    expect(testTime).toBe("18:00");
  });

  it("formatApiTime with an invalid time returns NaN:NaN", async () => {
    const invalidTime = "20:15"; // invalid time
    const testTime = formatApiTime(invalidTime);

    expect(testTime).toBe("NaN:NaN");
  });

  it("minutesToHours converts 60 minutes to 1 hour", async () => {
    const sampleMinutes = 60;
    const testHours = minutesToHours(sampleMinutes);

    expect(testHours).toBe("1.00"); // must be in two decimal places
  });

  it("minutesToHours returns string conversion, rounded up with two decimal places", async () => {
    const sampleMinutes = 1234;
    const testHours = minutesToHours(sampleMinutes);

    // 1234 minutes to hours is 20.5666666667
    expect(testHours).toBe("20.57"); // must be in two decimal places
  });

  it("formatApiTime returns formatted HH:MM for valid API time", () => {
    expect(formatApiTime("0000-01-01T18:00:00Z")).toBe("18:00");
  });

  it("formatApiTime handles different minutes", () => {
    expect(formatApiTime("0000-01-01T05:09:00Z")).toBe("05:09");
  });

  it("formatApiTime returns NaN:NaN for invalid string", () => {
    expect(formatApiTime("invalid")).toBe("NaN:NaN");
  });

  it("formatMs formats ms into MM:SS", () => {
    expect(formatMs(90000)).toBe("01 min 30 sec");
  });

  it("formatMs handles zero correctly", () => {
    expect(formatMs(0)).toBe("00 min 00 sec");
  });

  it("formatMs handles exact minute boundary", () => {
    expect(formatMs(60000)).toBe("01 min 00 sec");
  });

  it("getMinutes extracts whole minutes from ms", () => {
    expect(getMinutes(120000)).toBe(2);
  });

  it("getMinutes floors partial minutes", () => {
    expect(getMinutes(119999)).toBe(1);
  });

  it("getSeconds extracts remaining seconds within a minute", () => {
    expect(getSeconds(90000)).toBe(30);
  });

  it("getSeconds returns 0 on exact minute mark", () => {
    expect(getSeconds(60000)).toBe(0);
  });

  it("minutesAndSecondsToMs converts correctly", () => {
    expect(minutesAndSecondsToMs(1, 30)).toBe(90000);
  });

  it("minutesAndSecondsToMs handles zeros", () => {
    expect(minutesAndSecondsToMs(0, 0)).toBe(0);
  });

  it("minutesToHours converts minutes to hours (60 → 1.00)", () => {
    expect(minutesToHours(60)).toBe("1.00");
  });

  it("minutesToHours rounds to 2 decimals", () => {
    expect(minutesToHours(1234)).toBe("20.57");
  });

  it("minutesToHours handles small values", () => {
    expect(minutesToHours(1)).toBe("0.02");
  });

  it("minutesToHours works with zero", () => {
    expect(minutesToHours(0)).toBe("0.00");
  });

  it("daysShortForm and daysLongForm arrays are parallel", () => {
    expect(daysShortForm.length).toBe(7);
    expect(daysLongForm.length).toBe(7);

    // Check indices match the intended names
    expect(daysShortForm[0]).toBe("Sun");
    expect(daysLongForm[0]).toBe("Sunday");
    expect(daysShortForm[6]).toBe("Sat");
    expect(daysLongForm[6]).toBe("Saturday");
  });
  
});
