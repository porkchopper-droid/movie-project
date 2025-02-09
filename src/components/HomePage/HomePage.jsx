import React, {useState, useEffect} from 'react'
import "./HomePage.scss"

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const myAPIkey = "4a822498"

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${myAPIkey}&s=morning`)
      .then((response) => response.json())
      .then((data) => setMovies(data.Search || []))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div >
      <ul className='ulContainer'>
        {movies.map((movie) => (
          
          <div className="liContainer">
          <li key={movie.imdbID}>{movie.Title}</li></div>
  
        ))}
      </ul>
    </div>
  );
}
