import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, CircularProgress, Stack, Divider } from "@mui/material";
import "./Details.css";
import EvolutionChain from "./Evolution.jsx";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
	components: {
		MuiButton: {
			defaultProps: {
				variant: "outlined",
			},
			styleOverrides: {
				root: {
					fontSize: "1rem", // Change the default font size
					textTransform: "none", // Optional: Remove uppercase style
					color: "#f59342",
					backgroundColor: "rgba(0, 0, 0, 0.7)",
					borderColor: "#f59342",
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: "#f59342"
				}
			}
		}
	},
});

const Details = () => {
	const { id } = useParams();

	const [pokemon, setPokemon] = useState();
	const [flavor, setFlavor] = useState([]);

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
	});

	return pokemon && flavor ? (
		<Container className="mainContainer">
			<ThemeProvider theme={theme}>
				<Stack
					direction="column"
					// divider={<Divider orientation="horizontal" flexItem />}
					spacing={2}
				>
					<div className="banner">
						<Stack direction="row" spacing={2} className="button">
							<Button className="filter-button">
								<Link
									className="links"
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
									className="links"
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
									className="links"
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
						<h1 className="poke-num-name">
							{" "}
							{pokemon.id}{" "}
							{pokemon.name.charAt(0).toUpperCase() +
								pokemon.name.slice(1)}{" "}
						</h1>
						<Stack direction="row" spacing={2} className="images">
							<div>
								<h6>Standard</h6>
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
							divider={
								<Divider orientation="vertical" flexItem />
							}
							spacing={2}
						>
							<Stack
								direction="column"
								divider={
									<Divider
										orientation="horizontal"
										flexItem
									/>
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
							<li key="Height">
								{`Height: ${Math.floor(pokemon.height * 0.328084)}' ${Math.round((pokemon.height * 0.328084 - Math.floor(pokemon.height * 0.328084)) * 12)}"`}
							</li>
							<li key="Weight"> {`Weight: ${Math.round(pokemon.weight * 0.220462)} lbs`}</li>
							<li key="FlavorText">{`Flavor Text: ${flavor}`}</li>
						</ul>
					</div>
					<EvolutionChain pokemonId={id} />
				</Stack>
				<div style={{ height: "20px" }}>
					{/* nothing to see here */}
				</div>
			</ThemeProvider>
		</Container>
	) : (
		<CircularProgress />
	);
};
export default Details;
