declare namespace Cypress {
  interface Chainable {
    
    // login test user through an API request
    loginTestUser(email: string, password: string): Chainable<void>;
  }
}