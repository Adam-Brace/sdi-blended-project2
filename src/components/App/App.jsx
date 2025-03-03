import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Wishlist from "../Wishlist/Wishlist";
import Collection from "../Collection/Collection";
import Search from "../Search/Search";
import Details from "../Details/Details";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/wishlist" element={<Wishlist />} />
			<Route path="/collection" element={<Collection />} />
			<Route path="/search/:query" element={<Search />} />
			<Route path="/details/:id" element={<Details />} />
		</Routes>
	);
}

export default App;
