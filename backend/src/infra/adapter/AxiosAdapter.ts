import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

import config from '../config/configuration';

interface AxiosAdapterProps {
	url: string;
	domain: 'crawler';
	headers?: AxiosRequestHeaders;
	method?: 'get' | 'post' | 'put' | 'delete';
	data?: any;
}

export class AxiosAdapter {
	static async get<T>(config: AxiosAdapterProps): Promise<AxiosResponse<T, any>> {
		config.headers = {
			'Content-Type': 'application/json',
		};
		const httpConfig = { method: 'get', ...config } as AxiosAdapterProps;
		return await this.fetchResponse(httpConfig);
	}

	static async post<T>(config: AxiosAdapterProps): Promise<AxiosResponse<T, any>> {
		const httpConfig = { method: 'post', ...config } as AxiosAdapterProps;
		return await this.fetchResponse(httpConfig);
	}

	static async put<T>(config: AxiosAdapterProps): Promise<AxiosResponse<T, any>> {
		const httpConfig = { method: 'put', ...config } as AxiosAdapterProps;
		return await this.fetchResponse(httpConfig);
	}

	static async delete<T>(config: AxiosAdapterProps): Promise<AxiosResponse<T, any>> {
		const httpConfig = { method: 'delete', ...config } as AxiosAdapterProps;
		return await this.fetchResponse(httpConfig);
	}

	private static async fetchResponse(httpConfig: AxiosAdapterProps): Promise<AxiosResponse<any, any>> {
		httpConfig.headers = {
			'Content-Type': 'application/json',
			...httpConfig.headers,
		};
		try {
			const response = await axios(`${config.domain[httpConfig.domain]}/${httpConfig.url}`, {
				method: httpConfig.method,
				headers: httpConfig.headers,
				data: httpConfig.data,
			});
			return response;
		} catch (error: any) {
			return error.response;
		}
	}
}
