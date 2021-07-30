import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import "../styles/Logout.css";
// import { UserContext } from "../App";

function Logout() {
  // const { state, dispatch } = useContext(UserContext);
  // const history = useHistory();
  const checkUser=()=>{
    fetch("/user/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        window.location.replace("/signin");

        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    checkUser();
  });
  return (
    <div className="logout">
      <h3>Logout successfully. Please login or signup fro upload post</h3>
    </div>
  );
}

export default Logout;
