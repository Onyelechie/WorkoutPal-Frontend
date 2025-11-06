/// <reference types="cypress" />
// sources:
// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
// https://docs.cypress.io/app/end-to-end-testing/testing-your-app

import { BACKEND_URL, testUser } from "../../support/constants";
// ASSUMPTIONS BEFORE RUNNING ACCEPTANCE TESTS
// 1. Backend is running and is healthy
// 2. Database is running and is healthy
// 3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

// Another note:
// These tests need to run to full completion to ensure the test users that were created are deleted in the database.
// If the test users are not deleted, tests may start to fail.
// The test users need to be manually deleted in the database.

describe("Profile Feature", () => {
  // ADDITIONAL ASSUMPTIONS:
  // testUser has access to profile features and can interact with other users
  // Jane Smith is a default user that exists in the system
  // See cypress/support/constants.ts to see the details of testUser

  beforeEach(() => {
    // make sure we are logged in to be able to perform actions in the website
    cy.loginTestUser(testUser.email, testUser.password);

    // intercept possible requests
    cy.intercept("PATCH", `/users/${testUser.id}`).as("updateProfileRequest");
    cy.intercept("POST", "/users/*/follow*").as("followRequest");
    cy.intercept("POST", "/users/*/unfollow*").as("unfollowRequest");
    cy.intercept("GET", "/users?search=*").as("searchRequest");
  });

  it("user can view their profile information", () => {
    cy.visit("/profile");

    // verify profile elements are displayed
    cy.contains(testUser.username).should("be.visible");
    cy.contains("Posts").should("be.visible");
    cy.contains("Followers").should("be.visible");
    cy.contains("Following").should("be.visible");
  });

  it("user can edit their profile", () => {
    cy.visit("/profile");

    // open edit modal and update profile
    cy.contains("button", "Edit Profile").click();
    cy.get("input[name=name]").clear().type("Updated Name");
    cy.get("input[name=age]").clear().type("25");
    cy.contains("button", "Save Changes").click();

    // verify the update was successful
    cy.wait("@updateProfileRequest")
      .its("response.statusCode")
      .should("eq", 200);
    cy.contains("Updated Name").should("be.visible");
  });

  it("user can search for other users", () => {
    cy.visit("/home");

    // search for Jane Smith and navigate to her profile
    cy.get("input[placeholder='Search users...']").type("jane smith");
    cy.wait("@searchRequest");
    cy.contains("Jane Smith").click();

    // verify we are on Jane's profile
    cy.url().should("include", "/users/");
    cy.contains("Jane Smith").should("be.visible");
  });

  it("user can follow another user and following count increments", () => {
    cy.visit("/home");

    // navigate to Jane Smith's profile
    cy.get("input[placeholder='Search users...']").type("jane smith");
    cy.contains("Jane Smith").click();

    // follow Jane Smith
    cy.contains("button", "Follow").click();
    cy.wait("@followRequest").its("response.statusCode").should("eq", 200);
    cy.contains("button", "Unfollow").should("be.visible");

    // verify following count increased on own profile
    cy.contains("button", "Profile").click();
    cy.reload();
    cy.get(".stat-number").eq(2).should("contain", "1");
  });

  it("user can unfollow another user and following count decrements", () => {
    cy.visit("/home");

    // navigate to Jane Smith's profile
    cy.get("input[placeholder='Search users...']").type("jane smith");
    cy.contains("Jane Smith").click();

    // follow then unfollow Jane Smith
    cy.contains("button", "Follow").click();
    cy.wait("@followRequest");

    cy.contains("button", "Unfollow").click();
    cy.wait("@unfollowRequest").its("response.statusCode").should("eq", 200);
    cy.contains("button", "Follow").should("be.visible");

    // verify following count decreased on own profile
    cy.contains("button", "Profile").click();
    cy.get(".stat-number").eq(2).should("contain", "0");
  });
});
