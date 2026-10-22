describe("asmaul-husna page", () => {
  it("searches the 99 names and offers a copy action", () => {
    cy.visit("/asmaul-husna");

    cy.get("h1").contains("Asma'ul Husna");
    cy.get("nav").should("be.visible");
    cy.get(`[data-cy="description"]`).contains("Kenali 99 nama Allah");

    cy.get('input[type="search"]').type("Not matched asmaul husna");
    cy.get(`[data-cy="not-found-text"]`).contains("tidak ditemukan");

    cy.get('input[type="search"]').clear().type("Ar Rahman");
    cy.get(`[data-cy="card"]`).first().should("contain", "Ar Rahman");
    cy.get(`[data-cy="card"]`)
      .first()
      .find('button[aria-label^="Salin"]')
      .should("be.visible");
  });
});
