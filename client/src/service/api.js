import axios from 'axios';
import config from '../config';
class ApiService {
	async register(path, data) {
		return await this.postRequest(config.backendUrl + path, data);
	}

	async postRequest(url, data) {
		const res = await axios.post(url, data, {
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
			},
		});
		return res;
	}
}
export default ApiService;
