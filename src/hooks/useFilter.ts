import { Dispatch, useReducer, useState } from "react";
import { MUIDataTableColumn } from "mui-datatables";
import { useDebounce } from "use-debounce";

import reducer, { INITIAL_STATE, Creators } from "@/store/filter";
import { FilterActionUnion, FilterState } from "@/store/filter/types";

interface FilterManagerOptions {
  columns: MUIDataTableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  debounceTime?: number;
}

export default function useFilter(options: FilterManagerOptions) {
  const filterManager = new FilterManager(options);
  const [filterState, dispatchFilterState] = useReducer(reducer, INITIAL_STATE);
  const [debouncedFilterState] = useDebounce(
    filterState,
    options.debounceTime ?? 500
  );
  const [totalRecords, setTotalRecords] = useState(0);
  filterManager.state = filterState;
  filterManager.dispatch = dispatchFilterState;

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
  state: FilterState | null = null;

  dispatch: Dispatch<FilterActionUnion> | null = null;

  columns: MUIDataTableColumn[];

  pageSize = 10;

  pageSizeOptions = [10, 25, 50];

  constructor(options: Omit<FilterManagerOptions, "debounceTime">) {
    const { columns, pageSize, pageSizeOptions } = options;
    this.columns = columns;
    this.pageSize = pageSize ?? this.pageSize;
    this.pageSizeOptions = pageSizeOptions ?? this.pageSizeOptions;
  }

  changeSearch(value: string | null) {
    this.dispatch?.(Creators.setSearch({ search: value ?? "" }));
  }

  changePage(page: number) {
    this.dispatch?.(Creators.setPage({ page: page + 1 }));
  }

  changePageSize(pageSize: number) {
    this.dispatch?.(Creators.setPageSize({ page_size: pageSize }));
  }

  changeOrder(changedColumn: string, sortDirection: string) {
    this.dispatch?.(
      Creators.setOrder({
        sort_by: changedColumn,
        sort_dir: sortDirection,
      })
    );
  }

  static cleanSearchText(text) {
    let newText = text;
    if (text && text.value !== undefined) {
      newText = text.value;
    }
    return newText;
  }
}
