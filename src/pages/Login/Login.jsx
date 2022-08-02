import { React, useEffect, useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Login.scss";
import postAPI from "../../config/api";
import SignUp from "./SignUp";
import { useGlobalState } from "../../utils/stateContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(
    sessionStorage.getItem("user") || null
  );
  const [loginError, setLoginError] = useState(null);
  const [userInfo, setUserInfo] = useState(
    sessionStorage.getItem("about") || null
  );
  const { dispatch } = useGlobalState();

  //   Set email state to user typed entry on input form
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  //   Set password state to user typed entry on input form
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  // Sets sign in details and verifies with the database if details are correct
  const submitFormHandler = (event) => {
    event.preventDefault();
    const login = { email, password };
    postAPI
      .post("/sign_in", login)
      .then((response) => {
        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("token", response.data.jwt);
        sessionStorage.setItem("user", response.data.username);
        sessionStorage.setItem("about", response.data.about);
        sessionStorage.setItem("imageUrl", response.data.imageUrl);
        setLoggedInUser(response.data.username);
        dispatch({
          type: "setLoggedInUser",
          data: response.data.username,
        });
        dispatch({
          type: "setToken",
          data: response.data.jwt,
        });
        dispatch({
          type: "setID",
          data: response.data.id,
        });
        dispatch({
          type: "setAbout",
          data: response.data.about,
        });
        dispatch({
          type: "setImage",
          data: response.data.imageUrl || null,
        });
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
    dispatch({
      type: "setLoggedInUser",
      data: null,
    });
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
      {!loggedInUser && <SignUp />}
    </>
  );
};

// export default AppWrap(LoginForm);

export default AppWrap(
	MotionWrap(Login, "app__explore"),
	"login",
	"app__whitebg"
);
