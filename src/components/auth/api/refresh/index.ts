import axios from 'axios';

import { NEXT_CLIENT_ID, NEXT_CLIENT_SECRET } from '../../../common/constants';

import { RefreshTokenResponse } from './dat';

const clientId = NEXT_CLIENT_ID;
const clientSecret = NEXT_CLIENT_SECRET;


export const refreshTokens = async (
	refreshToken: string | null
): Promise<RefreshTokenResponse> => {
	return axios
		.get('http://localhost:5232/api/2.0/oauth2/refresh_token/', {
			params: {
				refresh_token: refreshToken,
				client_id: clientId,
				client_secret: clientSecret,
			},
			headers: {
				'X-Api-App-Id': clientSecret,
			},
		})
		.then((response) => response.data);
};


