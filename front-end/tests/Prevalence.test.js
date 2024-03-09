import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import PrevalenceCard from "../src/components/PrevalenceCard"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

// Mock props to pass to the component
const mockProps = {
  year: "2021",
  disease: "Chlamydia",
  sex: "Female",
  cases: "1234",
  rate: "567",
  id: "1",
};

// Mocking useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: jest.fn(),
}));

describe("PrevalenceCard", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function's history before each test
  });

  it("renders correctly with given props", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/overview of female chlamydia cases in 2021/i)
    ).toBeInTheDocument();
  });

  it("displays the correct year for the disease", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const yearElement = screen.getByText(mockProps.year);
    expect(yearElement).toHaveTextContent("2021");
  });

  it("displays the correct disease", async () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const regex = new RegExp(
      `Overview of Female Chlamydia cases in ${mockProps.year}`,
      "i"
    );
    const diseaseElement = screen.getByText(regex);
    expect(diseaseElement).toBeInTheDocument();
  });

  it("displays the correct sex", async () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const sexElement = await screen.findByText(
      /Overview of Female Chlamydia cases in 2021/i
    );
    expect(sexElement).toBeInTheDocument();
  });

  it("displays the correct number of cases", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const caseElement = screen.getByText(mockProps.cases);
    expect(caseElement).toHaveTextContent("1234");
  });

  it("displays the correct rate", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const rateElement = screen.getByText(mockProps.rate);
    expect(rateElement).toHaveTextContent("567");
  });

  it("displays the correct image for the disease", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    const imageElement = screen.getByAltText(mockProps.disease);
    expect(imageElement).toHaveAttribute(
      "src",
      expect.stringContaining("chlamydia.webp")
    );
  });

  it("handles mouse enter and leave for hover effect", () => {
    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );
    // Ensure your component has a `data-testid="card-container"` attribute
    const cardElement = screen.getByTestId("card-container");
    fireEvent.mouseEnter(cardElement);
    expect(cardElement).toHaveClass("hovered");
    fireEvent.mouseLeave(cardElement);
    expect(cardElement).not.toHaveClass("hovered");
  });

  it("navigates to the correct page on card click", () => {
    const navigateMock = jest.fn(); // Declare a jest mock function
    useNavigate.mockImplementation(() => navigateMock); // Use the mock function as the implementation for useNavigate

    render(
      <BrowserRouter>
        <PrevalenceCard {...mockProps} />
      </BrowserRouter>
    );

    // Simulate user clicking on the card
    fireEvent.click(screen.getByTestId("card-container"));

    // Check if navigate was called with the correct URL
    expect(navigateMock).toHaveBeenCalledWith(
      `/prevalence/${mockProps.id}`,
      expect.any(Object)
    );
  });
});
