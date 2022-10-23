import { AxiosRequestHeaders, AxiosResponse } from "axios";

export interface ClientHttp {
    get<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
    post<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
    put<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
    delete<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
}

export type AxiosAdapterProps<T = any> = {
    url: string;
    headers?: AxiosRequestHeaders;
    method?: IMethod;
    data?: T;
}

export interface ClientHttpResponse<T> extends AxiosResponse<T> {
}

export type IMethod = 'get' | 'post' | 'put' | 'delete';