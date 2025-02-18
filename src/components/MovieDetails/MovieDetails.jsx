import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import "./MovieDetails.scss";

export default function MovieDetails() {
  const { movie, handleSingleSearch, handleSingleSearchTMDB } =
    useContext(SearchContext);

  const { id } = useParams();

  const navigate = useNavigate();

  // normalizing movies keys.....
  const normalizedMovie = movie && {
    Poster:
      movie.Poster || `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    Title: movie.Title || movie.title,
    Year:
      movie.Year ||
      (movie.release_date ? movie.release_date.split("-")[0] : "Unknown"),
    Plot: movie.Plot || movie.overview,
    Genre:
      movie.Genre ||
      (movie.genres ? movie.genres.map((g) => g.name).join(", ") : ""),
    Language:
      movie.Language ||
      (movie.original_language ? movie.original_language.toUpperCase() : ""),
    Country:
      movie.Country ||
      (movie.production_countries
        ? movie.production_countries.map((c) => c.name).join(", ")
        : ""),
    Director: movie.Director || "Unknown",
    Actors: movie.Actors || "Unknown",
    imdbRating:
      movie.imdbRating ||
      (movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"),
  };

  useEffect(() => {
    if (!id) return;

    if (id.startsWith("tt")) {
      handleSingleSearch(id); // hobbits go with OMDB
    } else {
      handleSingleSearchTMDB(id); // orcs go with TMDB
    }
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <>
      <div className="detailedMovie">
        <div className="moviePoster">
          <img src={normalizedMovie.Poster} alt={normalizedMovie.Title} />
        </div>
        <div className="movieDescription">
          <h2>{normalizedMovie.Title}</h2>
          <p>{normalizedMovie.Year}</p>
          <div className="movieDescriptionList">
            <p>
              <strong>PLOT: </strong>
              {normalizedMovie.Plot}
            </p>
            <p>
              <strong>GENRE: </strong>
              {normalizedMovie.Genre}
            </p>
            <p>
              <strong>LANGUAGE: </strong>
              {normalizedMovie.Language}
            </p>
            <p>
              <strong>COUNTRY: </strong>
              {normalizedMovie.Country}
            </p>
            <p>
              <strong>DIRECTOR: </strong>
              {normalizedMovie.Director}
            </p>
            <p>
              <strong>ACTORS: </strong>
              {normalizedMovie.Actors}
            </p>
            <p>
              <strong>RATING: </strong>
              {normalizedMovie.imdbRating}
            </p>
          </div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </>
  );
}
