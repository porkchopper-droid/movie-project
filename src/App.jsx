import { useNavigate, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import TopRated from "./components/TopRated";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./GenreMovies/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchPage from "./components/SearchPage/SearchPage";
import MoviesPage from "./components/MoviesPage";

import "./App.scss";
import { SearchContext } from "./contexts/SearchContext";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Pagination from "@mui/material/Pagination";

function App() {
  const navigate = useNavigate();

  const { page, setPage, setSearchQuery, favoritesMovies } =
    useContext(SearchContext);

  // every time the pagination page changes  run these condition
  // the value  is by default  provided by material -ui paginaiton
  const handlePageChange = (event, value) => {
    // check if the value is not =  1  then got to the page/2 or page/4 ....
    if (value !== 1) {
      navigate(`/movies/page/${value}`);
      setPage(value); // Update the page number in the state
    }
    // if the value = 1  or the pagination num then go to home page
    else {
      navigate(`/movie-project`);
      setPage(value);
    }
  };
  return (
    <>
      <nav>
        <Link onClick={() => setPage(1)} to="/">
          Home
        </Link>
        <li className="favoriteElement">
          <Link to="/favorites">Favorites</Link>
          {favoritesMovies.length > 0 && (
            <span className="favorite-span">{favoritesMovies.length}</span>
          )}
        </li>

        <Link to="/top-rated">Top Rated</Link>
        <Link to="/genres">Genres</Link>
        <input
          className="search-input"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          type="text"
          placeholder="search for movies ..."
        ></input>

        <Link  to="/search-page" className="search-link"> Search</Link>

        <Link to="/sign-in" className="sign-in-link">Sign in</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/favorites" element={<Favorites></Favorites>}></Route>
        <Route path="/top-rated" element={<TopRated></TopRated>}></Route>
        <Route path="/genres" element={<Genres></Genres>}></Route>
        <Route path="/genres/:genre" element={<GenreMovies />} />
        <Route path="/sign-in" element={<LoginSignup></LoginSignup>}></Route>
        <Route
          path="/movie/:id"
          element={<MovieDetails></MovieDetails>}
        ></Route>
        <Route path="/search-page" element={<SearchPage />}></Route>
        <Route path="*" element={<HomePage></HomePage>}></Route>
        <Route path="/movies/page/:page" element={<MoviesPage />} />
      </Routes>

      {/* Only show pagination on specific pages */}
      {(location.pathname.startsWith("/movies/page/") ||
        location.pathname === "/" ||
        location.pathname === "/movie-project") && (
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
