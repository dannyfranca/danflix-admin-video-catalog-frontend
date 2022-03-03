export interface ServiceResponse<T = any> {
  data: T;
}

export interface BaseMockData {
  id: string;
  [k: string]: any;
}

export type GetService<T extends BaseMockData> = (
  id: string
) => Promise<ServiceResponse<T | null>>;

export type ListService<T extends BaseMockData> = () => Promise<
  ServiceResponse<T[]>
>;

export type CreateService<T extends BaseMockData> = (
  data: T
) => Promise<ServiceResponse<T | null>>;

export type UpdateService<T extends BaseMockData> = (
  id: string,
  data: T
) => Promise<ServiceResponse<T | null>>;
