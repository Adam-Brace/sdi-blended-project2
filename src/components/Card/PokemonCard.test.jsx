import { render, screen, fireEvent } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
const mockPokemon = {
	id: 1,
	name: "pikachu",
	sprites: { front_default: "pikachu.png" },
	types: [{ type: { name: "electric" } }],
};

describe("PokemonCard", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("renders correctly", () => {
		render(
			<BrowserRouter>
				<PokemonCard props={mockPokemon} />
			</BrowserRouter>
		);
		expect(screen.getByText("Pikachu")).toBeInTheDocument();
		const cardMedia = screen.getByTitle("Pikachu");
		expect(cardMedia).toBeInTheDocument();
		expect(cardMedia).toHaveStyle(`background-image: url(pikachu.png)`);
	});

	it("toggles wishlist icon on click", () => {
		render(
			<BrowserRouter>
				<PokemonCard props={mockPokemon} />
			</BrowserRouter>
		);

		const wishlistButton = screen.getAllByRole("button")[0];
		fireEvent.click(wishlistButton);
		expect(localStorage.getItem("wishlist")).toContain("1");
		fireEvent.click(wishlistButton);
		expect(localStorage.getItem("wishlist")).not.toContain("1");
	});

	it("toggles collection icon on click", () => {
		render(
			<BrowserRouter>
				<PokemonCard props={mockPokemon} />
			</BrowserRouter>
		);

		const collectionButton = screen.getAllByRole("button")[1];
		fireEvent.click(collectionButton);
		expect(localStorage.getItem("collection")).toContain("1");
		fireEvent.click(collectionButton);
		expect(localStorage.getItem("collection")).not.toContain("1");
	});
});
