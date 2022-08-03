import { React, useEffect, useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Login.scss";
import postAPI from "../../config/api";
import SignUp from "./SignUp";
import { useGlobalState } from "../../utils/stateContext";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

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

	// // Set Modal state
	const [open, setOpen] = useState("");
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter Details To Log In
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={emailChangeHandler}
                  />
                  <br></br>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={passwordChangeHandler}
                  />
                  <Button>Log In</Button>
                  {loginError && (
                    <p style={{ color: "red" }}>{loginError}</p>
                  )}
                </Typography>
                </Box>
              </Modal>
						</div>
					)}
				</form>
			</div>

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Log In
        </Button>
      </div>

			{!loggedInUser && <SignUp />}
		</>
	);
};

export default AppWrap(
	MotionWrap(Login, "app__explore"),
	"login",
	"app__primarybg"
);
