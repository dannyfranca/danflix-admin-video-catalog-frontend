import { FunctionComponent } from "react";
import { RouteProps } from "react-router-dom";
import CategoryList from "../pages/category/CategoryList";
import Dashboard from "../pages/Dashboard";

interface AppRouteProps extends RouteProps{
  name: string
  label: string
  component: FunctionComponent
  exact?: boolean
}

const routes: AppRouteProps[] = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    path: '/',
    component: Dashboard,
    exact: true 
  },
  {
    name: 'categories.list',
    label: 'Lista de Categorias',
    path: '/categories',
    component: CategoryList,
    exact: true 
  },
]

export default routes
