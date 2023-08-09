import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import SearchBar from "~components/molecules/SearchBar";

describe("Search Bar", () => {
  it("Should update on change", () => {
    const setSearch = jest.fn((value) => {});
    const { queryByPlaceholderText } = render(<SearchBar setSearch={setSearch} />);

    const searchInput = queryByPlaceholderText("Search....") as HTMLInputElement;

    fireEvent.change(searchInput, {
      target: {
        value: "search",
      },
    });

    expect(searchInput.value).toBe("search");
  });
});
