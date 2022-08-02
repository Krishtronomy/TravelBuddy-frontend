import React, { useState } from "react";
import postAPI from "../../config/api";

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
      setPasswordMismatch("Password does not match Password Confirmation");
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

  return (
    <>
      <h1>Sign Up</h1>
      <div className="create">
        <form onSubmit={submitFormHandler}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleFormData}
            />
            <label>Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleFormData}
            />
            <label>Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleFormData}
            />
            <label>Confirm Password:</label>
            <input
              id="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleFormData}
            />
            <label>Tell us about yourself:</label>
            <textarea
              type="text"
              id="about"
              value={formData.about}
              onChange={handleFormData}
            />

            <div>
              <button>Submit</button>
              {!signUpError && <h4>{successSignIn}</h4>}
              {passwordMismatch && (
                <p style={{ color: "red" }}>{passwordMismatch}</p>
              )}
              {signUpError && <p style={{ color: "red" }}>{signUpError}</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
