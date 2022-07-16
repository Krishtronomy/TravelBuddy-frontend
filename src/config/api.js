import axios from 'axios'

const postAPI = axios.create({
    baseURL: 'http://localhost:3000'
})

export default postAPI