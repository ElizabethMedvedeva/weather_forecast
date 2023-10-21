import axios from "axios";

export const axiosApiInstanceMeteo = axios.create({
  baseURL: "https://api.open-meteo.com",
  //baseURL: "http://localhost:8000",
});

export const axiosApiInstanceGeo = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com",
});

