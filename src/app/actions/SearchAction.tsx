import { FetchSearch, FetchSearchFail, FetchSearchSuccess } from "../types/SearchParamaList";
import { getOrderByNumber } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";



export const getOrderAction = (number: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(getOrderFetch());
        getOrderByNumber(number).then((response: any) => {
            if (response.success) dispatch(getOrderFetchSuccess(response.data, response.message));
            else { dispatch(getOrderFetchFail(response.message)); }
        })
    }
}

export const getOrderFetch = (): FetchSearch => ({
    type: 'FETCHING_SEARCH',
});

export const getOrderFetchSuccess = (order: {}, message: string): FetchSearchSuccess => ({
    type: 'FETCH_SEARCH_SUCCESS',
    data: { data: order, message: message }
});

export const getOrderFetchFail = (message: string): FetchSearchFail => ({
    type: 'FETCHING_SEARCH_FAIL',
    data: { data: {}, message: message }
});