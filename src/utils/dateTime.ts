/* Utility class for anything related to dates. */

// these constants need to be parallel to each other
export const daysShortForm = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
];
export const daysLongForm = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// returns the index of a day.
// assumes an array has values Sunday to Saturday in indices 0 to 6 respectively. i.e. Monday = 1, Wednesday = 3, Sunday = 0, etc.
// only returns values from 0 to 6.
export function getTodayIndex() {
  const today = new Date();
  return today.getDay();
}

// get the current time in a string format "HH:MM"
export function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
}

// formats the time we get from the API to "HH:MM"
export function formatApiTime(apiTime: string) {
  const date = new Date(apiTime);
  // Get hours and minutes
  const hours = date.getUTCHours(); // use getUTCHours() because the date the api uses is in UTC
  const minutes = date.getUTCMinutes();

  // Format as "HH:MM"
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

// given ms, format it to "MM:SS"
export function formatMs(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")} min ${String(seconds).padStart(2, "0")} sec`;
}

// given ms, get the minutes
export function getMinutes(ms: number) {
  return Math.floor(ms / 60000); // 1 min = 60,000 ms
}

// given ms, get the seconds
export function getSeconds(ms: number) {
  return Math.floor(ms / 1000) % 60;
}

// given minutes and seconds, get the ms
export function minutesAndSecondsToMs(minutes: number, seconds: number) {
  return minutes * 60_000 + seconds * 1_000;
}

// turns minutes into hours, rounded to two decimal places
export function minutesToHours(minutes: number) {
  return (minutes / 60).toFixed(2); // round to two decimal places
}
