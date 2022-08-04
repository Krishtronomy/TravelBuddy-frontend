import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/stateContext";
import placeholder from "./placeholder.jpg";
import postAPI from "../../config/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
	position: "absolute",
  overflow:'scroll',
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const TravelPostDetails = () => {
	const { store, dispatch } = useGlobalState();
	const { loggedInUser } = store;
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState([]);
	const [date, setDate] = useState();
	const [triggerDelete, setTriggerDelete] = useState(false);
	const [deleteSuccess, setDeleteSuccess] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editSuccess, setEditSuccess] = useState(false);
	const [editForm, setEditForm] = useState({
		title: "",
		description: "",
	});

	// Gets the post based on post id
	const getPost = () => {
		postAPI.get(`/posts/${id}`).then((response) => {
			setPost(response.data);
			setDate(
				new Date(response.data.posted).toLocaleDateString("en-us", {
					weekday: "long",
					year: "numeric",
					month: "short",
					day: "numeric",
				})
			);
		});
	};
	console.log(post.rating); // Re-renders if the post id changes
	useEffect(() => {
		getPost();
	}, [id, editSuccess]);

	// Handles deleting a post
	const handleDelete = () => {
		setTriggerDelete(true);
		if (triggerDelete) {
			postAPI.delete(`/posts/${id}`).then((response) => {
				console.log(response);
				setTriggerDelete(false);
				setDeleteSuccess("Post successfully deleted!");
				navigate("/#travels");
			});
		}
	};

	const editClick = (event) => {
		event.preventDefault();
		setEdit(true);
		setEditForm({
			title: post.title,
			description: post.description,
		});
	};

	const handleFormChange = (event) => {
		setEditForm({
			...editForm,
			[event.target.id]: event.target.value,
		});
	};
	const handleEditSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("post[title]", editForm.title);
		formData.append("post[description]", editForm.description);
		postAPI
			.put(`/posts/${id}`, formData)
			.then((response) => {
				setEditForm({
					title: editForm.title,
					description: editForm.description,
				});
				setEditSuccess("Successfully Updated!");
				setEdit(false);
			})
			.catch((error) => {
				console.log(error.response.data.error);
			});
		setEditSuccess(false);
	};

	// // Set Modal state
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
          disableScrollLock
				>
					<Box sx={style}>
					  <div className="create">
							{deleteSuccess && <p>{deleteSuccess}</p>}
							<h1>{post.title} </h1>
							{!post.image && <img src={placeholder} width="400" height="400"/>}
							{post.image && <img src={post.image} width="400" height="400"/>}
							<h2>Description:</h2>
							<h3>{post.description}</h3>
							<h5>Created by:</h5>
							<b>{post.author}</b>
							<p>{date}</p>
							{post.author == loggedInUser && (
								<div>
									<button onClick={editClick}>Edit</button>
									<button
										onClick={() => setTriggerDelete(true)}
									>
										Delete
									</button>
									{edit && (
										<form
											form="editform"
											className="create"
											onSubmit={handleEditSubmit}
										>
											<label>Title:</label>
											<input
												type="text"
												id="title"
												value={editForm.title}
												onChange={handleFormChange}
											/>
											<label>Description:</label>
											<textarea
												type="text"
												id="description"
												value={editForm.description}
												onChange={handleFormChange}
											/>
											<button
												onClick={() => setEdit(false)}
											>
												Cancel
											</button>
											<button>Update</button>
										</form>
									)}
									{triggerDelete && (
										<div>
											<p>
												Are you sure you want to delete
												this?
											</p>
											<button
												onClick={() =>
													setTriggerDelete(false)
												}
											>
												Cancel
											</button>
											<button onClick={handleDelete}>
												Yes
											</button>
										</div>
									)}
								</div>
							)}
						</div>
					</Box>
				</Modal>
			</div>

      <div className="buttonDiv">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          See More
        </Button>
      </div>
		</>
	);
};

export default TravelPostDetails;
