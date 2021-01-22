import { all, put, takeEvery, call } from 'redux-saga/effects'
import { fetchCollectionsSuccess } from './actions'

export function* fetchCollections() {
    const response = yield fetch("https://api.npoint.io/5bcf29685fbbde4056b6")
    const json = yield response.json()
    yield put(fetchCollectionsSuccess(json))
}

export function* fetchCollectionsStart() {
    yield takeEvery('FETCH_COLLECTIONS_START', fetchCollections)
}

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart)
    ])
}