import { useState, useEffect } from "react";
import PokemonCard from "../Card/PokemonCard";
import { CircularProgress } from "@mui/material";
import "./Home.css";

const Carousel = () => {
	const [pokemons, setPokemons] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

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
				} catch (error) {
					console.error("Error fetching Pokémon:", error);
				}
			}
			setPokemons(pokemonList);
		};
		fetchAllPokemon();
	}, []);

	const handleNextClick = () => {
		setCurrentIndex((currentIndex + 5) % pokemons.length);
	};

	const handlePrevClick = () => {
		setCurrentIndex((currentIndex - 5 + pokemons.length) % pokemons.length);
	};

	return (
		<div className="carousel">
			<button className="prev" onClick={handlePrevClick}>
				&#x2039;
			</button>
			<div className="innerCarousel">
				{pokemons.length > 0 ? (
					pokemons
						.slice(currentIndex, currentIndex + 5)
						.map((pokemon) => (
							<div key={pokemon.id} className="carousel-item">
								<PokemonCard props={pokemon}></PokemonCard>
							</div>
						))
				) : (
					<CircularProgress></CircularProgress>
				)}
			</div>
			<button className="next" onClick={handleNextClick}>
				&#x203a;
			</button>
		</div>
	);
};

export default Carousel;
