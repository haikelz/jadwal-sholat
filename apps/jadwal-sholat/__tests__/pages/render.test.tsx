import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AsmaulHusna from "~app/asmaul-husna/page";
import KotaId from "~app/jadwal-sholat/kota/[id]/page";
import HomePage from "~app/page";
import Surat from "~app/quran/surat/[number]/page";
import { hours } from "~lib/utils/constants";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Home Page", () => {
  it("Should render home page properly", () => {
    render(<HomePage />);

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
    render(<KotaId />);
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
    render(<Surat />);
  });
});
