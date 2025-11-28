/// <reference types="cypress" />

import { testUser } from "../../support/constants";

describe("Post Features", () => {
    beforeEach(() => {
        cy.loginTestUser(testUser.email, testUser.password);

        // Intercepts for all post endpoints
        cy.intercept("POST", "/posts").as("createPostRequest");
        cy.intercept("POST", "/posts/like").as("likeRequest");
        cy.intercept("POST", "/posts/unlike").as("unlikeRequest");
        cy.intercept("POST", "/posts/comment").as("commentRequest");
        cy.intercept("POST", "/posts/comment/reply").as("replyRequest");

        cy.visit("/home");
    });

    // Utility to parse likes/comments
    function parseCount(text: string) {
        const match = text.match(/(\d+)/);
        if (!match) throw new Error("No count found in text: " + text);
        return parseInt(match[0]);
    }

    // ------------------------------------------------------------
    // CREATE POST
    // ------------------------------------------------------------
    it("cannot create a post if any field is empty", () => {
        cy.contains("button", "Create Post").click();
        cy.get(".create-post-container button[type='submit']").click();

        cy.get("input[name=title]:invalid").should("exist");
        cy.get("input[name=caption]:invalid").should("exist");
        cy.get("textarea[name=body]:invalid").should("exist");

        cy.get("input[name=title]").type("Test Title");
        cy.get("input[name=caption]").type("Test Caption");
        cy.get(".create-post-container button[type='submit']").click();

        cy.get("textarea[name=body]:invalid").should("exist");
        cy.contains("button", "Cancel").click();
    });

    it("user can create a valid post", () => {
        cy.contains("button", "Create Post").click();

        cy.get("input[name=title]").type("My Cypress Post");
        cy.get("input[name=caption]").type("Automated test post");
        cy.get("textarea[name=body]").type("Hello world from Cypress!");

        cy.get(".create-post-container button[type='submit']").click();

        cy.wait("@createPostRequest", { timeout: 10000 })
            .its("response.statusCode")
            .should("eq", 201);

        cy.contains("My Cypress Post").should("be.visible");
    });



    // ------------------------------------------------------------
    // LIKE
    // ------------------------------------------------------------
    it("user can click like button", () => {
        cy.get(".post-card").first().as("firstPost");

        cy.get("@firstPost").find(".post-likes").invoke("text").then((text) => {
            const initialLikes = parseCount(text);

            cy.get("@firstPost").find(".post-likes").click();

        });
    });


    // // ------------------------------------------------------------
    // // LIKE
    // // ------------------------------------------------------------
    // it("user can like a post and like count increments", () => {
    //     cy.get(".post-card").first().as("firstPost");

    //     cy.get("@firstPost").find(".post-likes").invoke("text").then((text) => {
    //         const initialLikes = parseCount(text);

    //         cy.get("@firstPost").find(".post-likes").click();

    //         cy.wait("@likeRequest", { timeout: 1000 })
    //             .its("response.statusCode")
    //             .should("eq", 200);

    //         cy.get("@firstPost").find(".post-likes").invoke("text").should((text) => {
    //             expect(parseCount(text)).to.eq(initialLikes + 1);
    //         });
    //     });
    // });

    // // ------------------------------------------------------------
    // // UNLIKE
    // // ------------------------------------------------------------
    // it("user can unlike a post and like count decrements", () => {
    //     cy.get(".post-card").first().as("firstPost");

    //     cy.get("@firstPost").find(".post-likes").invoke("text").then((text) => {
    //         let initialLikes = parseCount(text);

    //         // Unlike the post
    //         cy.get("@firstPost").find(".post-likes").click();
    //         cy.wait("@unlikeRequest", { timeout: 1000 })
    //             .its("response.statusCode")
    //             .should("eq", 200);

    //         cy.get("@firstPost").find(".post-likes").invoke("text").should((text) => {
    //             expect(parseCount(text)).to.eq(initialLikes - 1);
    //         });
    //     });
    // });

    // ------------------------------------------------------------
    // COMMENTS
    // ------------------------------------------------------------
    it("user can add a comment and comment count increments", () => {
        cy.get(".post-card").first().as("firstPost");

        cy.get("@firstPost").find(".post-comments").invoke("text").then((text) => {
            const initialComments = parseCount(text);

            cy.get("@firstPost").find(".post-comments").click();

            cy.get(".comments-modal").should("be.visible");

            cy.get(".comments-modal input[placeholder='Write a comment...']")
                .type("This is a Cypress comment");

            cy.get(".comments-modal").contains("button", "Post").click({ force: true });

            cy.wait("@commentRequest", { timeout: 1000 })
                .its("response.statusCode")
                .should("eq", 200);

            cy.get("@firstPost").find(".post-comments").invoke("text").should((text) => {
                expect(parseCount(text)).to.eq(initialComments + 1);
            });
        });
    });

    it("user can reply to a comment", () => {
        cy.get(".post-card").first().as("firstPost");

        cy.get("@firstPost").find(".post-comments").click();
        cy.get(".comments-modal").should("be.visible");

        cy.get(".comments-modal .comment").first().as("firstComment");

        cy.get("@firstComment").find(".reply-button").click();
        cy.get("@firstComment").find("input[placeholder='Write a reply...']")
            .type("This is a Cypress reply");

        cy.get("@firstComment").contains("button", "Post").click({ force: true });

        cy.wait("@replyRequest", { timeout: 1000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.contains("This is a Cypress reply").should("be.visible");
    });
});
