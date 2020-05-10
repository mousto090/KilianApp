import get from 'lodash/get';

export interface ISelectorConfig {
    reducerKey: string;
    stateElementName?: string | string[];
}

export const makeSelector = <T>(config: ISelectorConfig) => () => ({ [config.reducerKey]: node }: any): T =>
    config.stateElementName ? get(node, config.stateElementName) : node;