import React from 'react';
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import NewPost from './NewPost';

const Travels = () => {
  return (
    <>
      <h1>Travels page</h1>
      <NewPost/>
    </>
  );
};

export default AppWrap(Travels, "travels");
