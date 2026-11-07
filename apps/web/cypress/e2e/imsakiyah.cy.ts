describe("imsakiyah", () => {
  it("shows a city's coming Ramadan without asking for the reader's location", () => {
    cy.visit("/imsakiyah/jakarta", {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, "getCurrentPosition").as("geolocation");
      },
    });

    cy.get("h1").should("contain", "Jadwal imsakiyah Jakarta");
    // The Hijri year comes from the reader's clock, then the month loads.
    cy.contains("h2", /Ramadan \d{4} H/, { timeout: 15000 }).should("be.visible");
    cy.get("main table tbody tr", { timeout: 15000 }).should("have.length.within", 29, 30);
    cy.get("@geolocation").should("not.have.been.called");
  });

  it("links every city", () => {
    cy.visit("/imsakiyah");
    cy.get('a[href^="/imsakiyah/"]').should("have.length", 51);
  });
});
