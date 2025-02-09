import React, { useState, useEffect } from "react";
import "./HomePage.scss";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const myAPIkey = "4a822498";

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${myAPIkey}&s=morning`) // TO CHANGE DEPENDIING ON TIME OF THE DAY OR RANDOM
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.Search || []);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      <ul className="moviesContainer">
        {movies.map((movie) => (
          <div className="movieContainer" key={movie.imdbID}>
            <h4>{movie.Title}</h4>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "NO IMAGE"
              }
              alt={movie.Title + " Poster"}
              style={{ width: "80%", objectFit: "cover", padding: "10px 0" }}
            />
            <p>Year: {movie.Year}</p>
            <p>Genre: {movie.Genre || "N/A"}</p>
            <p>Rating: {movie.imdbRating || "N/A"}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
