import { BASE_API_URL } from "./config";
import axios from 'axios';

const TIMEOUT = 3000;

export const loginApi = async (params) => {
    try {
        const response = await axios.post(`${BASE_API_URL}auth/login`, {
            ...params,
        }, {
            timeout: TIMEOUT,
        })
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response);
            return { msg: error.response.data.msg };
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(2, error.request);
            return { error: error.request };
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return { error: error.message };
          }
    }
}

export const userApi = async(params, token) => {

    try {
        const response = await axios.post(`${BASE_API_URL}api/v1/users`,
          params,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                timeout: TIMEOUT
            }
        )
        console.log('Resp :', response);
        return response.data;
    } catch (error) {
        console.log('[USERS] error: ', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('RESPONE error', error.response);
            console.log('RESPONE error detail',  error.response.data.errors[0].detail);
            return { errors: error.response.data.errors };
        } 
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(2, error.request);
            return { error: error.request };
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return { error: error.message };
          }
    }
    
    // try {
    //     // const response = await fetch(`${BASE_API_URL}api/v1/users`, {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         Accept: 'application/json',
    //     //         'Content-Type': 'application/json',
    //     //         'Authorization': 'Bearer '+token, 
    //     //     },
    //     //     body: JSON.stringify(params)
    //     // });
    //     // const data = await response.json();
    //     // return data;
    // } catch (error) {
    //     console.log('[USER] error: ', error);
    // }
}

export const saleApi = async(params, token) => {
    try {
        const response = await axios.post(`${BASE_API_URL}api/v1/sales`,
          params,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                timeout: TIMEOUT
            }
        )
        console.log('Resp :', response);
        return response.data;
    } catch (error) {
        console.log('[SALES] error: ', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('RESPONE error', error.response);
            console.log('RESPONE error detail',  error.response.data.errors[0].detail);
            return { errors: error.response.data.errors };
        } 
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(2, error.request);
            return { error: error.request };
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return { error: error.message };
          }
    }
}
export const accountApi = async(params, token) => {
    console.log('UUid: ', params.uuid);
    try {

        const response = await axios({
            method: 'get',
            url: `${BASE_API_URL}api/v1/accounts/${params.uuid}`,
            data: {
            },
            timeout: TIMEOUT,
            headers: {
                'content-type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'Authorization': 'Bearer ' + token,
            },
          });
          
        return response.data;
    } catch (error) {
        console.log('[ACCOUNT] error: ', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('RESPONE error', error.response);
            console.log('RESPONE error detail',  error.response.data.errors[0].detail);
            return { error: error.response, data: error.response.data.errors[0].detail };
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(2, error.request);
            return { error: error.request };
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return { error: error.message };
          }
    }
}
export const programApi = async(token) => {
    try {

        const response = await axios({
            method: 'get',
            url: `${BASE_API_URL}api/v1/programs`,
            data: {
            },
            timeout: TIMEOUT,
            headers: {
                'content-type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'Authorization': 'Bearer ' + token,
            },
          });
          
        return response.data;
    } catch (error) {
        console.log('[PROGRAMS] error: ', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('RESPONE error', error.response);
            console.log('RESPONE error detail',  error.response.data.errors[0].detail);
            return { error: error.response, data: error.response.data.errors[0].detail };
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(2, error.request);
            return { error: error.request };
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return { error: error.message };
          }
    }
    // try {
    //     const response = await fetch(`${BASE_API_URL}api/v1/programs`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer '+token, 
    //         },
    //     });
    //     const data = await response.json();
    //     return data;
    // } catch (error) {
    //     console.log('[PROGRAMS] error: ', error);
    // }
}

export const accountConsumeApi = async(params, token) => {

    try {
        const response = await axios.post(`${BASE_API_URL}api/v1/accounts/${params.id}/consume`,
            params,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                timeout: TIMEOUT
            }
        )
        console.log('Resp :', response);
        return response.data;
    } catch (error) {
        console.log('[SALES] error: ', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('RESPONE error', error.response);
            console.log('RESPONE error detail', error.response.data.errors[0].detail);
            return { errors: error.response.data.errors };
        }
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(2, error.request);
            return { error: error.request };
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return { error: error.message };
        }
    }
}