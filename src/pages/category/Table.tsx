import * as React from "react";
import { useState, useEffect } from "react";
import { MUIDataTableColumn } from "mui-datatables";
import { ThemeProvider } from "@mui/material";

import i18next from "@/i18t";
import { formatDateFromIso } from "@/util/date";
import { listCategories } from "@/services/categories";
import { Circle } from "@/components/Circle";
import { dataTableTheme } from "@/config/data-table-theme";
import DataTable from "@/components/Table";
import { Category } from "@/util/models";

const columns: MUIDataTableColumn[] = [
  {
    name: "name",
    label: i18next.t("Name"),
  },
  {
    name: "is_active",
    label: i18next.t("Active"),
    options: {
      customBodyRender(value) {
        return <Circle color={value ? "success" : "error"} />;
      },
    },
  },
  {
    name: "created_at",
    label: i18next.t("Created at"),
    options: {
      customBodyRender(value) {
        return <span>{formatDateFromIso(value)}</span>;
      },
    },
  },
];

const Table: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;
    listCategories().then(({ data }) => isMounted && setData(data));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={dataTableTheme}>
      <DataTable
        title=""
        data={data}
        columns={columns}
        options={{ elevation: 0 }}
      />
    </ThemeProvider>
  );
};

export default Table;
