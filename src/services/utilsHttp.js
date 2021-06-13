import {
	APP_TOKEN,
} from '@config/settings'

export const headersDefault = () => ({
	'X-Requested-With': 'XMLHttpRequest',
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'Pragma': 'no-cache',
	'Expires': '0',
});

export const request = async (configDefault, NAME_TOKEN) => {
	const config = { ...configDefault};
	if (NAME_TOKEN) {
		const token = await sessionStorage.getItem(NAME_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;

		}
	}
	return config;
};





export const requestError = (error) =>  Promise.reject(error);
export const response = responseDefault =>  responseDefault;

/* eslint no-underscore-dangle:"off" */

export const responseError = async (error, NAME_TOKEN) => {
	const originalRequest = {...error.config};

	if (error?.response?.status === 403 && !originalRequest._retry) {
		originalRequest._retry = true;
	//	window.location.href = '/'
	} else if (error && error.response && error.response.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true;
		if (NAME_TOKEN) {
			await sessionStorage.removeItem(NAME_TOKEN);
		}
	//	window.location.href = '/'

	} else if (error && error.response && error.response.status === 500 && !originalRequest._retry) {
		console.log("error:", error);
		// return window.location.href = '/500'
	}

	return Promise.reject(error);

};
// Request
export const requestChat = (config) => request(config, APP_TOKEN);
// Errors
export const responseErrorAuth = (config) => responseError(config, APP_TOKEN);
