import React, { useState, useEffect, useRef, useReducer } from "react";
import { IconButton, ThemeProvider } from "@mui/material";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import i18next from "@/i18t";
import { formatDateFromIso } from "@/util/date";
import { listCategories } from "@/services/categories";
import { Circle } from "@/components/Circle";
import { dataTableTheme } from "@/config/data-table-theme";
import DataTable, { DataTableColumn } from "@/components/Table";
import { Category, SearchState } from "@/util/models";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import HttpResource from "@/util/http/http-resource";
import FilterResetButton from "@/components/Table/FilterResetButton";
import { clone } from "lodash";

const columns: DataTableColumn[] = [
  {
    name: "id",
    label: "ID",
    width: "30%",
    options: {
      sort: false,
    },
  },
  {
    name: "name",
    label: i18next.t("Name"),
    width: "35%",
  },
  {
    name: "is_active",
    label: i18next.t("Active"),
    width: "4%",
    options: {
      customBodyRender(value) {
        return <Circle color={value ? "success" : "error"} />;
      },
    },
  },
  {
    name: "created_at",
    label: i18next.t("Created at"),
    width: "14%",
    options: {
      customBodyRender(value) {
        return <span>{formatDateFromIso(value)}</span>;
      },
    },
  },
  {
    name: "actions",
    label: i18next.t("Actions"),
    options: {
      customBodyRender: (value, tableMeta) => {
        return (
          <IconButton
            color="primary"
            component={Link}
            to={`/categories/${tableMeta.rowData[0]}/edit`}
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
  },
];

const INITIAL_SEARCH_OBJECT: SearchState = {
  search: "",
  total: 0,
  page: 1,
  page_size: 10,
  sort_by: null,
  sort_dir: null,
};

const reducer = (
  state: SearchState,
  action: { [k: string]: any }
): SearchState => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        search: action.search ?? "",
        page: 1,
      };
    case "page":
      return { ...state, page: action.page };
    case "page_size":
      return {
        ...state,
        page_size: action.page_size,
      };
    case "order":
      return {
        ...state,
        sort_by: action.sort_by,
        sort_dir: action.sort_dir ?? null,
      };
    case "reset":
    default:
      return clone(INITIAL_SEARCH_OBJECT);
  }
};

const Table: React.FC = () => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const mounted = useRef(true);
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchObject, dispatchSearchObject] = useReducer(
    reducer,
    INITIAL_SEARCH_OBJECT
  );
  // const [searchObject, setSearchObject] =
  //   useState<SearchState>(INITIAL_SEARCH_OBJECT);

  const getData = () => {
    setLoading(true);
    listCategories({
      search: cleanSearchText(searchObject.search),
      page: searchObject.page,
      per_page: searchObject.page_size,
      sort: searchObject.sort_by,
      dir: searchObject.sort_dir,
    })
      .then(({ data, meta }) => {
        if (!mounted.current) return;
        setData(data);
        // setSearchObject((prevState) => ({ ...prevState, total: meta?.total }));
      })
      .catch((error) => {
        if (HttpResource.isCanceled(error)) return;
        console.error(error);
        snackbar.enqueueSnackbar(t("Unable to load data"), {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cleanSearchText = (text) => {
    let newText = text;
    if (text && text.value !== undefined) {
      newText = text.value;
    }
    return newText;
  };

  useEffect(() => {
    mounted.current = true;
    getData();
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    mounted.current = true;
    getData();
    return () => {
      mounted.current = false;
    };
  }, [
    searchObject.search,
    searchObject.page,
    searchObject.page_size,
    searchObject.sort_by,
    searchObject.sort_dir,
  ]);

  return (
    <ThemeProvider theme={dataTableTheme}>
      <DataTable
        title=""
        data={data}
        columns={columns}
        loading={loading}
        options={{
          serverSide: true,
          searchText: searchObject.search,
          page: searchObject.page,
          rowsPerPage: searchObject.page_size,
          count: searchObject.total,
          customToolbar: () => (
            <FilterResetButton
              handleClick={() => dispatchSearchObject({ type: "reset" })}
            />
          ),
          onSearchChange: (value) =>
            dispatchSearchObject({ type: "search", search: value }),
          onChangePage: (page) =>
            dispatchSearchObject({ type: "page", page: page + 1 }),
          onChangeRowsPerPage: (pageSize) =>
            dispatchSearchObject({ type: "page_size", page_size: pageSize }),
          onColumnSortChange: (changedColumn, sortDirection) =>
            dispatchSearchObject({
              type: "order",
              sort_by: changedColumn,
              sort_dir: sortDirection,
            }),
        }}
      />
    </ThemeProvider>
  );
};

export default Table;
