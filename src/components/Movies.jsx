import axios from "axios";
import React, { useState, useEffect } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5055/posts")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleDelete = async (movieId) => {
    try{
      await axios.delete(`http://localhost:5055/posts/${movieId}`)
      setMovies(movies.filter((movie) => movie._id !== movieId))
    }catch(error){
      console.error("Error deleting movie:", error);
      alert("failed to delete");
    }
  }
 
  return (
    <div>
      <h1>Movies List</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <h2>Title: {movie.title}</h2>
              <p>Body: {movie.body}</p>
              <p>Category: {movie.category}</p>
              <p>Likes: {movie.likes}</p>
              <p>Date: {new Date(movie.date).toLocaleDateString("en-GB",
                {day: "numeric",
                 month: "short",
                 year: "numeric" 
                }
              )}</p>

              <button onClick={() => handleDelete(movie._id)} className="bg-red-500 p-1 rounded-lg">Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Movies;
