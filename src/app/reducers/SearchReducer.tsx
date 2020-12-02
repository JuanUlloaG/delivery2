import { FetchSearch, FetchSearchFail, FetchSearchSuccess } from "../types/SearchParamaList";

type SearchAction =
    | FetchSearchSuccess
    | FetchSearchFail
    | FetchSearch


interface State {
    data: {};
    isFetching: Boolean;
    error: Boolean;
    success: Boolean;
    message: String;
}


const defaultState: State = {
    data: {},
    isFetching: false,
    error: false,
    success: false,
    message: "",
};

const SearchReducer = (state: State = defaultState, action: SearchAction): State => {
    switch (action.type) {
        case 'FETCHING_SEARCH':
            return {
                ...state,
                isFetching: true,
                error: false,
                success: false,
                data: {}
            }
        case 'FETCH_SEARCH_SUCCESS':
            return {
                ...state,
                data: action.data.data,
                isFetching: false,
                error: false,
                success: true,
                message: action.data.message
            }
        case 'FETCHING_SEARCH_FAIL':
            return {
                ...state,
                data: action.data.data,
                isFetching: false,
                error: true,
                success: false,
                message: action.data.message
            }
        default:
            return state
    }
};

export default SearchReducer