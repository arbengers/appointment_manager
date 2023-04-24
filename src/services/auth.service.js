import axios from "axios";
import jwt_decode from "jwt-decode";

const API_BASE = "http://localhost:5000";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const register = (username, email, password) => {
  return axios.post(API_BASE + "/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(
      API_BASE + "/auth",
      {
        username,
        password,
      },
      axiosConfig
    )
    .then((response) => {
      if (response.data.token) {
        const decoded_token = jwt_decode(response.data.token);
        localStorage.setItem("user", decoded_token);
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_BASE + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return localStorage.getItem("user");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
