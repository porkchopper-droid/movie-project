import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider(props) {

  const [movies, setMovies] = useState([]); // for 10 movies
  const [movie, setMovie] = useState(null); // for a single movie
  const [searchQuery, setSearchQuery] = useState(""); // for search bar
  const [favoritesMovies, setFavoritesMovies] = useState([]); // for favorite movies
  
  const myAPIkey = "4a822498";

  function handleSearch(query) { // for 10 per query
    fetch(`https://www.omdbapi.com/?apikey=${myAPIkey}&s=${query}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.Search || []))
      .catch((error) => console.error("Error fetching movies:", error));
  }

  function handleSingleSearch(id) { // for 1 movie per query
    fetch(`https://www.omdbapi.com/?apikey=${myAPIkey}&i=${id}`)
      .then((result) => result.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie: ", error));
  }

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
        handleSingleSearch
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
