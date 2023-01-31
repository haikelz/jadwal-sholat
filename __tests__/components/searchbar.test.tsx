import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import SearchBar from "~atoms/SearchBar";

describe("Search Bar", () => {
  it("Should update on change", () => {
    const setSearchTerm = jest.fn((value) => {});
    const { queryByPlaceholderText } = render(<SearchBar setSearchTerm={setSearchTerm} />);

    const searchInput = queryByPlaceholderText("Search....") as HTMLInputElement;

    fireEvent.change(searchInput, {
      target: {
        value: "search",
      },
    });

    expect(searchInput.value).toBe("search");
  });
});
