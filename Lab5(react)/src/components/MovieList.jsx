import React from "react";
import MovieCard from "./MovieCard";
import "../App.css";

function MovieList({ movies, onRemoveMovie }) {
  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <p className="empty">No movies added yet 🎥</p>
      ) : (
        movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            onRemove={() => onRemoveMovie(index)}
          />
        ))
      )}
    </div>
  );
}

export default MovieList;
