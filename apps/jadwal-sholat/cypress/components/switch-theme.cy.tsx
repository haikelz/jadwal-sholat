import { SwitchTheme } from "@/components/switch-theme";

describe("Dark Mode Icon", () => {
  it("Should display switch theme button and test it", () => {
    cy.mount(<SwitchTheme />);

    cy.get(`button[aria-label^="Gunakan tema"]`).should("be.visible");
  });
});
