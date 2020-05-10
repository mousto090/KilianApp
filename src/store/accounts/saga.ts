import { delay, put, takeLatest } from 'redux-saga/effects';
import { consume, getAccount, setAccount } from './actions';
import { ACCOUNT_CONSUME, GET_ACCOUNT } from './constants';
import { hideModal, hideNotification, showNotification } from 'store/global/actions';
import * as RootNavigation from '../../navigation/RootNavigation';
import { callApi } from '@utils/saga';
import { LOADING_SECTIONS } from '@store/global/constants';

function* watchForGetAccount ({ data }: ReturnType<typeof getAccount>) {
    yield* callApi<any>({
        createApiClient: () => {
            const url = `api/v1/accounts/${data.uuid}`;
            return [url, 'GET', data];
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
            const { data: { attributes } } = result;
            yield put(setAccount(attributes));
        },
    })
}

function* watchForConsume ({ data }: ReturnType<typeof consume>) {

    yield* callApi<any>({
        createApiClient: () => {
            const url = `api/v1/accounts/${data.id}/consume`
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
        successCallback: function* (data) {
            yield put(hideModal());
            const { data: { attributes: { balance_plus, balance_standard}} } = data;
            const balance = {
                balance_plus,
                balance_standard
            }
            yield put(setAccount(balance));
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
        loadingSection: LOADING_SECTIONS.CONSUME
    })
}

export default function* accountSaga() {
    yield takeLatest(GET_ACCOUNT, watchForGetAccount);
    yield takeLatest(ACCOUNT_CONSUME, watchForConsume);
}