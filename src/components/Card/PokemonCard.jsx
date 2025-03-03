import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PokemonCard(props) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={props.image}
				title={props.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{props.name}
				</Typography>
			</CardContent>
		</Card>
	);
}
