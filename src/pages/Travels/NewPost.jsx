import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Stack, Rating } from "@mui/material";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import postAPI from "../../config/api";
import { StarRating } from "./StarRating";
import { useGlobalState } from "../../utils/stateContext";
import { createPost } from "../../services/postsServices";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();
  const [postRating, setPostRating] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage({ image: event.target.files[0] });
  };

  const handleRatingChange = (event ) => {
    setPostRating(parseInt(event.target.value))
  }

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  //   Submit new post
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[description]", description);
    if (image) {
      formData.append("post[image]", image.image);
    }
    formData.append("post[rating]", postRating);
    setIsLoading(true);
    postAPI.post("/create", formData, config).then((response) => {
      dispatch({
        type: "addPost",
        data: response.data,
      });
    });

    setIsLoading(false);
    cleanForm();
  };

  // Clean form after submitting
  const cleanForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setPostRating(null)
  };

  return (
    <>
      <div className="create">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={handleTitleChange}
          />
          <label>Description:</label>
          <textarea
            required
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <label>Add Image:</label>
          <input
            className="file"
            type="file"
            accept="image/*"
            multiple={false}
            onChange={handleImageChange}
          />
          <Stack spacing={2}>
            <Rating
              value={postRating}
              onChange={handleRatingChange}
              precision={0.5}
              style={{ color: "black", justifyContent:"center" }}
            />
          </Stack>
          {!isLoading && <button style={{marginTop:"5%"}}>Submit</button>}
          {isLoading && <button style={{marginTop:"5%"}} disabled>Submitting Post...</button>}
        </form>
      </div>
    </>
  );
};

export default NewPost;
