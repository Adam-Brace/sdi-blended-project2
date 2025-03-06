import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import "./Search.css";
import PokemonCard from "../Card/PokemonCard";
import { Button, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
	components: {
		MuiButton: {
			defaultProps: {
				variant: "contained", // Set "contained" as default
			},
			styleOverrides: {
				root: {
					fontSize: "1rem", // Change the default font size
					textTransform: "none", // Optional: Remove uppercase style
					color: "#f59342",
				},
			},
		},
	},
});

const Search = () => {
	const [pokemons, setPokemons] = useState([]);
	let { query, filter } = useParams();
	const arr = filter.toLowerCase().split(" ");

	useEffect(() => {
		const fetchAllPokemon = async () => {
			const pokemonList = [];
			for (let i = 1; i <= 1025; i++) {
				try {
					const res = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${i}`
					);
					const pokemon = await res.json();
					if (query == "undefined" || pokemon.name.includes(query)) {
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
					}
				} catch (error) {
					console.error("Error fetching Pokémon:", error);
				}
			}
			setPokemons(pokemonList);
		};
		fetchAllPokemon();
	});
	// console.log(pokemons);
	return (
		<>
			<ThemeProvider theme={theme}>
				<div className="banner">
					<Stack direction="row" spacing={2} className="button">
						<Button className="filter-button">
							<Link
								className="links"
								to="/"
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								Home
							</Link>
						</Button>
						<Button className="filter-button">
							<Link
								className="links"
								to="/collection"
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								My Collection
							</Link>
						</Button>
						<Button className="filter-button">
							<Link
								className="links"
								to="/wishlist"
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								My Wishlist
							</Link>
						</Button>
					</Stack>
				</div>
				<div className="pokemon-container">
					{pokemons.length != 0 ? (
						pokemons?.map((pokemon) => (
							<div key={pokemon.id} className="carousel-item">
								<PokemonCard props={pokemon}></PokemonCard>
							</div>
						))
					) : (
						<p>Pokemon Not found</p>
					)}
				</div>
			</ThemeProvider>
		</>
	);
};

export default Search;
