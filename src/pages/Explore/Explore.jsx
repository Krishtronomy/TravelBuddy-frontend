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
			<h1>Explore page</h1>
		</>
	);
};

export default AppWrap(Explore, "explore");
