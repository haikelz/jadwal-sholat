describe("homepage", () => {
  it("leads with the next prayer and shows the month around today", () => {
    cy.visit("/");

    // One h1: the next prayer once the schedule loads ("Jadwal Sholat" before).
    cy.get("h1").should("have.length", 1);
    cy.get('nav[aria-label="Navigasi utama"]').should("be.visible");

    // The month frame shows the days around today, with the full month on demand.
    cy.contains("Hari ini ditandai", { timeout: 15000 }).should("be.visible");
    cy.contains("button", "Lihat sebulan penuh")
      .should("have.attr", "aria-expanded", "false")
      .click()
      .should("have.attr", "aria-expanded", "true");
  });
});
