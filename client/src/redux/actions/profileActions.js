import axios from 'axios';

import { 
    GET_PROFILE, 
    PROFILE_LOADING, 
    CLEAR_CURRENT_PROFILE, 
    GET_PROFILES, 
    SET_CURRENT_USER,
    GET_ERRORS
} from './types';

// Get Current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading);
    axios.get('/api/profile')
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        });
}

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        })
}

// Get all profile
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
        .then((res) => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
        })
}

// Edit profile 
export const editProfile = (user, history) => dispatch => {
    axios.post('/api/profile/edit', user)
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
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

// Upload image 
export const uploadImage = (userImage) => dispatch => {
    axios.post('/api/profile/upload', userImage)
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
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

// Delete account, profile, post
export const deleteAccount = () => dispatch => {
    axios.delete('/api/profile/delete')
        .then((res) => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};