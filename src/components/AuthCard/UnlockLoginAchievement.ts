
export function createAchievement() {
    const now = new Date();
    // Format YYYY-MM-DD
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    const dateFormat = now.toISOString().substring(0, 10);

    const achievement = { id: 1, title: "Welcome, Pal!", description: "Log in for the first time.", earnedAt: dateFormat, badgeIcon: "😄", userId: 0 };


    return achievement;

}