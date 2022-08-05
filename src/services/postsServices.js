import postAPI from "../config/api";

// Fetches all posts
export async function getPosts(){
    const response = await postAPI.get('/posts')
    return response.data
}
