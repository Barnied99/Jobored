import axios from 'axios';
import dotenv from 'dotenv';

import {
    NEXT_CLIENT_ID,
    NEXT_CLIENT_SECRET,
    NEXT_LOGIN,
    NEXT_PASSWORD,
} from '../../../common/constants'

import { LoginResponse } from './dat';

dotenv.config()

const login = NEXT_LOGIN;
const password = NEXT_PASSWORD;
const clientId = NEXT_CLIENT_ID;
const clientSecret = NEXT_CLIENT_SECRET;
export const loginUser = async (): Promise<LoginResponse> => {
    return axios
        .get(`http://localhost:5232/api/2.0/oauth2/password/`, {
            params: {
                login,
                password,
                client_id: clientId,
                client_secret: clientSecret,
                hr: 0,
            },
            headers: {
                'X-Api-App-Id': clientSecret,
            },
        })
        .then((response) => response.data);
};


