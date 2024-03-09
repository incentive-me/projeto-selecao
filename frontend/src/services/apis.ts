import axios from "axios";

const incentiveMeApi = axios.create({
  baseURL: "http://localhost:8080/",
});

const incentiveMeApiProtected = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export { incentiveMeApi, incentiveMeApiProtected };
