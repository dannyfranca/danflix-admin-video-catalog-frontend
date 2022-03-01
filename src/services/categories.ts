import { categoriesMock } from "@/mock/categories";
import { useMockData } from "@/config/app";
import categoryHttp from "@/util/http/category-http";
import { Category } from "@/util/models";

export const listCategories = async () => {
  if (useMockData) return { data: categoriesMock };
  return categoryHttp.list();
};

export const createCategory = async (data: Category) => {
  if (useMockData) return { data: categoriesMock[0] };
  return categoryHttp.create(data);
};
