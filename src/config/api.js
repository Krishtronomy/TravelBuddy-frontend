import axios from "axios";

// Use axios to create API for backend
const postAPI = axios.create({
  baseURL: "http://localhost:3050",
});

// Use axios to insert jwt bearer token
postAPI.interceptors.request.use((request) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export default postAPI;
