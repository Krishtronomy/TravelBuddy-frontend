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

	return (
		<>
            <BackgroundBlobRight />
            <BackgroundBlobLeft />
            <WindupChildren>
                <div className="content-box-left">
                    <span><Pace ms={35}>{"Where do you want to eat? 🍽"}</Pace></span>
                </div>
                <div className="content-box-right">
                    <span><Pace ms={35}>{"Where should we stay on our trip? 🏖"}</Pace></span>
                </div>
                <div className="content-box-left">
                    <span><Pace ms={35}>{"What attractions can we visit nearby? 🎟"}</Pace></span>
                </div>
                <Box sx={{ m: 8 }}>
                <Button className="button" variant="contained" color="primary" href="#explore" style={{ fontSize: '40px' }}>
                    Let's Go!
                </Button>
                </Box>

            </WindupChildren>
		</>
	)
};

export default AppWrap(MotionWrap(Home, "app__home"), "home", "app__primarybg");
