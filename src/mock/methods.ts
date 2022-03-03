import { BaseMockData, ServiceResponse } from "@/services/helpers";
import { isUndefined } from "lodash";

const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(undefined);
    }, ms)
  );

export const makeMockServiceResponse = <T = any>(data: T): ServiceResponse => ({
  data,
});

export const findMock =
  <T extends BaseMockData>(mock: T[]) =>
  (id: string) =>
    mock.find((v) => v.id === id) ?? null;

export const makeGetMock =
  <T extends BaseMockData>(mock: T[]) =>
  async (id: string): Promise<ServiceResponse<T | null>> => {
    await sleep(500);
    return makeMockServiceResponse(findMock(mock)(id));
  };

export const makeListMock =
  <T extends BaseMockData>(mock: T[]) =>
  async (): Promise<ServiceResponse<T[]>> => {
    await sleep(500);
    return makeMockServiceResponse(mock);
  };

export const makeCreateMock =
  <T extends BaseMockData>(mock: T[]) =>
  async (data: T): Promise<ServiceResponse<T | null>> => {
    await sleep(500);
    const id = (await import("uuid")).v4();
    mock.push({
      ...data,
      id,
      created_at: new Date().toISOString(),
    });
    return makeMockServiceResponse(findMock(mock)(id));
  };

export const makeUpdateMock =
  <T extends { id: string; [k: string]: any }>(mock: T[]) =>
  async (id: string, data: T): Promise<ServiceResponse<T | null>> => {
    await sleep(500);
    const index = mock.findIndex((v) => v.id === id);
    if (!isUndefined(index)) Object.assign(mock[index], data);
    return makeMockServiceResponse(!isUndefined(index) ? mock[index] : null);
  };
