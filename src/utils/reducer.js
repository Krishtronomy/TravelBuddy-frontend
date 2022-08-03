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
            //updates the value for Posts
            return {
                ...state,
                postsList: action.data 
            }
        }
        case "addPost": {
            //updates the value for Posts
            return {
                ...state,
                postsList: [action.data, ...state.postsList ]
            }
        }
        case "postLoading": {
            //updates the value for Posts
            return {
                ...state,
                loading: action.data
            }
        }
        case "setError": {
            //updates the value for Posts
            return {
                ...state,
                error: action.data
            }
        }
        default: return state
    }

}