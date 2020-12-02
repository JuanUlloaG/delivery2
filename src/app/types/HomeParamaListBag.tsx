import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type HomeParamListBag = {
    Home: undefined;
    HomeAddres: undefined;
    HomeDelivery: undefined;
    Detail: {
        name: string
    };
    Edit: {
        name: string,
        submit?: React.MutableRefObject<() => void>
    };
}

export type FetchListSuccess = {
    type: 'FETCH_LIST_SUCCESS';
    data: [];
}
export type UpdateBagClear = {
    type: 'FETCH_BAG_CLEAR';
}
export type UpdateBag = {
    type: 'FETCH_BAG_UPDATE';
}

export type UpdateBagSuccess = {
    type: 'FETCH_UPDATE_SUCCESS';
}

export type UpdateBagFail = {
    type: 'FETCH_UPDATE_FAIL';
}

export type FetchListFail = {
    type: 'FETCHING_LIST_FAIL';
    data: [];
}

export type FetchList = {
    type: 'FETCHING_LIST';
}






export type HomeNavProps<T extends keyof HomeParamListBag> = {
    navigation: StackNavigationProp<HomeParamListBag, T>;
    route: RouteProp<HomeParamListBag, T>;
}