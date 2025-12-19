import React from "react";
import "../App.css";

function MovieCard({ movie, onRemove }) {
  return (
    <div className="movie-card">
      <h3>{movie.name}</h3>
      <p>{movie.comment}</p>
      <p>{Array(movie.rating).fill("⭐").join("")}</p>
      <button className="remove-btn" onClick={onRemove}>
        ❌ Remove
      </button>
    </div>
  );
}

export default MovieCard;
