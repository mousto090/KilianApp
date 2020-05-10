import { GET_ACCOUNT, SET_ACCOUNT } from "./constants";

export interface IAccount {
    balance_plus: number;
    balance_standard: number; 
    vehicle_model: string,
    vehicle_plate_number: string
}


const initialState: IAccount = {
    balance_plus: 0,
    balance_standard: 0,
    vehicle_model: '',
    vehicle_plate_number: ''
}

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return {...state, ...action.data};
        default:
            return state;
    }
}