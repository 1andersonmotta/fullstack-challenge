import axios from 'axios';
import { AxiosAdapterProps, ClientHttp, ClientHttpResponse, IMethod } from '../../interfaces/ClientHttp';

export class AxiosAdapter implements ClientHttp {
	async get<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>> {
		const httpConfig = { method: 'get' as IMethod, ...config };
		return await this.fetchResponse<T>(httpConfig);
	}

	async post<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>> {
		const httpConfig = { method: 'post' as IMethod, ...config };
		return await this.fetchResponse<T>(httpConfig);
	}

	async put<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>> {
		const httpConfig = { method: 'put' as IMethod, ...config };
		return await this.fetchResponse<T>(httpConfig);
	}

	async delete<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>> {
		const httpConfig = { method: 'delete' as IMethod, ...config };
		return await this.fetchResponse<T>(httpConfig);
	}

	private async fetchResponse<T>(httpConfig: AxiosAdapterProps): Promise<ClientHttpResponse<T>> {
		try {
			const response = await axios<T>(`${httpConfig.url}`, {
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
