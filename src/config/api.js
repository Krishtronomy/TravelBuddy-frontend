import axios from 'axios'

const postAPI = axios.create({
    baseURL: 'http://localhost:3050'
})

export default postAPI