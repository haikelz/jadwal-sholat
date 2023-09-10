describe("homepage", () => {
  it("should display homepage and test it", () => {
    cy.visit("http://localhost:3000/");

    // test the description
    cy.get("p").contains("Maka nikmat Tuhanmu yang manakah yang kamu dustakan");

    // test the image
    cy.get("img").should("be.visible");

    // test if there is navbar
    cy.get("nav").should("be.visible");
  });
});
