import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import Table from "./Table";

const PageList: React.FC = () => {
  return (
    <Page title="Listagem de Categorias">
      <Box dir="rtl">
        <Fab
          title="Adicionar categoria"
          size="small"
          component={Link}
          to="category/create"
        >
          <AddIcon />
        </Fab>
      </Box>
      <Box>
        <Table />
      </Box>
    </Page>
  );
};

export default PageList;