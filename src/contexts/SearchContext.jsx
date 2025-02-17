

import { createContext, useState } from "react";


export const SearchContext = createContext();

export default function SearchContextProvider(props) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  const [searchMovies,setSearchMovies]=useState([])
  



  function handleSearch(query) {
    const myAPIkey = "4a822498";
    fetch(`https://www.omdbapi.com/?apikey=${myAPIkey}&s=${query}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.Search || []))
      .catch((error) => console.error("Error fetching movies:", error));
  }
   


  
  const addingToFavorite = (movie) => {
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

        setMovies,
        searchMovies,
        setSearchMovies,
        addingToFavorite


      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
