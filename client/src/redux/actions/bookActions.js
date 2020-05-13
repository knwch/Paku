import axios from 'axios';

import {
    ADD_BOOK,
    CANCEL_BOOK,
    GET_BOOK,
    GET_POST_BOOK,
    GET_USER_BOOK,
    CLEAR_ERRORS,
    BOOK_LOADING,
    CHECK_BOOK,
    GET_BOOKS,
    GET_ERRORS,
} from './types';

// Add Book
export const addBook = (bookData, idPost) => async (dispatch) => {
    dispatch(clearErrors());
    dispatch(setBookLoading());
    try {
        const book = await axios.post(`/api/book/addBook/${idPost}`, bookData);
        dispatch({
            type: ADD_BOOK,
            payload: book.data,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Cancel Book
export const cancelBook = (idPost, idBook) => async (dispatch) => {
    dispatch(setBookLoading());
    try {
        const res = await axios.post(`/api/book/cancel/${idPost}/${idBook}`);
        dispatch({
            type: CANCEL_BOOK,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Get Book All
export const getBookAll = () => async (dispatch) => {
    dispatch(setBookLoading());
    try {
        const res = await axios.get(`/api/book/`);
        dispatch({
            type: GET_BOOKS,
            payload: res.data.book,
        });
    } catch (err) {
        dispatch({
            type: GET_BOOKS,
            payload: {},
        });
    }
};

// Get Book of Post
export const getBookPost = (idPost) => async (dispatch) => {
    dispatch(setBookLoading());
    try {
        const res = await axios.get(`/api/book/post/${idPost}`);
        dispatch({
            type: GET_POST_BOOK,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_POST_BOOK,
            payload: {},
        });
    }
};

// Get Book of User
export const getBookUser = (idUser) => async (dispatch) => {
    dispatch(setBookLoading());
    try {
        const res = await axios.get(`/api/book/user/${idUser}`);
        dispatch({
            type: GET_USER_BOOK,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_USER_BOOK,
            payload: {},
        });
    }
};

// Get Book id
export const getBook = (idBook) => async (dispatch) => {
    dispatch(setBookLoading());
    try {
        const res = await axios.get(`/api/book/${idBook}`);
        dispatch({
            type: GET_BOOK,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_BOOK,
            payload: {},
        });
    }
};

// Check book
export const checkBook = (idCheck, dataCheck) => async (dispatch) => {
    dispatch(setBookLoading());
    try {
        const res = await axios.post(`/api/book/check/${idCheck}`, dataCheck);
        dispatch({
            type: CHECK_BOOK,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};

// Set loading state
export const setBookLoading = () => {
    return {
        type: BOOK_LOADING,
    };
};
