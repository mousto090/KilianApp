import { delay, put, takeLatest } from 'redux-saga/effects';
import { hideNotification, showNotification } from 'store/global/actions';
import { authenticate, setUser } from './actions';
import { AUTH_LOGIN } from './constants';
import { callApi } from '@utils/saga';

function* login ({ data }: ReturnType<typeof authenticate>) {
    yield* callApi<any>({
        createApiClient: () => {
            return ['auth/login', 'POST', data];
        },
        errorCallback: function*(error) {
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
            yield put(setUser(result));
        }
    })
}

export default function* authSaga() {
    yield takeLatest(AUTH_LOGIN, login);
}