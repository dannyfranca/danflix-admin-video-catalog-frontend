import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const categoryHttp = new HttpResource(httpClient, "categories");

export default categoryHttp;
