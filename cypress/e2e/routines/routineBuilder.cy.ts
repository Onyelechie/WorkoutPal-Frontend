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
// These tests need to run to full completion to ensure the test routine and any other seed data that was created is deleted in the database.
// If the test routine is not deleted:
// - tests may start to fail.
// - The test routine needs to be manually deleted in the database.
// - The test routine will be linked to the testUser account listed in cypress/support/constants.ts

describe("RoutineBuilder", () => {

    // ADDTIONAL ASSUMPTIONS:
    // testUser has no routines at all in their account. 
    // See cypress/support/constants.ts to see the details of testUser

    const testRoutine = { name: "Test routine" };
    
    beforeEach(() => { // make sure we are logged to be able to perform actions in the website
        cy.loginTestUser(testUser.email, testUser.password);

        // intercept possible requests
        cy.intercept("POST", `/users/${testUser.id}/routines`).as("addRoutineRequest");
        cy.intercept("DELETE", `/routines/*`).as("deleteRoutineRequest");
    });

    it("user can create and delete a routine", () => {
        cy.visit("/routine/builder");

        // add the routine
        cy.get("[data-cy=add-routine-btn]").click();
        cy.get("[data-cy=routine-name-input]").type(testRoutine.name);
        cy.get("[data-cy=exercise-checkbox]").first().check();
        cy.get("[data-cy=create-routine-btn]").scrollIntoView().should('be.visible').click();
        cy.wait("@addRoutineRequest").then((intercept) => {
            const response = intercept.response;
            expect(response?.body.name).equal(testRoutine.name);

            // now delete it
            cy.visit("/routine/builder");
            cy.get("[data-cy=delete-routine-btn]").first().click();
            cy.get("[data-cy=confirm-positive-btn]").click();
            cy.wait("@deleteRoutineRequest").its("response.statusCode").should("eq", 200);
        });
    });

    it("user cannot create a routine without a name", () => {
        cy.visit('/routine/builder');

        // try to add the routine with no name
        // intercept any post request and throw an error if any has been called
        // this single intercept was created by ChatGPT
        cy.intercept("POST", "**", (req) => {
            throw new Error(`POST request to ${req.url} should not have been called`);
        }).as('anyPostRequest');
        cy.get("[data-cy=add-routine-btn]").click();
        cy.get("[data-cy=create-routine-btn]").scrollIntoView().should('be.visible').click();
    });

    it("user cannot delete a routine linked to a schedule", () => {
        cy.visit("/routine/builder");

        // add the routine
        cy.get("[data-cy=add-routine-btn]").click();
        cy.get("[data-cy=routine-name-input]").type(testRoutine.name);
        cy.get("[data-cy=exercise-checkbox]").first().check();
        cy.get("[data-cy=create-routine-btn]").scrollIntoView().should('be.visible').click();
        cy.wait("@addRoutineRequest").then((intercept) => {
            const response = intercept.response;
            expect(response?.body.name).equal(testRoutine.name);

            const routineId = response?.body.id; // keep track of the routineId that was created
            // add the schedule
            const scheduleBody = {
                "name": "Fake schedule",
                "userId": testUser.id,
                "dayOfWeek": 1,
                "routineIds": [
                    routineId
                ],
                "timeSlot": "12:00",
                "routineLengthMinutes": 123
            }
            cy.request("POST", `${BACKEND_URL}/schedules`, scheduleBody).then((response) => {
                expect(response.status).equal(201);
                
                // attempt to delete the routine while it is linked to a schedule
                cy.visit("/routine/builder");
                cy.get("[data-cy=delete-routine-btn]").first().click();
                cy.get("[data-cy=confirm-positive-btn]").click();
                // should fail
                cy.wait("@deleteRoutineRequest").its("response.statusCode").should("eq", 409);

                cy.request("DELETE", `${BACKEND_URL}/schedules/${response.body.id}`).then((response) => {
                    expect(response.status).equal(200);

                    // try deleting again
                    cy.visit("/routine/builder");
                    cy.get("[data-cy=delete-routine-btn]").first().click();
                    cy.get("[data-cy=confirm-positive-btn]").click();
                    cy.wait("@deleteRoutineRequest").its("response.statusCode").should("eq", 200);
                });
            });
        });
    });


});
