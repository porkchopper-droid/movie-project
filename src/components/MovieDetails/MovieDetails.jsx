import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import "./MovieDetails.scss";

export default function MovieDetails() {

  const { movie, handleSingleSearch } = useContext(SearchContext);

  const { id } = useParams();
  
  const navigate = useNavigate();

useEffect(() => {
    if (!id) return;
    handleSingleSearch(id);
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <>
      <div className="detailedMovie">
        <div className="moviePoster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="movieDescription">
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <div className="movieDescriptionList">
            <p>
              <strong>PLOT: </strong>
              {movie.Plot}
            </p>
            <p>
              <strong>GENGRE: </strong>
              {movie.Genre}
            </p>
            <p>
              <strong>LANGUAGE: </strong>
              {movie.Language}
            </p>
            <p>
              <strong>COUNTRY: </strong>
              {movie.Country}
            </p>
            <p>
              <strong>DIRECTOR: </strong>
              {movie.Director}
            </p>
            <p>
              <strong>ACTORS: </strong>
              {movie.Actors}
            </p>
            <p>
              <strong>RATING: </strong>
              {movie.Rated}
            </p>
          </div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </>
  );
}
