import { FetchList, FetchListFail, FetchListSuccess, UpdateBag, UpdateBagFail, UpdateBagSuccess, UpdateBagClear } from "../types/HomeParamaListBag";

type HomeBagAction =
    | FetchList
    | FetchListFail
    | FetchListSuccess
    | UpdateBag
    | UpdateBagFail
    | UpdateBagSuccess
    | UpdateBagClear


interface State {
    data: [];
    isFetching: Boolean;
    error: Boolean;
    success: Boolean;
    message: string;
}


const defaultState: State = {
    data: [],
    isFetching: false,
    error: false,
    success: false,
    message: ""
};

const homeBagReducer = (state: State = defaultState, action: HomeBagAction): State => {
    switch (action.type) {
        case 'FETCHING_LIST':
            return {
                ...state,
                data: [],
                isFetching: true,
                error: false,
                success: false
            }
        case 'FETCH_LIST_SUCCESS':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: false,
                success: false
            }
        case 'FETCHING_LIST_FAIL':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: true,
                success: false
            }
        case 'FETCH_BAG_UPDATE':
            return {
                ...state,
                isFetching: true,
                error: false,
                success: false
            }
        case 'FETCH_UPDATE_SUCCESS':
            return {
                ...state,
                isFetching: true,
                error: false,
                success: true,
                message: "Pedido recepcionado exitosamente"
            }
        case 'FETCH_UPDATE_FAIL':
            return {
                ...state,
                isFetching: false,
                error: true,
                success: false,
                message: "Fallo la recepción del pedido"
            }
        case 'FETCH_BAG_CLEAR':
            return {
                ...state,
                isFetching: false,
                error: false,
                success: false,
                message: ""
            }
        default:
            return state
    }
};

export default homeBagReducer