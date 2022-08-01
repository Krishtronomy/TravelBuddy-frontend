import { React, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./LoginForm.scss";
import postAPI from "../../config/api";
import Profile from "../Profile/Profile";
import SignUp from "./SignUp";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(
    sessionStorage.getItem("user") || null
  );
  const [loginError, setLoginError] = useState(null);
  const [userInfo, setUserInfo] = useState(
    sessionStorage.getItem("about") || null
  );


  //   Set email state to user typed entry on input form
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  //   Set password state to user typed entry on input form
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  //   Sets sign in details and verifies with the database if details are correct
  const submitFormHandler = (event) => {
    event.preventDefault();
    const login = { email, password };
    postAPI
      .post("/sign_in", login)
      .then((response) => {
        sessionStorage.setItem("id", response.data.id)
        sessionStorage.setItem("token", response.data.jwt);
        sessionStorage.setItem("user", response.data.username);
        sessionStorage.setItem("about", response.data.about);
        sessionStorage.setItem("imageUrl", response.data.imageUrl)
        setLoggedInUser(response.data.username);
        setUserInfo(response.data.about)
        setEmail("");
        setPassword("");
        setLoginError(null);
      })
      .catch((error) => {
        setLoginError(error.response.data.error);
      });
  };

  //   Handles signing out
  const signOutHandler = () => {
    sessionStorage.clear();
    setLoggedInUser(null);
  };

  return (
    <>
    {/* Renders login or user welcome depending if user is logged in or not */}
      {!loggedInUser && <h1>Login Page</h1>}
      {loggedInUser && <h3>Hello {loggedInUser}!</h3>}
      {loggedInUser && <button onClick={signOutHandler}>Sign Out</button>}
      <div>
        <form onSubmit={submitFormHandler}>
          {!loggedInUser && (
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={emailChangeHandler} />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={passwordChangeHandler}
              />

              <div>
                <button>Login</button>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              </div>
            </div>
          )}
        </form>
      </div>
     {!loggedInUser &&  <SignUp/>}
    </>
  );
};

export default AppWrap(LoginForm);
