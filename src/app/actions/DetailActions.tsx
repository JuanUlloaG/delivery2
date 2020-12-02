import { SendBagToOrder, SendBagToOrderFail, SendBagToOrderSuccess, Restart } from "../types/DetailParamList";
import { PostBags } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";



export const postBagsAction = (bags: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(postBag());
        // dispatch(fetchItemsSuccess([]));
        PostBags(bags).then((response: any) => {
            if (response.success) dispatch(fetchItemsSuccess(response.message));
            else { dispatch(fetchItemsFail(response.message)); }
        })
    }
}

export const postBag = (): SendBagToOrder => ({
    type: 'REQUEST_BAG',
});

export const RestartAction = (): Restart => ({
    type: 'REQUEST_BAG_RESTART',
});



export const fetchItemsSuccess = (message: string): SendBagToOrderSuccess => ({
    type: 'REQUEST_BAG_SUCCESS',
    data: { message: message, error: false }
});

export const fetchItemsFail = (message: string): SendBagToOrderFail => ({
    type: 'REQUEST_BAG_FAIL',
    data: { message: message, error: true }
});