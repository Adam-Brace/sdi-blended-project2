import { useState, useEffect, Fragment } from "react";
import PokemonCard from "../Card/PokemonCard";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
	CircularProgress,
	Container,
	Stack,
	Divider,
	Checkbox,
	SwipeableDrawer,
	Button,
	FormControlLabel,
	FormGroup,
	InputBase,
} from "@mui/material";
import "./Home.css";
import { Link } from "react-router-dom";

const types = [
	"NORMAL",
	"FIRE",
	"WATER",
	"ELECTRIC",
	"GRASS",
	"ICE",
	"FIGHTING",
	"POISON",
	"GROUND",
	"FLYING",
	"PSYCHIC",
	"BUG",
	"ROCK",
	"GHOST",
	"DRAGON",
	"DARK",
	"STEEL",
	"FAIRY",
];

const Carousel = () => {
	//const [pokemons, setPokemons] = useState([]);
	const [randomPokemons, setRandomPokemons] = useState([]);
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const [checked, setChecked] = useState(new Array(types.length).fill(true));
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value); // Update the search term as the user types
	};

	const handleChangeAll = (event) => {
		const newCheckedState = new Array(types.length).fill(
			event.target.checked
		);
		setChecked(newCheckedState);
	};

	const handleChangeIndividual = (index) => (event) => {
		const newCheckedState = [...checked];
		newCheckedState[index] = event.target.checked;
		setChecked(newCheckedState);
	};

	// Check if all checkboxes are checked or some are checked (for indeterminate state)
	const isAllChecked = checked.every(Boolean);
	const isSomeChecked = checked.some(Boolean) && !isAllChecked;

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

	const searchLink = () => {
		let filter = [];
		let search = "undefined";

		for (let i = 0; i < types.length; i++) {
			if (checked[i]) {
				filter.push(types[i]);
			}
		}
		if (filter.length != 0) {
			filter = filter.join(" ");
		} else {
			filter = "undefined";
		}
		if (searchTerm.length != 0) {
			search = searchTerm;
		}
		return `/search/${search.toLowerCase()}/${filter}`;
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			console.log(event.key);
			window.location.href = searchLink();
		}
	};

	return (
		<Container>
			<Stack divider={<Divider orientation="horizontal" flexItem />}>
				<div style={{ display: "flex", width: "100%" }}>
					<div className="banner" style={{ width: "100%" }}>
						<div className="search-container">
							<Search className="search-field">
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search…"
									value={searchTerm} // Bind the input to the state
									onChange={handleSearchChange} // Update the state on input change
									inputProps={{ "aria-label": "search" }}
									onKeyDown={handleKeyDown}
								/>
							</Search>
							<div className="button-container">
								<Button
									className="search-button"
									onClick={() =>
										console.log("Search clicked")
									}
								>
									<Link
										to={searchLink()}
										style={{
											textDecoration: "none",
											color: "inherit",
										}}
									>
										Search
									</Link>
								</Button>
								<Button
									className="filter-button"
									onClick={toggleDrawer("right", true)}
								>
									Filter
								</Button>
							</div>
						</div>
					</div>
					{["right"].map((anchor) => (
						<Fragment key={anchor}>
							<SwipeableDrawer
								anchor={anchor}
								open={state[anchor]}
								onClose={toggleDrawer(anchor, false)}
								onOpen={() => {
									toggleDrawer(anchor, true);
								}}
							>
								<FormGroup className="drawer">
									<FormControlLabel
										label="ALL POKEMON"
										control={
											<Checkbox
												checked={isAllChecked}
												indeterminate={isSomeChecked}
												onChange={handleChangeAll}
											/>
										}
									/>
									{types.map((type, index) => (
										<FormControlLabel
											key={type}
											control={
												<Checkbox
													checked={checked[index]}
													onChange={handleChangeIndividual(
														index
													)}
												/>
											}
											label={type}
										/>
									))}
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
	// width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		// width: "auto",
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
