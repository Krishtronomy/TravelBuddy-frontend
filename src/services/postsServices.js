import postAPI from "../config/api";

export async function getPosts(){
    const response = await postAPI.get('/posts')
    return response.data
}
