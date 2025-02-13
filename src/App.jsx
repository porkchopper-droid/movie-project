import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Favorites from "./components/Favorites";
import Genres from "./components/Genres";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SignIn from "./components/SignIn";
import TopRated from "./components/TopRated";
import SearchPage from "./components/SearchPage";
import SearchContextProvider from "./contexts/SearchContext";
import "./App.scss";


function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter basename="/movie-project">
        <nav>
          <Link to="/">Home</Link>
          
          <Link to="/favorites">Favorites</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/genres">Genres (aka. Magic wheel)</Link>
          <input type="text" placeholder="search for movies"></input>
          <button>Search</button>
          <Link to="/sign-in">Sign in</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/favorites" element={<Favorites></Favorites>}></Route>
          <Route path="/top-rated" element={<TopRated></TopRated>}></Route>
          <Route path="/genres" element={<Genres></Genres>}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route
            path="/movie/:id"
            element={<MovieDetails></MovieDetails>}
          ></Route>
          <Route
            path="/search-page"
            element={<SearchPage></SearchPage>}
          ></Route>
          <Route path="*" element={<HomePage></HomePage>}></Route>
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;
