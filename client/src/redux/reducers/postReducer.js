import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  AVAILABLE_POST,
  POST_LOADING,
  SET_POST_SUCCESS,
  SET_POST_LOADING,
  SEARCH_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  post_search: [],
  issuccess: false,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case SEARCH_POST: 
      return {
        ...state,
        post_search: action.payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case AVAILABLE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      }
    case SET_POST_SUCCESS:
      return {
        ...state,
        issuccess: true
      }
    case SET_POST_LOADING:
      return {
        ...state, 
        issuccess: false
      }
    default:
      return state;
  }
}
