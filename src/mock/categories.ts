import { Category } from "@/util/models";

export const categoriesMock: Pick<
  Category,
  "name" | "is_active" | "created_at"
>[] = [
  { name: "Jimmy", is_active: true, created_at: "2020-11-07" },
  { name: "John", is_active: false, created_at: "2021-10-05" },
];
