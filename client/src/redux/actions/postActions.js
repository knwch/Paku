import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  AVAILABLE_POST,
  SET_POST_LOADING,
  SET_POST_SUCCESS,
  SEARCH_POST,
  GET_RECOMMEND
} from './types';

// Add Post
export const addPost = (postData) => dispatch => {
  dispatch(clearErrors());
  dispatch(postStatus());
  axios
    .post('/api/posts/addPost', postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data.post
      }),
      dispatch(postIssuccess())
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts/allPost')
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/handle/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Edit Post
export const editPost = (postId, postData) => dispatch => {
  dispatch(postStatus());
  axios
    .post(`/api/posts/edit/${postId}`, postData)
    .then((res) => 
      dispatch({
        type: GET_POST,
        payload: res.data
      }),
      dispatch(postIssuccess())
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/delete/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// // Add Like
// export const addLike = id => dispatch => {
//   axios
//     .post(`/api/posts/like/${id}`)
//     .then(res => dispatch(getPosts()))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Remove Like
// export const removeLike = id => dispatch => {
//   axios
//     .post(`/api/posts/unlike/${id}`)
//     .then(res => dispatch(getPosts()))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// // Delete Comment
// export const deleteComment = (postId, commentId) => dispatch => {
//   axios
//     .delete(`/api/posts/comment/${postId}/${commentId}`)
//     .then(res =>
//       dispatch({
//         type: GET_POST,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Available post
export const availablePost = (availableData, idPost) => dispatch => {
  dispatch(setPostLoading())
  axios.post(`/api/posts/available/${idPost}`, availableData)
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: res.data._id
      })
      dispatch({
        type: AVAILABLE_POST,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Search post 
export const searchPost = (search) => dispatch => {
  // dispatch(setPostLoading())
  axios.get(`/api/posts/search?q=${search}`)  
    .then((res) => {
      dispatch({
        type: SEARCH_POST,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: SEARCH_POST,
        payload: null
      })
    })
}

// Get recommend
export const recommendPost = () => dispatch => {
  dispatch(setPostLoading())
  axios.get('/api/posts/recommend')
    .then((res) => {
      dispatch({
        tpye: GET_RECOMMEND,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Set loading state
export const postStatus = () => {
  return {
    type: SET_POST_LOADING
  }
}

// Result status
export const postIssuccess = () => {
  return {
    type: SET_POST_SUCCESS
  } 
}