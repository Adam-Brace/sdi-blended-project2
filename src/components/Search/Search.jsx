import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PokemonCard from "../Card/PokemonCard";

const Search = () => {
	const [pokemons, setPokemons] = useState([]);
	let { query, filter } = useParams();
	const arr = filter.toLowerCase().split(" ");

	useEffect(() => {
		const fetchAllPokemon = async () => {
			const pokemonList = [];
			for (let i = 152; i <= 251; i++) {
				try {
					const res = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${i}`
					);
					const pokemon = await res.json();
					for (let j = 0; j < arr.length; j++) {
						if (pokemon.types[0].type.name === arr[j]) {
							for (let k = 0; k < arr.length; k++) {
								if (
									pokemon.types.length == 1 ||
									pokemon.types[1].type.name === arr[k]
								) {
									pokemonList.push(pokemon);
									k = arr.length;
								}
							}
							j = arr.length;
						}
					}
				} catch (error) {
					console.error("Error fetching Pokémon:", error);
				}
			}
			setPokemons(pokemonList);
		};
		fetchAllPokemon();
	}, []);
	// console.log(pokemons);
	return (
		<>
			{pokemons?.map((pokemon) => (
				<div key={pokemon.id} className="carousel-item">
					<PokemonCard props={pokemon}></PokemonCard>
				</div>
			))}
		</>
	);
};

export default Search;
