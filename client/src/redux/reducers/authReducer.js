import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_FAILURE,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
  userRole: '',
  successMsg: '',
  errorMsg: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
      break;
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userName: action.payload.user.name,
        userRole: action.payload.user.role,
        errorMsg: '',
      };
      break;
    case LOGIN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: '',
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };
      break;
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
        errorMsg: null,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: null,
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: null,
      };
    default:
      return state;
  }
};

export default authReducer;
