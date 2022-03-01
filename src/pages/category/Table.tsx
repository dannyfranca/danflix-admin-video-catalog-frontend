import * as React from "react";
import { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { useTranslation } from "react-i18next";

import i18next from "@/i18t";
import { formatDateFromIso } from "@/util/date";
import { listCategories } from "@/services/categories";
import { Circle } from "@/components/Circle";

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
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    listCategories().then((r) => setData(r.data));
  }, []);

  return <MUIDataTable title={t("Categories")} data={data} columns={columns} />;
};

export default Table;
