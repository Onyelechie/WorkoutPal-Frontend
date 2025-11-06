declare namespace Cypress {
  interface Chainable {
    // login test user through an API request
    loginTestUser(email: string, password: string): Chainable<void>;

    // create a routine and return the routineId through an API request
    createRoutine(
      userId: number,
      name: string,
      exerciseIds: number[],
    ): Chainable<void>;

    // delete a routine through an API request
    deleteRoutine(routineId: number): Chainable<void>;

    // create a schedule and return the scheduleId through an API request
    createSchedule(
      userId: number,
      name: string,
      routineIds: number[],
      routineLengthMinutes: number,
      dayOfWeek: number,
      timeSlot: string,
    ): Chainable<void>;

    // delete a schedule through an API request
    deleteSchedule(scheduleId: number): Chainable<void>;

    // create a test user and return the user ID through an API request
    createUser(user: {
      name: string;
      username: string;
      email: string;
      password: string;
    }): Chainable<number>;

    // delete a test user by ID through an API request
    deleteUser(
      userId: number,
      email: string,
      password: string,
    ): Chainable<void>;
  }
}
