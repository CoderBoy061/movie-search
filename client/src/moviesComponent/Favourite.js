import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/searchMovies.css";

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);
  const removeFavouriteMovie = (e) => {
    const newFavouriteList = favourites.filter(
      (favourites) => favourites.imdbID !== favourites.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const favouritesMovies = () => {
    if (favourites.length > 0) {
      return favourites.map((data) => {
        return (
          <div key={data.imdbID} className="movies_list">
            <div className="movies_poster">
              <p className="movie_title"> {data.Title}</p>
              <img src={data.Poster} className="movie_img" />
            </div>
            <div className="movies_details">
              <p className="movie_cast">{data.Actors}</p>
              <p className="movie_rating"> {data.imdbRating}</p>
              <p className="movie_year"> {data.Year}</p>
              <Button
                onClick={(e) => removeFavouriteMovie(e)}
                variant="contained"
                color="secondary"
                id="add_btn"
              >
                Remove
              </Button>
            </div>
          </div>
        );
      });
    } else {
      return (
        <h1 className="favouries_heading">
          Your Favourite list will appear here
        </h1>
      );
    }
  };
  //   const removeFavouriteMovie = () => {
  //     const newFavouriteList = favourites.imdbID !== favourites.imdbID;
  //     setFavourites(newFavouriteList);
  //     saveToLocalStorage(newFavouriteList);
  //   };
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };
  return (
    <div className="favourite">
      {favouritesMovies()}
      <NavLink to="/search_movies" style={{textDecoration:"none"}}>
        <Button variant="contained" color="secondary" id="back_btn">
          Back to search
        </Button>
      </NavLink>
    </div>
  );
}

export default Favourite;
