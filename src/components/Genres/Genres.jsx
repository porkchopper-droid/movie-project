import { genreMovies } from "../../data/genreMovies";
import "./Genres.scss"

export default function Genres() {
  const randomMovies = Object.keys(genreMovies).map((genre) => {
    const movies = genreMovies[genre];
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    return { genre, movie: randomMovie };
  });

  return (
    <div>
      <h2>Explore Movies by Genre</h2>
      <ul>
        {randomMovies.map(({ genre, movie }) => (
          <li key={genre}>
            {movie} ({genre.toUpperCase()})
          </li>
        ))}
      </ul>
    </div>
  );
}
