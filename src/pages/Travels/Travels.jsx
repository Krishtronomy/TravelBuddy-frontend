import React from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import NewPost from "./NewPost";
import placeholder from "./placeholder.jpg";
import { useGlobalState } from "../../utils/stateContext";
import { StarRating } from "./StarRating";
import TravelPostDetails from "./TravelPostDetails";

const Travels = () => {
	const { store} = useGlobalState();
	const { postsList, loading, error } = store;
	const { loggedInUser } = store;

	return (
		<>
			<div className="head-text">Travels page</div>
			{loggedInUser && (
				<div className="buttonDiv">
					<NewPost />
				</div>
			)}
			{!loggedInUser && (
				<div className="create">
					<h3>Please login or sign up first to create posts</h3>
					<a href="#login">Login</a>
				</div>
			)}

			<div className="post__container">
				<div>{error && error}</div>
				{loading && <div> Loading... </div>}
				{postsList && (
					<div className="post__container-content">
						{postsList.map((post) => (
							<div className="blogPost" key={post.id}>
								<div className="BlogDetails">
									<h2>{post.title}</h2>
									{/* If a post has a image then render the URL for the image */}
									{post.image && (
										<img
											src={post.image.url}
											style={{ width: 300, height: 250 }}
											alt="location image"
										/>
									)}
									{/* Else if a post has no image then render a placeholder image */}
									{!post.image && (
										<img
											src={placeholder}
											style={{ width: 300, height: 250 }}
											alt="location image"
										/>
									)}
									<p>{post.description}</p>
									<StarRating rating={post.rating} />
									<TravelPostDetails id={post.id} />
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default AppWrap(
	MotionWrap(Travels, "app__travels"),
	"travels",
	"app__primarybg"
);
