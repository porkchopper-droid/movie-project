import { genreMovies } from "../../data/genreMovies";
import "./Genres.scss"

export default function Genres() {
  const randomMovies = Object.keys(genreMovies).map((genre) => {
    const movies = genreMovies[genre];
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    return { genre, movieTitle: randomMovie };

  });

  return (
    <div>
    <h2>Explore Movies by Genre</h2>
    <div className="moviesContainer">
      {randomMovies.map((randomMovie) => (
        <div className="movieContainer" onClick={() => handleMovieClick(genre)}>
          <h3>{randomMovie.movieTitle}</h3>
          <p>{randomMovie.genre.toUpperCase()}</p>
        </div>
      ))}
    </div>
  </div>
  );
}