import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import NewPost from "./NewPost";
import postAPI from "../../config/api";
import { Link, useNavigate } from "react-router-dom";

const Travels = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const [error, setError] = useState(null);
  // const navigate  = useNavigate()

  // Fetch posts from backend API
  async function getPosts() {
    const response = await postAPI.get("/posts");
    if ((response.statusText = !"OK")) {
      throw Error("Could not fetch the data for that resource");
    }
    return response.data;
  }

  // Set post state
  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  const deletePost = (id) => {
    postAPI.delete(`/posts/${id}`);
  };

  return (
    <>
      <h1>Travels page</h1>
      <NewPost />

      <div>
        <div>{error && error}</div>
        {isLoading && <div> Loading... </div>}
        {posts.map((post) => (
          <div className="blogPost" key={post.id}>
            <div className="BlogDetails">
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </Link>
            </div>

            {/* <button className="deleteButton" onClick={deletePost}>delete</button> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(Travels, "travels");
