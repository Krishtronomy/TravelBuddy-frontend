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
        default: return state
    }

}