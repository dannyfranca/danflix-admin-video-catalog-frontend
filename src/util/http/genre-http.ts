import { Genre } from "../models";
import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const genreHttp = new HttpResource<Genre>(httpClient, "genres");

export default genreHttp;
