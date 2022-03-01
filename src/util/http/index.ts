import axios from "axios";

export interface HttpClient {
  get: <T extends { [k: string]: any } = any, R = any>(
    path: string,
    data: T
  ) => Promise<R>;
  post: <T, R>(path: string, data: T) => Promise<R>;
}

const apiAxios = axios.create({
  baseURL: process.env.PUBLIC_URL,
});

export const httpClient: HttpClient = {
  get: <T, R>(path: string, data: T) =>
    apiAxios.get<R>(path, { params: data }).then((r) => r.data),
  post: <T, R>(path: string, data: T) =>
    apiAxios.get<R>(path, { data }).then((r) => r.data),
};
