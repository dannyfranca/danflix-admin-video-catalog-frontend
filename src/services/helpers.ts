export interface ServiceResponse<T = any, M = any> {
  data: T;
  meta?: M;
}

export interface BaseMockData {
  id: string;
  [k: string]: any;
}

export type GetService<T extends BaseMockData> = (
  id: string
) => Promise<ServiceResponse<T | null>>;

export type ListService<T extends BaseMockData> = (options?: {
  [k: string]: any;
}) => Promise<ServiceResponse<T[]>>;

export type CreateService<T extends BaseMockData> = (
  data: T
) => Promise<ServiceResponse<T | null>>;

export type UpdateService<T extends BaseMockData> = (
  id: string,
  data: T
) => Promise<ServiceResponse<T | null>>;
