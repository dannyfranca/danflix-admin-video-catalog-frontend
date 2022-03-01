import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Page from "@/components/Page";
import Table from "./Table";

const PageList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page title={t("Category List")}>
      <Box dir="rtl">
        <Fab
          title={t("Add Category")}
          color="secondary"
          size="small"
          component={Link}
          to="categories/create"
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
