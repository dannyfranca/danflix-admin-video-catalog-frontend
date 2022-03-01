import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const videoHttp = new HttpResource(httpClient, "videos");

export default videoHttp;
