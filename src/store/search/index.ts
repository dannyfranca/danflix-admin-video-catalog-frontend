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

export const INITIAL_STATE: Typings.SearchState = {
  search: null,
  total: 0,
  page: 1,
  page_size: 10,
  sort_by: null,
  sort_dir: null,
};

export const reducer = createReducer<
  Typings.SearchState,
  Typings.SearchActionUnion
>(INITIAL_STATE, {
  [Types.SET_SEARCH]: setSearch,
  [Types.SET_PAGE]: setPage,
  [Types.SET_PAGE_SIZE]: setPageSize,
  [Types.SET_ORDER]: setOrder,
  [Types.SET_RESET]: setOrder,
});

export default reducer;

function setSearch(
  state = INITIAL_STATE,
  action: Typings.SetSearchAction
): Typings.SearchState {
  return {
    ...state,
    search: action.payload.search ?? "",
    page: 1,
  };
}

function setPage(
  state = INITIAL_STATE,
  action: Typings.SetPageAction
): Typings.SearchState {
  return { ...state, page: action.page };
}

function setPageSize(
  state = INITIAL_STATE,
  action: Typings.SetPageSizeAction
): Typings.SearchState {
  return {
    ...state,
    page_size: action.page_size,
  };
}

function setOrder(
  state = INITIAL_STATE,
  action: Typings.SetOrderAction
): Typings.SearchState {
  return {
    ...state,
    sort_by: action.sort_by,
    sort_dir: action.sort_dir ?? null,
  };
}

function setReset(state = INITIAL_STATE): Typings.SearchState {
  return { ...INITIAL_STATE, search: { value: null, update: true } };
}
