import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, ButtonProps, Checkbox, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "@/util/vendor/yup";
import { theme } from "@/config/theme";
import { createCategory } from "@/services/categories";
import { Category } from "@/util/models";

const validationSchema = yup.object().shape({
  name: yup.string().required().min(2).max(70),
});

const Form: React.FC = () => {
  const { t } = useTranslation();

  const btnProps: ButtonProps = {
    sx: {
      margin: theme.spacing(1),
    },
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Category>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      is_active: true,
    },
  });

  const onSubmit = (formData) => createCategory(formData).then(console.log);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name")}
        label={t("Name")}
        margin="normal"
        fullWidth
        error={!!errors.name}
        helperText={errors.name && errors.name.message}
      />
      <TextField
        {...register("description", { required: true })}
        label={t("Description")}
        rows={4}
        margin="normal"
        fullWidth
        multiline
      />
      {errors.description && <p>{errors.description.message}</p>}
      <Checkbox
        {...register("is_active")}
        defaultChecked={getValues().is_active}
      />
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
