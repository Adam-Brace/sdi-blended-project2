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
	createTheme,
	ThemeProvider
} from "@mui/material";
import "./Home.css";
import { Link } from "react-router-dom";
const theme = createTheme({
	components: {
	  MuiButton: {
		defaultProps: {
		  variant: "contained", // Set "contained" as default
		},
		styleOverrides: {
		  root: {
			fontSize: "1rem", // Change the default font size
			textTransform: "none", // Optional: Remove uppercase style
			color: "#f59342"
		  },
		},
	  },
	},
  });


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
	const [currentIndex, setCurrentIndex] = useState(0);
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
		if (checked.every(Boolean) && !event.target.checked) {
			setChecked(new Array(types.length).fill(false));
			setChecked((prevChecked) => prevChecked.map((_, i) => i === index));
		}
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
				} catch (error) {
					console.error("Error fetching Pokémon:", error);
				}
			}
			shuffle(pokemonList);
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

	const handleNextClick = () => {
		setCurrentIndex((currentIndex + 4) % randomPokemons.length);
	};

	const handlePrevClick = () => {
		setCurrentIndex(
			(currentIndex - 4 + randomPokemons.length) % randomPokemons.length
		);
	};

	return (
		<Container>
								<h1 className="hometitle">PokéSearch Machine</h1>

			<ThemeProvider theme={theme}>
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
									<Button
										className="filter-button"
										onClick={toggleDrawer("right", true)}
									>
										<Link
											to="/wishlist"
											style={{
												textDecoration: "none",
												color: "inherit",
											}}
										>
											My Wishlist
										</Link>
									</Button>
									<Button
										className="filter-button"
										onClick={toggleDrawer("right", true)}
									>
										<Link
											to="/collection"
											style={{
												textDecoration: "none",
												color: "inherit",
											}}
										>
											My Collection
										</Link>
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
									slotProps={{
										paper: {
											style: {
												backgroundColor: "transparent",
												borderLeft: "1px solid #f59342",
											},
										},
									}}
								>
									<Stack
										sx={{
											height: "100%",
											backgroundColor: "rgba(0, 0, 0, 0.4)",
										}}
									>
										<FormGroup
											className="drawer"
											style={{
												color: "#f59342",
												width: "200px",
												padding: "10px",
											}}
										>
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
													sx={{ marginLeft: 2 }}
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
										<Button
											className="search-button"
											variant="outlined"
											sx={{
												width: "70%",
												textAlign: "center",
												marginTop: "auto",
												margin: "auto",
												marginBottom: "30px",
											}}
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
									</Stack>
								</SwipeableDrawer>
							</Fragment>
						))}
					</div>
					<Stack
						className="main-body"
					>
						<div className="carousel">
							<Button
								className="prev-button"
								onClick={handlePrevClick}
								sx={{
									fontSize: "120px",
									cursor: "pointer",
									padding: "50px",
									border: "1px solid #f59342",
									borderRadius: "10px",
									outline: "none",
									backgroundColor: "rgba(0, 0, 0, 0.6)",
								  }}
							>
								&#x2039;
							</Button>
							<div className="inner-carousel">
								{randomPokemons.length > 4 ? (
									randomPokemons
										.slice(currentIndex, currentIndex + 4)
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
							<Button
								className="next-button"
								onClick={handleNextClick}
								sx={{
									fontSize: "120px",
									cursor: "pointer",
									padding: "50px",
									border: "1px solid #f59342",
									borderRadius: "10px",
									outline: 'none',
									backgroundColor: "rgba(0, 0, 0, 0.6)",
								}}
							>
								&#x203a;
							</Button>
						</div>
					</Stack>
					<div className="footer"></div>
				</Stack>
			</ThemeProvider>
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
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
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

