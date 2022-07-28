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
import axios from "axios";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage({image: event.target.files[0]})
  }

  const config = {     
    headers: { 'Content-Type': 'multipart/form-data' }
}


  //   Submit new post
  const handleSubmit = (event) => {
    event.preventDefault();
    // const post = { title, description };
    const formData = new FormData()
    formData.append('post[title]', title)
    formData.append('post[description]', description)
    formData.append('post[image]', image.image)
    setIsLoading(true);
    // postAPI.post("/create", post);
    postAPI.post("/create", formData, config);
    
    setIsLoading(false);
    cleanForm()
    // navigate("/");
  
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
          <input className="file" type="file" accept="image/*" multiple={false} onChange={handleImageChange}/>
          {!isLoading && <button >Submit</button>}
          {isLoading && <button disabled>Submitting Post...</button>}
        </form>
      </div>

    </>
  );
};

export default NewPost;
