import { useState, useEffect } from "react";

const Carousel = () => {
	const [images, setImages] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchAllPokemon = async () => {
			const allPokemonImages = [];
			for (let i = 152; i < 251; i++) {
				try {
					const res = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${i}`
					);
					const pokemon = await res.json();
					allPokemonImages.push({
						id: pokemon.id,
						src: pokemon.sprites.front_default,
						alt: pokemon.name,
					});
				} catch (error) {
					console.error("Error fetching Pokémon:", error);
				}
			}
			setImages(allPokemonImages);
		};
		fetchAllPokemon();
	}, []);

	const handleNextClick = () => {
		setCurrentIndex((currentIndex + 5) % images.length);
	};

	const handlePrevClick = () => {
		setCurrentIndex((currentIndex - 5 + images.length) % images.length);
	};

	return (
		<div className="carousel">
			<button className="prev" onClick={handlePrevClick}>
				&#x2039;
			</button>
			<div className="innerCarousel">
				{images.slice(currentIndex, currentIndex + 5).map((image) => (
					<div key={image.id} className="carousel-item">
						<img src={image.src} alt={image.alt} />
						<p>{image.alt}</p>
						<p>#{image.id}</p>
						<p>#{image.id}</p>
					</div>
				))}
			</div>
			<button className="next" onClick={handleNextClick}>
				&#x203a;
			</button>
		</div>
	);
};

export default Carousel;

//  {pokemonList.length > 0 ? (
// 	<div className="pokemonGrid">
//   {pokemonList.map((pokemon) => (
// 	  <PokemonCard key={pokemon.id} pokemon={pokemon} />
// 	))}
//   </div>
// return (
// 	<div className='App'>
// 	  <header className='App-header'>
// 		<h1>Pokedex</h1>

// 		{loading && <p>Loading Pokémon...</p>}
// 		{error && <p>{error}</p>}

// 		  {pokemonList.length > 0 ? (
// 			<div className="pokemonGrid">
// 		  {pokemonList.map((pokemon) => (
// 			  <PokemonCard key={pokemon.id} pokemon={pokemon} />
// 			))}
// 		  </div>
// 		  ) : (
// 			<p>Might Be Loading...</p>
// 		  )}
// 	  </header>
// 	</div>
// );
