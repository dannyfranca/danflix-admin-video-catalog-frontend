import { categoriesMock } from "@/mock/categories";
import { useMockData } from "@/config/app";
import categoryHttp from "@/util/http/category-http";
import { Category } from "@/util/models";

export const listCategories = async (): Promise<Partial<Category>[]> => {
  if (useMockData) return categoriesMock;
  return categoryHttp.list().then((r) => r.data);
};
