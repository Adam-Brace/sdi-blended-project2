import { useEffect, useState } from "react";
import { Link } from "react-router";
import PokemonCard from "../Card/PokemonCard";
import { Button } from "@mui/material";

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		// Get wishlist from localStorage
		const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
		if (storedWishlist && Array.isArray(storedWishlist)) {
			setWishlist(storedWishlist);
		}
	}, []); // Only run on component mount

	useEffect(() => {
		const fetchAllPokemon = async () => {
			if (wishlist.length > 0) {
				const pokemonList = [];
				for (let i = 0; i < wishlist.length; i++) {
					try {
						const res = await fetch(
							`https://pokeapi.co/api/v2/pokemon/${wishlist[i]}`
						);
						const pokemon = await res.json();
						pokemonList.push(pokemon);
					} catch (error) {
						console.error("Error fetching Pokémon:", error);
					}
				}
				setPokemons(pokemonList); // Set the fetched Pokémon in the state
			}
		};

		fetchAllPokemon();
	}, [wishlist]); // Run when wishlist changes

	return (
		<>
			<div className="button">
				<Button className="filter-button">
					<Link
						to="/"
						style={{
							textDecoration: "none",
							color: "inherit",
						}}
					>
						Home
					</Link>
				</Button>
			</div>
			<div className="pokemon-container">
				{pokemons.length === 0 ? (
					<p>Add something to your Wishlist</p>
				) : (
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} props={pokemon} />
					))
				)}
			</div>
		</>
	);
};

export default Wishlist;
