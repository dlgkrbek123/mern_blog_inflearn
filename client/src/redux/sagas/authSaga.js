import axios from 'axios';
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from '../types';

const loginUserAPI = (loginData) => {
  console.log(loginData, 'loginData');
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

// function* logout() {
//     try {
//       yield put({
//         type: LOGOUT_SUCCESS,
//       });
//     } catch (e) {
//       console.log(e);
//       yield put({
//         type: LOGOUT_FAILURE,
//       });
//     }
//   }

//   function* watchLogout() {
//     yield takeEvery(LOGOUT_REQUEST, logout);
//   }

export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchLogout)]);
}
