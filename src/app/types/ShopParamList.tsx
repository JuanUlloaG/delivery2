import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type ShopParamList = {
    Shop: undefined
}

export type FetchShopListSuccess = {
    type: 'FETCH_SHOP_LIST_SUCCESS';
    data: [];
}

export type FetchShopListFail = {
    type: 'FETCH_SHOP_LIST_FAIL';
    data: [];
}

export type FetchShopList = {
    type: 'FETCHING_LIST';
}


export type ShopNavProps<T extends keyof ShopParamList> = {
    navigation: StackNavigationProp<ShopParamList, T>;
    route: RouteProp<ShopParamList, T>;
}