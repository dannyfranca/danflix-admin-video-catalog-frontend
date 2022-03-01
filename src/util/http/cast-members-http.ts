import { CastMember } from "../models";
import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const castMemberHttp = new HttpResource<CastMember>(httpClient, "cast-members");

export default castMemberHttp;
