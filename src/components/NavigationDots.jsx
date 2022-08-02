import React from "react";

//Create NavDot component

const NavigationDots = ({ active }) => (
	<div className="app__navigation">
		{["home", "explore", "travels", "profile", "login"].map(
			(item, index) => (
				<a
					href={`#${item}`}
					key={item + index}
					className="app__navigation-dot"
					style={
						active === item ? { backgroundColor: "#313BAC" } : {}
					}
				/>
			)
		)}
	</div>
);

export default NavigationDots;
