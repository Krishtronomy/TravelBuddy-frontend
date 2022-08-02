import React from "react";

import { Pace, WindupChildren } from "windups"; 
import { AppWrap, MotionWrap } from "../../wrapper";
import { Button, Box } from "@material-ui/core";
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

    const theme = {
        spacing: 8,
      }

	return (
		<>
            <BackgroundBlobRight />
            <BackgroundBlobLeft />
            <WindupChildren>
                <div className="content-box-left">
                    <span>{"Where do you want to eat? 🍽"}</span>
                </div>
                <div className="content-box-right">
                    <span>{"Where should we stay on our trip? 🏖"}</span>
                </div>
                <div className="content-box-left">
                    <span>{"What attractions can we visit nearby? 🎟"}</span>
                </div>
                <Box sx={{ m: 8 }}>
                <Button sx={{fontSize: 60}} variant="contained" size="large" href="#explore">
                    Let's Go!
                </Button>
                </Box>

            </WindupChildren>
		</>
	)
};

export default AppWrap(MotionWrap(Home, "app__home"), "home", "app__primarybg");
