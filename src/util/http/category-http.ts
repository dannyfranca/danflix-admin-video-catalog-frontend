import { Category } from "../models";
import { httpClient } from "./http-client";
import HttpResource from "./http-resource";

const categoryHttp = new HttpResource<Category>(httpClient, "categories");

export default categoryHttp;
