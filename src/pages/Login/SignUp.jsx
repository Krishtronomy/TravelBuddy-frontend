import React, { useState } from "react";
import postAPI from "../../config/api";
import "./Login.scss";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

const SignUp = () => {
	// Sets initial formdata
	const initialFormState = {
		username: "",
		email: "",
		password: "",
		password_confirmation: "",
		about: "",
	};

	const [formData, setFormData] = useState(initialFormState);
	const [successSignIn, setSuccessSignIn] = useState("");
	const [signUpError, setSignUpError] = useState(null);
	const [passwordMismatch, setPasswordMismatch] = useState(null);

	// Handles user input within the form
	const handleFormData = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		});
	};

	// Handles form submission
	const submitFormHandler = (event) => {
		event.preventDefault();
		if (formData.password !== formData.password_confirmation) {
			setPasswordMismatch(
				"Password does not match Password Confirmation"
			);
		} else {
			postAPI
				.post("/sign_up", formData)
				.then((response) => {
					setSignUpError(null);
					setPasswordMismatch(null);
					setFormData(initialFormState);
					setSuccessSignIn("Sign up Successful! You may now login.");
				})
				.catch((error) => {
					setSignUpError(error.response.data.error);
					console.log(signUpError);
				});
		}
	};

	// // Set Modal state
	const [open, setOpen] = useState("");
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<div className="create">
				<form id="signupform" onSubmit={submitFormHandler}>
					<div>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography
									id="modal-modal-title"
									variant="h6"
									component="h2"
								>
									Enter Details To Sign Up
								</Typography>
								<Typography
									id="modal-modal-description"
									sx={{ mt: 2 }}
								>
									<label>Username:</label>
									<input
										type="text"
										id="username"
										value={formData.username}
										onChange={handleFormData}
                    style={{ width: "100%" }}
									/>
									<label>Email:</label>
									<input
										type="email"
										id="email"
										value={formData.email}
										onChange={handleFormData}
                    style={{ width: "100%" }}
									/>
									<label>Password:</label>
									<input
										type="password"
										id="password"
										value={formData.password}
										onChange={handleFormData}
                    style={{ width: "100%" }}
									/>
									<label>Confirm Password:</label>
									<input
										id="password_confirmation"
										type="password"
										value={formData.password_confirmation}
										onChange={handleFormData}
                    style={{ width: "100%" }}
									/>
									<label>Tell us about yourself:</label>
									<textarea
										type="text"
										id="about"
										value={formData.about}
										onChange={handleFormData}
                    style={{ width: "100%" }}
									/>
									<Button variant="outlined" form="signupform" type="submit">
										Sign Up
									</Button>
									{!signUpError && <h4>{successSignIn}</h4>}
									{passwordMismatch && (
										<p style={{ color: "red" }}>
											{passwordMismatch}
										</p>
									)}
									{signUpError && (
										<p style={{ color: "red" }}>
											{signUpError}
										</p>
									)}
								</Typography>
							</Box>
						</Modal>
					</div>
				</form>
			</div>

			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpen}
				>
					Sign Up
				</Button>
			</div>
		</>
	);
};

export default SignUp;
