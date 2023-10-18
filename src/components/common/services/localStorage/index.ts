import { APP_PREFIX } from '../../constants/prefixes';

export const setToken = (key: string, token: string): void =>
	localStorage.setItem(`${APP_PREFIX}_${key}`, token);

// export const getToken = (key: string) =>
// 	localStorage.getItem(`${APP_PREFIX}_${key}`);
export const getToken = (key: string) => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem(`${APP_PREFIX}_${key}`);
	}
	return null;
}

export const clearToken = (key: string) =>
	localStorage.removeItem(`${APP_PREFIX}_${key}`);
