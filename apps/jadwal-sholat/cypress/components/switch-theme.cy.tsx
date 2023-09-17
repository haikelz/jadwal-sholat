import { SwitchTheme } from "~components/atoms";

describe("Dark Mode Icon", () => {
  it("Should display switch theme button and test it", () => {
    cy.mount(<SwitchTheme flexDir="col" justifyItems="center" isMarginLeft={false} />);

    cy.get(`[aria-label="switch theme"]`).should("be.visible").click("center");
  });
});
