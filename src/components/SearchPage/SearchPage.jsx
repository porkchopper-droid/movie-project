import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import "./SearchPage.scss";

export default function SearchPage() {
  const { movies, handleSearch, totalResults, addingToFavorite, searchQuery } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalResults / 10);

  // Trigger search API call when searchQuery or currentPage changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      handleSearch(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage, handleSearch]);

  return (
    <div className="movies-container_div">
      <h2>Search Results for: {searchQuery}</h2>
      <ul className="moviesContainer">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movieContainer" key={movie.imdbID}>
              <h4>{movie.Title}</h4>
              <div className="expand">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
                  alt={`${movie.Title} Poster`}
                  style={{
                    width: "80%",
                    height: "230px",
                    objectFit: "cover",
                    padding: "10px 0",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                />
              </div>
              <p>Year: {movie.Year}</p>
              <p>Genre: {movie.Genre || "N/A"}</p>
              <p>Rating: {movie.imdbRating || "N/A"}</p>
              <button
                className="favorites-button"
                onClick={() => addingToFavorite(movie)}
              >
                Add to favorites
              </button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul>

      {/* Pagination for SearchPage */}
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
