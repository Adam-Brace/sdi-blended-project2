import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../Card/PokemonCard";
import { Button, Stack } from "@mui/material";
import "./Collection.css"
import {ThemeProvider, createTheme} from "@mui/material";
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
			color: "#f59342"
			},
		},
		},
	},
	});

const Collection = () => {
	const [collection, setCollection] = useState([]);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		// Get collection from localStorage
		const storedCollection = JSON.parse(localStorage.getItem("collection"));
		if (storedCollection && Array.isArray(storedCollection)) {
			setCollection(storedCollection.sort());
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
		<ThemeProvider theme={theme}>
			<div className="banner">
				<Stack direction="row" spacing={2} className="button">
					<Button className="filter-button">
						<Link className="links"
							to="/"
							style={{
								textDecoration: "none",
							}}
						>
							Home
						</Link>
					</Button>
					<Button className="filter-button">
						<Link className="links"
							to="/Wishlist"
							style={{
								textDecoration: "none",
							}}
						>
							My Wishlist
						</Link>
					</Button>
				</Stack>
			</div>
			<h1 className="collection">MY COLLECTION</h1>
			<div className="pokemon-container">
				{pokemons.length === 0 ? (
					<p>Add something to your Collection</p>
				) : (
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} props={pokemon} />
					))
				)}
			</div>
			</ThemeProvider>
		</>
	);
};

export default Collection;
