import React, { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider(props) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  function handleSearch(query) {
    const myAPIkey = "4a822498";
    fetch(`https://www.omdbapi.com/?apikey=${myAPIkey}&s=${query}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.Search || []))
      .catch((error) => console.error("Error fetching movies:", error));
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
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
