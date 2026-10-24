describe("display settings", () => {
  it("enlarges the text and keeps it after navigating", () => {
    cy.visit("/");

    cy.contains("button", "Tampilan").click();
    cy.contains("Ukuran teks").should("be.visible");
    cy.contains("button", "Besar").first().click();
    cy.get("html").should("have.attr", "data-text-size", "large");

    // The client router swaps <html> attributes; the head script restores them.
    cy.get("body").type("{esc}");
    cy.get('nav[aria-label="Navigasi utama"]').contains("Al-Qur'an").click();
    cy.location("pathname").should("eq", "/quran");
    cy.get("html").should("have.attr", "data-text-size", "large");
  });
});
