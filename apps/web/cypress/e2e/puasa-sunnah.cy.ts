// `bun run preview` has no /api/sunnah-fasting proxy (it is Cloudflare's
// _worker.js), so the test answers that request itself, with fasts dated this
// month.
function isoDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

describe("puasa sunnah", () => {
  it("shows this month's fasts from the proxy, with the next one first", () => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const hijri = { day: 13, month: 5, year: 1448 };

    cy.intercept("GET", "/api/sunnah-fasting*", {
      body: {
        data: {
          dates: [
            {
              date: isoDay(monthStart),
              hijri,
              recommendations: [{ key: "monday_thursday", name: "Senin atau Kamis" }],
              weekday: "Senin",
            },
            {
              date: isoDay(today),
              hijri,
              recommendations: [{ key: "white_days", name: "Ayyamul Bidh" }],
              weekday: "Kamis",
            },
          ],
          end_date: isoDay(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
          start_date: isoDay(monthStart),
          timezone: "Asia/Jakarta",
        },
      },
    }).as("schedule");

    // Phones show the list; from md up the month is a calendar.
    cy.viewport(390, 844);
    cy.visit("/sunnah-fasting");

    cy.wait("@schedule").its("request.url").should("include", `date=${isoDay(monthStart)}`);
    cy.get("h1").contains("Puasa Sunnah");
    cy.contains("p", "Berikutnya").should("contain", "Ayyamul Bidh");
    cy.contains("Senin atau Kamis").should("be.visible");
  });
});
