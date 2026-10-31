describe("named ayat", () => {
  it("lists the passages and opens Ayat Kursi with its tafsir", () => {
    cy.visit("/ayat");

    cy.get("h1").contains("Ayat pilihan");
    cy.get('a[href^="/ayat/"]').should("have.length", 8);

    cy.get('a[href="/ayat/ayat-kursi"]').click();
    cy.location("pathname").should("eq", "/ayat/ayat-kursi");
    cy.get("h1").contains("Ayat Kursi");
    cy.get('p[lang="ar"]').should("have.length", 1);
    cy.contains("h3", "Penjelasan (tafsir)").should("be.visible");
    cy.get('a[href="/quran/2#ayat-255"]').should("contain", "Dengarkan");
  });
});
