import { useEffect, useState } from "react";
import { Link } from "react-router";
import PokemonCard from "../Card/PokemonCard";
import { Button, Stack } from "@mui/material";
import "./Wishlist.css";
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

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		// Get wishlist from localStorage
		const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
		if (storedWishlist && Array.isArray(storedWishlist)) {
			setWishlist(storedWishlist.sort());
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
							to="/Collection"
							style={{
								textDecoration: "none",
							}}
						>
							My Collection
						</Link>
					</Button>
				</Stack>
			</div>
			<h1 className="wishlist">MY WISHLIST</h1>
			<div className="pokemon-container">
				{pokemons.length === 0 ? (
					<p>Add something to your Wishlist</p>
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

export default Wishlist;
