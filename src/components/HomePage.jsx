import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import Pagination from "@mui/material/Pagination";


export default function HomePage() {
  const {
    movies,
    handleSearch,
    addingToFavorite,
    fetchFullMovieDetails,
    totalResults,
  } = useContext(SearchContext);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // New state for pagination
  const totalPages = Math.ceil(totalResults / 10);
  const navigate = useNavigate();

  function updateTime() {
    const hour = new Date().getHours();
    let timeLabel = "";
    if (hour >= 5 && hour < 12) timeLabel = "morning";
    else if (hour >= 12 && hour < 14) timeLabel = "noon";
    else if (hour >= 14 && hour < 17) timeLabel = "afternoon";
    else if (hour >= 17 && hour < 21) timeLabel = "evening";
    else timeLabel = "night";
    setTimeOfDay(timeLabel);
  }

  useEffect(() => {
    updateTime();
  }, []);

  // Trigger search when timeOfDay or currentPage changes
  useEffect(() => {
    if (!timeOfDay) return;
    handleSearch(timeOfDay, currentPage);
  }, [timeOfDay, currentPage]);

  // Fetch full movie details if necessary
  useEffect(() => {
    if (!movies || movies.length === 0) return;
    if (movies[0].Plot) return;
    fetchFullMovieDetails(movies);
  }, [movies]);

  return (
    <>
      <div className="moviesContainer">
        {movies.map((movie) => (
          <div className="movieContainer" key={movie.imdbID}>
            <h4>{movie.Title}</h4>
            <div className="expand">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
                alt={`${movie.Title} Poster`}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              />
            </div>
            <p>🎬 Year: {movie.Year}</p>
            <p>🍿{movie.Genre || "N/A"}</p>
            <p>⭐ Rating: {movie.imdbRating || "N/A"}</p>
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
