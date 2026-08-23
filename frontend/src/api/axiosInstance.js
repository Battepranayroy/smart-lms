import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: false, 
});

// Optional: Add interceptors (we will add later)
export default axiosInstance;
