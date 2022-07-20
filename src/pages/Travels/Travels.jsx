import React, { useState } from 'react';
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import NewPost from './NewPost';

const Travels = () => {
  const [posts, setPosts] = useState([
    {title: "My first post", description: "check out this post", id: 1},
    {title: "Hey fam", description: "cool stuff going on", id: 2},
    {title: "Hey again homies", description: "new udpates coming soon", id: 3}
  ])
  return (
    <>
      <h1>Travels page</h1>
      <NewPost/>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(Travels, "travels");
