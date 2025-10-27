/* Utility class for anything related to dates. */

// these constants need to be parallel to each other
export const daysShortForm = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
export const daysLongForm = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// returns the index of a day.
// assumes an array has values Sunday to Saturday in indices 0 to 6 respectively. i.e. Monday = 1, Wednesday = 3, Sunday = 0, etc.
// only returns values from 0 to 6.
export function getTodayIndex() {
    const today = new Date();
    return today.getDay(); 
};

// formats the date we get from the API to "HH:MM"
export function formatApiDate(apiDate:string) {
    const date = new Date(apiDate);

    // Get hours and minutes
    const hours = date.getUTCHours(); // use getUTCHours() because the date the api uses is in UTC
    const minutes = date.getUTCMinutes();

    // Format as "HH:MM"
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
};

// turns minutes into hours, rounded to two decimal places
export function minutesToHours(minutes:number) {
    return (minutes/60).toFixed(2); // round to two decimal places
}
