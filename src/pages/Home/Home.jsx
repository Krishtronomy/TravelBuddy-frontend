import React from "react";

import { AppWrap, MotionWrap } from "../../wrapper";
import { Button } from "@material-ui/core";
import { Blob } from "react-blob";
import "./Home.scss";

const Home = () => {
	const BackgroundBlobRight = ({ style, props }) => (
		<Blob
			size="100vh"
			style={{
				position: "absolute",
				top: "-15%",
				right: "-15%",
				zIndex: 1,
				backgroundColor: "#339BFF",
				color: "white",
				opacity: 0.35,
				fontSize: "50vh",
				...style,
			}}
			{...props}
		/>
	);

    const BackgroundBlobLeft = ({ style, props }) => (
		<Blob
			size="85vh"
			style={{
				position: "absolute",
				top: "5%",
				right: "65%",
				zIndex: "auto",
				backgroundColor: "#3360FF",
				color: "white",
				opacity: 0.35,
				fontSize: "50vh",
				...style,
			}}
			{...props}
		/>
	);

	return (
		<>
			<h1>Looking To Go Somewhere?</h1>
			<BackgroundBlobRight />
            <BackgroundBlobLeft />
			<Button variant="contained" size="large" href="#explore">
				Let's Go!
			</Button>
		</>
	);
};

export default AppWrap(MotionWrap(Home, "app__home"), "home", "app__whitebg");
