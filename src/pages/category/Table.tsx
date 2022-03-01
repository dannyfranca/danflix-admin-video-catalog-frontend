import * as React from "react";
import { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import CircleIcon from "@mui/icons-material/Circle";
import { useTranslation } from "react-i18next";

import { listCategories } from "../../services/categories";

const columns: MUIDataTableColumn[] = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "is_active",
    label: "Active?",
    options: {
      customBodyRender(value, tableMeta, updateValue) {
        return value ? (
          <CircleIcon color="success" sx={{ transform: "scale(0.5)" }} />
        ) : (
          <CircleIcon color="error" sx={{ transform: "scale(0.5)" }} />
        );
      },
    },
  },
  {
    name: "created_at",
    label: "Created at",
  },
];

const Table: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    listCategories().then(setData);
  }, []);

  return <MUIDataTable title={t("Categories")} data={data} columns={columns} />;
};

export default Table;
