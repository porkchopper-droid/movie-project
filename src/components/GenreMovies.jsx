import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { SearchContext } from "../contexts/SearchContext";


export default function GenreMovies() {
  const { genre } = useParams(); // e.g., "Action"
  const { genres, API_BASE_URL } = useContext(SearchContext);
  const [genreMovies, setGenreMovies] = useState([]);
  const [genreTotalResults, setGenreTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!genres.length) return; // Wait until genres are loaded
    const matchedGenre = genres.find(
      (genreObj) => genreObj.name.toLowerCase() === genre.toLowerCase()
    );
    if (!matchedGenre) {
      console.error("Genre not found!");
      return;
    }

    console.log("Fetching URL");

    fetch(
      `${API_BASE_URL}/tmdb/discover?genre=${matchedGenre.id}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data for page", currentPage, data);
        setGenreMovies(data.results || []);
        setGenreTotalResults(data.total_results || 0);
      })
      .catch((error) => console.error("Error fetching genre movies:", error));
  }, [genre, genres, currentPage, API_BASE_URL]);

  useEffect(() => {
    setCurrentPage(1);
  }, [genre]);

  const totalPages = Math.ceil(genreTotalResults / 20);

  return (
    <>
        <h2>{genre} Movies</h2>
        <div className="moviesContainer">
          {genreMovies.map((movie) => (
            <div className="movieContainer" key={movie.id}>
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
                🎬 Year:{" "}
                {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              </p>
              <p className="movie-info">
                ⭐ Rating:{" "}
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
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
    </>
  );
}
