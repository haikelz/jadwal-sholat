describe("asmaul-husna page", () => {
  it("should display asmaul-husna page and test it", () => {
    cy.visit("http://localhost:3000/asmaul-husna");

    // test the heading content
    cy.get("h1").contains("Asma'ul Husna");

    // test if there is navbar
    cy.get("nav").should("be.visible");

    // test the description tag content
    cy.get(`[data-cy="description"]`).contains("Berikut daftar Asma'ul Husna");

    // test shortcut key functionality(shift + enter)

    cy.get("body")
      .type("{shift}{enter}")

      // test if input from user is not matched

      .type("Not matched asmaul husna", { delay: 100 })
      .get(`[data-cy="not-found-text"]`)
      .contains("Input Asma'ul Husna yang kamu masukkan tidak ditemukan!");

    // test if input from user is matched
    cy.get("input").clear().type("Ar Rahman").get(`[data-cy="card"]`).should("be.visible");

    cy.get("input").clear();

    // test shortcuty key functionality(esc)
    cy.get("body").type("{esc}");
  });
});
