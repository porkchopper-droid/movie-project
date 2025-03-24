import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext.jsx";
import Pagination from "@mui/material/Pagination";

export default function TopRated() {
  const {
    searchResults,
    fetchTopRated,
    addingToFavorite,
    fetchFullMovieDetails,
    totalResults,
    genres,
  } = useContext(SearchContext);

  const [currentPage, setCurrentPage] = useState(1); // New state for pagination
  const totalPages = Math.ceil(totalResults / 10);
  const navigate = useNavigate();

  // Trigger search when timeOfDay or currentPage changes
  useEffect(() => {
    fetchTopRated(currentPage);
  }, [currentPage]);

  // Fetch full movie details if necessary
  useEffect(() => {
    if (!searchResults || searchResults.length === 0) return;
    if (searchResults[0].Plot) return;
    fetchFullMovieDetails(searchResults);
  }, [searchResults]);

  return (
    <>
      <div className="moviesContainer">
        {searchResults.map((movie) => (
          <div className="movieContainer" key={movie.id}>
            <h4>{movie.title}</h4>
            <div className="expand">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "NO IMAGE"
                }
                alt={`${movie.title} Poster`}
                style={{
                  width: "80%",
                  height: "230px",
                  objectFit: "cover",
                  padding: "10px 0",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            </div>
            <p>🎬 Year: {movie.release_date.slice(0, 4)}</p>
            <p>
              🍿
              {movie.genre_ids
                ?.map((id) => genres.find((genre) => genre.id === id)?.name)
                .filter(Boolean) // remove undefined
                .join(", ") || "N/A"}
            </p>
            <p>⭐ Rating: {movie.vote_average.toFixed(1) || "N/A"}</p>
            <button
              className="favorites-button"
              onClick={() => addingToFavorite(movie)}
            >
              Add to favorites
            </button>
          </div>
        ))}

        {/* Pagination component for HomePage */}
      </div>
      <Pagination
        page={currentPage}
        onChange={(e, value) => setCurrentPage(value)}
        count={totalPages}
        shape="rounded"
      />
    </>
  );
}
