import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./PokemonCard.css";
export default function PokemonCard({ props: pokemon }) {
	return (
		<Link to={`/details/${pokemon.id}`} key={pokemon.id}>
			<Card className="card" sx={{ maxWidth: 345 }}>
				<CardMedia
					sx={{ height: 175 }}
					image={pokemon.sprites.front_default}
					title={pokemon.name}
					className="card-image"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{pokemon.name}
					</Typography>
				</CardContent>
			</Card>
		</Link>
	);
}
