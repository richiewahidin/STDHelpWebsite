import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import PrevalenceCard from "../src/components/PrevalenceCard"; // Adjust the import path as necessary

const mockProps = {
  id: "1407",
  countyid: "818",
  year: "2006",
  sex: "Total",
  population: "87584",
  c_cases: "172",
  c_rate: "196.4",
  s_cases: "0",
  s_rate: "0",
  g_cases: "28",
  g_rate: "32",
  countyimage: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Mendocino_California.jpg"
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("PrevalenceCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ /* mock response data */ })
      })
    );
  });

  it("renders gender prompt", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Gender:/i)
    ).toBeInTheDocument();
  });

  it("displays the correct year for the card", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const yearElement = screen.getByText(mockProps.year);
    expect(yearElement).toHaveTextContent("2006");
  });

  it("displays the correct sex for the card", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const genderElement = screen.getByText(mockProps.sex);
    expect(genderElement).toHaveTextContent("Total");
  });

  it("displays the correct Chlamydia cases for the card", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const c_cases_Element = screen.getByText(mockProps.c_cases);
    expect(c_cases_Element).toHaveTextContent("172");
  });

  it("displays the correct Syphillis cases for the card", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const s_cases_Element = screen.getByText(mockProps.s_cases);
    expect(s_cases_Element).toHaveTextContent("0");
  });

  it("displays the correct Gonorrhea cases for the card", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const g_cases_Element = screen.getByText(mockProps.g_cases);
    expect(g_cases_Element).toHaveTextContent("28");
  });
});