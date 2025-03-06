import { useState, useEffect } from "react";
//import { styled } from "styled-components";
import PokemonCard from "../Card/PokemonCard";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, CircularProgress, Stack, Divider } from "@mui/material";
import "./Details.css";
import EvolutionChain from "./Evolution.jsx";
import { Button } from "@mui/material";

const Details = () => {
	const { id } = useParams();

	const [collection, setCollection] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [pokemon, setPokemon] = useState();
	const [evoChain, setEvoChain] = useState([]);
	const [flavor, setFlavor] = useState([]);

	useEffect(() => {
		const storedCollection =
			JSON.parse(localStorage.getItem("collectionPokemon")) || [];
		setCollection(storedCollection);
	}, []);

	useEffect(() => {
		const storedWishlist =
			JSON.parse(localStorage.getItem("wishlistPokemon")) || [];
		setWishlist(storedWishlist);
	}, []);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${id}`
				);
				const data = await res.json();
				setPokemon(data);
			} catch (error) {
				console.error("Error fetching Pokémon:", error);
			}
		};

		const fetchFlavor = async () => {
			try {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${id}`
				);
				const data = await res.json();
				for (let f of data.flavor_text_entries) {
					console.log(f);
					if (f.language.name == "en") {
						setFlavor(f.flavor_text);
						break;
					}
				}
			} catch (error) {
				console.error("Error fetching Pokémon:", error);
			}
		};

		const fetchAll = async () => {
			await fetchFlavor();
			await fetchPokemon();
		};

		fetchAll();
	}, []);

	const addCollection = () => {
		if (!pokemon) return;

		const storedCollection =
			JSON.parse(localStorage.getItem("collectionPokemon")) || [];

		if (storedCollection.some((p) => p.id === pokemon.id)) return;

		const updatedCollection = [...storedCollection, pokemon];
		setCollection(updatedCollection);

		localStorage.setItem(
			"collectionPokemon",
			JSON.stringify(updatedCollection)
		);
	};

	const addWishlist = () => {
		if (!pokemon) return;

		const storedWishlist =
			JSON.parse(localStorage.getItem("wishlistPokemon")) || [];

		if (storedWishlist.some((p) => p.id === pokemon.id)) return;

		const updatedWishlist = [...storedWishlist, pokemon];
		setWishlist(updatedWishlist);

		localStorage.setItem(
			"wishlistPokemon",
			JSON.stringify(updatedWishlist)
		);
	};

	return pokemon && flavor ? (
		<Container className="mainContainer">
			<Stack
				direction="column"
				divider={<Divider orientation="horizontal" flexItem />}
				spacing={2}
			>
				<div className="banner">
					<Stack direction="row" spacing={2} className="button">
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
						<Button className="filter-button">
							<Link
								to="/Collection"
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
							to="/Wishlist"
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
				<div className="identity">
					<h1>
						{" "}
						{pokemon.id} {pokemon.name}{" "}
					</h1>
					<Stack direction="row" spacing={2} className="images">
						<div>
							<h6>Regular</h6>
							<img src={pokemon.sprites.front_default} />
						</div>
						<div>
							<h6>Shiny</h6>
							<img src={pokemon.sprites.front_shiny} />
						</div>
					</Stack>
				</div>
				<div className="stats">
					<Stack
						direction="row"
						divider={<Divider orientation="vertical" flexItem />}
						spacing={2}
					>
						<Stack
							direction="column"
							divider={
								<Divider orientation="horizontal" flexItem />
							}
							spacing={2}
						>
							<h3>Types:</h3>
							<ul>
								{pokemon.types.map((item, index) => (
									<li key={index}>{item.type.name}</li>
								))}
							</ul>
							<h3>Stats:</h3>
							<ul>
								{pokemon.stats.map((item, index) => (
									<li key={index}>
										{item.stat.name} : {item.base_stat}
									</li>
								))}
							</ul>
						</Stack>
						<Stack
							direction="column"
							divider={<Divider orientation="horizontal" />}
							spacing={2}
						>
							<h3>Moves:</h3>
							<ul id="moves">
								{pokemon.moves.map((item, index) => (
									<li key={index}>{item.move.name}</li>
								))}
							</ul>
						</Stack>
					</Stack>
				</div>
				<div className="flavour">
					{" "}
					{/* Why is there a u in flavor, guvna? */}
					<h3>Additional Info:</h3>
					<ul>
						<li key="Height"> {`Height: ${pokemon.height}`}</li>
						<li key="Weight"> {`Weight: ${pokemon.weight}`}</li>
						<li key="FlavorText">{`Flavor Text: ${flavor}`}</li>
					</ul>
				</div>
				<EvolutionChain pokemonId={id} />
			</Stack>
			<div style={{ height: "20px" }}>{/* nothing to see here */}</div>
		</Container>
	) : (
		<p> loading </p>
	);
};
export default Details;
