import {
    GET_USER,
    GET_CONFIRM,
    CONFIRM_USER,
    GET_USERS,
    UNCONFIRM_USER,
    ADMIN_LOADING,
    DELETE_USER
} from '../actions/types';

const initialState = {
    user: {},
    users: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADMIN_LOADING: {
            return {
                ...state,
                loading: true
            };
        }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_CONFIRM:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case CONFIRM_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case UNCONFIRM_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user._id !== action.payload
                ),
                loading: false
            };
        default:
            return state;
    }
}
