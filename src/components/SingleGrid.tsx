import * as React from "react";
import { Grid } from "@mui/material";

interface SingleGridProps {
  maxSize?: number;
  justifyContent?: "center" | "flex-start" | "flex-end";
}

const SingleGrid: React.FC<SingleGridProps> = ({
  children,
  maxSize = 8,
  justifyContent = "center",
}) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent={justifyContent}
      alignItems="center"
    >
      <Grid item xs={12} md={maxSize}>
        {children}
      </Grid>
    </Grid>
  );
};

export default SingleGrid;
