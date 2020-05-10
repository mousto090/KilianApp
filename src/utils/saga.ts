import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { BASE_API_URL } from './config';
import { setLoading } from '@store/global/actions';
import { getVerifiedKeys } from './credentials';
import { selectUser, setAccessToken } from 'store/auth';
import { LOADING_SECTIONS } from 'store/global/constants';

const TIMEOUT = 3000;

export interface ApiCallSagaConfig<T> {
    createApiClient: () => [any, any, any[]];
    successCallback?: (data: T) => void;
    successAction?: (data: T) => any;
    errorCallback?: (error: any) => void;
    loadingSection?: string
}


export function* callApi<T>({
    createApiClient,
    successCallback,
    successAction,
    errorCallback,
    loadingSection,
}: ApiCallSagaConfig<T>) {
    const section = loadingSection || LOADING_SECTIONS.GLOBAL;
    yield put(setLoading(true, section));

    const [url, method, args] = createApiClient();
   
    const user = yield(select(selectUser()));
    const keys = yield call(getVerifiedKeys, user);
    const accessToken = keys?.access_token;
    if (keys?.access_token && !keys.refresh_token) {
        // Set new access token
        yield put(setAccessToken(keys.access_token));
    }
   
    try {
        const response = yield axios({
            baseURL: BASE_API_URL,
            method: method,
            url: url,
            data: {
                ...args
            },
            headers: {
                'content-type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'Authorization': 'Bearer ' + accessToken,
            },
            timeout: TIMEOUT
        });
        // dispatch the success action if any
        if (successAction) {
            yield put(successAction(response.data));
        }
        // invoke the success callback if any
        if (successCallback) {
            yield call(successCallback, response.data);
        }
        yield put(setLoading(false, section));
        return response.data;
    } catch (error) {
        yield put(setLoading(false, section))
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (errorCallback) {
                if (error?.response?.data?.msg) {
                    yield call(errorCallback, error.response.data.msg);
                } else if (error?.response?.data?.errors) {
                    yield call(errorCallback, error.response.data.errors[0].detail);
                }
            }
            return { msg: error.response.data.msg };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            if (errorCallback) {
                yield call(errorCallback, 'Verifier votre connexion internet');
            }
            return { error: error.request };
        } else {
            // Something happened in setting up the request that triggered an Error
            if (errorCallback) {
                yield call(errorCallback, 'Verifier votre connexion internet');
            }
            return { error: error.message };
        }
    } finally{
        console.log('DONE!'); 
    }
}