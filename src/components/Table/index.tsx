import * as React from "react";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableProps,
} from "mui-datatables";
import i18n from "i18next";
import { merge } from "lodash";

const defaultMuiTableOptions: MUIDataTableOptions = {
  print: false,
  download: false,
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
};

type AppTableProps = MUIDataTableProps;

const DataTable: React.FunctionComponent<AppTableProps> = (props) => {
  const newProps = merge<Partial<MUIDataTableProps>, AppTableProps>(
    { options: defaultMuiTableOptions },
    props
  );
  return <MUIDataTable {...newProps} />;
};

export default DataTable;
