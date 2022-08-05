import React, { useEffect, useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Profile.scss";
import { useGlobalState } from "../../utils/stateContext";
import postAPI from "../../config/api";
import placeholder from "./profile-placeholder.png";
import postPlaceholder from "../Travels/placeholder.jpg";
import { StarRating } from "../Travels/StarRating";
import TravelPostDetails from "../Travels/TravelPostDetails";
import Button from "@mui/material/Button";

const theme = {
  spacing: 8,
};

const Profile = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, token, id, imageUrl, about, postsList, loading } =
    store;
// Set initial form state
  const initialFormState = {
    username: loggedInUser,
    about: about,
  };
// Set initial success state
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
    console.log({ image: event.target.files[0] });
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
      <div className="head-text">Profile page</div>
      {!loggedInUser && (
        <div className="create">
          <h3>Please login or sign up first to view profile</h3>
          <a href="#login">Login</a>
        </div>
      )}
      {loggedInUser && (
        <div className="flex-container">
          <div className="profile__container">
            <div className="head-text">{loggedInUser}</div>
            {loggedInUser && (
              <>
                <div className="create">
                  {(imageUrl == null || imageUrl == "null") && (
                    <img
                      src={placeholder}
                      className="profile-pic"
                      alt="profile image"
                    />
                  )}
                  {imageUrl && imageUrl != "null" && (
                    <img
                      src={imageUrl}
                      className="profile-pic"
                      alt="profile image"
                    />
                  )}

                  <div>
                    <Button
                      id="imageChange"
                      variant="contained"
                      color="primary"
                      onClick={triggerImageChange}
                      sx={{ m: 2 }}
                    >
                      Change Profile Photo
                    </Button>
                    {changeImage && (
                      <form id="userImage" onSubmit={handleImageSubmit}>
                        <input
                          className="file"
                          type="file"
                          accept="image/*"
                          multiple={false}
                          onChange={handleImageChange}
                        />

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setChangeImage(false)}
                          sx={{ m: 2 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          form="userImage"
                          variant="contained"
                          color="primary"
                          sx={{ m: 2 }}
                        >
                          Upload!
                        </Button>
                      </form>
                    )}
                  </div>
                  <div className="about-section">
                    <div className="head-text">About</div>
                    <p className="about-section-text">{about}</p>
                    {!edit && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={editClick}
                        sx={{ m: 2 }}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
                <div className="about-section">
                  {edit && (
                    <form
                      id="userForm"
                      className="create"
                      onSubmit={handleEditSubmit}
                    >
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
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setEdit(false)}
                        sx={{ m: 2 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        form="userForm"
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ m: 2 }}
                      >
                        Update
                      </Button>
                    </form>
                  )}
                  {successfulEdit.success && (
                    <p>{successfulEdit.successMessage}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="post__container">
            <div className="head-text">My Posts</div>
            <div>{error && error}</div>
            {loading && <div> Loading... </div>}
            {usersPosts && (
              <div className="post__container-content">
                {usersPosts.map((post) => (
                  <div className="blogPost" key={post.id}>
                    <div className="BlogDetails">
                      <h2>{post.title}</h2>
                      {/* If a post has a image then render the URL for the image */}
                      {post.image && (
                        <img
                          src={post.image.url}
                          style={{
                            width: 300,
                            height: 250,
                          }}
                          alt="location image"
                        />
                      )}
                      {/* Else if a post has no image then render a placeholder image */}
                      {!post.image && (
                        <img
                          src={postPlaceholder}
                          style={{
                            width: 300,
                            height: 250,
                          }}
                          alt="location image"
                        />
                      )}
                      <p>{post.description}</p>
                      <StarRating rating={post.rating} />
                      <TravelPostDetails id={post.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
