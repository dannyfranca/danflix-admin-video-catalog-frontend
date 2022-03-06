import React, { useState, useEffect, useRef } from "react";
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
import { Creators } from "@/store/filter";
import useFilter, { FilterManager } from "@/hooks/useFilter";

const debounceTime = 300;
const debounceSearchTime = 300;

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
  const {
    dispatchFilterState,
    filterState,
    debouncedFilterState,
    setTotalRecords,
    totalRecords,
    filterManager,
  } = useFilter({ columns, debounceTime });

  const getData = () => {
    setLoading(true);
    listCategories({
      search: FilterManager.cleanSearchText(filterState.search),
      page: filterState.page,
      per_page: filterState.page_size,
      sort: filterState.sort_by,
      dir: filterState.sort_dir,
    })
      .then(({ data, meta }) => {
        if (!mounted.current) return;
        setData(data);
        setTotalRecords(meta?.total);
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
    FilterManager.cleanSearchText(debouncedFilterState.search),
    debouncedFilterState.page,
    debouncedFilterState.page_size,
    debouncedFilterState.sort_by,
    debouncedFilterState.sort_dir,
  ]);

  return (
    <ThemeProvider theme={dataTableTheme}>
      <DataTable
        title=""
        data={data}
        columns={columns}
        loading={loading}
        debouncedSearchTime={debounceSearchTime}
        options={{
          serverSide: true,
          searchText: filterState.search as any,
          page: filterState.page,
          rowsPerPage: filterState.page_size,
          count: totalRecords,
          customToolbar: () => (
            <FilterResetButton
              handleClick={() => dispatchFilterState(Creators.setReset())}
            />
          ),
          onSearchChange: filterManager.changeSearch,
          onChangePage: filterManager.changePage,
          onChangeRowsPerPage: filterManager.changePageSize,
          onColumnSortChange: filterManager.changeOrder,
        }}
      />
    </ThemeProvider>
  );
};

export default Table;
