describe("jadwal-sholat page", () => {
  it("should display jadwal-sholat page and test it", () => {
    cy.visit("http://localhost:3000/jadwal-sholat");

    // test heading content
    cy.get("h1").contains("Jadwal Sholat");

    // test if there is navbar
    cy.get("nav").should("be.visible");

    // test the image
    cy.get("img").should("be.visible");

    // test the description tag content
    cy.get("#description").contains("Berikut daftar Kabupaten/Kota yang tersedia");

    // test if input from user is not matched
    cy.get("input")
      .type("Not matched kota or kabupaten", { delay: 100 })
      .get("#not-found-text")
      .contains("Input Kota yang kamu masukkan tidak ditemukan!");

    // test if input from user is matched
    cy.get("input").clear().type("Pangkal Pinang").get("#card").should("be.visible");
  });
});
