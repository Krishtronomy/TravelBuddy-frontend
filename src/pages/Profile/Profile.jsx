import React from 'react';
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Profile.scss";

const Profile = () => {
    return (
        <>
            <h1>Profile page</h1>
        </>
    )
}

export default AppWrap(
	MotionWrap(Profile, "app__profile"),
	"profile",
	"app__primarybg"
);