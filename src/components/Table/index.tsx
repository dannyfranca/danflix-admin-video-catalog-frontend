import React, { forwardRef } from "react";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableProps,
  MUIDataTableColumn,
} from "mui-datatables";
import i18n from "i18next";
import { cloneDeep, merge, omit } from "lodash";
import { Theme, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";

import DebouncedTableSearch from "./DebouncedTableSearch";

export interface DataTableColumn extends MUIDataTableColumn {
  width?: string;
}

export interface MuiDataTableRefComponent {
  changePage: (page: number) => void;
  changeRowsPerPage: (rowsPerPage: number) => void;
}

export interface AppTableProps
  extends MUIDataTableProps,
    React.RefAttributes<MuiDataTableRefComponent> {
  columns: DataTableColumn[];
  loading?: boolean;
  debouncedSearchTime?: number;
}

const makeDefaultMuiTableOptions: (
  debouncedSearchTime?: number
) => MUIDataTableOptions = (debouncedSearchTime) => ({
  print: false,
  download: false,
  elevation: 0,
  responsive: "standard",
  fixedHeader: true,
  tableBodyMaxHeight: "500px",
  textLabels: {
    body: {
      noMatch: i18n.t("No match records found"),
      toolTip: i18n.t("Sort"),
    },
    pagination: {
      next: i18n.t("Next page"),
      previous: i18n.t("Previous page"),
      rowsPerPage: i18n.t("Rows per page:"),
      displayRows: i18n.t("of"),
    },
    toolbar: {
      search: i18n.t("Search"),
      downloadCsv: i18n.t("Download CSV"),
      print: i18n.t("Print"),
      viewColumns: i18n.t("View Columns"),
      filterTable: i18n.t("Filter Table"),
    },
    filter: {
      all: i18n.t("All"),
      title: i18n.t("Filters"),
      reset: i18n.t("Reset"),
    },
    viewColumns: {
      title: i18n.t("View Columns"),
      titleAria: i18n.t("Show table columns"),
    },
    selectedRows: {
      text: i18n.t("row(s) selected"),
      delete: i18n.t("Delete"),
      deleteAria: i18n.t("Delete selected columns"),
    },
  },
  customSearchRender: (searchText, onSearch, onHide, options) => (
    <DebouncedTableSearch
      searchText={searchText}
      onSearch={onSearch}
      onHide={onHide}
      options={options}
      debouncedTime={debouncedSearchTime}
    />
  ),
});

const DataTable = forwardRef<MuiDataTableRefComponent, AppTableProps>(
  (props, ref) => {
    const theme = cloneDeep<Theme>(useTheme());
    const isSmOrDown = useMediaQuery(theme.breakpoints.down("sm"));
    const defaultOptions = makeDefaultMuiTableOptions(
      props.debouncedSearchTime
    );

    const extractMuiDataTableColumns = (
      columns: DataTableColumn[]
    ): MUIDataTableColumn[] => {
      setColumnWidth(columns);
      return columns.map((c) => omit(c, "width"));
    };

    const setColumnWidth = (columns: DataTableColumn[]) => {
      columns.forEach((c, k) => {
        if (c.width && theme.components?.MuiTableCell?.styleOverrides?.head)
          theme.components.MuiTableCell.styleOverrides.head[
            `&:nth-of-type(${k + 2})`
          ] = {
            width: c.width,
          };
      });
    };

    const applyLoading = () => {
      const textLabels = newProps.options?.textLabels;
      if (!textLabels?.body) return;
      textLabels.body.noMatch =
        newProps.loading === true
          ? `${i18n.t("Loading")}...`
          : textLabels.body.noMatch;
    };

    const getOriginalMuiDataTableProps = () => {
      return {
        ...omit(newProps, "loading"),
        ref,
      };
    };

    const newProps = merge<
      Partial<MUIDataTableProps>,
      AppTableProps,
      Partial<MUIDataTableProps>
    >({ options: cloneDeep(defaultOptions) }, props, {
      columns: extractMuiDataTableColumns(props.columns),
    });

    applyLoading();

    const originalProps = getOriginalMuiDataTableProps();

    return (
      <ThemeProvider theme={theme}>
        <MUIDataTable {...originalProps} />
      </ThemeProvider>
    );
  }
);

export default DataTable;
