import { createContext, useState, useEffect, useCallback } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider(props) {
  // State for general search results (e.g., home page or paginated search)
  const [movies, setMovies] = useState([]);
  // State for detailed data of a single movie
  const [movie, setMovie] = useState(null);
  // State for the current search query from the search bar
  const [searchQuery, setSearchQuery] = useState("");
  // State for favorite movies list
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  // State for genres (from TMDB)
  const [genres, setGenres] = useState([]);
  // State for a random movie per genre (for display purposes)
  const [randomMovies, setRandomMovies] = useState([]);
  // State for search results when using the search component
  const [searchComponentData, setSearchComponentData] = useState([]);
  // State for paginated movie results (for MoviesPage)
  const [pagesMovies, setPagesMovies] = useState([]);
  // State for the total number of results (used for pagination)
  const [totalResults, setTotalResults] = useState(0);

  const OMDB_APIkey = "4a822498";
  const TMDB_APIkey = "1142406a61399eb425ef4054c048517b";

  /**
   * Fetch movies based on a query and page number.
   */
  const handleSearch = useCallback((query, page = 1) => {
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_APIkey}&s=${query}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults, 10) || 0);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [OMDB_APIkey]);

  /**
   * Fetch search results for the search component.
   * This function is memoized to prevent flooding.
   */
  const handleSearchComponent = useCallback((query) => {
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_APIkey}&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchComponentData(data.Search || []);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [OMDB_APIkey]);

  /**
   * Fetch detailed data for a single movie using its IMDb ID.
   */
  const handleSingleSearch = useCallback((id) => {
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_APIkey}&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => console.error("Error fetching single movie:", error));
  }, [OMDB_APIkey]);

  /**
   * Fetch detailed movie data from TMDB for a given movie ID.
   */
  const handleSingleSearchTMDB = useCallback((id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_APIkey}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => console.error("Error fetching single movie TMDB:", error));
  }, [TMDB_APIkey]);

  /**
   * Fetch full movie details for an array of movies.
   * Updates the movies state with full details.
   * @param {Array} moviesArray - Array of movie objects with at least an imdbID.
   */
  function fetchFullMovieDetails(moviesArray) {
    if (!moviesArray.length) return;
    return Promise.all(
      moviesArray.map((movie) =>
        fetch(`https://www.omdbapi.com/?apikey=${OMDB_APIkey}&i=${movie.imdbID}`)
          .then((response) => response.json())
          .catch((error) => console.error("Error fetching details:", error))
      )
    ).then((fullMovies) => {
      setMovies(fullMovies);
    });
  }

  /**
   * Fetch genres from TMDB.
   */
  function fetchGenres() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_APIkey}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres || []);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }

  /**
   * Fetch a random movie for each genre.
   */
  function fetchMoviesForGenres() {
    if (genres.length === 0) return;
    const moviePromises = genres.map((genre) =>
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIkey}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc`)
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
   * Add a movie to the favorites list.
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
        OMDB_APIkey,
        TMDB_APIkey 
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
