import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";

import i18next from "@/i18t";
import { formatDateFromIso } from "@/util/date";
import { listCategories } from "@/services/categories";
import { Circle } from "@/components/Circle";
import { dataTableTheme } from "@/config/data-table-theme";
import DataTable, { DataTableColumn } from "@/components/Table";
import { Category } from "@/util/models";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const columns: DataTableColumn[] = [
  {
    name: "id",
    label: "ID",
    width: "30%",
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
  },
];

const Table: React.FC = () => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    listCategories()
      .then(({ data }) => isMounted && setData(data))
      .catch((error) => {
        console.error(error);
        snackbar.enqueueSnackbar(t("Unable to load data"), {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={dataTableTheme}>
      <DataTable title="" data={data} columns={columns} loading={loading} />
    </ThemeProvider>
  );
};

export default Table;
