import { SET_PROGRAMS } from './constants';

export interface IProgram {
    label: string;
    uuid: string,
    consumed_standard: number,
    consumed_bonus: number
}

const initialState: IProgram[] = [];

export const programReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROGRAMS:
            return action.data;
        default:
            return state;
    }
}