describe("quran page", () => {
  it("should display quran page and test it", () => {
    cy.visit("http://localhost:3000/quran/");

    // test heading content
    cy.get("h1").contains("Baca Al-Qur'an");

    // test if there is navbar
    cy.get("nav").should("be.visible");

    // test the image
    cy.get("img").should("be.visible");

    // test the description
    cy.get(`[data-cy="description"]`).contains(`"Berlomba-lombalah kamu dalam berbuat kebaikan"`);

    // test shortcut key functionality(shift + enter)
    cy.get("body")
      .type("{shift}{enter}")

      // test if input from user is not matched
      .type("Not matched surat", { delay: 100 })
      .get(`[data-cy="not-found-text"]`)
      .contains("Input surat yang kamu masukkan tidak ditemukan!");

    // test if input from user is matched
    cy.get("input").clear().type("Al-kahf").get(`[data-cy="card"]`).should("be.visible");

    cy.get("input").clear();

    // test shortcut key functionality(esc)
    cy.get("body").type("{esc}");
  });
});
