import { httpClient } from "../util/http/index";

export const listCategories = () => {
  return httpClient.get("categories", {});
};
