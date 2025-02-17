import { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider(props) {
  const [movies, setMovies] = useState([]); // for 10 movies
  const [movie, setMovie] = useState(null); // for a single movie
  const [searchQuery, setSearchQuery] = useState(""); // for search bar
  const [favoritesMovies, setFavoritesMovies] = useState([]); // for favorite movies
  const [genres, setGenres] = useState([])
  const [randomMovies, setRandomMovies] = useState([]);
  


  const OMDB_APIkey = "4a822498";
  const TMDB_APIkey = "1142406a61399eb425ef4054c048517b"

  function handleSearch(query) {

    fetch(`https://www.omdbapi.com/?apikey=${OMDB_APIkey}&s=${query}`) // for 10 per query
      .then((response) => response.json())
      .then((data) => setMovies(data.Search || []))
      .catch((error) => console.error("Error fetching movies:", error));
  }

  function handleSingleSearch(id) { // for 1 movie per query
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_APIkey}&i=${id}`)
      .then((result) => result.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie: ", error));
  }

  function fetchGenres() { // for genres page
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_APIkey}&language=en-US`)
      .then((response) => response.json())
      .then((data) => setGenres(data.genres || []))
      .catch((error) => console.error("Error fetching genres:", error));
  }

  function fetchMoviesForGenres() {
    if (genres.length === 0) return;

    const moviePromises = genres.map((genre) =>
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIkey}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc`
      )
        .then((response) => response.json())
        .then((data) => {
          const movies = data.results || [];
          const randomMovie = movies.length > 0 ? movies[Math.floor(Math.random() * movies.length)] : null;
          return { genre: genre.name, movie: randomMovie };
        })
        .catch((error) => {
          console.error(`Error fetching movies for ${genre.name}:`, error);
          return null;
        })
    );

    Promise.all(moviePromises).then((resolvedMovies) => {
      setRandomMovies(resolvedMovies.filter((item) => item.movie !== null));
    });
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMoviesForGenres();
  }, [genres]);

  const addingToFavorite = (movie) => { // adding to favorites
    if (!favoritesMovies.includes(movie)) {
      setFavoritesMovies((prev) => [...prev, movie]);
      console.log(favoritesMovies);
    } else {
      console.log("movie already exist");
    }
  };

  return (
    <SearchContext.Provider
      value={{
        favoritesMovies,
        setFavoritesMovies,
        searchQuery,
        setSearchQuery,
        movies,
        handleSearch,
        movie,
        setMovie,
        handleSingleSearch,
        setMovies,
        addingToFavorite,
        genres,
        randomMovies,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}