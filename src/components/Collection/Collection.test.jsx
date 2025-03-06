import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Collection from "./Collection";
import PokemonCard from "../Card/PokemonCard";
import { vi } from "vitest";

global.fetch = vi.fn();

describe("Collection Component", () => {
  beforeEach(() => {
    localStorage.clear();
    fetch.mockClear();
  });

  it("renders the collection component", () => {
    render(
      <BrowserRouter>
        <Collection />
      </BrowserRouter>
    );
    expect(screen.getByText("MY COLLECTION")).toBeInTheDocument();
  });

  it("displays message when collection is empty", () => {
    render(
      <BrowserRouter>
        <Collection />
      </BrowserRouter>
    );
    expect(screen.getByText("Add something to your Collection")).toBeInTheDocument();
  });



  it("handles fetch error gracefully", async () => {
    localStorage.setItem("collection", JSON.stringify(["bulbasaur"]));
    fetch.mockRejectedValue(new Error("Failed to fetch"));

    render(
      <BrowserRouter>
        <Collection />
      </BrowserRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.getByText("MY COLLECTION")).toBeInTheDocument();
  });
});
