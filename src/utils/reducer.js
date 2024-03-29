export const reducer = (state, action) => {

    switch(action.type){

        case "setLoggedInUser": {
            //updates the loggedInUser value
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setToken": {
            //updates the token value
            return {
                ...state,
                token: action.data
            }
        }
        case "setID": {
            //updates the ID value
            return {
                ...state,
                id: action.data
            }
        }
        case "setAbout": {
            //updates the About value
            return {
                ...state,
                about: action.data
            }
        }
        case "setImage": {
            //updates the Image value
            return {
                ...state,
                imageUrl: action.data
            }
        }
        case "setPostsList": {
            //updates the value for PostsList
            return {
                ...state,
                postsList: action.data 
            }
        }
        case "addPost": {
            //adds new post 
            return {
                ...state,
                postsList: [...state.postsList, action.data]
            }
        }
        case "postLoading": {
            //sets the Loading status for posts
            return {
                ...state,
                loading: action.data
            }
        }
        case "setError": {
            //sets Error for posts
            return {
                ...state,
                error: action.data
            }
        }
        case "removePost": {
            //filters posts based on removed ID's
            return {
                ...state,
                postsList: state.postsList.filter((item) => item.id !== action.data)
            }
        }
        case "setRating": {
            //filters posts based on removed ID's
            return {
                ...state,
                rating: action.data
            }
        }
        default: return state
    }

}