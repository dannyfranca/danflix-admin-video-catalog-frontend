import { createActions, createReducer } from "reduxsauce";

import * as Typings from "./types";

export const { Types, Creators } = createActions<
  {
    SET_SEARCH: string;
    SET_PAGE: string;
    SET_PAGE_SIZE: string;
    SET_ORDER: string;
    SET_RESET: string;
  },
  {
    setSearch(
      payload: Typings.SetSearchAction["payload"]
    ): Typings.SetSearchAction;
    setPage(payload: Typings.SetPageAction["payload"]): Typings.SetPageAction;
    setPageSize(
      payload: Typings.SetPageSizeAction["payload"]
    ): Typings.SetPageSizeAction;
    setOrder(
      payload: Typings.SetOrderAction["payload"]
    ): Typings.SetOrderAction;
    setReset(): Typings.SetOrderAction;
  }
>({
  setSearch: ["payload"],
  setPage: ["payload"],
  setPageSize: ["payload"],
  setOrder: ["payload"],
  setReset: [],
});

export const INITIAL_STATE: Typings.FilterState = {
  search: null,
  total: 0,
  page: 1,
  page_size: 10,
  sort_by: null,
  sort_dir: null,
};

export const reducer = createReducer<
  Typings.FilterState,
  Typings.FilterActionUnion
>(INITIAL_STATE, {
  [Types.SET_SEARCH]: setSearch,
  [Types.SET_PAGE]: setPage,
  [Types.SET_PAGE_SIZE]: setPageSize,
  [Types.SET_ORDER]: setOrder,
  [Types.SET_RESET]: setReset,
});

export default reducer;

function setSearch(
  state = INITIAL_STATE,
  action: Typings.SetSearchAction
): Typings.FilterState {
  return {
    ...state,
    search: action.payload.search ?? "",
    page: 1,
  };
}

function setPage(
  state = INITIAL_STATE,
  action: Typings.SetPageAction
): Typings.FilterState {
  return { ...state, page: action.payload.page };
}

function setPageSize(
  state = INITIAL_STATE,
  action: Typings.SetPageSizeAction
): Typings.FilterState {
  return {
    ...state,
    page_size: action.payload.page_size,
  };
}

function setOrder(
  state = INITIAL_STATE,
  action: Typings.SetOrderAction
): Typings.FilterState {
  return {
    ...state,
    sort_by: action.payload.sort_by,
    sort_dir: action.payload.sort_dir ?? null,
  };
}

function setReset(state = INITIAL_STATE): Typings.FilterState {
  return { ...INITIAL_STATE, search: { value: null, update: true } };
}
