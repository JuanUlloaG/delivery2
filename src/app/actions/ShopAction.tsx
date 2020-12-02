import { FetchShopList, FetchShopListFail, FetchShopListSuccess } from "../types/ShopParamList";
import { ShopList } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";



export const getShopItems = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(getShopList());
        ShopList().then((response: any) => {
            if (response.length) dispatch(fetchItemsSuccess(response));
            else { dispatch(fetchItemsFail()); }
        })
    }
}

export const getShopList = (): FetchShopList => ({
    type: 'FETCHING_LIST',
});

export const fetchItemsSuccess = (products: []): FetchShopListSuccess => ({
    type: 'FETCH_SHOP_LIST_SUCCESS',
    data: products
});

export const fetchItemsFail = (): FetchShopListFail => ({
    type: 'FETCH_SHOP_LIST_FAIL',
    data: []
});