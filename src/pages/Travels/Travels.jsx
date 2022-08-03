import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import NewPost from "./NewPost";
import postAPI from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import placeholder from "./placeholder.jpg";
import { useGlobalState } from "../../utils/stateContext";

const Travels = () => {
  const { store, dispatch } = useGlobalState();
  const {postsList, loading, error} = store
 


  const deletePost = (id) => {
    postAPI.delete(`/posts/${id}`);
  };

  return (
    <>
      <h1>Travels page</h1>
      <NewPost />

      <div>
        <div>{error && error}</div>
        {loading && <div> Loading... </div>}
        {postsList && (
          <div>
        {postsList.map((post) => (
          <div className="blogPost" key={post.id}>
            <div className="BlogDetails">
              <Link to={`/posts/${post.id}`}>
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
              </Link>
            </div>

            {/* <button className="deleteButton" onClick={deletePost}>delete</button> */}
          </div>
        ))}
        </div>
        )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Travels, "app__travels"),
  "travels",
  "app__primarybg"
);
