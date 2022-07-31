import React, { useContext, useState} from 'react';
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Profile.scss";
import UserContext from '../../utils/UserContext';
import postAPI from '../../config/api';


const Profile = () => {
    const loggedInUser = useContext(UserContext)
    const initialFormState ={
        username: loggedInUser.user,
        about: loggedInUser.about
    }
    const successState = {
            success: null,
            successMessage: ""
    }
    const [editForm, setEditForm] = useState(initialFormState)
    const [edit, setEdit] = useState(false)
    const [successfulEdit, setSuccessfulEdit] = useState(successState)
    const [error, setError] = useState(null)
    const editClick= (event) => {
        event.preventDefault()
       setEdit(true)
    }
    const handleFormChange = (event) => {
        setEditForm({
            ...editForm,
            [event.target.id]: event.target.value
        })
    }

    const config = {
        headers: { Authorization: `Bearer ${loggedInUser.token}` }
    }

    const handleEditSubmit = (event) => {
        event.preventDefault()
        postAPI.put(`/user/${loggedInUser.id}/update`, editForm, config)
        .then((response) => {
            console.log(response)
            sessionStorage.setItem("user", editForm.username)
            sessionStorage.setItem("about", editForm.about)
            setSuccessfulEdit({
                success: true,
                successMessage: "Successfully updated!"
            })
            setEdit(false)
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
        }

    return (
        <>
            <h1>Profile page</h1>
            <h1>{loggedInUser.user}</h1>
            <h3>About</h3>
            <p>{loggedInUser.about}</p>
           {!edit && <button onClick={editClick}>Edit</button>}

            <div>
                {edit && (
                    <form className='create' onSubmit={handleEditSubmit}>
                        <label>Username:</label>
                        <input type="text" id="username" value={editForm.username} onChange={handleFormChange}/>
                        <label>About:</label>
                        <textarea type="text" id="about"value={editForm.about} onChange={handleFormChange}/>
                        <button>Update</button>
                    </form>
                )}
                {successfulEdit.success && <p>{successfulEdit.successMessage}</p>}
            </div>
        </>
    )
}

export default AppWrap(
	MotionWrap(Profile, "app__profile"),
	"profile",
	"app__primarybg"
);