import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { SearchContext } from "../../contexts/SearchContext";
import "./GenreMovies.scss";

export default function GenreMovies() {
  const { genre } = useParams(); // e.g., "Action"
  const { genres, TMDB_APIkey } = useContext(SearchContext);
  const [genreMovies, setGenreMovies] = useState([]);
  const [genreTotalResults, setGenreTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Find the matching genre object (assumes names match case-insensitively)
  const currentGenre = genres.find(
    (g) => g.name.toLowerCase() === genre.toLowerCase()
  );

  useEffect(() => {
    if (!currentGenre) return;
    // TMDB returns 20 results per page by default.
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIkey}&with_genres=${currentGenre.id}&language=en-US&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGenreMovies(data.results || []);
        setGenreTotalResults(data.total_results || 0);
      })
      .catch((error) => console.error("Error fetching genre movies:", error));
  }, [currentGenre, currentPage, TMDB_APIkey]);

  const totalPages = Math.ceil(genreTotalResults / 20);

  return (
    <div className="genre-movies-container">
      <h2>{genre} Movies</h2>
      <div className="movies-list">
        {genreMovies.map((movie) => (
          <div className="movie" key={movie.id}>
            <h4>{movie.title}</h4>
            <div className="expand">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "NO IMAGE"
                }
                alt={movie.title}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            </div>
            <p className="movie-info">
                🎬 Year: {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              </p>
              <p className="movie-info">
                ⭐ Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          count={totalPages}
          shape="rounded"
        />
      )}
    </div>
  );
}
