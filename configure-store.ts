import { modalReducer } from './src/store/global/reducer';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import rootSaga, {
    authReducer,
    AUTH_REDUCER_KEY,
  
} from 'store';

import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from "redux-saga";
import { ACCOUNT_REDUCER_KEY } from 'store/accounts/constants';
import { accountReducer } from 'store/accounts/reducer';
import { PROGRAM_REDUCER_KEY } from 'store/programs/constants';
import { programReducer } from 'store/programs/reducer';
import { GLOBAL_REDUCER_KEY, MODAL_REDUCER_KEY } from 'store/global/constants';
import { globalReducer } from 'store/global/reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    debug: true,
    whitelist: [AUTH_REDUCER_KEY] // only AUTH_REDUCER_KEY will be persisted
}


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export default function configureStore(extraReducers = {}) {
    const store = createStore(persistReducer(persistConfig,
        combineReducers({
            [AUTH_REDUCER_KEY]: authReducer,
            [ACCOUNT_REDUCER_KEY]: accountReducer,
            [PROGRAM_REDUCER_KEY]: programReducer,
            [GLOBAL_REDUCER_KEY]: globalReducer,
            [MODAL_REDUCER_KEY]: modalReducer,
            ...extraReducers,
        })
        ), enhancer);
    
    sagaMiddleware.run(rootSaga);
    return store;
}
