/* Utility class for anything related to dates. */

export const daysShortForm = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

// returns the index of a day.
// assumes an array has values Monday to Sunday in indices 0 to 6 respectively. i.e. Monday = 0, Wednesday = 2, Sunday = 6, etc.
// only returns values from 0 to 6.
export function getTodayIndex() {
    const today = new Date();

    let dayIndex = today.getDay()-1; // -1 to offset for base 0
    // today.getDay() will only return values from 0 to 6

    if (dayIndex === -1) { // getDay() on a Sunday returns 0, so dayIndex = -1
        const SUNDAY_INDEX = 6;
        dayIndex = SUNDAY_INDEX; // go to Sunday
    }

    return dayIndex; 
};
