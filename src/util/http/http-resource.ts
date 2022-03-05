import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";

export default class HttpResource<T = any> {
  private cancelList: CancelTokenSource | null = null;

  constructor(protected http: AxiosInstance, protected resource: string) {}

  static isCanceled(value: any) {
    return axios.isCancel(value);
  }

  get<I = T>(id: string) {
    return this.http.get<I>(`${this.resource}/${id}`);
  }

  list<I = T>(options?: { queryParams?: any }) {
    if (this.cancelList) this.cancelList.cancel("list request cancelled");
    this.cancelList = axios.CancelToken.source();

    const config: AxiosRequestConfig = {
      cancelToken: this.cancelList.token,
    };

    if (options?.queryParams) config.params = options.queryParams;

    return this.http.get<I[]>(this.resource, config);
  }

  create<I = T>(data: I) {
    return this.http.post<I>(this.resource, data);
  }

  update<I = T>(id: string, data: I) {
    return this.http.post<I>(`${this.resource}/${id}`, data);
  }
}
