/// <reference types="cypress" />
// sources:
// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
// https://docs.cypress.io/app/end-to-end-testing/testing-your-app

import { removeUndefinedValuesInObject } from "google-auth-library/build/src/util";
import { BACKEND_URL, testUser } from "../../support/constants";
// ASSUMPTIONS BEFORE RUNNING ACCEPTANCE TESTS
// 1. Backend is running and is healthy
// 2. Database is running and is healthy
// 3. Frontend is running on the baseUrl set in cypress.config.ts in the root folder

// Another note:
// These tests need to run to full completion to ensure the test schedule and any other seed data that was created is deleted in the database.
// If the test schedule is not deleted:
// - tests may start to fail.
// - The test schedule needs to be manually deleted in the database.
// - The test schedule will be linked to the testUser account listed in cypress/support/constants.ts

describe("Routine Scheduler Feature", () => {

    // ADDTIONAL ASSUMPTIONS:
    // testUser has no schedules at all in their account. 
    // See cypress/support/constants.ts to see the details of testUser

    const testSchedule = { name: "Test schedule", dayOfWeek: 2, routineIds: [], timeSlot: "12:00", routineLengthMinutes: 120 };
    const testRoutine = { exerciseIds: [1], name: "Fake routine" }
    
    beforeEach(() => { // make sure we are logged to be able to perform actions in the website
        cy.loginTestUser(testUser.email, testUser.password);

        // intercept possible requests
        cy.intercept("POST", "/schedules").as("addScheduleRequest");
        cy.intercept("PUT", "/schedules/*").as("editScheduleRequest");
        cy.intercept("DELETE", "/schedules/*").as("deleteScheduleRequest");
    });

    it("user can create and delete a schedule", () => {

        // add a routine using the API to be added to the schedule
        cy.createRoutine(testUser.id, testRoutine.name, testRoutine.exerciseIds).then((routineId) => {

            cy.visit("/routine/scheduler");
            cy.get("[data-cy=create-schedule-btn]").click();

            // add the schedule
            cy.get("[data-cy=schedule-name-input]").type(testSchedule.name);
            cy.get("[data-cy=schedule-routine-select]").select(testRoutine.name);
            // day and time slot should default to the current day and time
            cy.get("[data-cy=schedule-routine-length-input]").type(`${testSchedule.routineLengthMinutes}`);
            cy.get("[data-cy=add-schedule-btn]").click();
            cy.wait("@addScheduleRequest").then((addScheduleIntercept) => {
                const addScheduleResponse = addScheduleIntercept.response;
                expect(addScheduleResponse?.statusCode).equal(201);
                // now delete it
                cy.contains("tr", testSchedule.name).click();
                cy.get("[data-cy=delete-schedule-btn]").click();
                cy.wait("@deleteScheduleRequest").its("response.statusCode").should("eq", 200);
            })

            // delete the created routine using the API
            cy.deleteRoutine(routineId as any);
        })
    });

    it("user cannot create a schedule with no name or routine length", () => {
        
        // add a routine using the API to be added to the schedule
        cy.createRoutine(testUser.id, testRoutine.name, testRoutine.exerciseIds).then((routineId) => {

            // intercept any POST requests. throw an Error if any has been called
            cy.intercept("POST", "**", (req) => {
                throw new Error(`POST request to ${req.url} should not have been called`);
            }).as('anyPostRequest');

            // attempt to add the schedule with no name
            cy.visit("/routine/scheduler");
            cy.get("[data-cy=create-schedule-btn]").click();
            cy.get("[data-cy=schedule-routine-select]").select(testRoutine.name);
            // day and time slot should default to the current day and time
            cy.get("[data-cy=schedule-routine-length-input]").type(`${testSchedule.routineLengthMinutes}`);
            cy.get("[data-cy=add-schedule-btn]").click();

            // attempt to add the schedule with no time
            cy.visit("/routine/scheduler");
            cy.get("[data-cy=create-schedule-btn]").click();
            cy.get("[data-cy=schedule-name-input]").clear().type(testSchedule.name);
            cy.get("[data-cy=schedule-routine-length-input]").clear();
            cy.get("[data-cy=add-schedule-btn]").click();
            
            // delete the created routine using the API
            cy.deleteRoutine(routineId as any);
        })
    });

    it("user can edit a schedule", () => {
        
        // add the schedule using the API
        cy.createSchedule(
            testUser.id, testSchedule.name, testSchedule.routineIds, testSchedule.routineLengthMinutes, testSchedule.dayOfWeek, testSchedule.timeSlot).then((scheduleId) => {

            const editedSchedule = { name: "edited name here", routineLengthMinutes: 123, dayOfWeek: 4, timeSlot: "15:00" };
            // now edit it
            cy.visit("/routine/scheduler");
            cy.contains("tr", testSchedule.name).click();
            cy.get("[data-cy=edit-schedule-name-input]").should("have.value", testSchedule.name).clear().type(editedSchedule.name);
            cy.get("[data-cy=edit-schedule-routine-length-input]").should("have.value", testSchedule.routineLengthMinutes).clear().type(`${editedSchedule.routineLengthMinutes}`);
            cy.get("[data-cy=edit-schedule-day-select]").should("have.value", testSchedule.dayOfWeek).select(editedSchedule.dayOfWeek);
            cy.get("[data-cy=edit-schedule-time-slot-input]").should("have.value", testSchedule.timeSlot).clear().type(editedSchedule.timeSlot);
            cy.get("[data-cy=edit-schedule-btn]").click();
            cy.wait("@editScheduleRequest").its("response.statusCode").should("eq", 200);

            // now delete the schedule after checking the fields were edited to the new values
            cy.contains("tr", editedSchedule.name).click();
            cy.get("[data-cy=edit-schedule-name-input]").should("have.value", editedSchedule.name);
            cy.get("[data-cy=edit-schedule-routine-length-input]").should("have.value", editedSchedule.routineLengthMinutes);
            cy.get("[data-cy=edit-schedule-day-select]").should("have.value", editedSchedule.dayOfWeek);
            cy.get("[data-cy=edit-schedule-time-slot-input]").should("have.value", editedSchedule.timeSlot);
            cy.get("[data-cy=delete-schedule-btn]").click();
            cy.wait("@deleteScheduleRequest").its("response.statusCode").should("eq", 200);

            // delete the created schedule using the API
            cy.deleteSchedule(scheduleId as any);
        })
    });
});
