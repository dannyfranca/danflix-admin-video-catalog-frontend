import * as React from "react";
import CircleIcon from "@mui/icons-material/Circle";

type CircleProps = {
  color:
    | "inherit"
    | "action"
    | "disabled"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export const Circle: React.FC<CircleProps> = ({ color }) => {
  return <CircleIcon color={color} sx={{ transform: "scale(0.5)" }} />;
};
