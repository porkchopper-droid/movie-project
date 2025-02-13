import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import "./HomePage.scss";

export default function HomePage() {
  const { movies, handleSearch } = useContext(SearchContext); // using context...
  const [timeOfDay, setTimeofDay] = useState(""); // based on the current hour
  const navigate = useNavigate()

  function updateTime() { // used to update timeOfDay based on hours
    const now = new Date();
    const hour = now.getHours();

    let timeLabel = "";
    if (hour >= 5 && hour < 12) timeLabel = "morning";
    else if (hour >= 12 && hour < 14) timeLabel = "noon";
    else if (hour >= 14 && hour < 17) timeLabel = "afternoon";
    else if (hour >= 17 && hour < 21) timeLabel = "evening";
    else timeLabel = "night";

    setTimeofDay(timeLabel);
  }

  useEffect(() => {
    updateTime();
  }, []);

  useEffect(() => {
    if (!timeOfDay) return;
    handleSearch(timeOfDay);
  }, [timeOfDay]);

  return (
    <div>
      <ul className="moviesContainer">
        {movies.map((movie) => (
          <div className="movieContainer" key={movie.imdbID} onClick={()=>navigate(`/movie/${movie.imdbID}`)} style={{cursor: "pointer"}}>
            <h4>{movie.Title}</h4>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
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
