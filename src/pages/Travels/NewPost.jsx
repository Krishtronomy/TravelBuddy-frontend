import React from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";

const NewPost = () => {
  return (
    <>
      <div className="create">
        <h1>Create Post</h1>
        <form>
          <label>Title:</label>
          <input type="text" required />
          <label>Description</label>
          <textarea required></textarea>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
