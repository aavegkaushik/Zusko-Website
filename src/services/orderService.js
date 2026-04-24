import axios from "axios";

const API = axios.create({
    baseURL: "https://zusko-server.onrender.com/api",
});

export const createOrder = (data) =>
    API.post("/orders/create", data);