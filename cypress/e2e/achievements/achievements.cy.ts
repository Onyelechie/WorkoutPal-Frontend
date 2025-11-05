/// <reference types="cypress" />
// sources:
// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
// https://docs.cypress.io/app/end-to-end-testing/testing-your-app

import { BACKEND_URL } from "../../support/constants";
// ASSUMPTIONS BEFORE RUNNING ACCEPTANCE TESTS
// 1. Backend is running and is healthy
// 2. Database is running and is healthy
// 3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

// Another note:
// These tests need to run to full completion to ensure the test user that was created is deleted in the database.
// If the test user is not deleted, tests may start to fail.
// The test user needs to be manually deleted in the database.

describe("Achievements Feature", () => {

  // ADDITIONAL ASSUMPTIONS:
  // New user will get achievements for login and creating routines
  // Achievement system is working and properly configured

  const testUser = {
    id: null,
    name: "Achievement Test User",
    username: `achtest_${Date.now()}`,
    email: `achtest_${Date.now()}@email.com`,
    password: "testPassword123",
  };

  async function deleteTestUser() {
    if (testUser.id != null) {
      cy.request("POST", `${BACKEND_URL}/login`, { email: testUser.email, password: testUser.password }).then(() => {
        cy.request("DELETE", `${BACKEND_URL}/users/${testUser.id}`);
        testUser.id = null;
      });
    }
  }

  beforeEach(() => {
    // intercept possible requests
    cy.intercept("POST", "/users").as("registerRequest");
    cy.intercept("POST", "/login").as("loginRequest");
    cy.intercept("POST", "/users/*/routines").as("createRoutineRequest");
    cy.intercept("POST", "/achievements").as("achievementRequest");
  });

  afterEach(() => {
    deleteTestUser();
  });

  it("user gets login achievement and can view it on achievements page", () => {
    // create new user via registration
    cy.visit("/auth/register");
    cy.get("input[name=name]").type(testUser.name);
    cy.get("input[name=username]").type(testUser.username);
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(testUser.password);
    cy.get("input[name=confirm-password]").type(`${testUser.password}{enter}`);

    cy.wait("@registerRequest").then((interception) => {
      testUser.id = interception.response?.body.id;
      expect(interception.response?.statusCode).equal(201);
    });

    // login and get achievement
    cy.visit("/auth/login");
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(`${testUser.password}{enter}`);

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    // verify login achievement dialog appears
    cy.get('.dialog-container').should('be.visible');
    cy.contains('Achievement Unlocked').should('be.visible');
    cy.contains('Welcome, Pal!').should('be.visible');
    cy.get('.dialog-container button').contains('OK').click();

    // navigate to achievements page
    cy.contains("button", "Achievements").click();
    cy.url().should("include", "/achievements");

    // debug what's actually on the page
    cy.get('body').then(($body) => {
      console.log($body.text());
    });

    // verify login achievement is displayed in completed section
    cy.contains("Completed ✅").should("be.visible");
    cy.contains("Welcome, Pal!").should("be.visible");
  });

  it("user gets routine creation achievement and can view it on achievements page", () => {
    // create and login user
    cy.visit("/auth/register");
    cy.get("input[name=name]").type(testUser.name);
    cy.get("input[name=username]").type(testUser.username);
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(testUser.password);
    cy.get("input[name=confirm-password]").type(`${testUser.password}{enter}`);

    cy.wait("@registerRequest").then((interception) => {
      testUser.id = interception.response?.body.id;
    });

    // login (dismiss login achievement)
    cy.visit("/auth/login");
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(`${testUser.password}{enter}`);
    cy.get('.dialog-container button').contains('OK').click();

    // create a routine to get achievement
    cy.visit("/routine/builder");
    cy.get("[data-cy=add-routine-btn]").click();
    cy.get("[data-cy=routine-name-input]").type("Test Achievement Routine");
    cy.get("[data-cy=exercise-checkbox]").first().check();
    cy.get("[data-cy=create-routine-btn]").scrollIntoView().should('be.visible').click();

    cy.wait("@createRoutineRequest").its("response.statusCode").should("eq", 201);
    cy.wait("@achievementRequest").its("response.statusCode").should("eq", 200);

    // verify routine creation achievement dialog appears
    cy.get('.dialog-container').should('be.visible');
    cy.contains('Achievement Unlocked').should('be.visible');
    cy.contains('Knowledge Sharing').should('be.visible');
    cy.get('.dialog-container button').contains('OK').click();

    // navigate to achievements page
    cy.contains("button", "Achievements").click();
    cy.url().should("include", "/achievements");

    // debug what's actually on the page
    cy.get('body').then(($body) => {
      console.log($body.text());
    });

    // verify both achievements are displayed in completed section
    cy.contains("Completed ✅").should("be.visible");
    cy.contains("Welcome, Pal!").should("be.visible");
    cy.contains("Knowledge Sharing").should("be.visible");
  });
});