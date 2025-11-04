/// <reference types="cypress" />
// sources:
// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
// https://docs.cypress.io/app/end-to-end-testing/testing-your-app

const BACKEND_URL = Cypress.env("VITE_BACKEND_URL");
// ASSUMPTIONS BEFORE RUNNING ACCEPTANCE TESTS
// 1. Backend is running and is healthy
// 2. Database is running and is healthy
// 3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

// Another note:
// These tests need to run to full completion to ensure the test user that was created is deleted in the database.
// If the test user is not deleted, tests will start to fail.
// If the test user is not deleted, const testUser details need to be changed or the test user needs to be manually deleted in the database.

describe("Auth", () => {
  // attempt to make test user as unique as possible to prevent registering an existing user by accident
  // if the tests attempt to register an existing user, test will start to fail - assuming entire system works as it should
  const testUser = {
    id: null,
    name: "dlfkjgpw3",
    username: "slkgrjirot23408",
    email: "ldkfgj3450981@email.com",
    password: "testPassword",
  };

  // assumption for deleteTestUser: that testUser exists
  async function deleteTestUser() {
    if (testUser.id != null) {
      console.log(`Deleting test user with id ${testUser.id}`);
      cy.request("POST", `${BACKEND_URL}/login`, testUser).then(() => {
        cy.request("DELETE", `${BACKEND_URL}/users/${testUser.id}`);
        testUser.id = null; // reset it
      });
    }
  }

  beforeEach(() => {
    // intercept possible requests
    cy.intercept("POST", "/users").as("registerRequest");
    cy.intercept("POST", "/login").as("loginRequest");
  });

  afterEach(() => {
    // clear cookies and delete the created test user
    cy.clearAllCookies();
    deleteTestUser();
  });

  it("user can register, login and logout", () => {
    cy.visit("/");

    // make sure we are redirected
    cy.url().should("include", "/auth/login");

    cy.contains("Create Account").click();

    // make sure we are in the register page
    cy.url().should("include", "/auth/register");

    // fill the inputs
    cy.get("input[name=name]").type(testUser.name);
    cy.get("input[name=username]").type(testUser.username);
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(testUser.password);
    cy.get("input[name=confirm-password]").type(`${testUser.password}{enter}`);

    // save the created user ID so it can be deleted after
    cy.wait("@registerRequest").then((interception) => {
      testUser.id = interception.response?.body.id;
      expect(interception.response?.statusCode).equal(201);
    });

    // make sure we are redirected back to the login page
    cy.url().should("include", "/auth/login");

    cy.get("input[name=email]").type(testUser.email);
    // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${testUser.password}{enter}`);

    // make sure we are redirected back to the home page
    cy.url().should("include", "/home");

    // make sure access token exists upon logging in
    cy.getCookie("access_token").should("exist");

    // navigate to profile page where logout button is located
    cy.contains("button", "Profile").click();
    cy.url().should("include", "/profile");

    // intercept the request to verify status code of log out
    cy.intercept("POST", "/logout").as("logoutRequest");
    // attempt log out
    cy.contains("button", "Logout").click();
    cy.wait("@logoutRequest").its("response.statusCode").should("eq", 200);

    // make sure we are redirected back to the login page
    cy.url().should("include", "/auth/login");

    // make sure access token gets delete upon logging out
    cy.getCookie("access_token").should("be.null");
  });

  it("user cannot have duplicate username and email", () => {
    // go to the register page
    cy.visit("/auth/register");

    // create the testUser
    cy.get("input[name=name]").type(testUser.name);
    cy.get("input[name=username]").type(testUser.username);
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(testUser.password);
    cy.get("input[name=confirm-password]").type(`${testUser.password}{enter}`);

    // save the created user ID so it can be deleted after
    cy.wait("@registerRequest").then((interception) => {
      const { response } = interception;
      testUser.id = response?.body.id;
      expect(response?.statusCode).equal(201);
    });

    // go back to the register page
    cy.visit("/auth/register");

    // this should fail
    cy.get("input[name=name]").type(testUser.name);
    cy.get("input[name=username]").type(testUser.username);
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(testUser.password);
    cy.get("input[name=confirm-password]").type(`${testUser.password}{enter}`);

    // expect the request to fail and return 400
    cy.wait("@registerRequest").its("response.statusCode").should("eq", 400);
  });

  it("user cannot login when account does not exist", () => {
    cy.visit("/auth/login");

    // fill the inputs with invalid email format
    cy.get("input[name=email]").type("sdkfjgrogwt@");
    cy.get("input[name=password]").type(`lwejriofwt{enter}`);

    // expect no login requests to be sent at this point
    cy.get("@loginRequest.all").should("have.length", 0);

    // clear the input boxes
    cy.get("input[name=email]").clear();
    cy.get("input[name=password]").clear();

    // fill the input with valid email format
    cy.get("input[name=email]").type("sdkfjgrogwt@email.com");
    cy.get("input[name=password]").type(`lwejriofwt{enter}`);

    // expect 401 unauthorized
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });

  it("user cannot login with invalid password for an existing account", () => {
    // register the account
    cy.visit("/auth/register");
    cy.get("input[name=name]").type(testUser.name);
    cy.get("input[name=username]").type(testUser.username);
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type(testUser.password);
    cy.get("input[name=confirm-password]").type(`${testUser.password}{enter}`);

    // save the created user ID so it can be deleted after
    cy.wait("@registerRequest").then((interception) => {
      testUser.id = interception.response?.body.id;
      expect(interception.response?.statusCode).equal(201);
    });

    // go back to login with invalid password
    cy.visit("/auth/login");
    cy.get("input[name=email]").type(testUser.email);
    cy.get("input[name=password]").type("vnjreh049368{enter}");

    // expect 401 unauthorized
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });
});
