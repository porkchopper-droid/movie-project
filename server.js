import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Middleware to parse JSON requests

//  Proxy OMDB API search request
app.get("/api/movies", async (req, res) => {
  try {
    const { query, page } = req.query;
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching OMDB movies:", error);
    res.status(500).json({ error: "Error fetching OMDB data" });
  }
});

//  Proxy OMDB single movie request
app.get("/api/movie", async (req, res) => {
  try {
    const { id } = req.query;
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching OMDB movie:", error);
    res.status(500).json({ error: "Error fetching OMDB movie" });
  }
});

//  Proxy TMDB single movie request
app.get("/api/tmdb/movie", async (req, res) => {
  try {
    const { id } = req.query;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching TMDB movie:", error);
    res.status(500).json({ error: "Error fetching TMDB movie" });
  }
});

// Proxy for top-rated movies
app.get("/api/tmdb/top-rated", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=${page}&api_key=${process.env.TMDB_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching TMDB top-rated:", error);
    res.status(500).json({ error: "Error fetching TMDB top-rated" });
  }
});

//  Proxy TMDB genres request
app.get("/api/tmdb/genres", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching TMDB genres:", error);
    res.status(500).json({ error: "Error fetching TMDB genres" });
  }
});

//  Proxy TMDB discover movies by genre (random movies per genre)
app.get("/api/tmdb/discover", async (req, res) => {
  try {
    const { genre } = req.query;
    if (!genre) return res.status(400).json({ error: "Genre ID is required" });
    console.log("TMDB API Key:", process.env.TMDB_API_KEY);
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre}&language=en-US&sort_by=popularity.desc`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching TMDB discover movies:", error);
    res.status(500).json({ error: "Error fetching TMDB discover movies" });
  }
});

//  Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//  Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
