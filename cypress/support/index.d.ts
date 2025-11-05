declare namespace Cypress {
  interface Chainable {
    
    // login test user through an API request
    loginTestUser(email: string, password: string): Chainable<void>;
    
    // create a test user and return the user ID
    createUser(user: { name: string; username: string; email: string; password: string }): Chainable<number>;
    
    // delete a test user by ID
    deleteUser(userId: number, email: string, password: string): Chainable<void>;
  }
}