import Time from "~components/time";

describe("Time", () => {
  it("Should display time component and test it", () => {
    cy.mount(<Time />);

    cy.get(`[data-cy="time"]`).should("be.visible");
  });
});
