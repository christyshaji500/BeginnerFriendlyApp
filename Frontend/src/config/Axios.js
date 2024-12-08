import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = process.env.REACT_APP_API_KEY ;
    const token = localStorage.getItem("token");

    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
 
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.log('error', error)
    
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Logging out the user...");
  
      localStorage.removeItem("jwt");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
