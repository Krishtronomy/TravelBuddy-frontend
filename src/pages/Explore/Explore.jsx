import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "../../config/TravelApi";
import { motion } from "framer-motion";

import Header from "../../components/Map/Header/Header";
import List from "../../components/Map/List/List";
import Map from "../../components/Map/Map/Map";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Explore.scss";

const Explore = () => {
	const [places, setPlaces] = useState([]);
	
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState(null);

	// obtain initial location
	// useEffect(() => {
	// 	navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
	// 		setCoordinates({ lat: latitude, lng: longitude })
	// 	})
	// }, [])

	// obtain 
	useEffect(() => {
		console.log(coordinates, bounds);

		getPlacesData()
			.then((data) => {
				console.log(data)
				setPlaces(data);
			})
	}, [coordinates, bounds]);

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
						<Map 
							setCoordinates={setCoordinates}
							setBounds={setBounds}
							coordinates={coordinates}
						/>
					</Grid>
				</Grid>
			</>
		</>
	);
};

export default AppWrap(
	MotionWrap(Explore, "app__explore"),
	"explore",
	"app__primarybg"
);
