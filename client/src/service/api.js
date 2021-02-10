import axios from 'axios';
import config from '../config';
class ApiService {
	async register(path, data) {
		return await this.postRequest(config.backendUrl + path, data);
	}
	async login(path, data) {
		return await this.postRequest(config.backendUrl + path, data);
	}

	async resetPassword(path, data) {
		return this.postRequest(config.backendUrl + path, data);
	}

	async changePassword(path, data) {
		return this.postRequest(config.backendUrl + path, data);
	}

	async setUpUsername(path, data) {
		return this.postRequest(config.backendUrl + path, data);
	}

	async logout(path) {
		return this.postRequest(config.backendUrl + path, {});
	}

	async fileUpload(path, data) {
		return this.postRequestFileUpload(config.backendUrl + path, data);
	}
	async removeFile(path, data) {
		return this.postRequest(config.backendUrl + path, data);
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

	async postRequestFileUpload(url, data) {
		const res = await axios.post(url, data, {
			withCredentials: true,
			headers: {
				Accept: 'multipart/form-data',
				'content-type': 'multipart/form-data',
				'Access-Control-Allow-Credentials': true,
			},
		});
		return res;
	}
}
export default ApiService;
