import { Button } from "@material-ui/core";
import React from "react";
import "../styles/movielist.css";

function Movielist(props) {
  return (
    <div className="movies_list">
      <div className="movies_poster">
        <p className="movie_title"> {props.movies.Title}</p>
        <img
          src={props.movies.Poster}
          className="movie_img"
        />
      </div>
      <div className="movies_details">
        <p className="movie_cast">{props.movies.Actors}</p>
        <p className="movie_rating"> {props.movies.imdbRating}</p>
        <p className="movie_year"> {props.movies.Year}</p>
        <Button variant="contained" color="secondary" onClick={() => props.handleFavouritesClick(props.movies)} id="add_btn">
        Add to Favourite
      </Button>
      </div>
      
    </div>
  );
}

export default Movielist;
