import * as React from "react";
import { useState} from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";
import "./Navigation.scss";
import logo from "../../assets/logo.png"

// const Navigation = () => {
//   return (
//     <>
//       <AppBar position="sticky">
//         <Toolbar>
//           <ul>
//             <li>
//               <Link to="pages/home">Home</Link>
//             </li>
//             <li>
//               <Link to="pages/explore">Explore</Link>
//             </li>
//             <li>
//               <Link to="pages/travels">Travels</Link>
//             </li>
//             <li>
//               <Link to="pages/profile">Profile</Link>
//             </li>
//             <li>
//               <Link to="pages/login">Login/Sign Out</Link>
//             </li>
//           </ul>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };

const Navigation = () => {
	const [toggle, setToggle] = useState(false);
	return (
    // Main Navbar 
	  <nav className="app__navbar">
			<div className="app__navbar-logo">
				<img src={logo} alt="logo" />
			</div>
			<ul className="app__navbar-links">
				{["home", "explore", "travels", "profile", sessionStorage.getItem("user") || "login" ].map((item) => (
					<li className="app__flex p-text" key={`link-${item}`}>
						<div />
						<a href={`#${item}`}>{item} </a>
					</li>
				))}
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
