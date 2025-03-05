import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const MyCollection = () => {

	const [collection, setCollection] = useState([]);

  useEffect(() => {
    const storedCollection = JSON.parse(localStorage.getItem("collectionPokemon")) || [];
    setCollection(storedCollection);
  }, []);

	const clearCollection = () => {
    localStorage.removeItem("collectionPokemon"); // Remove from localStorage
    setCollection([]); // Clear state
  };

	return (
		<>
		<div>
		<Link to="/"><button>LogoHome</button></Link>
		</div>
			<div className="p-4">
      <h2 className="text-lg font-bold">Stored Pokémon</h2>
      <ul>
        {collection.length > 0 ? (
          collection.map((p) => (
            <li key={p.id} className="border p-2 mt-2 rounded">
              {p.name} (ID: {p.id})
            </li>
          ))
        ) : (
          <p>No Pokémon in collection.</p>
        )}
      </ul>
    </div>
	<div>
	<button
	onClick={clearCollection}
	className="mt-2 ml-4 px-4 py-2 bg-red-500 text-white rounded"
	>
	Clear Collection
	</button>
	</div>
	</>
	)
};
export default MyCollection;
