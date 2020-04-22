import {
    ADD_BOOK,
    CANCEL_BOOK,
    GET_BOOK,
    GET_POST_BOOK,
    GET_USER_BOOK,
    CHECK_BOOK,
    BOOK_LOADING,
    GET_BOOKS
} from '../actions/types'

const initialState = {
    book: {},
    bookPost: [],
    bookUser: [],
    books: [],
    check: [],
    loading: false
}

export default (state = initialState, action)  => {
    switch (action.type) {
        case BOOK_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_BOOK:
            return {
                ...state,
                book: action.payload,
                loading: false
            }
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            }
        case ADD_BOOK:
            return {
                ...state,
                bookPost: [action.payload, ...state.bookPost],
                loading: false
            }
        case GET_POST_BOOK:
            return {
                ...state,
                bookPost: action.payload,
                loading: false
            }
        case GET_USER_BOOK:
            return {
                ...state,
                bookUser: action.payload,
                loading: false
            }
        case CANCEL_BOOK: 
            return {
                ...state,
                loading: false
            }
        case CHECK_BOOK: 
            return {
                ...state,
                check: action.payload,
                loading: false
            }
        default:
            return state;
    }
}