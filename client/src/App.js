import React from "react";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Logout from "./components/Logout";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Searchmovies from "./movies/Searchmovies";
import Favourite from "./moviesComponent/Favourite";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/search_movies">
        <Searchmovies />
      </Route>
      <Route exact path="/favourite">
        <Favourite />
      </Route>

    </div>
  );
}

export default App;
