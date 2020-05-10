import { ACCOUNT_CONSUME, GET_ACCOUNT, SET_ACCOUNT } from "./constants";

export const getAccount = (data) => ({ type: GET_ACCOUNT, data })
export const setAccount = (data) => ({ type: SET_ACCOUNT, data });
export const consume = (data) => ({ type:  ACCOUNT_CONSUME, data });