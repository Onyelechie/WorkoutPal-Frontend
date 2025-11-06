/// <reference types="cypress" />
// sources:
// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
// https://docs.cypress.io/app/end-to-end-testing/testing-your-app

import { testUser } from "../../support/constants";
// ASSUMPTIONS BEFORE RUNNING ACCEPTANCE TESTS
// 1. Backend is running and is healthy
// 2. Database is running and is healthy
// 3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

// Another note:
// These tests need to run to full completion to ensure the necessary clean up is performed.
// If the clean ups are not performed:
// - tests may start to fail.

describe("Profile Feature", () => {
  // ADDITIONAL ASSUMPTIONS:
  // testUser has access to profile features and can interact with other users
  // targetUser is a default user that exists in the system
  // See cypress/support/constants.ts to see the details of testUser

  // the target user to follow. must be different from testUser
  const targetUser = { id: 2, name: "Jane Smith", nameLowercase: "jane smith" }; 

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

    // search for targetUser and navigate to her profile
    cy.get("input[placeholder='Search users...']").type(targetUser.nameLowercase);
    cy.wait("@searchRequest");
    cy.contains(targetUser.name).click();

    // verify we are on targetUser's profile
    cy.url().should("include", "/users/");
    cy.contains(targetUser.name).should("be.visible");
  });

  it("user can follow another user and following count increments", () => {
    cy.visit("/home");

    // ensure testUser is not follow targetUser initially
    cy.unfollowUser(targetUser.id, testUser.id);

    // navigate to targetUser's profile
    cy.get("input[placeholder='Search users...']").type(targetUser.nameLowercase);
    cy.contains(targetUser.name).click();
    cy.url().should("include", `/users/${targetUser.id}`);

    // follow targetUser
    cy.contains("button", "Follow").click();
    cy.wait("@followRequest").its("response.statusCode").should("eq", 200);
    cy.contains("button", "Unfollow").should("be.visible");

    // verify following count increased on own profile
    cy.contains("button", "Profile").click();
    cy.reload();
    cy.get(".stat-number").eq(2).should("contain", "1");

    // ensure testUser is not following targetUser after this test
    cy.unfollowUser(targetUser.id, testUser.id);
  });

  it("user can unfollow another user and following count decrements", () => {
    cy.visit("/home");

    // ensure testUser is not following targetUser initially
    cy.unfollowUser(targetUser.id, testUser.id);

    // navigate to targetUser's profile
    cy.get("input[placeholder='Search users...']").type(targetUser.nameLowercase);
    cy.contains(targetUser.name).click();

    // follow then unfollow targetUser
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
