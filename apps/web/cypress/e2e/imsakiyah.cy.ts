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

  it("follows Kemenag's calendar when it answers", () => {
    // bun run preview has no worker for /api/fasting-day, so the test answers
    // it: the estimated 15 Ramadan is 15 Ramadan, and the 30th day is still
    // Ramadan, so the month has 30 days.
    let lookups = 0;
    cy.intercept("GET", "/api/fasting-day/*", (req) => {
      lookups += 1;
      req.reply({
        body: { data: { calendar: "id", hijri: { year: 1448, month: 9, day: lookups === 1 ? 15 : 30 } } },
      });
    }).as("fastingDay");

    cy.visit("/imsakiyah/jakarta");
    cy.wait(["@fastingDay", "@fastingDay"]);
    cy.get("main table tbody tr", { timeout: 15000 }).should("have.length", 30);
    cy.contains("Kalender Hijriah Indonesia terbitan Kemenag RI").should("be.visible");
  });

  it("links every city", () => {
    cy.visit("/imsakiyah");
    cy.get('a[href^="/imsakiyah/"]').should("have.length", 51);
  });
});
