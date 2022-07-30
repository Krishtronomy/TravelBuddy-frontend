import React from 'react';
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Home.scss";
import Header from "../../components/Map/Header/Header";

const Home = () => {
    return (
        <>
            <h1>Home page</h1>
        </>
    )
}

export default AppWrap(
	MotionWrap(Home, "app__home"),
	"home",
	"app__whitebg"
);