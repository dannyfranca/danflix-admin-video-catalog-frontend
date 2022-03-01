import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.PUBLIC_URL,
});
