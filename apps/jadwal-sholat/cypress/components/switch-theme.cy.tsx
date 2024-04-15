import { SwitchTheme } from "~components/atoms";

describe("Dark Mode Icon", () => {
  it("Should display switch theme button and test it", () => {
    cy.mount(<SwitchTheme />);

    cy.get(`[aria-label="switch theme"]`).should("be.visible").click("center");
  });
});
