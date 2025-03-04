import { useState, useEffect } from "react";
//import { styled } from "styled-components";
import PokemonCard from "../Card/PokemonCard";
import { Link } from "react-router-dom";

const Details = () => {
	return (
		<>
			<div>
				<Link to="/">
					<button>LogoHome</button>
				</Link>
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
				<h2>EvoLine</h2>
			</div>
		</>
	);
};
export default Details;

//checks if a pokemon has been been chosen. If so it displays the specialized information from that pokemon.
// if (displayPokemon) {
// 	//sets an array of types for the pokemon to be dispayed later in the code
// 	var typeArry = [];
// 	for (let i of pokeData[chosenPokemon - 1].types) {
// 		typeArry.push(i.type.name);
// 	}

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
// 							<h3>Types</h3>
// 							<ul>
// 								{typeArry.map((item, index) => (
// 									<li key={index}>{item}</li>
// 								))}
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
