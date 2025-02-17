import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres/Genres";
import GenreMovies from "./components/GenreMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SignIn from "./components/SignIn";
import TopRated from "./components/TopRated";
import SearchPage from "./components/SearchPage";
import "./App.scss";
import { useContext, useState } from "react";
import { SearchContext } from "./contexts/SearchContext";

function App() {
  const [inputValue, setInputValue] = useState("");

  const { movies,searchMovies,setSearchMovies } = useContext(SearchContext);

  const handleSearchBtn = (e) => {
    e.preventDefault();

    const res = movies.filter((movie) => {
      if (movie.Title.toLowerCase().includes(inputValue.toLowerCase())) {
        return movie;
      }
    });

     setSearchMovies(res);
  };



  return (

    <BrowserRouter basename="/movie-project">
      <nav>
        <Link to="/">Home</Link>

        <Link to="/favorites">Favorites</Link>
        <Link to="/top-rated">Top Rated</Link>
        <Link to="/genres">Genres (aka. Magic wheel)</Link>
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          type="text"
          placeholder="search for movies"
        ></input>
        <button
          onClick={(e) => {
            handleSearchBtn(e);
            
          }}
        >
          <Link to="/search-page"> Search</Link>
        </button>
        <Link to="/sign-in">Sign in</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/favorites" element={<Favorites></Favorites>}></Route>
        <Route path="/top-rated" element={<TopRated></TopRated>}></Route>
        <Route path="/genres" element={<Genres></Genres>}></Route>
        <Route path="/genres/:genre" element={<GenreMovies />} />
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route
          path="/movie/:id"
          element={<MovieDetails></MovieDetails>}
        ></Route>
        <Route path="/search-page" element={<SearchPage searchMovies={searchMovies}/>}></Route>
        <Route path="*" element={<HomePage></HomePage>}></Route>
      </Routes>
    </BrowserRouter>

    

  );
}

export default App;
