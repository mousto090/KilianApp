import { GET_PROGRAMS, SET_PROGRAMS } from "./constants";

export const getPrograms = () => ({ type: GET_PROGRAMS })
export const setPrograms = (data) => ({ type: SET_PROGRAMS, data })