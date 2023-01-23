import { hours } from "@/lib/helpers/formatDate";
import AsmaulHusna from "@/pages/asmaul-husna";
import Home from "@/pages/index";
import JadwalSholat from "@/pages/jadwal-sholat";
import Quran from "@/pages/quran";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

const queryClient = new QueryClient();

describe("Home Page", () => {
  it("Should render home page properly", () => {
    render(<Home />);

    const heading = screen.getByRole("heading");
    const headingText = `Selamat ${
      hours >= 12 && hours < 15
        ? "Siang"
        : hours >= 15 && hours < 18
        ? "Sore"
        : hours >= 18 && hours < 24
        ? "Malam"
        : "Pagi"
    }`;

    expect(heading).toHaveTextContent(headingText);
  });
});

describe("Jadwal Sholat page", () => {
  it("Should render jadwal-sholat page properly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <JadwalSholat />
      </QueryClientProvider>
    );

    // ada suspense loading ketika merender halaman jadwal-sholat
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});

describe("Asmaul'l Husna Sholat page", () => {
  it("Should render asmaul-husna page properly", () => {
    render(<AsmaulHusna />);

    const heading = screen.getAllByRole("heading")[0];
    expect(heading).toHaveTextContent("Asma'ul Husna");
  });
});

describe("Al-Quran page", () => {
  it("Should render quran page properly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Quran />
      </QueryClientProvider>
    );

    // ada suspense loading ketika merender halaman quran
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
