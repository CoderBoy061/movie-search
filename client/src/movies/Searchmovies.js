import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "../styles/searchMovies.css";
import axios from "axios";
import Movielist from "../moviesComponent/Movielist";
// import Add_to_favourite from "../moviesComponent/Add_to_favourite";

function Searchmovies(props) {
  const [movies, setMovies] = useState({});
  const [name, setName] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [show, setShow] = useState(false);
  //   const [{ basket }, dispatch] = useStateValue();
  const handleSearch = (e) => {
    e.preventDefault();
    const apiKey = "19aad23";
    axios
      .get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${name}`)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
        setShow(true);
        if (movies === "") {
          window.alert("Sorry No result Found");
        }
      })
      .catch((error) => {
        if (movies === "") {
          window.alert("Sorry No result Found");
        }
        console.log(error.message);
      });
  };
  const addFavouriteMovie = (movies) => {
    const newFavouriteList = [...favourites, movies];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  return (
    <div className="search_movies">
      <div className="search_by_name">
        <input
          type="text"
          placeholder="Enter a movie/series name"
          className="movie_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          id="search_btn"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className="searched_movies">
        {show ? (
          <Movielist
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
          />
        ) : (
          <h3 className="result_heading">Your results ....</h3>
        )}
      </div>
    </div>
  );
}

export default Searchmovies;
