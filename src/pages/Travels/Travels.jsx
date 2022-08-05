import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import NewPost from "./NewPost";
import { Link, useNavigate } from "react-router-dom";
import placeholder from "./placeholder.jpg";
import { useGlobalState } from "../../utils/stateContext";
import { StarRating } from "./StarRating";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TravelPostDetails from "./TravelPostDetails";

const Travels = () => {
  const { store, dispatch } = useGlobalState();
  const { postsList, loading, error } = store;
  const { loggedInUser } = store;

  return (
    <>
      <h1>Travels page</h1>
      {loggedInUser && (
      <div className="buttonDiv">
        <NewPost />
      </div>
      )}
      {!loggedInUser && (
      <div className="create">
        <h3>Please login or sign up first to create posts</h3>
        <a href="#login">Login</a>
      </div>
      )}

      <div>
        <div>{error && error}</div>
        {loading && <div> Loading... </div>}
        {postsList && (
          <div>
            {postsList.map((post) => (
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
                  {/* </Link> */}
                    <TravelPostDetails />
                  <StarRating rating={post.rating}/>
                </div>
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
