import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../styles/Home.css";
import axios from "axios";
import { Button } from "@material-ui/core";

function Home() {
  const history = useHistory();
  const [useremail, setUseremail] = useState("");
  const [show, setShow] = useState(false);
  const checkUser = async () => {
    axios
      .get("/user/getData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then((response) => {
        // console.log(response.data);
        setUseremail(response.data.email);
        setShow(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    checkUser();
  });
  return (
    <div className="home">
      <div className="home_section">
        <h1 className="home_haeding">Welcome to Movie-Search</h1>
        <h2 className="user_name_heading">
          Welcome : <span className="username">{useremail}</span>
        </h2>
        <p className="home_para">
          {show ? (
            <div className="sucessFull_login">
              <p className="home_para">Happy to see you back</p>
              <NavLink to="/search_movies" style={{textDecoration:"none"}}>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "2vh", marginLeft: "1vw" }}
              >
                Search Movies
              </Button>
              </NavLink>
            </div>
          ) : (
            "Please Login or Signup to Search Movies"
          )}
        </p>
      </div>
    </div>
  );
}

export default Home;
