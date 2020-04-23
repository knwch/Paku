import axios from 'axios'

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
    GET_ERRORS
} from './types'

// Add Book
export const addBook = (bookData, idPost) => async dispatch => {
    dispatch(clearErrors())
    dispatch(setBookLoading())
    try {
        const book = await axios.post(`/api/book/addBook/${idPost}`, bookData)
        dispatch({
            type: ADD_BOOK,
            payload: book.data
        })
    } catch(err) {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
    // axios.post(`/api/book/addBook/${idPost}`, bookData)
    //     .then((res) => {
    //         dispatch({
    //             type: ADD_BOOK,
    //             payload: res.data
    //         })
    //     })
    //     .catch(function(err) {
    //         console.log(err)
    //         // dispatch({
    //         //     type: GET_ERRORS,
    //         //     payload: err.response.data
    //         // })
    //     })
}

// Cancel Book 
export const cancelBook = (idPost, idBook) => dispatch => {
    dispatch(setBookLoading())
    axios.post(`/api/book/cancel/${idPost}/${idBook}`)
        .then((res) => {
            dispatch({
                type: CANCEL_BOOK,
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Get Book All
export const getBookAll = () => dispatch => {
    dispatch(setBookLoading())
    axios.get(`/api/book/`)
        .then((res) => {
            dispatch({
                type: GET_BOOKS,
                payload: res.data.book
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_BOOKS,
                payload: {}
            })
        })
}

// Get Book of Post 
export const getBookPost = (idPost) => dispatch => {
    dispatch(setBookLoading())
    axios.get(`/api/book/post/${idPost}`)
        .then((res) => {
            dispatch({
                type: GET_POST_BOOK,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_POST_BOOK,
                payload: {}
            })
        })
}

// Get Book of User 
export const getBookUser = (idUser) => dispatch => {
    dispatch(setBookLoading())
    axios.get(`/api/book/user/${idUser}`)
        .then((res) => {
            dispatch({
                type: GET_USER_BOOK,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_USER_BOOK,
                payload: {}
            })
        })
}

// Get Book id
export const getBook = (idBook) => dispatch => {
    dispatch(setBookLoading())
    axios.get(`/api/book/${idBook}`)
        .then((res) => {
            dispatch({
                type: GET_BOOK,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_BOOK,
                payload: {}
            })
        })
}

// Check book
export const checkBook = (idCheck, dataCheck) => dispatch => {
    dispatch(setBookLoading())
    axios.post(`/api/book/check/${idCheck}`, dataCheck)
        .then((res) => {
            dispatch({
                type: CHECK_BOOK,
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

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

// Set loading state
export const setBookLoading = () => {
    return {
        type: BOOK_LOADING
    }
}