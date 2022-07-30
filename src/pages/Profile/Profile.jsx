import React, { useContext} from 'react';
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Profile.scss";
import App from '../../App';
import postAPI from '../../config/api';
import UserContext from '../../utils/UserContext';


const Profile = () => {
    const loggedInUser = useContext(UserContext)

    return (
        <>
            <h1>Profile page</h1>
            <h1>{loggedInUser.user}</h1>
            <h3>About</h3>
            <p>{loggedInUser.about}</p>
        </>
    )
}

export default AppWrap(Profile, "profile");