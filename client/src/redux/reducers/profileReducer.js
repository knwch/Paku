import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    ADD_IDCARD,
    CLEAR_CURRENT_PROFILE,
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    idcard: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null,
                idcard: null
            }
        case ADD_IDCARD: 
            return {
                ...state,
                idcard: action.payload
            }
        default:
            return state;
    }
}