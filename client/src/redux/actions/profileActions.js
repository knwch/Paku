import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_PROFILES,
    SET_CURRENT_USER,
    ADD_IDCARD,
    GET_ERRORS,
} from './types';

// Get Current profile
export const getCurrentProfile = () => async (dispatch) => {
    dispatch(setProfileLoading);
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_PROFILE,
            payload: {},
        });
    }
};

// Get profile by handle
export const getProfileByHandle = (handle) => async (dispatch) => {
    dispatch(setProfileLoading());
    try {
        const res = await axios.get(`/api/profile/handle/${handle}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_PROFILE,
            payload: null,
        });
    }
};

// Get all profile
export const getProfiles = () => async (dispatch) => {
    dispatch(setProfileLoading());
    try {
        const res = await axios.get('/api/profile/alluser');
        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_PROFILES,
            payload: null,
        });
    }
};

// Edit profile
export const editProfile = (user, history) => async (dispatch) => {
    try {
        const res = await axios.post('/api/profile/edit', user);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Upload image
export const uploadImage = (userImage) => async (dispatch) => {
    try {
        const res = await axios.post('/api/profile/upload', userImage);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Delete account, profile, post
export const deleteAccount = () => async (dispatch) => {
    try {
        const res = await axios.delete('/api/profile/delete');
        dispatch({
            type: SET_CURRENT_USER,
            payload: {},
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Add IdCard
export const addIDcard = (dataUser) => async (dispatch) => {
    try {
        const res = await axios.post('/api/users/confirm', dataUser);
        dispatch({
            type: ADD_IDCARD,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Get idCard
export const getIDcard = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/users/infoCard');
        dispatch({
            type: ADD_IDCARD,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    };
};
