import * as yup from "./yup";

interface UrlFilterParamsOptions {
  columns?: {
    name: string;
    options?: {
      sort?: boolean;
    };
  }[];
  pageSize?: number;
  pageSizeOptions?: number[];
}

export const createUrlFilterParamsSchema = ({
  columns,
  pageSize = 10,
  pageSizeOptions,
}: UrlFilterParamsOptions) =>
  yup.object().shape({
    search: yup
      .string()
      .transform((value) => (!value ? undefined : value))
      .default(""),
    page: yup
      .number()
      .transform((value) =>
        Number.isNaN(value) || parseInt(value, 10) < 1 ? undefined : value
      )
      .default(1),
    page_size: yup
      .number()
      .transform((value) =>
        Number.isNaN(value) || !pageSizeOptions?.includes(parseInt(value, 10))
          ? undefined
          : value
      )
      .default(pageSize),
    sort_by: yup
      .string()
      .nullable()
      .transform((value) => {
        const columnsName = columns
          ?.filter((column) => column.options?.sort !== false)
          .map((column) => column.name);
        return columnsName?.includes(value) ? value : undefined;
      })
      .default(null),
    sort_dir: yup
      .string()
      .nullable()
      .transform((value) =>
        !value || !["asc", "desc"].includes(value.toLowerCase())
          ? undefined
          : value
      )
      .default(null),
  });
