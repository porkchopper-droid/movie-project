import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import "./Genres.scss"

export default function Genres() {
  const { randomMovies } = useContext(SearchContext);
  const navigate = useNavigate();

  function handleMovieClick(genreName) {
    navigate(`/genres/${genreName}`); // Navigate to GenreMovies.js
  }

  return (
    <div>
      <h2 className="genres-title">Explore Movies by Genre</h2>
      <div className="moviesContainer">
        {randomMovies.map(({ genre, movie }) => (
          <div
            className="movieContainer2 expand2"
            key={movie.id}
            onClick={() => handleMovieClick(genre)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "80%",
                objectFit: "cover",
                padding: "10px 0",
                cursor: "pointer",
              }}
            />
            {/* <h3>{movie.title}</h3> */}
            <p className="genres-name">{genre.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
