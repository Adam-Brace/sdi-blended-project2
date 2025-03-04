import { useEffect, useState } from "react";
import { Link } from "react-router";
import PokemonCard from "../Card/PokemonCard";
import { Button } from "@mui/material";

const Collection = () => {
	const [collection, setCollection] = useState([]);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		// Get collection from localStorage
		const storedCollection = JSON.parse(localStorage.getItem("collection"));
		if (storedCollection && Array.isArray(storedCollection)) {
			setCollection(storedCollection);
		}
	}, []); // Only run on component mount

	useEffect(() => {
		const fetchAllPokemon = async () => {
			if (collection.length > 0) {
				const pokemonList = [];
				for (let i = 0; i < collection.length; i++) {
					try {
						const res = await fetch(
							`https://pokeapi.co/api/v2/pokemon/${collection[i]}`
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
	}, [collection]); // Run when collection changes

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
					<p>Add something to your Collection</p>
				) : (
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} props={pokemon} />
					))
				)}
			</div>
		</>
	);
};

export default Collection;
