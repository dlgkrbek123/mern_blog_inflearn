import axios from 'axios';
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  POST_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
} from '../types';

const postLoadingAPI = () => {
  return axios.get('api/post');
};

function* postLoading() {
  try {
    const result = yield call(postLoadingAPI);
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e.response);
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}

function* watchPostLoading() {
  yield takeEvery(POST_LOADING_REQUEST, postLoading);
}

export default function* postSaga() {
  yield all([fork(watchPostLoading)]);
}
