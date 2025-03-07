import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { cloneElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";
const typeColor = {
	normal: "rgba(170, 170, 153, 1)",
	fire: "rgba(255, 68, 34, 1)",
	water: "rgba(51, 153, 255, 1)",
	electric: "rgba(225, 204, 51, 1)",
	grass: "rgba(119, 204, 85, 1)",
	ice: "rgba(102, 204, 255, 1)",
	fighting: "rgba(187, 85, 86, 1)",
	poison: "rgba(170, 85, 153, 1)",
	ground: "rgba(221, 187, 85, 1)",
	flying: "rgba(136, 153, 255, 1)",
	psychic: "rgba(255, 85, 153, 1)",
	bug: "rgba(170, 187, 34, 1)",
	rock: "rgba(187, 170, 102, 1)",
	ghost: "rgba(102, 102, 187, 1)",
	dragon: "rgba(119, 102, 238, 1)",
	dark: "rgba(119, 85, 85, 1)",
	steel: "rgba(170, 170, 187, 1)",
	fairy: "rgba(238, 153, 238, 1)",
};
export default function PokemonCard({ props: pokemon }) {
	const [iconW, setIconW] = useState(<FavoriteBorderIcon />);
	const [iconC, setIconC] = useState(<StarBorderIcon />);

	useEffect(() => {
		// Check if the Pokémon is in the collection and set the icon accordingly
		const col = JSON.parse(localStorage.getItem("collection")) || [];

		if (col.includes(pokemon.id)) {
			setIconC(<StarIcon />);
		} else {
			setIconC(<StarBorderIcon />);
		}
		// Check if the Pokémon is in the wishlist and set the icon accordingly
		const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
		if (wish.includes(pokemon.id)) {
			setIconW(<FavoriteIcon />);
		} else {
			setIconW(<FavoriteBorderIcon />);
		}
	}, [pokemon.id]); // Only run this effect when the pokemon.id changes

	const handleIconWClick = () => {
		const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
		if (wish.includes(pokemon.id)) {
			// Remove from wishlist
			const updatedWishlist = wish.filter((id) => id !== pokemon.id);
			localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
			setIconW(<FavoriteBorderIcon />); // Update the icon to "not favorite"
		} else {
			// Add to wishlist
			wish.push(pokemon.id);
			localStorage.setItem("wishlist", JSON.stringify(wish));
			setIconW(<FavoriteIcon />); // Update the icon to "favorite"
		}
	};

	const handleIconCClick = () => {
		const wish = JSON.parse(localStorage.getItem("collection")) || [];
		if (wish.includes(pokemon.id)) {
			// Remove from collection
			const updatedCollection = wish.filter((id) => id !== pokemon.id);
			localStorage.setItem(
				"collection",
				JSON.stringify(updatedCollection)
			);
			setIconC(<StarBorderIcon />); // Update the icon to "not favorite"
		} else {
			// Add to collection
			wish.push(pokemon.id);
			localStorage.setItem("collection", JSON.stringify(wish));
			setIconC(<StarIcon />); // Update the icon to "favorite"
		}
	};

	const color = () => {
		if (pokemon.types.length == 1) {
			return `linear-gradient(  ${
				typeColor[pokemon.types[0].type.name]
			},${typeColor[pokemon.types[0].type.name]}`;
		} else {
			return `linear-gradient(  ${
				typeColor[pokemon.types[0].type.name]
			},${typeColor[pokemon.types[1].type.name]}`;
		}
	};

	return (
		<div>
			<Card
				className="card"
				sx={{ maxWidth: 345 }}
				style={{
					backgroundImage: color(),
					borderRadius: "10px",
				}}
			>
				<Typography gutterBottom variant="h5" component="div">
						{pokemon.id}
					</Typography>
				<Link
					reloadDocument
					to={`/details/${pokemon.id}`}
					key={pokemon.id}
					style={{ textDecoration: "none" }}
				>
					
					<CardMedia
						sx={{ height: 175 }}
						image={pokemon.sprites.front_default}
						title={
							pokemon.name.charAt(0).toUpperCase() +
							pokemon.name.slice(1)
						}
						className="card-image"
					/>
				</Link>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div" className="pokeText" 
					sx={{ fontSize: "20px" , textAlign:"center", height:"70px", alignItems:"center", justifyContent:"center", display:"flex"}}>
						{pokemon.name.charAt(0).toUpperCase() +
							pokemon.name.slice(1)}
					</Typography>
					<div
						style={{
							display: "flex",
						}}
					>
						<div onClick={handleIconWClick} role="button">
							{iconW} {/* Display the favorite icon */}
						</div>
						<div
							onClick={handleIconCClick}
							style={{ marginLeft: "5px" }}
							role="button"
						>
							{iconC} {/* Display the favorite icon */}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
