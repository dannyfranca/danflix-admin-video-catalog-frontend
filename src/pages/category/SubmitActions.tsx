import * as React from "react";
import { Box, Button, ButtonProps } from "@mui/material";
import { useTranslation } from "react-i18next";

import { theme } from "@/config/theme";

interface SubmitActionsProps {
  disabled: boolean;
  handleSave: () => void;
}

export const SubmitActions = ({ disabled, handleSave }: SubmitActionsProps) => {
  const { t } = useTranslation();

  const btnProps: ButtonProps = {
    sx: {
      margin: theme.spacing(1),
    },
    disabled,
  };

  return (
    <Box dir="rtl">
      <Button {...btnProps} variant="contained" type="submit">
        {t("Save")}
      </Button>
      <Button {...btnProps} variant="outlined" onClick={handleSave}>
        {t("Save and continue editing")}
      </Button>
    </Box>
  );
};
