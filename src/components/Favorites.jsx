import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function Favorites() {
  const { favoritesMovies, setFavoritesMovies, genres } =
    useContext(SearchContext);

  //Filtering movies and removing one from favorite by clicking the button
  const removeFromFavorite = (movie) => {
    const movieId = movie.imdbID || movie.id;

    const filtered = favoritesMovies.filter(
      (m) => (m.imdbID || m.id) !== movieId
    );

    setFavoritesMovies(filtered);
  };

  return (
    <>
      {/* <h2>{favoritesMovies.length === 0 && " No Favorite movies available"}</h2> */}
      <ul className="moviesContainer">
        {favoritesMovies.map((movie) => (
          <div className="movieContainer" key={movie.imdbID || movie.id}>
            <h4>{movie.Title || movie.title}</h4>
            <img
              src={
                movie.Poster ||
                (movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "NO IMAGE")
              }
              alt={`${movie.Title || movie.title} Poster`}
              style={{ width: "80%", objectFit: "cover", padding: "10px 0" }}
            />
            <p>Year: {movie.Year || movie.release_date.slice(0, 4)}</p>
            <p>
              Genre:{" "}
              {movie.Genre ||
                movie.genre_ids
                  ?.map((id) => genres.find((genre) => genre.id === id)?.name)
                  .filter(Boolean) // remove undefined
                  .join(", ") ||
                "N/A"}
            </p>
            <p>
              Rating:{" "}
              {movie.imdbRating || movie.vote_average.toFixed(1) || "N/A"}
            </p>
            <button
              className="remove-favs"
              onClick={() => removeFromFavorite(movie)}
            >
              Remove from favorite
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}
