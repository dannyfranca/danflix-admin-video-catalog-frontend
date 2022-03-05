import { categoriesMock } from "@/mock/categories";
import { useMockData } from "@/config/app";
import categoryHttp from "@/util/http/category-http";
import { Category } from "@/util/models";
import {
  makeCreateMock,
  makeGetMock,
  makeListMock,
  makeUpdateMock,
} from "@/mock/methods";
import {
  CreateService,
  GetService,
  ListService,
  UpdateService,
} from "./helpers";

export const getCategory: GetService<Category> = async (id) => {
  if (useMockData) return makeGetMock(categoriesMock)(id);
  return categoryHttp.get(id);
};

export const listCategories: ListService<Category> = async (options) => {
  if (useMockData) return makeListMock(categoriesMock)();
  return categoryHttp.list(options);
};

export const createCategory: CreateService<Category> = async (data) => {
  if (useMockData) return makeCreateMock(categoriesMock)(data);
  return categoryHttp.create(data);
};

export const updateCategory: UpdateService<Category> = async (id, data) => {
  if (useMockData) return makeUpdateMock(categoriesMock)(id, data);
  return categoryHttp.update(id, data);
};
