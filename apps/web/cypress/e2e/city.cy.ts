describe("city schedules", () => {
  it("lists every city", () => {
    cy.visit("/jadwal-sholat");

    cy.get("h1").contains("Jadwal sholat per kota");
    cy.get('a[href^="/jadwal-sholat/"]').should("have.length", 51);
  });

  it("shows one city on its own clock without asking for the reader's location", () => {
    cy.visit("/jadwal-sholat/jayapura", {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, "getCurrentPosition").as("geolocation");
      },
    });

    cy.get("h1").should("contain", "Jayapura");
    cy.contains("Jayapura (WIT)").should("be.visible");
    cy.contains("a", "Pakai lokasi kamu").should("have.attr", "href", "/");

    // The month frame appears once the schedule for Jayapura loads.
    cy.contains("Hari ini ditandai", { timeout: 15000 }).should("be.visible");
    cy.get("@geolocation").should("not.have.been.called");
  });
});
