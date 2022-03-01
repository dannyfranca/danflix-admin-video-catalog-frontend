import { categoriesMock } from "@/mock/categories";
import { useMockData } from "@/config/app";
import { Category } from "@/entities/category";
import categoryHttp from "@/util/http/category-http";

export const listCategories = async (): Promise<Category[]> => {
  if (useMockData) return categoriesMock;
  return categoryHttp.list().then((r) => r.data);
};
