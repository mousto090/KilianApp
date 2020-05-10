import { makeSelector } from "../../utils/selectors";
import { ACCOUNT_REDUCER_KEY } from "./constants";
import { IAccount } from "./reducer";

export const selectAccount = makeSelector<IAccount>({ reducerKey: ACCOUNT_REDUCER_KEY });