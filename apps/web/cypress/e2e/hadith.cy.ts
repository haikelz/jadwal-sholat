// Hadith detail pages need Cloudflare's _redirects and _worker.js, so they are
// checked with `bunx wrangler pages dev dist`, not here.
describe("hadith list", () => {
  it("ships Bukhari's first page as links in the built HTML", () => {
    // Crawlers read the HTML before any script runs.
    cy.request("/hadith").its("body").should("include", 'href="/hadith/bukhari/1"');

    cy.visit("/hadith");
    cy.get("h1").contains("Hadith");
    cy.get('a[href="/hadith/bukhari/1"]').should("be.visible").and("contain", "no. 1");
  });
});
