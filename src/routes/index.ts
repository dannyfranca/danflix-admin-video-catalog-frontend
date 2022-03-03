import { FunctionComponent } from "react";
import { RouteProps } from "react-router-dom";

import PageList from "@/pages/category/PageList";
import Dashboard from "@/pages/Dashboard";
import i18next from "@/i18t";
import PageCategoryForm from "@/pages/category/PageCategoryForm";

export interface AppRouteProps extends RouteProps {
  name: string;
  label: string;
  component: FunctionComponent;
  exact?: boolean;
}

const routes: AppRouteProps[] = [
  {
    name: "dashboard",
    label: i18next.t("Dashboard"),
    path: "/",
    component: Dashboard,
    exact: true,
  },
  {
    name: "categories.list",
    label: i18next.t("Category List"),
    path: "/categories",
    component: PageList,
    exact: true,
  },
  {
    name: "categories.create",
    label: i18next.t("Create Category"),
    path: "/categories/create",
    component: PageCategoryForm,
    exact: true,
  },
  {
    name: "categories.edit",
    label: i18next.t("Edit Category"),
    path: "/categories/:id/edit",
    component: PageCategoryForm,
    exact: true,
  },
];

export default routes;
