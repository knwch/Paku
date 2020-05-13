import isEmpty from '../../validation/is-empty';

import { SET_CURRENT_USER, USER_LOADING, SET_USER_LOADING } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING: 
            return {
                ...state,
                loading: true
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            };
        case SET_USER_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}