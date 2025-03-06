import PokemonCard from "../Card/PokemonCard";
import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material"
import "./Details.css"

const EvolutionChain = ({ pokemonId }) => {
	const [evolutions, setEvolutions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		const fetchEvolutionChain = async () => {
			try {
				// Step 1: Get species data to find the evolution chain URL
				const speciesResponse = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
				);
				const speciesData = await speciesResponse.json();
				const evolutionUrl = speciesData.evolution_chain.url;

				// Step 2: Fetch evolution chain data
				const evolutionResponse = await fetch(evolutionUrl);
				const evolutionData = await evolutionResponse.json();

				// Step 3: Extract evolution details
				const extractEvolutions = (chain) => {
					const evolutionArray = [];
					let current = chain;

					while (current) {
						evolutionArray.push(current.species.url.split("/")[6]);
						current = current.evolves_to.length
							? current.evolves_to[0]
							: null;
					}

					return evolutionArray;
				};

				const evolutionsList = await extractEvolutions(
					evolutionData.chain
				);
				setEvolutions(evolutionsList);
			} catch (error) {
				console.error("Error fetching evolution data:", error);
			}
		};

		fetchEvolutionChain();
	}, [pokemonId]); // Dependency on pokemonId to refetch on change

	useEffect(() => {
		const fetchAllPokemon = async () => {
			if (evolutions.length > 0) {
				const pokemonList = [];
				for (let i = 0; i < evolutions.length; i++) {
					try {
						const res = await fetch(
							`https://pokeapi.co/api/v2/pokemon/${evolutions[i]}`
						);
						const pokemon = await res.json();
						pokemonList.push(pokemon);
					} catch (error) {
						console.error("Error fetching Pokémon:", error);
					}
				}
				setPokemons(pokemonList);
				setLoading(false);
			}
		};

		fetchAllPokemon();
	}, [evolutions]); // This hook runs only when evolutions change

	return (
		<>
			<Stack direction="column" className="evo-box" >
				<h3>Evolution Chain:</h3>
				<Stack className = "evo-row" direction="row" spacing={2}>
				{loading ? (
					<p>Loading...</p>
				) : (
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} props={pokemon}></PokemonCard>
					))
				)}
				</Stack>
			</Stack>
		</>
	);
};

export default EvolutionChain;
