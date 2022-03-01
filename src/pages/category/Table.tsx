import * as React from "react";
import { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { listCategories } from "../../services/categories";

const columns: MUIDataTableColumn[] = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "is_active",
    label: "Active?",
  },
  {
    name: "created_at",
    label: "Created at",
  },
];

const Table: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    listCategories().then((v) => {
      setData(v);
    });
  }, []);

  return <MUIDataTable title="Categorias" data={data} columns={columns} />;
};

export default Table;
