import { React, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./LoginForm.scss";
import postAPI from "../../config/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("")

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const login = { email, password };
    postAPI.post("/sign_in", login)
    .then(response => {
        console.log(response.data)
        // sessionStorage.setItem("token", jwt)
        setLoggedInUser(response.data.username)
    })

  };
  return (
    <>
      <h1>Login Page</h1>
      <h2>{loggedInUser && loggedInUser}</h2>
      <div>
        <form onSubmit={submitFormHandler}>
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
          </div>
        </form>
      </div>
    </>
  );
};

export default AppWrap(LoginForm);
