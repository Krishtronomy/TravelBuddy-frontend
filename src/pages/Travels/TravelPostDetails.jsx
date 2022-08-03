import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/stateContext";
import placeholder from "./placeholder.jpg";
import postAPI from "../../config/api";

const TravelPostDetails = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const { id } = useParams();
  const navigate = useNavigate()
  const [post, setPost] = useState([]);
  const [date, setDate] = useState();
  const [triggerDelete, setTriggerDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const getPost = () => {
    postAPI.get(`/posts/${id}`).then((response) => {
      console.log(response);
      setPost(response.data);
      setDate(
        new Date(post.posted).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
    });
  };
  useEffect(() => {
    getPost();
  }, [id]);

  const handleDelete = () => {
    setTriggerDelete(true);
    if (triggerDelete){
      postAPI.delete(`/posts/${id}`)
      .then((response) => {
        console.log(response)
        setTriggerDelete(false)
        setDeleteSuccess("Post successfully deleted!")
        navigate("/")
      })
    }
  };

  return (
    <>
      <div className="create">
        {deleteSuccess && <p>{deleteSuccess}</p>}
        <h1>{post.title} </h1>
        {!post.image && <img src={placeholder} />}
        {post.image && <img src={post.image} />}
        <h2>Description:</h2>
        <h3>{post.description}</h3>
        <h5>Created:</h5>
        <p>{date}</p>
        {post.author == loggedInUser && (
          <div>
            <button>Edit</button>
            <button onClick={() => setTriggerDelete(true)}>Delete</button>
            {triggerDelete && (
              <div>
                <p>Are you sure you want to delete this?</p>
                <button onClick={() => setTriggerDelete(false)}>Cancel</button>
                <button onClick={handleDelete}>Yes</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TravelPostDetails;
