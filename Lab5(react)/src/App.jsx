import React, { useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  const removeMovie = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>🎬 My Movies</h1>
      <MovieForm onAddMovie={addMovie} />
      <MovieList movies={movies} onRemoveMovie={removeMovie} />
    </div>
  );
}

export default App;
