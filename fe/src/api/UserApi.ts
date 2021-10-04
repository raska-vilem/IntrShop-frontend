import api from 'utils/api';
import axios, { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';

import IRegister from 'interfaces/Register';

class UserApi {
	private token?: CancelTokenSource;

	async login(loginProps: {email: string, password: string}): Promise<AxiosResponse<any>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.post('/user/login', loginProps, {cancelToken: this.token.token});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<any>;
		}
	}

	async register(registerProps: IRegister): Promise<AxiosResponse<any>> {
		this.token = axios.CancelToken.source();
		try {
			return await api.post('/user/register', registerProps, {cancelToken: this.token.token});
		}
		catch(error) {
			return (error as AxiosError)?.response as AxiosResponse<any>;
		}
	}


	cancel(): void {
		if(typeof this.token !== 'undefined') this.token.cancel();
	}

}

export default new UserApi();