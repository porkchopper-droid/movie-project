import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import "./Genres.scss";

export default function Genres() {
  const { randomMovies } = useContext(SearchContext);
  console.log(randomMovies);
  const navigate = useNavigate();

  function handleMovieClick(genre) {
    navigate(`/genres/${genre}`); // Navigate to GenreMovies.js
  }

  return (
    <>
      <div className="moviesContainer">
        {randomMovies.map(({ genre, movie }) => (
          <div
            className="movieContainerGenres"
            key={movie.id}
            onClick={() => handleMovieClick(genre)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="genres-name">{genre.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </>
  );
}
