import { createContext, useState, useEffect, useCallback } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider(props) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [searchComponentData, setSearchComponentData] = useState([]);
  const [pagesMovies, setPagesMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  /**
   * Fetch movies from the backend (OMDB)
   */
  const handleSearch = useCallback((query, page = 1) => {
    fetch(`/api/movies?query=${query}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults, 10) || 0);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  /**
   * Fetch search results for the search component (OMDB)
   */
  const handleSearchComponent = useCallback((query) => {
    fetch(`/api/movies?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchComponentData(data.Search || []);
      })
      .catch((error) => console.error("Error fetching search component movies:", error));
  }, []);

  /**
   * Fetch detailed data for a single movie using its IMDb ID (OMDB)
   */
  const handleSingleSearch = useCallback((id) => {
    fetch(`/api/movie?id=${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching single movie:", error));
  }, []);

  /**
   * Fetch detailed movie data from TMDB for a given movie ID
   */
  const handleSingleSearchTMDB = useCallback((id) => {
    fetch(`/api/tmdb/movie?id=${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching single movie TMDB:", error));
  }, []);

  /**
   * Fetch full movie details for an array of movies (OMDB)
   */
  function fetchFullMovieDetails(moviesArray) {
    if (!moviesArray.length) return;
    return Promise.all(
      moviesArray.map((movie) =>
        fetch(`/api/movie?id=${movie.imdbID}`)
          .then((response) => response.json())
          .catch((error) => console.error("Error fetching full movie details:", error))
      )
    ).then((fullMovies) => {
      setMovies(fullMovies);
    });
  }

  /**
   * Fetch genres from TMDB
   */
  
  function fetchGenres() {
    fetch("/api/tmdb/genres") // Ensure correct API URL
      .then((response) => response.json())
      .then((data) => {
        console.log("Genres received:", data);
        setGenres(data.genres || []);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }

  /**
   * Fetch a random movie for each genre
   */
  function fetchMoviesForGenres() {
    if (genres.length === 0) return;
    const moviePromises = genres.map((genre) =>
      fetch(`/api/tmdb/discover?genre=${genre.id}`)
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
      setRandomMovies(resolvedMovies.filter((item) => item && item.movie !== null));
    });
  }

  /**
   * Add a movie to the favorites list
   */
  const addingToFavorite = (movie) => {
    setFavoritesMovies((prev) => {
      if (!prev.some((fav) => fav.imdbID === movie.imdbID)) {
        return [...prev, movie];
      } else {
        console.log("Movie already exists in favorites");
        return prev;
      }
    });
  };

  // Fetch genres when the provider mounts.
  useEffect(() => {
    fetchGenres();
  }, []);

  // Once genres are fetched, fetch movies for each genre.
  useEffect(() => {
    fetchMoviesForGenres();
  }, [genres]);

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
        handleSearchComponent,
        addingToFavorite,
        genres,
        randomMovies,
        totalResults,
        pagesMovies,
        fetchFullMovieDetails,
        handleSingleSearch,
        handleSingleSearchTMDB,
        fetchMoviesForGenres,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}