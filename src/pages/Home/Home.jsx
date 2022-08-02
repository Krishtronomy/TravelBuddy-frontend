import React, { useState, useEffect } from "react";
import { Blob } from "react-blob";
import { CssBaseline, Button } from "@material-ui/core";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Home.scss";

const Home = () => {
	return (
		<>
			<>
				<Button variant="contained" size="large" href="#explore">
					Get Started
				</Button>
			</>
		</>
	);
};

// const Home = () => {
// 	const [autocomplete, setAutocomplete] = useState(null);

// 	const onLoad = (autoC) => setAutocomplete(autoC);
// 	return (
// 		<>
// 			<h1>Home page</h1>
// 			<>
// 				<CssBaseline />
// 				<SearchBar onLoad={onLoad} />
// 			</>
// 		</>
// 	);
// };

export default AppWrap(MotionWrap(Home, "app__home"), "home", "app__whitebg");
