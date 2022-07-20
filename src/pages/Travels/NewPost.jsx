import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const post = {title, description}
    
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
          <textarea required onChange={handleDescriptionChange}></textarea>
          <label>Add Image:</label>
          <input className="file" type="file" />
          <button>Submit</button>
        </form>
      </div>
      <h1>{title}</h1>
      {description}
    </>
  );
};

export default NewPost;
