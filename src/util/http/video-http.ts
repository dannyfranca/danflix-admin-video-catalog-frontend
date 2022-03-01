import { Video } from "../models";
import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const videoHttp = new HttpResource<Video>(httpClient, "videos");

export default videoHttp;
