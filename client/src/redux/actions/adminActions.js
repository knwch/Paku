import axios from 'axios'

import {
    GET_USER,
    GET_CONFIRM,
    CONFIRM_USER,
    GET_USERS,
    UNCONFIRM_USER,
    ADMIN_LOADING,
    GET_ERRORS,
    DELETE_USER
} from '../actions/types'

// Get users
export const getUsers = () => dispatch => {
    dispatch(setUserLoading())
    axios.get('/api/admin/user')
        .then((res) => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                tpye: GET_USERS,
                payload: null
            })
        })
}

//  Get user wait confirm
export const getUserConfirm = () => dispatch => {
    dispatch(setUserLoading())
    axios.get('/api/admin/confirm')
        .then((res) => {
            dispatch({
                type: GET_CONFIRM,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_CONFIRM,
                payload: null
            })
        })
}

// Get user by id 
export const getUserId = (id) => dispatch => {
    dispatch(setUserLoading())
    axios.get(`/api/admin/user/${id}`)
        .then((res) => {
            dispatch({
                type: GET_USER,
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

// Confirm
export const confirmUser = (id) => dispatch => {
    dispatch(setUserLoading())
    axios.get(`/api/admin/confirmUser/${id}`)
        .then((res) => {
            dispatch({
                type: CONFIRM_USER,
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

// Unconfirm
export const UnConfirmUser = (id) => dispatch => {
    dispatch(setUserLoading())
    axios.get(`/api/admin/unConfirm/${id}`)
        .then((res) => {
            dispatch({
                type: UNCONFIRM_USER,
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

// delete user 
export const delUser = (id) => dispatch => {
    dispatch(setUserLoading())
    axios.delete(`/api/admin/del/${id}`)
        .then((res) => {
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// User loading
export const setUserLoading = () => {
    return {
        type: ADMIN_LOADING
    }
}