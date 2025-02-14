import {useContext} from 'react'
import { SearchContext } from '../contexts/SearchContext';


export default function SearchPage({searchMovies}) {
  console.log(searchMovies);
  

  const {addingToFavorite,favoritesMovies,setFavoritesMovies,} = useContext(SearchContext);

  return (
    <div>
    
    {favoritesMovies.length > 0 && <span>{favoritesMovies.length}</span>}

    <ul className="moviesContainer">
      {searchMovies.length >0?searchMovies.map((movie) => (
        <div className="movieContainer" key={searchMovies.imdbID}>
          <h4>{movie.Title}</h4>
          <div className="expand">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "NO IMAGE"}
              alt={movie.Title + " Poster"}
              style={{
                width: "80%",
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
          <button onClick={() => addingToFavorite(movie)}>
            Add to favorite
          </button>
        </div>
      ))
      :<h1> Sorry There is no Movies in This Name  </h1>}
    </ul>
  </div>
  )
}
