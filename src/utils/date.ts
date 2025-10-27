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
