import { FetchList, FetchListFail, FetchListSuccess, FetchDetail, FetchDetailFail, FetchDetailSuccess } from "../types/HomeParamaList";

type HomeAction =
    | FetchList
    | FetchListFail
    | FetchListSuccess
    | FetchDetail
    | FetchDetailFail
    | FetchDetailSuccess


export interface State {
    data: [];
    isFetching: Boolean;
    error: Boolean,
    canTake: Boolean,
}


const defaultState: State = {
    data: [],
    isFetching: false,
    error: false,
    canTake: false
};

const homeReducer = (state: State = defaultState, action: HomeAction): State => {
    switch (action.type) {
        case 'FETCHING_LIST':
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case 'FETCH_LIST_SUCCESS':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: false
            }
        case 'FETCHING_LIST_FAIL':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: true
            }
        case 'FETCHING_ORDER_DETAIL':
            return {
                ...state,
                canTake: false
            }
        case 'FETCHING_ORDER_DETAIL_FAIL':
            return {
                ...state,
                canTake: false
            }
        case 'FETCHING_ORDER_DETAIL_SUCCESS':
            return {
                ...state,
                canTake: true
            }
        default:
            return state
    }
};

export default homeReducer