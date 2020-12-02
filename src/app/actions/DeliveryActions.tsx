import { SendOrderState, SendOrderStateFail, SendOrderStateSuccess, ClearState } from "../types/DeliveryParamList";
import { UpdateOrderState } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";



export const updateStateAction = (id: string, state: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(setStateRequest());
        UpdateOrderState(id, state).then((response: any) => {
            if (response) dispatch(setStateRequestSuccess());
            else { dispatch(setStateRequestFail()); }
        })
    }
}

export const setStateRequest = (): SendOrderState => ({
    type: 'REQUEST_STATE',
});

export const clearStateRequest = (): ClearState => ({
    type: 'REQUEST_STATE_CLEAR',
});

export const setStateRequestSuccess = (): SendOrderStateSuccess => ({
    type: 'REQUEST_STATE_SUCCESS',
});

export const setStateRequestFail = (): SendOrderStateFail => ({
    type: 'REQUEST_STATE_FAIL',
});