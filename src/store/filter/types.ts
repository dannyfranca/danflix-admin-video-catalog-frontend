export interface Pagination {
  page: number;
  page_size: number;
  total: number;
}

export interface Sort {
  sort_by: string | null;
  sort_dir: "asc" | "desc" | null;
}

export interface FilterState extends Pagination, Sort {
  search: string | null | { value: string | null; [k: string]: any };
}

export interface BaseAction<A = any, T = string> {
  type: T;
  payload: A;
}

export type SetSearchAction = BaseAction<{
  search: FilterState["search"];
}>;

export type SetPageAction = BaseAction<{
  page: number;
}>;

export type SetPageSizeAction = BaseAction<{
  page_size: number;
}>;

export type SetOrderAction = BaseAction<{
  sort_by: string;
  sort_dir: "asc" | "desc" | null;
}>;

export type FilterActionUnion =
  | SetSearchAction
  | SetPageAction
  | SetPageSizeAction
  | SetOrderAction;
