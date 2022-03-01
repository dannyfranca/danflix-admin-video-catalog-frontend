import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const genreHttp = new HttpResource(httpClient, "genres");

export default genreHttp;
