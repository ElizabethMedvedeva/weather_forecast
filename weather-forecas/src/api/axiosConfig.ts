import axios from "axios";

export const axiosApiInstanceMeteo = axios.create({
  baseURL: "https://api.open-meteo.com",
});

export const axiosApiInstanceGeo = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com",
});
s;

//// напримерь здесь, нажимаю fix all autofixable problems
