import React from "react";
import { motion } from "framer-motion";

// Create MotionWrapper; ensures smooth animations on each component. Also ensures animations play on component reload
const MotionWrap = (Component, classNames) =>
	function HOC() {
		return (
			<motion.div
				whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
				transition={{ duration: 0.5 }}
				className={`${classNames} app__flex`}
			>
				<Component />
			</motion.div>
		);
	};

export default MotionWrap;
