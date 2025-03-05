import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import TopRated from "./components/TopRated";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./GenreMovies/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchPage from "./components/SearchPage/SearchPage";
import MoviesPage from "./components/MoviesPage";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Pagination from "@mui/material/Pagination";
import { useContext } from "react";
import { SearchContext } from "./contexts/SearchContext";
import "./App.scss";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { page, setPage, setSearchQuery, favoritesMovies } = useContext(SearchContext);

  const handlePageChange = (event, value) => {
    if (value !== 1) {
      navigate(`/movies/page/${value}`);
      setPage(value);
    } else {
      navigate(`/`);
      setPage(value);
    }
  };

  return (
    <>
      <nav>
        <Link className="home-link" onClick={() => setPage(1)} to="/">
          Home
        </Link>
        <li className="favoriteElement">
          <Link className="fav-link" to="/favorites">Favorites</Link>
          {favoritesMovies.length > 0 && (
            <span className="favorite-span">{favoritesMovies.length}</span>
          )}
        </li>
        <Link className="top-rated-link" to="/top-rated">Top Rated</Link>
        <Link className="genres-link" to="/genres">Genres</Link>
        <input
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="search for movies ..."
        />
        <Link to="/search-page" className="search-link">Search</Link>
        <Link to="/sign-in" className="sign-in-link">Sign in</Link>
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
        <Route path="/movies/page/:page" element={<MoviesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* With basename set, location.pathname is stripped to "/" for home and "/movies/page/..." for paginated pages */}
      {(location.pathname === "/" || location.pathname.startsWith("/movies/page/")) && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={100}
          shape="rounded"
        />
      )}
    </>
  );
}

export default App;
