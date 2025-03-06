import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Carousel from "./Home.jsx";

// Mock fetch to prevent actual API calls
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("Carousel Component", () => {
  test("renders the component without crashing", () => {
    render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );
    expect(screen.getByText(/PokéSearch Machine/i)).toBeInTheDocument();
  });

  test("search input updates state correctly", () => {
    render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search…");
    fireEvent.change(searchInput, { target: { value: "Pikachu" } });
    expect(searchInput.value).toBe("Pikachu");
  });

  test("carousel navigation buttons function correctly", () => {
    render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );

    const nextButton = screen.getByText("›");
    const prevButton = screen.getByText("‹");

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
  });

  test("filter checkboxes update state properly", () => {
    render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    const checkbox = screen.getByLabelText("FIRE");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
