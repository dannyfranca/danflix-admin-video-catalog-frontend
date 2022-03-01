import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const castMemberHttp = new HttpResource(httpClient, "cast-members");

export default castMemberHttp;
