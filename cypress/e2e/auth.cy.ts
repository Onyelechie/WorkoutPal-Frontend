/// <reference types="cypress" />
// sources:
// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
// https://docs.cypress.io/app/end-to-end-testing/testing-your-app

import { BACKEND_URL } from '../../src/utils/apiRequests';

// ASSUMPTIONS BEFORE RUNNING ACCEPTANCE TESTS
// 1. Backend is running and is healthy
// 2. Database is running and is healthy
// 3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

describe('Auth', () => {

  const testUser = {id: null, name: "testUser", username: "testUsername", email: "test@email.com", password: "testPassword"};

  // assumption for deleteTestUser: that testUser exists
  async function deleteTestUser() {
    if (testUser.id != null) {
      console.log(`Deleting test user with id ${testUser.id}`);
      cy.request('POST', `${BACKEND_URL}/login`, testUser).then(() => {
        cy.request('DELETE', `${BACKEND_URL}/users/${testUser.id}`);
      });
    }
  };

  beforeEach(() => {
    cy.intercept("POST", "/users").as("registerRequest");
  });

  afterEach(() => {
    // clear cookies and delete the created test user
    cy.clearAllCookies();
    deleteTestUser();
  });

  it('user can register and login', () => {
    cy.visit('/');

    // make sure we are redirected
    cy.url().should('include', '/auth/login');

    cy.contains('Create Account').click();

    // make sure we are in the register page
    cy.url().should('include', '/auth/register');

    // fill the inputs
    cy.get('input[name=name]').type(testUser.name)
    cy.get('input[name=username]').type(testUser.username);
    cy.get('input[name=email]').type(testUser.email);
    cy.get('input[name=password]').type(testUser.password);
    cy.get('input[name=confirm-password]').type(`${testUser.password}{enter}`);

    // save the created user ID
    cy.wait('@registerRequest').then((interception) => {
      testUser.id = interception.response?.body.id;
    });

    // make sure we are redirected back to the login page
    cy.url().should('include', '/auth/login');

    cy.get('input[name=email]').type(testUser.email);
    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${testUser.password}{enter}`);

    // make sure we are redirected back to the home page
    cy.url().should('include', '/home');
    
    // make sure access token exists upon logging in
    cy.getCookie("access_token").should('exist');
  });

  it('user cannot have duplicate username and email', () => {

    // go to the register page
    cy.visit('/auth/register');

    // create the testUser
    cy.get('input[name=name]').type(testUser.name)
    cy.get('input[name=username]').type(testUser.username);
    cy.get('input[name=email]').type(testUser.email);
    cy.get('input[name=password]').type(testUser.password);
    cy.get('input[name=confirm-password]').type(`${testUser.password}{enter}`);

    // save the created user ID
    cy.wait('@registerRequest').then((interception) => {
      const { response } = interception;
      testUser.id = response?.body.id;
      expect(response?.statusCode).equal(201);
    });

    // go back to the register page
    cy.visit('/auth/register');

    // this should fail
    cy.get('input[name=name]').type(testUser.name)
    cy.get('input[name=username]').type(testUser.username);
    cy.get('input[name=email]').type(testUser.email);
    cy.get('input[name=password]').type(testUser.password);
    cy.get('input[name=confirm-password]').type(`${testUser.password}{enter}`);

    // expect the request to fail and return 400
    cy.wait('@registerRequest').its('response.statusCode').should('eq', 400);
  });

})