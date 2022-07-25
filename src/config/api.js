import axios from 'axios'

const postAPI = axios.create({
    baseURL: 'http://localhost:3050'
})

postAPI.interceptors.request.use((request) => {
    const token = sessionStorage.getItem('token')
    console.log(sessionStorage)
    if(token) {
        request.headers["Authorization"] = `Bearer ${token}`
    }
    return request
})

export default postAPI