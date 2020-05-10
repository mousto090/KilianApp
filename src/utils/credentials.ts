import { BASE_API_URL } from "./config";

const jwtDecode = require("jwt-decode");

const REFRESH_URL = `${BASE_API_URL}auth/refresh`

interface Keys {
    access_token: string;
    refresh_token: string;
}

const getAccessUsingRefresh = async(refreshToken) => {
    try {
        const response = await fetch(REFRESH_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+refreshToken, 
            },
            body: JSON.stringify(refreshToken)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle error...
        console.log('[REFRESH] error: ', error);
    }
}

export const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
}

export const getVerifiedKeys = async(keys: Keys) => {
    const { access_token, refresh_token } = keys;
    if (access_token && refresh_token) {
        console.log('Cheking access');
        if (!isTokenExpired(keys.access_token)) {
            return keys;
        } else {
            console.log('Access token expired!');
            console.log('Checking refresh expiry');
            if (!isTokenExpired(keys.refresh_token)) {
                console.log('Fetching acces token using refresh token');
                const response = await getAccessUsingRefresh(keys.refresh_token);
                return response;
            } else {
                console.log('Refresh expired, please login');
                return null;
            }
        }
    } else {
        console.log('Access token not available! Please login');
        return null;
    }
}