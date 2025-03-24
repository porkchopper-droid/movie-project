import { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage";
import TopRated from "./components/TopRated";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./components/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchPage from "./components/SearchPage";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import SearchBar from "./components/SearchBar/SearchBar";
import { SearchContext } from "./contexts/SearchContext";
import "./App.scss";

function App() {
  const { setSearchQuery, favoritesMovies } = useContext(SearchContext);

  return (
    <>
      <nav>
        <NavLink className="home-link" onClick={() => setPage(1)} to="/">
          Home
        </NavLink>
        <li className="favoriteElement">
          <NavLink className="fav-link" to="/favorites">
            Favorites
          </NavLink>
          {favoritesMovies.length > 0 && (
            <span className="favorite-span">{favoritesMovies.length}</span>
          )}
        </li>
        <NavLink className="top-rated-link" to="/top-rated">
          Top Rated
        </NavLink>
        <NavLink className="genres-link" to="/genres">
          Genres
        </NavLink>
        <SearchBar />
        <NavLink to="/sign-in" className="sign-in-link">
          Sign in
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:genre" element={<GenreMovies />} />
        <Route path="/sign-in" element={<LoginSignup />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
