import React, { useState, useEffect } from "react";

const EvolutionChain = ({ pokemonId }) => {
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        // Step 1: Get species data to find the evolution chain URL
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
        const speciesData = await speciesResponse.json();
        const evolutionUrl = speciesData.evolution_chain.url;

        // Step 2: Fetch evolution chain data
        const evolutionResponse = await fetch(evolutionUrl);
        const evolutionData = await evolutionResponse.json();

        // Step 3: Extract evolution details
        const extractEvolutions = (chain) => {
          const evolutionArray = [];
          let current = chain;

          while (current) {
            evolutionArray.push(current.species.name);
            current = current.evolves_to.length ? current.evolves_to[0] : null;
          }

          return evolutionArray;
        };

        setEvolutions(extractEvolutions(evolutionData.chain));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching evolution data:", error);
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonId]);

  return (
    <div>
      <h2>Evolution Chain</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {evolutions.map((evo, index) => (
            <li key={index}>{evo}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EvolutionChain;
