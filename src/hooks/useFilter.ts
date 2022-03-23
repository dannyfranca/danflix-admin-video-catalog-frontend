import {
  Dispatch,
  useEffect,
  useReducer,
  useState,
  MutableRefObject,
  useMemo,
} from "react";
import { MUIDataTableColumn } from "mui-datatables";
import { useDebounce } from "use-debounce";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";

import reducer, { Creators } from "@/store/filter";
import { FilterActionUnion, FilterState } from "@/store/filter/types";
import { ObjectSchema } from "@/util/vendor/yup";
import { createUrlFilterParamsSchema } from "@/util/vendor/yup-schemas";
import { MuiDataTableRefComponent } from "../components/Table";

type History = ReturnType<typeof useHistory>;

interface UseFilterOptions {
  columns: MUIDataTableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  debounceTime?: number;
  tableRef: MutableRefObject<MuiDataTableRefComponent>;
  extraFilter?: ExtraFilter;
}

interface FilterManagerOptions extends Omit<UseFilterOptions, "debounceTime"> {
  history: History;
  state?: FilterState;
  dispatch?: Dispatch<FilterActionUnion>;
}

export interface ExtraFilter {
  getStateFromURL: (queryParams: URLSearchParams) => any;
  formatSearchParams: (debouncedState: FilterState) => any;
  createValidationSchema: () => any;
}

export default function useFilter(options: UseFilterOptions) {
  const history = useHistory();
  const filterManager = new FilterManager({
    ...options,
    history,
  });

  const INITIAL_STATE = filterManager.getStateFromURL();
  const [filterState, dispatchFilterState] = useReducer(reducer, INITIAL_STATE);
  filterManager.dispatch = dispatchFilterState;
  filterManager.state = filterState;

  const [debouncedFilterState] = useDebounce(
    filterState,
    options.debounceTime ?? 300
  );
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    filterManager.replaceHistory();
  }, []);

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
  schema: ObjectSchema<any>;
  state?: FilterState;
  dispatch?: Dispatch<FilterActionUnion>;
  columns: MUIDataTableColumn[];
  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100];
  history: History;
  extraFilter?: ExtraFilter;

  constructor(options: FilterManagerOptions) {
    const {
      columns,
      history,
      pageSize,
      pageSizeOptions,
      state,
      dispatch,
      extraFilter,
    } = options;
    this.columns = columns;
    this.history = history;
    this.state = state ?? this.state;
    this.dispatch = dispatch ?? this.dispatch;
    this.pageSize = pageSize ?? this.pageSize;
    this.pageSizeOptions = pageSizeOptions ?? this.pageSizeOptions;
    this.extraFilter = extraFilter;
    this.schema = useMemo(
      () =>
        createUrlFilterParamsSchema({
          columns,
          pageSize,
          pageSizeOptions,
          extraFilter,
        }),
      [this.pageSizeOptions, this.pageSize, this.columns, this.extraFilter]
    );
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

  changeOrder(changedColumn: string, sortDirection: "asc" | "desc" | null) {
    this.dispatch?.(
      Creators.setOrder({
        sort_by: changedColumn,
        sort_dir: sortDirection,
      })
    );
  }

  replaceHistory() {
    this.history.replace({
      pathname: this.history.location.pathname,
      search: `?${new URLSearchParams(this.formatSearchParams() as any)}`,
      state: this.state,
    });
  }

  pushHistory() {
    const oldState = this.history.location.state;
    const nextState = this.state;
    if (isEqual(oldState, nextState)) return;

    this.history.push({
      pathname: this.history.location.pathname,
      search: `?${new URLSearchParams(this.formatSearchParams() as any)}`,
      state: {
        ...nextState,
        search: FilterManager.cleanSearchText(nextState?.search),
      },
    });
  }

  getStateFromURL() {
    const queryParams = new URLSearchParams(
      this.history.location.search.substring(1)
    );
    return this.schema.cast({
      search: queryParams.get("search"),
      page: queryParams.get("page"),
      page_size: queryParams.get("page_size"),
      sort_by: queryParams.get("sort_by"),
      sort_dir: queryParams.get("sort_dir"),
      ...(this.extraFilter && {
        extraFilter: this.extraFilter.getStateFromURL(queryParams),
      }),
    }) as FilterState;
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
      ...(this.extraFilter && {
        extraFilter: this.extraFilter.formatSearchParams(this.state!),
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
