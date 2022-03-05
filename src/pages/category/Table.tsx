import React, { useState, useEffect, useRef, useReducer } from "react";
import { Link } from "react-router-dom";
import { IconButton, ThemeProvider } from "@mui/material";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import i18next from "@/i18t";
import { formatDateFromIso } from "@/util/date";
import { listCategories } from "@/services/categories";
import { Circle } from "@/components/Circle";
import { dataTableTheme } from "@/config/data-table-theme";
import DataTable, { DataTableColumn } from "@/components/Table";
import { Category } from "@/util/models";
import EditIcon from "@mui/icons-material/Edit";
import HttpResource from "@/util/http/http-resource";
import FilterResetButton from "@/components/Table/FilterResetButton";
import reducer, { INITIAL_STATE, Creators } from "@/store/search";

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

const Table: React.FC = () => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const mounted = useRef(true);
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchObject, dispatchSearchObject] = useReducer(
    reducer,
    INITIAL_STATE
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
        setTotalRecords(meta?.total);
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
          searchText: searchObject.search as any,
          page: searchObject.page,
          rowsPerPage: searchObject.page_size,
          count: totalRecords,
          customToolbar: () => (
            <FilterResetButton
              handleClick={() => dispatchSearchObject(Creators.setReset())}
            />
          ),
          onSearchChange: (value) =>
            dispatchSearchObject(Creators.setSearch({ search: value ?? "" })),
          onChangePage: (page) =>
            dispatchSearchObject(Creators.setPage({ page: page + 1 })),
          onChangeRowsPerPage: (pageSize) =>
            dispatchSearchObject(Creators.setPageSize({ page_size: pageSize })),
          onColumnSortChange: (changedColumn, sortDirection) =>
            dispatchSearchObject(
              Creators.setOrder({
                sort_by: changedColumn,
                sort_dir: sortDirection,
              })
            ),
        }}
      />
    </ThemeProvider>
  );
};

export default Table;
