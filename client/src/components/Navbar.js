import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { Avatar } from "@material-ui/core";
import "../styles/Navbar.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Avatar, IconButton } from "@material-ui/core";
import axios from "axios";
// import { useStateValue } from "../StateProvider";

function Navbar(props) {
  console.warn(props.data)
  const [userdata, setUserdata] = useState("");
  const [email, setEmail] = useState("");
  // const [basket] = useStateValue();
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
        setEmail(response.data.email);
        setUserdata(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div className="navbar">
      <div className="nav_list">
        <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
          <p className="link_para">Home</p>
        </NavLink>
        {userdata ? (
          <div className="successfull_login">
            <div className="Avatar">
              <Avatar src={email} alt={email} />
              <p className="useremail">{email}</p>
            </div>
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/logout"
            >
              <p className="link_para">Logout</p>
            </NavLink>
            <div className="card_item">
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/favourite"
              >
              <p className="link_para">Favourite</p>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="signin_signup">
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/signup"
            >
              <p className="link_para">Signup</p>
            </NavLink>

            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/signin"
            >
              <p className="link_para">Login</p>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
