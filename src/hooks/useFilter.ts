import { Dispatch, useReducer, useState } from "react";
import { MUIDataTableColumn } from "mui-datatables";
import { useDebounce } from "use-debounce";

import reducer, { INITIAL_STATE, Creators } from "@/store/filter";
import { FilterActionUnion, FilterState } from "@/store/filter/types";
import { useHistory } from "react-router-dom";

type History = ReturnType<typeof useHistory>;

interface UseFilterOptions {
  columns: MUIDataTableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  debounceTime?: number;
}

interface FilterManagerOptions extends Omit<UseFilterOptions, "debounceTime"> {
  history: History;
  state: FilterState;
  dispatch: Dispatch<FilterActionUnion>;
}

export default function useFilter(options: UseFilterOptions) {
  const history = useHistory();
  const [filterState, dispatchFilterState] = useReducer(reducer, INITIAL_STATE);
  const filterManager = new FilterManager({
    ...options,
    state: filterState,
    dispatch: dispatchFilterState,
    history,
  });
  const [debouncedFilterState] = useDebounce(
    filterState,
    options.debounceTime ?? 500
  );
  const [totalRecords, setTotalRecords] = useState(0);

  return {
    dispatchFilterState,
    filterManager,
    filterState,
    debouncedFilterState,
    setTotalRecords,
    totalRecords,
  };
}

export class FilterManager {
  state: FilterState;

  dispatch: Dispatch<FilterActionUnion>;

  columns: MUIDataTableColumn[];

  pageSize = 10;

  pageSizeOptions = [10, 25, 50];

  history: History;

  constructor(options: FilterManagerOptions) {
    const { columns, history, pageSize, pageSizeOptions, state, dispatch } =
      options;
    this.columns = columns;
    this.history = history;
    this.state = state;
    this.dispatch = dispatch;
    this.history = history;
    this.pageSize = pageSize ?? this.pageSize;
    this.pageSizeOptions = pageSizeOptions ?? this.pageSizeOptions;
  }

  changeSearch(value: string | null) {
    this.dispatch(Creators.setSearch({ search: value ?? "" }));
  }

  changePage(page: number) {
    this.dispatch(Creators.setPage({ page: page + 1 }));
  }

  changePageSize(pageSize: number) {
    this.dispatch(Creators.setPageSize({ page_size: pageSize }));
  }

  changeOrder(changedColumn: string, sortDirection: "asc" | "desc" | null) {
    this.dispatch(
      Creators.setOrder({
        sort_by: changedColumn,
        sort_dir: sortDirection,
      })
    );
  }

  pushHistory() {
    this.history.push({
      pathname: this.history.location.pathname,
      search: `?${new URLSearchParams(this.formatSearchParams() as any)}`,
      state: {
        ...this.state,
        search: FilterManager.cleanSearchText(this.state?.search),
      },
    });
  }

  private formatSearchParams(): FilterState {
    const search = FilterManager.cleanSearchText(this.state?.search);
    return {
      ...(search && search !== "" && { search }),
      ...(this.state?.page !== 1 && { page: this.state?.page }),
      ...(this.state?.page_size !== 10 && { page_size: this.state?.page_size }),
      ...(this.state?.sort_by &&
        this.state.sort_dir && {
          sort_by: this.state?.sort_by,
          sort_dir: this.state.sort_dir,
        }),
    };
  }

  static cleanSearchText(text) {
    let newText = text;
    if (text && text.value !== undefined) {
      newText = text.value;
    }
    return newText;
  }
}
