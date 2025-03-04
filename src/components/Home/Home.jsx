import { useState, useEffect } from "react";
import PokemonCard from "../Card/PokemonCard";
import {
	CircularProgress,
	Container,
	Grid2,
	Stack,
	Divider,
} from "@mui/material";
import "./Home.css";

const Carousel = () => {
	//const [pokemons, setPokemons] = useState([]);
	const [randomPokemons, setRandomPokemons] = useState([]);

	function shuffle(array) {
		setRandomPokemons(array.toSorted(() => Math.random() - 0.5));
	}

	useEffect(() => {
		const fetchAllPokemon = async () => {
			const pokemonList = [];
			for (let i = 152; i <= 251; i++) {
				try {
					const res = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${i}`
					);
					const pokemon = await res.json();
					pokemonList.push(pokemon);
					shuffle(pokemonList);
				} catch (error) {
					console.error("Error fetching Pokémon:", error);
				}
			}
			//setPokemons(pokemonList);
		};
		fetchAllPokemon();
	}, []);

	return (
		<Container>
			<Stack divider={<Divider orientation="horizontal" flexItem />}>
				<div className="banner"></div>
				<div className="mainBody">
					<div className="carousel">
						<div className="innerCarousel">
							{randomPokemons.length > 4 ? (
								randomPokemons
									.slice(0, 0 + 4)
									.map((pokemon) => (
										<div
											key={pokemon.id}
											className="carousel-item"
										>
											<PokemonCard
												props={pokemon}
											></PokemonCard>
										</div>
									))
							) : (
								<CircularProgress></CircularProgress>
							)}
						</div>
					</div>
				</div>
				w<div className="footer"></div>
			</Stack>
		</Container>
	);
};

// function shuffle(array) {
// 	if (array) {
// 		return [];
// 	}
// 	let currentIndex = array.length;

// 	// While there remain elements to shuffle...
// 	while (currentIndex != 0) {
// 		// Pick a remaining element...
// 		let randomIndex = Math.floor(Math.random() * currentIndex);
// 		currentIndex--;

// 		// And swap it with the current element.
// 		[array[currentIndex], array[randomIndex]] = [
// 			array[randomIndex],
// 			array[currentIndex],
// 		];
// 	}
// 	return array;
// }

export default Carousel;
