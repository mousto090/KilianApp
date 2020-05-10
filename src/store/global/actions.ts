import { HIDE_MODAL, HIDE_NOTIFICATION, LOADING_SECTIONS, SET_ERROR, SET_LOADING, SHOW_MODAL, SHOW_NOTIFICATION } from "./constants";

export const setLoading = (loading: boolean, section: string = LOADING_SECTIONS.GLOBAL) => ({ 
        type: SET_LOADING, 
        data: { [section]: loading } 
});
export const setError = (data: any) => ({ type: SET_ERROR, data });

export const showNotification = ({ notificationType, props }) => ({ type: SHOW_NOTIFICATION, notificationType, props })
export const hideNotification = () => ({ type: HIDE_NOTIFICATION });

export const showModal = ({ modalType, modalProps }) => ({ type: SHOW_MODAL, modalType, modalProps });
export const hideModal = () => ({ type: HIDE_MODAL });