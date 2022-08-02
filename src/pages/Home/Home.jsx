import React from "react";

import { AppWrap, MotionWrap } from "../../wrapper";
import { Button } from "@material-ui/core";
import "./Home.scss";

const Home = () => {
	return (
		<>
			<h1>Home page</h1>
			<Button variant="contained" size="large" href="#explore">
				Get Started
			</Button>
		</>
	);
};

export default AppWrap(MotionWrap(Home, "app__home"), "home", "app__whitebg");
