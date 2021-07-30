import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import "../styles/Signup.css";
function Signup() {
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const [userData, setUserdata] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  // const [openProgress, setOpenProgress] = useState(false);
  const [dialog, setDialoag] = useState(false);
  const [successDialouge, setSuccessDialouge] = useState(false);

  setTimeout(() => {
    setAlert({
      showSnackbar: false,
    });
  }, 5000);

  const history = useHistory();

  const onSubmitSignup = async (e) => {
    e.preventDefault();
      if (userData.email === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your email",
      });
    } else if (userData.password === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter a password",
      });
    } else if (userData.password !== userData.cpassword) {
      setAlert({
        showSnackbar: true,
        message: "Password do not match",
      });
    } else {
      setDialoag(true);
      const res = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = res.json();
      if (res.status === 422 || !data) {
        window.alert("Failed to register");
      } else {
        setDialoag(false);
        setUserdata("");
        setSuccessDialouge(true);
      }
    }
  };
  const closeDialog = () => {
    setDialoag(false);
  };
  const closeSuccessDialouge = () => {
    setSuccessDialouge(false);
  };

  return (
    <div className="signup">
      <form className="signup_form">
        <input
          required
          type="email"
          value={userData.email}
          className="signup_inputs"
          onChange={(e) => setUserdata({ ...userData, email: e.target.value })}
          placeholder="Enter Your Email"
        />
        <input
          required
          type="password"
          value={userData.password}
          className="signup_inputs"
          onChange={(e) =>
            setUserdata({ ...userData, password: e.target.value })
          }
          placeholder="Enter a Password"
        />
        <input
          required
          type="password"
          value={userData.cpassword}
          className="signup_inputs"
          onChange={(e) =>
            setUserdata({ ...userData, cpassword: e.target.value })
          }
          placeholder="Confirm your password"
        />
        <input
          type="submit"
          value="Submit"
          className="signup_btn"
          onClick={(e) => onSubmitSignup(e)}
        />
      </form>
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <p className="alreday_account">Already Have an Acconut?</p>
      </NavLink>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alert.showSnackbar}
        message={alert.message}
        autoHideDuration={3000}
      />
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CircularProgress color="secondary" />
            <p style={{ fontFamily: "cursive", color: "blue" }}>Wait..</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog open={successDialouge}>
        <DialogContent color="black">
          <DialogContentText id="alert-dialog-description">
            <CancelIcon
              style={{
                marginLeft: "12vw",
                fontSize: "1.8rem",
                marginBottom: "1vh",
              }}
              onClick={closeSuccessDialouge}
            />

            <p
              style={{
                fontFamily: "cursive",
                color: "blue",
                fontSize: "1.1rem",
              }}
            >
              Login user Successfully
              <br />
              You can log in now
            </p>
            <CheckCircleOutlineIcon
              style={{
                fontSize: "3rem",
                color: "blue",
                marginLeft: "5.5vw",
                marginTop: "1.5vh",
              }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Signup;
