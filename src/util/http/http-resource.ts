import { AxiosInstance } from "axios";

export default class HttpResource<T = any> {
  constructor(protected http: AxiosInstance, protected resource: string) {}

  get<I = T>(id: string) {
    return this.http.get<I>(`${this.resource}/${id}`);
  }

  list<I = T>() {
    return this.http.get<I[]>(this.resource);
  }

  create<I = T>(data: I) {
    return this.http.post<I>(this.resource);
  }
}
