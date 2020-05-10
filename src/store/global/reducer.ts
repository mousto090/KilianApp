import { SET_LOADING, SET_ERROR, SHOW_NOTIFICATION, HIDE_NOTIFICATION, SHOW_MODAL, HIDE_MODAL } from './constants';

const initialState = {
    loading: { global: false },
    error: null,
    notification: {
        type: null, 
        props: null
    }
}

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.data}
        case SET_ERROR:
            return { ...state, error: action.data}
        case SHOW_NOTIFICATION:
            return { 
                ...state, 
                notification: {
                    type: action.notificationType,
                    props: action.props
                }
            }
        case HIDE_NOTIFICATION:
            return { 
                ...state, 
                notification: {
                    type: null,
                    props: null
                }
            }
        default:
            return state;
    }
}

const initialModalState: any[] = [];

export const modalReducer = (state = initialModalState, action) => {
    const { type, modalType, modalProps } = action;
    switch (type) {
        case SHOW_MODAL:
            // Always pushing a new modal onto the stack
            return state.concat({ modalType, modalProps });
        case HIDE_MODAL: 
            // Always popping the last modal off the stack
            const newState = state.slice();
            newState.pop();
            return newState;;
        default:
            return state;
    }
}