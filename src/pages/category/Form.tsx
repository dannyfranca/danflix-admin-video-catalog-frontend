import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, ButtonProps, Checkbox, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { theme } from "@/config/theme";
import { createCategory } from "@/services/categories";

const Form: React.FC = () => {
  const { t } = useTranslation();

  const btnProps: ButtonProps = {
    sx: {
      margin: theme.spacing(1),
    },
  };

  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (formData) => createCategory(formData).then(console.log);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name")}
        label={t("Name")}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register("description")}
        label={t("Description")}
        rows={4}
        margin="normal"
        fullWidth
        multiline
      />
      <Checkbox {...register("is_active")} />
      {t("Active")}
      <Box dir="rtl">
        <Button
          {...btnProps}
          variant="outlined"
          onClick={() => onSubmit(getValues())}
        >
          {t("Save and continue editing")}
        </Button>
        <Button {...btnProps} variant="contained" type="submit">
          {t("Save")}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
