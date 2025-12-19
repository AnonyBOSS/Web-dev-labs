import React, { useState } from "react";
import "../App.css";

function MovieForm({ onAddMovie }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter a movie name!");
    onAddMovie({ name, comment, rating });
    setName("");
    setComment("");
    setRating(0);
  };

  return (
    <form className="form" onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Movie name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className="rating">
        <span>Rating: </span>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setRating(num)}
            style={{ color: num <= rating ? "gold" : "gray", cursor: "pointer" }}
          >
            ⭐
          </span>
        ))}
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
}

export default MovieForm;
