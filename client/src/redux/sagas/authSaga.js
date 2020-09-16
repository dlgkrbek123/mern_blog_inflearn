import axios from 'axios';
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  USER_LOADING_REQUEST,
  USER_LOADING_FAILURE,
  USER_LOADING_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_SUCCESS,
} from '../types';

const loginUserAPI = (loginData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e.response);

    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

const registerUserAPI = (req) => {
  console.log(req, 'registerData');
  return axios.post('api/user', req);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, 'RegisterUser Data');

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e.response);
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
      payload: e.response,
    });
  }
}

function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

const userLoadingAPI = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.get('api/auth/user', config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);

    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e.response);
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchRegisterUser),
    fork(watchLogout),
    fork(watchuserLoading),
    fork(watchClearError),
  ]);
}
