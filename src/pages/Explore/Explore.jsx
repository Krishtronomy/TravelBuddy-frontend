import React from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { motion } from "framer-motion";

import Header from "../../components/Map/Header/Header";
import List from "../../components/Map/List/List";
import Map from "../../components/Map/Map/Map";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Explore.scss";

const Explore = () => {
	return (
		<>
			<>
				<CssBaseline />
				<Header />
				<Grid container spacing={3} style={{ width: '100%' }}>
					<Grid item xs={12} md={4}>
						<List />
					</Grid>
					<Grid item xs={12} md={8}>
						<Map />
					</Grid>
				</Grid>
			</>
		</>
	);
};

// class Explore extends React.Component {
//     render() {
//         return (
// 		<>
// 			<h1>Explore page</h1>
// 				<>
// 					<CssBaseline />
// 					<Header />
// 					<Grid container spacing={3} style={{ width: '100%' }}>
// 						<Grid item xs={12} md={4}>
// 							<List />
// 						</Grid>
// 						<Grid item xs={12} md={8}>
// 							<Map />
// 							<Header />
// 						</Grid>
// 					</Grid>
// 				</>
// 		</>
// 		);
// 	}
// }

export default AppWrap(
	MotionWrap(Explore, "app__explore"),
	"explore",
	"app__primarybg"
);
