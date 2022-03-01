import * as React from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

type PageProps = {
  title: string;
};

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <Container>
      <Typography sx={{ color: "#999999" }} component="h1" variant="h5">
        {title}
      </Typography>
      <Box paddingTop={1}>{children}</Box>
    </Container>
  );
};

export default Page;
