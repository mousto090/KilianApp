export const GLOBAL_REDUCER_KEY = 'global';
export const MODAL_REDUCER_KEY = 'modal';

export const SET_ERROR = `app/${GLOBAL_REDUCER_KEY}/set_error`;
export const SET_LOADING = `app/${GLOBAL_REDUCER_KEY}/set_loading`;

export const SHOW_NOTIFICATION = `app/${GLOBAL_REDUCER_KEY}/show_notification`;
export const HIDE_NOTIFICATION = `app/${GLOBAL_REDUCER_KEY}/hide_notification`;

export const SHOW_MODAL = `app/${MODAL_REDUCER_KEY}/show_modal`;
export const HIDE_MODAL = `app/${MODAL_REDUCER_KEY}/hide_modal`;

export const LOADING_SECTIONS = {
    GLOBAL: 'global',
    CONSUME: 'consume'
}