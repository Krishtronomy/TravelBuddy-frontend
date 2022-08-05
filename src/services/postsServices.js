import postAPI from "../config/api";

export async function getPosts(){
    const response = await postAPI.get('/posts')
    return response.data
}

export async function createPost(data){
    const response = await postAPI.post('/create')
    return response.data
}