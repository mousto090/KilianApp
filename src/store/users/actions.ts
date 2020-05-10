import { RECORD_SALE, USER_CREATE } from "./constants";

export const createUserAction = (data) => ({ type: USER_CREATE, data });
export const recordSale = (data) => ({ type: RECORD_SALE, data });