type Day = {
  date: { gregorian: { date: string } };
  meta: { timezone: string };
  timings: Record<string, string>;
};

// Rewrites today in the month the homepage fetches: Dzuhur at the current
// minute, or every prayer at 00:00, which the page's clock never matches.
function schedulePrayer(atPrayerTime: boolean) {
  cy.intercept({ method: "GET", url: /[?&]method=20$/ }, (req) => {
    req.continue((res) => {
      const days: Day[] = res.body.data;
      const timeZone = days[0].meta.timezone;
      const now = new Date();
      const today = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(now)
        .replace(/\//g, "-");
      // h24 matches the page's "kk" format, where midnight is 24.
      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h24",
      }).format(now);
      const day = days.find((item) => item.date.gregorian.date === today);
      if (!day) return;
      for (const key of ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]) {
        day.timings[key] = atPrayerTime && key === "Dhuhr" ? time : "00:00";
      }
    });
  });
}

// The browser's autoplay rule decides whether play() starts; the stub stands in.
function visitHome(play: "starts" | "blocked") {
  cy.visit("/", {
    onBeforeLoad(win) {
      const stub = cy.stub(win.HTMLMediaElement.prototype, "play").as("play");
      if (play === "starts") stub.resolves();
      else stub.rejects(new win.DOMException("blocked", "NotAllowedError"));
      cy.stub(win.HTMLMediaElement.prototype, "pause").as("pause");
    },
  });
}

describe("adzan", () => {
  it("plays at prayer time without asking, and stops on request", () => {
    schedulePrayer(true);
    visitHome("starts");

    cy.contains("Sudah masuk waktu Dzuhur", { timeout: 15000 }).should("be.visible");
    cy.contains("Adzan sedang diputar.").should("be.visible");
    cy.get("@play").should("have.been.calledOnce");

    cy.contains("button", "Hentikan adzan").click();
    cy.get("@pause").should("have.been.called");
    cy.contains("Sudah masuk waktu").should("not.exist");
  });

  it("offers a play button when the browser blocks sound", () => {
    schedulePrayer(true);
    visitHome("blocked");

    cy.contains("Browser belum mengizinkan suara otomatis", { timeout: 15000 }).should(
      "be.visible",
    );
    cy.contains("button", "Putar adzan").should("be.visible");
  });

  it("stays off after the reader switches it off", () => {
    schedulePrayer(false);
    visitHome("starts");

    // A click before React hydrates the island does nothing.
    cy.contains("button", "Adzan otomatis")
      .closest("astro-island")
      .should("not.have.attr", "ssr");
    cy.contains("button", "Adzan otomatis")
      .should("have.attr", "aria-pressed", "true")
      .click()
      .should("have.attr", "aria-pressed", "false");

    schedulePrayer(true);
    visitHome("starts");
    cy.contains("Hari ini ditandai", { timeout: 15000 }).should("be.visible");
    cy.contains("button", "Adzan otomatis").should("have.attr", "aria-pressed", "false");
    cy.contains("Adzan tidak diputar saat masuk waktu sholat.").should("be.visible");
    cy.get("@play").should("not.have.been.called");
  });
});
