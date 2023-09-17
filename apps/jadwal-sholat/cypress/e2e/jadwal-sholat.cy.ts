describe("jadwal-sholat page", () => {
  it("should display jadwal-sholat page and test it", () => {
    cy.visit("http://localhost:3000/jadwal-sholat");

    // test heading content
    cy.get("h1").contains("Jadwal Sholat");

    // test if there is navbar
    cy.get("nav").should("be.visible");

    // test the image
    cy.get("img").should("be.visible");

    // test the description
    cy.get(`[data-cy="description"]`).contains("Berikut daftar Kabupaten/Kota yang tersedia");

    // test shortcut key functionality(shift + enter)
    cy.get("body")
      .type("{shift}{enter}")

      // test if input from user is not matched
      .type("Not matched kota or kabupaten", { delay: 100 })
      .get(`[data-cy="not-found-text"]`)
      .contains("Input Kota yang kamu masukkan tidak ditemukan!");

    // test if input from user is matched
    cy.get("input").clear().type("Pangkal Pinang").get(`[data-cy="card"]`).should("be.visible");

    cy.get("input").clear();

    // test shortcut key functionality(esc)
    cy.get("body").type("{esc}");
  });
});
