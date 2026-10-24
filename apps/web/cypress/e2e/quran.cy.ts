describe("quran page", () => {
  it("searches the surah list", () => {
    cy.visit("/quran");

    cy.get("h1").contains("Baca Al-Qur'an");
    cy.get("nav").should("be.visible");
    cy.get(`[data-cy="description"]`).contains("Berlomba-lombalah");

    cy.get('input[type="search"]').type("Not matched surat");
    cy.get(`[data-cy="not-found-text"]`).should("be.visible");

    cy.get('input[type="search"]').clear().type("Al-Kahf");
    cy.get(`[data-cy="card"]`).should("be.visible");
  });
});
