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
					for (let j = 0; j < pokemon.types.length; j++) {
						for (let k = 0; k < arr.length; k++) {
							if (pokemon.types[j].type.name === arr[k]) {
								pokemonList.push(pokemon);
							}
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
	console.log(pokemons);
	return (
		<p>
			{pokemons?.map((pokemon) => (
				<div key={pokemon.id} className="carousel-item">
					<PokemonCard props={pokemon}></PokemonCard>
				</div>
			))}
		</p>
	);
};

export default Search;
