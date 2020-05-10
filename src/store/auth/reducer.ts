import { AUTH_LOGOUT, AUTH_SET_ACCESS_TOKEN, AUTH_SET_USER } from "./constants";

export interface IUser {
    isLoggedIn: boolean;
    access_token: string | null; 
    refresh_token: string | null;
}

const initialState: IUser = {
    isLoggedIn: false,
    access_token: null, 
    refresh_token: null
}

export const authReducer = (state = initialState, action ) => {
    switch (action.type) {
        case AUTH_SET_USER:
            const { data } = action;
            return { ...state, isLoggedIn: true, ...data };
        case AUTH_LOGOUT: 
            return initialState;
        case AUTH_SET_ACCESS_TOKEN:
            return { ...state, access_token: action.data }
        default:
            return state;
    }
}