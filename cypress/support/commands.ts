/// <reference types="cypress" />

import { BACKEND_URL } from "./constants"

Cypress.Commands.add("loginTestUser", (email, password) => {
    cy.request("POST", `${BACKEND_URL}/login`, {email: email, password: password})
    .then((response) =>
        expect(response.status).equal(200)
    )
})

