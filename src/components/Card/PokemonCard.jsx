import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
export default function PokemonCard({props: pokemon}) {
	return (
		<Link to = {`/details/${pokemon.id}`} key={pokemon.id}>
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					sx={{ height: 140 }}
					image={pokemon.sprites.front_default}
					title={pokemon.name}
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
