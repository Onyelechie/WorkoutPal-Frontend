/// <reference types="cypress" />

import { BACKEND_URL } from "./constants"

Cypress.Commands.add("loginTestUser", (email, password) => {
    cy.request("POST", `${BACKEND_URL}/login`, {email: email, password: password})
    .then((response) =>
        expect(response.status).equal(200)
    )
})

// assumption: testUser is logged in before calling this command
Cypress.Commands.add("createRoutine", (userId, name, exerciseIds) => {
    return cy.request("POST", `${BACKEND_URL}/users/${userId}/routines`, {
        name: name,
        exerciseIds: exerciseIds
    }).then((response) => {
        expect(response.status).equal(201);
        return response.body.id;
    })  
})

// assumption: testUser is logged in before calling this command
Cypress.Commands.add("deleteRoutine", (routineId) => {
    cy.request("DELETE", `${BACKEND_URL}/routines/${routineId}`).then((response) => {
        expect(response.status).equal(200);
    })
})

// assumption: testUser is logged in before calling this command
Cypress.Commands.add("createSchedule", (userId, name, routineIds, routineLengthMinutes, dayOfWeek, timeSlot) => {
    return cy.request("POST", `${BACKEND_URL}/schedules`, {
        userId: userId,
        name: name,
        routineIds: routineIds,
        routineLengthMinutes,
        dayOfWeek: dayOfWeek,
        timeSlot: timeSlot
    }).then((response) => {
        expect(response.status).equal(201);
        return response.body.id;
    })  
})

// assumption: testUser is logged in before calling this command
Cypress.Commands.add("deleteSchedule", (scheduleId) => {
    cy.request("DELETE", `${BACKEND_URL}/schedules/${scheduleId}`).then((response) => {
        expect(response.status).equal(200);
    })
})
Cypress.Commands.add("createUser", (user) => {
    return cy.request("POST", `${BACKEND_URL}/users`, {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
    }).then((response) => {
        expect(response.status).equal(201)
        return response.body.id
    })
})

Cypress.Commands.add("deleteUser", (userId, email, password) => {
    cy.request("POST", `${BACKEND_URL}/login`, { email, password })
    .then(() => {
        cy.request("DELETE", `${BACKEND_URL}/users/${userId}`)
    })
})

