import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

import * as yup from "@/util/vendor/yup";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "@/services/categories";
import { Category } from "@/util/models";
import { SubmitActions } from "./SubmitActions";

const validationSchema = yup.object().shape({
  name: yup.string().required().max(70),
});

const Form: React.FC = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Category>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      is_active: true,
    },
  });

  const snackbar = useSnackbar();
  const history = useHistory();
  const { id } = useParams<any>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    getCategory(id).then(({ data }) => {
      setCategory(data);
      reset(data as Category);
    });
  }, []);

  const onSubmit = (formData, event?) => {
    setLoading(true);
    const request = category
      ? updateCategory(id, formData)
      : createCategory(formData);

    return request
      .then(({ data }) => {
        snackbar.enqueueSnackbar(t("Category saved with success"), {
          variant: "success",
        });
        setTimeout(() => {
          if (event) history.push("/categories");
          else if (!id) history.push(`/categories/${data?.id}/edit`);
        });
      })
      .catch((error) => {
        console.log(error);
        snackbar.enqueueSnackbar(t(error.message), {
          variant: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name")}
        label={t("Name")}
        margin="normal"
        fullWidth
        disabled={loading}
        error={!!errors.name}
        helperText={errors.name && errors.name.message}
      />
      <TextField
        {...register("description")}
        label={t("Description")}
        rows={4}
        margin="normal"
        fullWidth
        multiline
        disabled={loading}
      />
      {errors.description && <p>{errors.description.message}</p>}
      <FormControlLabel
        {...register("is_active")}
        control={<Checkbox />}
        checked={watch("is_active")}
        label={t("Active") as string}
        labelPlacement="end"
        disabled={loading}
      />
      <SubmitActions
        disabled={loading}
        handleSave={async () => {
          if (await trigger()) onSubmit(getValues());
        }}
      />
    </form>
  );
};

export default Form;
