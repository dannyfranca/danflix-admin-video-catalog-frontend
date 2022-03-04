import * as React from "react";
import { useParams } from "react-router-dom";

import Page from "@/components/Page";
import SingleGrid from "@/components/SingleGrid";
import Form from "./Form";

const PageCategoryForm = () => {
  const { id } = useParams<any>();
  return (
    <Page title={!id ? "Criar categoria" : "Editar categoria"}>
      <SingleGrid maxSize={8}>
        <Form />
      </SingleGrid>
    </Page>
  );
};

export default PageCategoryForm;
