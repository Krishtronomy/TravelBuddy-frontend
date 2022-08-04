import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

const Header = ({ onPlaceChanged, onLoad }) => {
	const classes = useStyles();

	return (
		<AppBar style={{ zIndex: 1, opacity: 0.6 }} position="static">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5" className={classes.title}>
					TravelBuddy
				</Typography>
				<Box display="flex">
					<Typography
						variant="h6"
						className={classes.title}
					></Typography>
					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search ... "
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
						/>
					</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
