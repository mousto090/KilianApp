import { delay, put, takeLatest } from 'redux-saga/effects';
import { getPrograms, setPrograms } from './actions';
import { GET_PROGRAMS } from './constants';
import { hideNotification, showNotification } from 'store/global/actions';
import { callApi } from '@utils/saga';

function* watchForGetPrograms ({  }: ReturnType<typeof getPrograms>) {

    yield* callApi<any>({
        createApiClient: () => {
            const url = `api/v1/programs`;
            return [url, 'GET', []];
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
            const data = result.data.map(item => item.attributes);
            yield put(setPrograms(data));
        },
    })
}

export default function* programSaga() {
    yield takeLatest(GET_PROGRAMS, watchForGetPrograms);
}