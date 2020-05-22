import axios from 'axios';

import {
    GET_USER,
    GET_CONFIRM,
    CONFIRM_USER,
    GET_USERS,
    UNCONFIRM_USER,
    ADMIN_LOADING,
    GET_ERRORS,
    DELETE_USER
} from '../actions/types';

// Get users
export const getUsers = () => async (dispatch) => {
    dispatch(setUserLoading());
    try {
        const res = await axios.get('/api/admin/user');
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_USERS,
            payload: null
        });
    }
};

//  Get user wait confirm
export const getUserConfirm = () => async (dispatch) => {
    dispatch(setUserLoading());
    try {
        const res = await axios.get('/api/admin/confirm');
        dispatch({
            type: GET_CONFIRM,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_CONFIRM,
            payload: null
        });
    }
};

// Get user by id
export const getUserId = (id) => async (dispatch) => {
    dispatch(setUserLoading());
    try {
        const res = await axios.get(`/api/admin/user/${id}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

// Confirm
export const confirmUser = (id) => async (dispatch) => {
    dispatch(setUserLoading());
    try {
        const res = await axios.get(`/api/admin/confirmUser/${id}`);
        dispatch({
            type: CONFIRM_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

// Unconfirm
export const UnConfirmUser = (id) => async (dispatch) => {
    dispatch(setUserLoading());
    try {
        const res = await axios.get(`/api/admin/unConfirm/${id}`);
        dispatch({
            type: UNCONFIRM_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

// delete user
export const delUser = (id) => async (dispatch) => {
    dispatch(setUserLoading());
    try {
        const res = await axios.delete(`/api/admin/del/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

// User loading
export const setUserLoading = () => {
    return {
        type: ADMIN_LOADING
    };
};
