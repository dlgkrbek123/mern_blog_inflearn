import {
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
} from '../types';

const initialState = {
  loading: false,
  error: '',
  posts: [],
  postCount: '',
  categoryFindResult: '',
  creatorId: '',
  title: '',
  postDetail: '',
  searchBy: '',
  searchResult: '',
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
        posts: [],
        error: '',
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
