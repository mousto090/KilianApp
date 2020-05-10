import { makeSelector } from "../../utils/selectors";
import { PROGRAM_REDUCER_KEY } from "./constants";
import { IProgram } from "./reducer";

export const selectProgram = makeSelector<IProgram[]>({ reducerKey: PROGRAM_REDUCER_KEY });