import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import userSaga from './users/saga';
import accountSaga from './accounts/saga';
import programSaga from './programs/saga';

export * from './auth';


export default function* rootSaga() {
    yield all([
       authSaga(),
       userSaga(),
       accountSaga(),
       programSaga()  
    ])
}