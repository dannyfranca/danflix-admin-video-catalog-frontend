import { AnyAction } from "redux";

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
}

export interface Sort {
  sort_by: string | null;
  sort_dir: "asc" | "desc" | null;
}

export interface SearchState extends Pagination, Sort {
  search: string | null | { value: string | null; [k: string]: any };
}

export interface SetSearchAction extends AnyAction {
  payload: {
    search: SearchState["search"];
  };
}

export interface SetPageAction extends AnyAction {
  payload: {
    page: number;
  };
}

export interface SetPageSizeAction extends AnyAction {
  payload: {
    page_size: number;
  };
}

export interface SetOrderAction extends AnyAction {
  payload: {
    sort_by: string;
    sort_dir: string;
  };
}

export type SearchActionUnion =
  | SetSearchAction
  | SetPageAction
  | SetPageSizeAction
  | SetOrderAction;
