import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Profile.scss";
import { useGlobalState } from "../../utils/stateContext";
import postAPI from "../../config/api";
import placeholder from "./profile-placeholder.png";
import { StarRating } from "../Travels/StarRating";
import TravelPostDetails from "../Travels/TravelPostDetails";

const Profile = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, token, id, imageUrl, about, postsList, loading } =
    store;

  const initialFormState = {
    username: loggedInUser,
    about: about,
  };

  const successState = {
    success: null,
    successMessage: "",
  };
  const [editForm, setEditForm] = useState(initialFormState);
  const [edit, setEdit] = useState(false);
  const [successfulEdit, setSuccessfulEdit] = useState(successState);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [changeImage, setChangeImage] = useState(false);
  const [usersPosts, setUsersPosts] = useState([]);

  // Filter users posts based on current logged in userID
  const filterUsersPosts = () => {
    setUsersPosts(postsList.filter((post) => post.user_id == id));
  };

  // Rerender when postsLists updates or loggedInUser updates
  useEffect(() => {
    filterUsersPosts();
  }, [postsList, loggedInUser]);

  //Sets edit mode to true to then render edit and update buttons
  const editClick = (event) => {
    event.preventDefault();
    setEdit(true);
  };
  const handleFormChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.id]: event.target.value,
    });
  };

  // Used for conditionally rendering image upload file button
  const triggerImageChange = (event) => {
    setChangeImage(true);
  };

  //   Captures image uploaded into file input field
  const handleImageChange = (event) => {
    setImage({ image: event.target.files[0] });
  };

  // Sets the headers for when making requests to the API
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  // Submits uploaded image
  const handleImageSubmit = (event) => {
    event.preventDefault();
    const picture = new FormData();
    picture.append("user[image]", image.image);
    postAPI
      .put(`/user/${id}/update`, picture, config)
      .then((response) => {
        sessionStorage.setItem("imageUrl", response.data.image.url);
        dispatch({
          type: "setImageUrl",
          data: response.data.image.url,
        });
        setSuccessfulEdit({
          success: true,
          successMessage: "Successfully updated!",
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  // Submits edits made to username or about section
  const handleEditSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("user[username]", editForm.username);
    formData.append("user[about]", editForm.about);
    postAPI
      .put(`/user/${id}/update`, formData, config)
      .then((response) => {
        sessionStorage.setItem("user", editForm.username);
        sessionStorage.setItem("about", editForm.about);
        dispatch({
          type: "setLoggedInUser",
          data: editForm.username,
        });
        dispatch({
          type: "setAbout",
          data: editForm.about,
        });
        setSuccessfulEdit({
          success: true,
          successMessage: "Successfully updated!",
        });
        setEdit(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  return (
    <>
      <h1>Profile page</h1>
      {!loggedInUser && (
        <div className="create">
          <h3>Please login or sign up first to view profile</h3>
          <a href="#login">Login</a>
        </div>
      )}
      <h1>{loggedInUser}</h1>
      {loggedInUser && (
        <div className="create">
          {(imageUrl == null || imageUrl == "null") && (
            <img
              src={placeholder}
              className="profile-pic"
              alt="profile image"
            />
          )}
          {imageUrl && imageUrl != "null" && (
            <img src={imageUrl} className="profile-pic" alt="profile image" />
          )}
          <div>
            <button id="imageChange" onClick={triggerImageChange}>
              change
            </button>
            {changeImage && (
              <form onSubmit={handleImageSubmit}>
                <input
                  className="file"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={handleImageChange}
                />
                <button onClick={() => setChangeImage(false)}>Cancel</button>
                <button>Upload!</button>
              </form>
            )}
          </div>
          <h3>About</h3>
          <p className="about-section">{about}</p>
          {!edit && <button onClick={editClick}>Edit Profile</button>}
          <h1>My Posts</h1>
          {/* </div>
      )} */}
          <div>
            {edit && (
              <form className="create" onSubmit={handleEditSubmit}>
                <label>Username:</label>
                <input
                  type="text"
                  id="username"
                  value={editForm.username}
                  onChange={handleFormChange}
                />
                <label>About:</label>
                <textarea
                  type="text"
                  id="about"
                  value={editForm.about}
                  onChange={handleFormChange}
                />
                <button onClick={() => setEdit(false)}>Cancel</button>
                <button>Update</button>
              </form>
            )}
            {successfulEdit.success && <p>{successfulEdit.successMessage}</p>}
          </div>
          <div>{error && error}</div>
          {loading && <div> Loading... </div>}
          {usersPosts && (
            <div>
              {usersPosts.map((post) => (
                <div className="blogPost" key={post.id}>
                  <div className="BlogDetails">
                    {/* <Link to={`/posts/${post.id}`} style={{textDecoration:"none"}}> */}
                    <h2>{post.title}</h2>
                    {/* If a post has a image then render the URL for the image */}
                    {post.image && (
                      <img
                        src={post.image.url}
                        style={{ width: 300, height: 250 }}
                        alt="location image"
                      />
                    )}
                    {/* Else if a post has no image then render a placeholder image */}
                    {!post.image && (
                      <img
                        src={placeholder}
                        style={{ width: 300, height: 250 }}
                        alt="location image"
                      />
                    )}
                    <p>{post.description}</p>
                    <StarRating rating={post.rating} />
                    <TravelPostDetails id={post.id}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Profile, "app__profile"),
  "profile",
  "app__whitebg"
);
