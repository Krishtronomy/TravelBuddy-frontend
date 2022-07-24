import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import postAPI from "../../config/api";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  //   Submit new post
  const handleSubmit = (event) => {
    event.preventDefault();
    const post = { title, description };
    setIsLoading(true);
    postAPI.post("/create", post);
    setIsLoading(false);
    cleanForm()
    navigate("/");
  };

// Clean form after submitting
const cleanForm = () => {
    setTitle("")
    setDescription("")
}

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
          <textarea required value={description} onChange={handleDescriptionChange}></textarea>
          <label>Add Image:</label>
          <input className="file" type="file" />
          {!isLoading && <button >Submit</button>}
          {isLoading && <button disabled>Submitting Post...</button>}
        </form>
      </div>

    </>
  );
};

export default NewPost;
