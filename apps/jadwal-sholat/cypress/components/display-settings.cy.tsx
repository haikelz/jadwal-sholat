import { DisplaySettings } from "@/components/common/display-settings";

describe("Display settings", () => {
  it("opens the dialog and enlarges the text", () => {
    cy.mount(<DisplaySettings />);

    cy.contains("button", "Tampilan").click();
    cy.contains("Ukuran teks").should("be.visible");
    cy.contains("button", "Besar").first().click();
    cy.get("html").should("have.attr", "data-text-size", "large");
  });
});
