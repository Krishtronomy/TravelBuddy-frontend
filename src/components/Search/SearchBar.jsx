import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Box, alpha, InputAdornment, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";

import useStyles from "./styles";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		display: "flex",
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
});

class OutlinedTextFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
	  }

	handleOnChange = (event) => {
		console.log("Click");
		console.log(event.target.value);
		const userInput = event.target.value;
		this.setState(
			{
				buffer: userInput,
			},
			() => {
				console.log("Inside OutlinedTextFields state:", this.state);
			}
		);
	};

	handleOnSave = event => {
		event.preventDefault();
		this.props.onSave(this.state.buffer);
		this.setState({ buffer: '' });
	  };

	render() {
		const { classes } = this.props;
		const { buffer } = this.state;

		return (
			<form className={classes.container} noValidate autoComplete="off">
				<Box
					sx={{
						width: 500,
						maxWidth: "100%",
					}}
				>
					<Autocomplete>
						<div className={classes.search}>
							<div>
								<TextField
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										),
									}}
									id="outlined-editToDO"
									defaultValue={this.props.defaultToDoValue}
									className={classes.textField}
									margin="normal"
									variant="outlined"
									onChange={this.handleOnChange}
								/>
								<Button
									onClick={this.handleOnSave}
									variant="outlined"
									href="#outlined-buttons"
								>
									Search
								</Button>
							</div>
						</div>
					</Autocomplete>
				</Box>
			</form>
		);
	}
}

OutlinedTextFields.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);

// export const userInput = [];

// const onChange = (event) => {
// 	const userInputNew = new Array(event.target.value);
// 	userInput.splice(0, 1, userInputNew);
// 	console.log(userInput[0]);
// };

// const SearchBar = ({ onPlaceChanged, onLoad }) => {
// 	const classes = useStyles();

// 	return (
// 		<AppBar position="static">
// 			<Toolbar className={classes.toolbar}>
// 				<Box display="flex">
// 					<Typography
// 						variant="h6"
// 						className={classes.title}
// 					></Typography>
// 					<Autocomplete
// 						onLoad={onLoad}
// 						onPlaceChanged={onPlaceChanged}
// 					>
// 						<div className={classes.search}>
// 							<div className={classes.searchIcon}>
// 								<SearchIcon />
// 							</div>
// 							<InputBase
// 								placeholder="Search ... "
// 								classes={{
// 									root: classes.inputRoot,
// 									input: classes.inputInput,
// 								}}
// 								onChange={onChange}
// 							/>
// 						</div>
// 					</Autocomplete>
// 				</Box>
// 			</Toolbar>
// 		</AppBar>
// 	);
// };

// export default SearchBar;
