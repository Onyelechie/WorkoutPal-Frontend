/// <reference types="cypress" />

import { BACKEND_URL } from "./constants"

Cypress.Commands.add("loginTestUser", (email, password) => {
    cy.request("POST", `${BACKEND_URL}/login`, { email: email, password: password })
        .then((response) =>
            expect(response.status).equal(200)
        )
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
                .then((response) => {
                    expect(response.status).equal(200)
                })
        })
})

