import * as React from "react";
import { useState} from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./Navigation.scss";
import { getPosts } from "../../services/postsServices";
import { useGlobalState } from "../../utils/stateContext";


const Navigation = () => {
	const location = useLocation();
	const { store, dispatch} = useGlobalState();
	const { loggedInUser } = store;
	const [toggle, setToggle] = useState(false);

	// Get posts upon initial render
	React.useEffect(
		displayPosts(location, dispatch) 
		, 
		[]
	  ) 
	//   Trigger Re-render if location path changes 
	  React.useEffect(
		displayPosts(location, dispatch) 
		, 
		[location]
	  ) 
	return (
    // Main Navbar 
	  <nav className="app__navbar">
			<div className="app__navbar-logo">
			</div>
			<ul className="app__navbar-links">
				{["home", "explore", "travels", "profile"].map((item) => (
					<li className="app__flex p-text" key={`link-${item}`}>
						<div />
						<a href={`#${item}`}>{item} </a>
					</li>
				))}
				{/* If a user is logged then render "Log Out, otherwise render "Log in" */}
				{loggedInUser? <><li className="app__flex p-text"><div /><a href={`#login`}>Log Out</a></li></>:<><li className="app__flex p-text"><div /><a href={`#login`}>Log In</a></li></>}
			</ul>

      {/* Hamburger Menu */}
			<div className="app__navbar-menu">
				<HiMenuAlt4 onClick={() => setToggle(true)} />

				{toggle && (
					<motion.div
						whileInView={{ x: [300, 0] }}
						transition={{ duration: 0.45, ease: "easeOut" }}
					>
						<HiX onClick={() => setToggle(false)} />
						<ul>
							{["home", "explore", "travels", "profile", sessionStorage.getItem("user") || "login"].map(
								(item) => (
									<li key={item}>
										<a
											href={`#${item}`}
											onClick={() => setToggle(false)}
										>
											{item}
										</a>
									</li>
								)
							)}
						</ul>
					</motion.div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;

// Fetches posts from database and sets the values in the reducer Store
const displayPosts = (location, dispatch) => {
	return () => {
		if (location.hash == ("") || location.hash.includes("#")){
			getPosts()
			.then(posts => {
				dispatch({
					type: "setPostsList",
					data: posts
				})
				dispatch({
					type: "postLoading",
					data: false
				})
				dispatch({
					type: "setError",
					data: false
				})
			})
			.catch(error => {
				console.log(error)
				dispatch({
					type: "setError",
					data: error.message
				})
			})
		}
	}
}