describe("quran page", () => {
  it("should display quran page and test it", () => {
    cy.visit("http://localhost:3000/quran/");

    // test heading content
    cy.get("h1").contains("Baca Al-Qur'an");

    // test if there is navbar
    cy.get("nav").should("be.visible");

    // test the image
    cy.get("img").should("be.visible");

    // test if input from user is not matched
    cy.get("input")
      .type("Not matched surat", { delay: 100 })
      .get("#not-found-text")
      .contains("Input surat yang kamu masukkan tidak ditemukan!");

    // test if input from user is matched
    cy.get("input").clear().type("Al-kahf").get("#card").should("be.visible");
  });
});
