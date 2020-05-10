import { makeSelector } from "../../utils/selectors";
import { AUTH_REDUCER_KEY } from "./constants";
import { IUser } from "./reducer";

export const selectUser = makeSelector<IUser>({ reducerKey: AUTH_REDUCER_KEY });