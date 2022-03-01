import { FunctionComponent } from "react";
import { RouteProps } from "react-router-dom";
import PageList from "../pages/category/PageList";
import Dashboard from "../pages/Dashboard";

interface AppRouteProps extends RouteProps {
  name: string;
  label: string;
  component: FunctionComponent;
  exact?: boolean;
}

const routes: AppRouteProps[] = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/",
    component: Dashboard,
    exact: true,
  },
  {
    name: "categories.list",
    label: "Lista de Categorias",
    path: "/categories",
    component: PageList,
    exact: true,
  },
  {
    name: "categories.create",
    label: "Criar Categoria",
    path: "/categories/create",
    component: PageList,
    exact: true,
  },
  {
    name: "categories.edit",
    label: "Editar Categoria",
    path: "/categories/:id/edit",
    component: PageList,
    exact: true,
  },
];

export default routes;
