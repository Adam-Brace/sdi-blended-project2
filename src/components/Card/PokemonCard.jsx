import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

export default function PokemonCard({ props: pokemon }) {
	const [icon, setIcon] = useState(<FavoriteBorderIcon />);

	useEffect(() => {
		// Check if the Pokémon is in the wishlist and set the icon accordingly
		const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
		if (wish.includes(pokemon.id)) {
			setIcon(<FavoriteIcon />);
		} else {
			setIcon(<FavoriteBorderIcon />);
		}
	}, [pokemon.id]); // Only run this effect when the pokemon.id changes

	const handleIconClick = () => {
		const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
		if (wish.includes(pokemon.id)) {
			// Remove from wishlist
			const updatedWishlist = wish.filter((id) => id !== pokemon.id);
			localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
			setIcon(<FavoriteBorderIcon />); // Update the icon to "not favorite"
		} else {
			// Add to wishlist
			wish.push(pokemon.id);
			localStorage.setItem("wishlist", JSON.stringify(wish));
			setIcon(<FavoriteIcon />); // Update the icon to "favorite"
		}
	};

	return (
		<Card className="card" sx={{ maxWidth: 345 }}>
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
				<div onClick={handleIconClick}>
					{icon} {/* Display the favorite icon */}
				</div>
			</CardContent>
		</Card>
	);
}
