import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_SET_ACCESS_TOKEN, AUTH_SET_USER } from "./constants";

export const authenticate = (data) => ({ type: AUTH_LOGIN, data});
export const setUser = (data) => ({ type: AUTH_SET_USER, data});
export const logoutAction = () => ({ type: AUTH_LOGOUT, });
export const setAccessToken = (data) => ({ type: AUTH_SET_ACCESS_TOKEN,  data });