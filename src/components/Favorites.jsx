import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function Favorites() {
  const { favoritesMovies, setFavoritesMovies } = useContext(SearchContext);

  //Filtirig movies and remove  it from favorite by clicking on the button
  const removeFromFavorite = (movie) => {
    const filtringMovies = favoritesMovies.filter(
      (m) => m.imdbID !== movie.imdbID
    );
    setFavoritesMovies(filtringMovies);
  };

  return (
    <div className="movies-container_div">
      <h2>{favoritesMovies.length === 0 && " No Favorite movies available"}</h2>
      <ul className="moviesContainer">
        {favoritesMovies.map((movie) => (
          <div className="movieContainer" key={movie.imdbID}>
            <h4>{movie.Title}</h4>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
              alt={movie.Title + " Poster"}
              style={{ width: "80%", objectFit: "cover", padding: "10px 0" }}
            />
            <p>Year: {movie.Year}</p>
            <p>Genre: {movie.Genre || "N/A"}</p>
            <p>Rating: {movie.imdbRating || "N/A"}</p>
            <button className="remove-favs" onClick={() => removeFromFavorite(movie)}>
              Remove from favorite
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
