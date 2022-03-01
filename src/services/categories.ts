import { categoriesMock } from "@/mock/categories";
import { httpClient } from "@/util/http";
import { useMockData } from "@/config/app";
import { Category } from "@/entities/category";

export const listCategories = async (): Promise<Category[]> => {
  if (useMockData) return categoriesMock;
  return httpClient.get("categories", {});
};
