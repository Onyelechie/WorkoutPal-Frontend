/* Utility class for anything related to dates. */

export const daysShortForm = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

export function getTodayIndex() {
    const today = new Date();
    return today.getDay()-1; // -1 to offset for base 0
};
