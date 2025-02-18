import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import TopRated from "./components/TopRated";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./GenreMovies/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";

import TopRated from "./components/TopRated";
import SearchPage from "./components/SearchPage/SearchPage";
import "./App.scss";
import { useContext } from "react";
import { SearchContext } from "./contexts/SearchContext";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import { SearchContext } from "./contexts/SearchContext";
import "./App.scss";

function App() {
  const { setSearchQuery, favoritesMovies } = useContext(SearchContext);

  return (
    <BrowserRouter basename="/movie-project">
      <nav>
        <Link to="/" className="home-link">Home</Link>
         <li className="favoriteElement" >   
          <Link to="/favorites" className="fav-link">Favorites</Link>
           {favoritesMovies.length>0&&<span className="favorite-span">{favoritesMovies.length}</span>}
           </li>
     
        <Link to="/top-rated" className="top-rated-link">Top Rated</Link>
        <Link to="/genres" className="genres-link">Genres</Link>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
