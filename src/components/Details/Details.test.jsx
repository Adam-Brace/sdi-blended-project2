import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Details from "./Details";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock localStorage
beforeEach(() => {
  vi.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "image_url", front_shiny: "shiny_image_url" },
        types: [{ type: { name: "grass" } }],
        stats: [{ stat: { name: "speed" }, base_stat: 45 }],
        moves: [{ move: { name: "tackle" } }],
        height: 7,
        weight: 69,
      }),
    })
  );

  vi.spyOn(global.localStorage, "getItem").mockImplementation(() => null);
  vi.spyOn(global.localStorage, "setItem").mockImplementation(() => {});
});

describe("Details Component", () => {
  it("renders loading text initially", () => {
    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("fetches and displays Pokémon data", async () => {
    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument());
    expect(screen.getByText(/height: 7/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 69/i)).toBeInTheDocument();
    expect(screen.getByText(/speed : 45/i)).toBeInTheDocument();
    expect(screen.getByText(/tackle/i)).toBeInTheDocument();
  });

  it("calls the Pokémon API when mounted", async () => {
    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
  });
});
