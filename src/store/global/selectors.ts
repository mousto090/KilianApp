import { makeSelector } from "../../utils/selectors";
import { GLOBAL_REDUCER_KEY, LOADING_SECTIONS, MODAL_REDUCER_KEY } from "./constants";

export const selectSectionLoading = (sectionName: string) => makeSelector<boolean>({ 
    reducerKey: GLOBAL_REDUCER_KEY,
    stateElementName: ['loading', sectionName]
});
export const selectLoading = selectSectionLoading(LOADING_SECTIONS.GLOBAL);

export const selectNotification =  makeSelector<{ type: string, props: { message: string}}>({ 
    reducerKey: GLOBAL_REDUCER_KEY,
    stateElementName: ['notification']
});

export const selectModal = makeSelector<any>({
    reducerKey: MODAL_REDUCER_KEY,
});
