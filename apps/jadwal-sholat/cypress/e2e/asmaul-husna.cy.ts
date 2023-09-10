describe("asmaul-husna page", () => {
  it("should display asmaul-husna page and test it", () => {
    cy.visit("http://localhost:3000/asmaul-husna");

    // test the heading content
    cy.get("h1").contains("Asma'ul Husna");

    // test if there is navbar
    cy.get("nav").should("be.visible");

    // test the description tag content
    cy.get("#description").contains("Berikut daftar Asma'ul Husna");

    // test if input from user is not matched
    cy.get("input")
      .type("Not matched asmaul husna", { delay: 100 })
      .get("#not-found-text")
      .contains("Input Asma'ul Husna yang kamu masukkan tidak ditemukan!");

    // test if input from user is matched
    cy.get("input").clear().type("Ar Rahman").get("#card").should("be.visible");
  });
});
