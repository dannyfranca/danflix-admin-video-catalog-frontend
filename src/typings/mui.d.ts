import { Components } from "@mui/material/styles/components";

declare module "@mui/material/styles/components" {
  interface Components {
    MUIDataTableToolbar?: any;
    MUIDataTableHeadCell?: any;
    MUIDataTableSelectCell?: any;
    MUIDataTableBodyCell?: any;
    MUIDataTableToolbarSelect?: any;
    MUIDataTableBodyRow?: any;
    MUIDataTablePagination?: any;
    MUIDataTableFilterList?: any;
    [k: string]: any;
  }
}
