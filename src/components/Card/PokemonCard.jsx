import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
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
	poison: "rgba(0, 133, 255, 1)",
	ground: "rgba(0, 133, 255, 1)",
	flying: "rgba(0, 133, 255, 1)",
	psychic: "rgba(0, 133, 255, 1)",
	bug: "rgba(0, 133, 255, 1)",
	rock: "rgba(0, 133, 255, 1)",
	ghost: "rgba(0, 133, 255, 1)",
	dragon: "rgba(0, 133, 255, 1)",
	dark: "rgba(0, 133, 255, 1)",
	steel: "rgba(0, 133, 255, 1)",
	fairy: "rgba(0, 133, 255, 1)",
};
export default function PokemonCard({ props: pokemon }) {
	const [iconW, setIconW] = useState(<FavoriteBorderIcon />);
	const [iconC, setIconC] = useState(<StarBorderIcon />);

	useEffect(() => {
		// Check if the Pokémon is in the collection and set the icon accordingly
		const wish = JSON.parse(localStorage.getItem("collection")) || [];
		if (wish.includes(pokemon.id)) {
			setIconC(<StarIcon />);
		} else {
			setIconC(<StarBorderIcon />);
		}
	}, [pokemon.id]); // Only run this effect when the pokemon.id changes

	useEffect(() => {
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

	return (
		<div>
			<Card
				className="card"
				sx={{ maxWidth: 345 }}
				style={{
					backgroundImage: `linear-gradient(#1d2e27, rgba(0, 133, 255, 1))`,
				}}
			>
				<Link
					reloadDocument
					to={`/details/${pokemon.id}`}
					key={pokemon.id}
					style={{ textDecoration: "none" }}
				>
					<CardMedia
						sx={{ height: 175 }}
						image={pokemon.sprites.front_default}
						title={pokemon.name}
						className="card-image"
					/>
				</Link>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{pokemon.name}
					</Typography>
					<div onClick={handleIconWClick}>
						{iconW} {/* Display the favorite icon */}
					</div>
					<div onClick={handleIconCClick}>
						{iconC} {/* Display the favorite icon */}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
