import { useState, useEffect, Fragment } from "react";
import PokemonCard from "../Card/PokemonCard";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
	CircularProgress,
	Container,
	Grid2,
	Stack,
	Divider,
} from "@mui/material";
import "./Home.css";

const Carousel = () => {
	//const [pokemons, setPokemons] = useState([]);
	const [randomPokemons, setRandomPokemons] = useState([]);
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	function shuffle(array) {
		setRandomPokemons(array.toSorted(() => Math.random() - 0.5));
	}

	useEffect(() => {
		const fetchAllPokemon = async () => {
			const pokemonList = [];
			for (let i = 152; i <= 251; i++) {
				try {
					const res = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${i}`
					);
					const pokemon = await res.json();
					pokemonList.push(pokemon);
					shuffle(pokemonList);
				} catch (error) {
					console.error("Error fetching Pokémon:", error);
				}
			}
			//setPokemons(pokemonList);
		};
		fetchAllPokemon();
	}, []);

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	return (
		<Container>
			<Stack divider={<Divider orientation="horizontal" flexItem />}>
				<div className="banner">
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					{["right"].map((anchor) => (
						<Fragment key={anchor}>
							<Button onClick={toggleDrawer(anchor, true)}>
								Filter
							</Button>
							<SwipeableDrawer
								anchor={anchor}
								open={state[anchor]}
								onClose={toggleDrawer(anchor, false)}
								onOpen={toggleDrawer(anchor, true)}
							>
								<FormGroup className="drawer">
									<FormControlLabel
										control={<Checkbox />}
										label="NORMAL"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="FIRE"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="WATER"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="ELECTRIC"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="GRASS"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="ICE"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="FIGHTING"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="POISON"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="GROUND"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="FLYING"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="PSYCHIC"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="BUG"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="ROCK"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="GHOST"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="DRAGON"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="DARK"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="STEEL"
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="FAIRY"
									/>
								</FormGroup>
							</SwipeableDrawer>
						</Fragment>
					))}
				</div>
				<div className="mainBody">
					<div className="carousel">
						<div className="innerCarousel">
							{randomPokemons.length > 4 ? (
								randomPokemons
									.slice(0, 0 + 4)
									.map((pokemon) => (
										<div
											key={pokemon.id}
											className="carousel-item"
										>
											<PokemonCard
												props={pokemon}
											></PokemonCard>
										</div>
									))
							) : (
								<CircularProgress />
							)}
						</div>
					</div>
				</div>
				<div className="footer"></div>
			</Stack>
		</Container>
	);
};

export default Carousel;

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));
