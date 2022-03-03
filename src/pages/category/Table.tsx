import * as React from "react";
import { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material";

import i18next from "@/i18t";
import { formatDateFromIso } from "@/util/date";
import { listCategories } from "@/services/categories";
import { Circle } from "@/components/Circle";
import { dataTableTheme } from "@/config/data-table-theme";

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
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    listCategories().then((r) => setData(r.data));
  }, []);

  return (
    <ThemeProvider theme={dataTableTheme}>
      <MUIDataTable
        title=""
        data={data}
        columns={columns}
        options={{ elevation: 0 }}
      />
    </ThemeProvider>
  );
};

export default Table;
