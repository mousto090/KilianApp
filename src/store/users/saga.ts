import { delay, put, takeLatest } from 'redux-saga/effects';
import { createUserAction } from './actions';
import { RECORD_SALE, USER_CREATE } from './constants';
import { hideModal, hideNotification, showNotification } from 'store/global/actions';
import * as RootNavigation from '../../navigation/RootNavigation';
import { callApi } from '@utils/saga';

function* createUser ({ data }: ReturnType<typeof createUserAction>) {

    yield* callApi<any>({
        createApiClient: () => {
            const url = `api/v1/users`;
            return [url, 'POST', data];
        },
        errorCallback: function*(error) {
            yield put(hideModal());
            yield put(showNotification({
                notificationType: 'error',
                props: {
                    message: error,
                }
            }));
            yield delay(3000);
            yield put(hideNotification());
        },
        successCallback: function*(result) {
            console.log('data user: ', result);
            RootNavigation.goBack();
            yield put(showNotification({
                notificationType: 'success',
                props: {
                    message: 'Opération effectuée avec succès!'
                }
            }));
            yield delay(2000);
            yield put(hideNotification());
            
        },
    })

}
function* watchForRecordSale (payload) {
    console.log('DATA: ', payload);
    const { data } = payload;

    yield* callApi<any>({
        createApiClient: () => {
            const url = `api/v1/sales`;
            return [url, 'POST', data];
        },
        errorCallback: function*(error) {
            console.log('error sales: ', error);
            yield put(hideModal());
            yield put(showNotification({
                notificationType: 'error',
                props: {
                    message: error,
                }
            }));
            yield delay(3000);
            yield put(hideNotification());
        },
        successCallback: function*(result) {
            yield put(hideModal());
            RootNavigation.goBack();
            yield put(showNotification({
                notificationType: 'success',
                props: {
                    message: 'Opération effectuée avec succès!'
                }
            }));
            yield delay(2000);
            yield put(hideNotification());
        },
    })

}

export default function* userSaga() {
    yield takeLatest(USER_CREATE, createUser);
    yield takeLatest(RECORD_SALE, watchForRecordSale);
}