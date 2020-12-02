import { FetchShopList, FetchShopListFail, FetchShopListSuccess } from "../types/ShopParamList";

type ShopAction =
    | FetchShopList
    | FetchShopListFail
    | FetchShopListSuccess;


interface State {
    data: [];
    isFetching: Boolean;
    error: Boolean
}


const defaultState: State = {
    data: [],
    isFetching: false,
    error: false
};

const shopReducer = (state: State = defaultState, action: ShopAction): State => {
    switch (action.type) {
        case 'FETCHING_LIST':
            return {
                ...state,
                data: [],
                isFetching: true,
                error: false
            }
        case 'FETCH_SHOP_LIST_SUCCESS':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: false
            }
        case 'FETCH_SHOP_LIST_FAIL':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: true
            }
        default:
            return state;
    }
};

export default shopReducer