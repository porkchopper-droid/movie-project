import { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import TopRated from "./components/TopRated";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./components/GenreMovies/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchPage from "./components/SearchPage/SearchPage";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import SearchBar from "./components/SearchBar";
import { SearchContext } from "./contexts/SearchContext";
import "./App.scss";

function App() {
  const { setSearchQuery, favoritesMovies } = useContext(SearchContext);

  return (
    <>
      <nav>
        <Link className="home-link" onClick={() => setPage(1)} to="/">
          Home
        </Link>
        <li className="favoriteElement">
          <Link className="fav-link" to="/favorites">
            Favorites
          </Link>
          {favoritesMovies.length > 0 && (
            <span className="favorite-span">{favoritesMovies.length}</span>
          )}
        </li>
        <Link className="top-rated-link" to="/top-rated">
          Top Rated
        </Link>
        <Link className="genres-link" to="/genres">
          Genres
        </Link>
        <SearchBar />
        <Link to="/sign-in" className="sign-in-link">
          Sign in
        </Link>
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
