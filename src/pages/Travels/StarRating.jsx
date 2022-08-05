import { Stack, Rating } from "@mui/material";
import { useEffect, useState } from "react";

export const StarRating = ({ rating }) => {
	const [value, setValue] = useState(rating);

	// Gets rating passed down as a prop from Travels and sets the rating accordingly
	useEffect(() => {
		setValue(rating);
	}, []);

	return (
		<Stack spacing={2}>
			<Rating
				value={value}
				precision={0.5}
				style={{ color: "black" }}
				readOnly
			/>
		</Stack>
	);
};
