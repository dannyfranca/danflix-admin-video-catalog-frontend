import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useTranslation } from "react-i18next";

interface FilterResetButtonProps {
  handleClick: () => void;
}

const FilterResetButton: React.FC<FilterResetButtonProps> = ({
  handleClick,
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("Clear search") ?? ""}>
      <IconButton onClick={handleClick}>
        <ClearAllIcon />
      </IconButton>
    </Tooltip>
  );
};

export default FilterResetButton;
