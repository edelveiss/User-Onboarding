import { cyan } from "@material-ui/core/colors";

// context('Assertions', () => {
// beforeEach(function () {
//   cy.visit("http://localhost:3000/registration");
// });

describe("Testing our onboarding form", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/registration");
  });
  it("Add test to inputs and submit form", function () {
    //---------------------------------
    cy.get('input[name="name"]')
      .type("Tatiana Zhizhimontova")
      .should("have.value", "Tatiana Zhizhimontova");

    cy.get("#role")
      .select("Web Developer")
      .should("have.value", "Web Developer");

    cy.get('input[name="location"]').type(" ");

    cy.contains("#locationError", "Needs to be a minimum of 5 characters.");
    cy.get('input[name="location"]').type("ert");
    cy.contains("#locationError", "Needs to be a minimum of 5 characters.");
    cy.get('input[name="location"]')
      .clear()
      .type("Santa Barbara, CA")
      .should("have.value", "Santa Barbara, CA");

    cy.get('input[name="email"]')
      .type("tatyana@gmail.com")
      .should("have.value", "tatyana@gmail.com");

    cy.get('input[name="password"]')
      .type("password123456789")
      .should("have.value", "password123456789");

    cy.get('[type="checkbox"]').check().should("be.checked");

    cy.get('[type="submit"]').click();

    //-----------Disabled submit-----------------------------

    //cy.get('[type="submit"]').should("have.disabled", "true");
    //----------------------------------------
    // cy.get('input[name="location"]').type(" ");

    // cy.contains("#locationError", "Needs to be a minimum of 5 characters.");
    // cy.get('input[name="location"]').type("ert");
    // cy.contains("#locationError", "Needs to be a minimum of 5 characters.");
    // cy.get('input[name="location"]')
    //   .clear()
    //   .type("Santa Barbara, CA")
    //   .should("have.value", "Santa Barbara, CA");
  });
});
//}

// describe("Testing our onboarding form", function () {
//   beforeEach(function () {
//     cy.visit("http://localhost:3000/registration");
//   });
//   it("Add test to inputs and submit form", function () {
//     cy.get('input[name="name"]').type(" ").should("have.value", "");

//     cy.get("#role").select("None").should("have.value", "None");

//     cy.get('input[name="location"]').type(" ").should("have.value", "");

//     cy.get('input[name="email"]').type(" ").should("have.value", "");

//     cy.get('input[name="password"]').type(" ").should("have.value", "");

//     cy.get('[type="checkbox"]').check().should("be.checked");

//     cy.get('[type="submit"]').click();
//   });
// });
