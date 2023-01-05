import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import searchButton from "./searchButton.svg";
const url = `https://www.omdbapi.com/?apikey=${process.env.React_App_OMDB}`;
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSerachTerm] = useState('');
  const search = async (title) => {
    const response = await fetch(`${url}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    search("superman");
  }, []);

  return (
    <div className="app">
      <h1>Movies</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {setSerachTerm(e.target.value)}}
        />
        <img src={searchButton} alt="search" onClick={() => {search(searchTerm)}}></img>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, id) => (
            <MovieCard movie={movie} key={id} />
          ))} 
        </div>
      ) : (
        <div className="empty">
          <h3>No movies found</h3>
        </div>
      )}
    </div>
  );
};
export default App;
