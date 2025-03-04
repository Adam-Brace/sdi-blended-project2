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
					</Stack>
				</div>
				<div className="identity">
					<Stack direction="row" spacing={2}>
						<Button onClick={addCollection} className="button">
							Add To Collection
						</Button>
						<Button onClick={addWishlist} className="button">
							Add To Wishlist
						</Button>
					</Stack>
					<h1>
						{" "}
						{pokemon.id} {pokemon.name}{" "}
					</h1>

					<img src={pokemon.sprites.front_default} />
					<img src={pokemon.sprites.front_shiny} />
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
							<h3>Types</h3>
							<ul>
								{pokemon.types.map((item, index) => (
									<li key={index}>{item.type.name}</li>
								))}
							</ul>
							<h3>Stats</h3>
							<ul>
								{pokemon.stats.map((item, index) => (
									<li key={index}>
										{item.stat.name} : {item.base_stat}
									</li>
								))}
							</ul>
						</Stack>

						<h3>Moves</h3>
						<ul id="moves">
							{pokemon.moves.map((item, index) => (
								<li key={index}>{item.move.name}</li>
							))}
						</ul>
					</Stack>
				</div>
				<div className="flavour">
					<h3>Additional Info</h3>
					<ul>
						<li key="Height"> {`Height: ${pokemon.height}`}</li>
						<li key="Weight"> {`Weight: ${pokemon.weight}`}</li>
						<li key="FlavorText">{`Flavor Text: ${flavor}`}</li>
					</ul>
				</div>
				<div className="evoLine">
					<EvolutionChain pokemonId={id} />
				</div>
			</Stack>
		</Container>
	) : (
		<p> loading </p>
	);
};
export default Details;

{
	/* //checks if a pokemon has been been chosen. If so it displays the specialized information from that pokemon.
// if (displayPokemon) { */
}
// 	//sets an array of types for the pokemon to be dispayed later in the code
// var typeArry = [];
// for (let i of pokeData[chosenPokemon - 1].types) {
// 	typeArry.push(i.type.name);
// }

// 	//sets an array of moves to be displayed later in the code
// 	var moveArry = [];
// 	for (let i of pokeData[chosenPokemon - 1].moves) {
// 		moveArry.push(i.move.name);
// 	}

// 	let displayPokemonHTML = (
// 		<>
// 			<div id="header">
// 				<h1 id="header"> Pokedex Generation 1 </h1>
// 				<a id="link" href="./App.jsx">
// 					<h3 id="link">Back</h3>
// 				</a>
// 			</div>
// 			<aside>
// 				<div id="singleContainer">
// 					<div id="singlePokemon">
// 						<h2 id="name">{pokeData[chosenPokemon - 1].name}</h2>
// 						<img
// 							id="singlePicture"
// 							src={
// 								pokeData[chosenPokemon - 1].sprites
// 									.front_default
// 							}
// 						/>
// 						<div id="types">
// <h3>Types</h3>
// <ul>
// {typeArry.map((item, index) => (
// 	<li key={index}>{item}</li>
// ))}
// 							</ul>
// 						</div>
// 					</div>
// 					<div id="moves">
// 						<h3>Moves</h3>
// 						<ul>
// 							{moveArry.map((item, index) => (
// 								<li key={index}>{item}</li>
// 							))}
// 						</ul>
// 					</div>
// 				</div>
// 			</aside>
// 		</>
// 	);

// return displayPokemonHTML;
// }

{
	/* <Link to="/">
					<button>LogoHome</button>
				</Link>
				{pokemon ?(
				<h1> {pokemon.name} </h1>

				<h1></h1>
				) : (
									<CircularProgress></CircularProgress>
								)}

				<h1>Optional Content</h1>
			</div>
			<div>
				<h2>PokemonCard.name</h2>
			</div>
			<div>
				<h2>PokemonCard.img</h2>
				<h2>Shiny.img</h2>
			</div>
			<div>
				<div>
					<h3>Type</h3>
				</div>
				<div>
					<h3>Stats</h3>
				</div>
				<h3>Moves</h3>
			</div>
			<div>
				<p>Height, Weight, Color, Flavor Text</p>
			</div>
			<div>
				<h2>EvoLine</h2> */
}
