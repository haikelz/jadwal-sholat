describe("homepage", () => {
  it("shows today's schedule and the month grid", () => {
    cy.visit("/");

    cy.get("h1").contains("Jadwal Sholat");
    cy.get("nav").should("be.visible");

    // Both sections render once the location settles and the month loads.
    cy.contains("h2", "Hari ini", { timeout: 15000 }).should("be.visible");
    cy.contains("h2", "Bulan ini").should("be.visible");
  });
});
