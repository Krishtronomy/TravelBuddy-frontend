import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Stack, Rating } from "@mui/material";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Travels.scss";
import postAPI from "../../config/api";
import { StarRating } from "./StarRating";
import { useGlobalState } from "../../utils/stateContext";
import { createPost } from "../../services/postsServices";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();
  const [postRating, setPostRating] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage({ image: event.target.files[0] });
  };

  const handleRatingChange = (event ) => {
    setPostRating(parseInt(event.target.value))
  }

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  //   Submit new post
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[description]", description);
    if (image) {
      formData.append("post[image]", image.image);
    }
    formData.append("post[rating]", postRating);
    setIsLoading(true);
    postAPI.post("/create", formData, config).then((response) => {
      dispatch({
        type: "addPost",
        data: response.data,
      });
    });

    setIsLoading(false);
    cleanForm();
  };

  // Clean form after submitting
  const cleanForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setPostRating(null)
  };

  // // Set Modal state
  const [open, setOpen] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="create">
        <h2>Create Post</h2>
        <form id="newpostform" onSubmit={handleSubmit}>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Enter New Post Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label>Title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  style={{ width: "100%" }}
                />
                <label>Description:</label>
                <textarea
                  required
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{ width: "100%" }}
                ></textarea>
                <label>Add Image:</label>
                <input
                  className="file"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={handleImageChange}
                />
                <div style={{display:"flex", justifyContent:"center"}}>
                <Stack spacing={2}>
                  <Rating
                    value={postRating}
                    onChange={handleRatingChange}
                    precision={0.5}
                    style={{ color: "black"}}
                  />
                </Stack>
                </div>
                {!isLoading && <Button variant="outlined" style={{marginTop:"5%"}} form="newpostform" type="submit">Submit</Button>}
                {isLoading && <Button style={{marginTop:"5%"}} disabled>Submitting Post...</Button>}
              </Typography>
            </Box>
          </Modal>
          </div>
        </form>
      </div>

      <div>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpen}
				>
					Create New Post
				</Button>
			</div>

    </>
  );
};

export default NewPost;