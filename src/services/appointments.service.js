import axios from "axios";

const API_BASE = "http://localhost:5000";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "x-access-token": localStorage.getItem("token"),
  },
};

const getAppointments = () => {
  console.log(localStorage.getItem("token"));
  return axios.get(API_BASE + "/appointments", axiosConfig);
};

const AppointmentsService = {
  getAppointments,
};

export default AppointmentsService;
