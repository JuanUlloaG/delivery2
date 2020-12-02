import { SendOrderState, SendOrderStateSuccess, SendOrderStateFail, ClearState } from "../types/DeliveryParamList";

type DeliveryAction =
    | SendOrderState
    | SendOrderStateSuccess
    | SendOrderStateFail
    | ClearState


export interface StateDelivery {
    isFetching: Boolean;
    error: Boolean;
    success: Boolean;
    message: String;
}


const defaultState: StateDelivery = {
    isFetching: false,
    error: false,
    success: false,
    message: "",
};

const DeliveryReducer = (state: StateDelivery = defaultState, action: DeliveryAction): StateDelivery => {
    switch (action.type) {
        case 'REQUEST_STATE':
            return {
                ...state,
                isFetching: true,
                error: false,
                success: false,
            }
        case 'REQUEST_STATE_SUCCESS':
            return {
                ...state,
                isFetching: false,
                error: false,
                success: true,
                message: "Estado actualizado correctamente"
            }
        case 'REQUEST_STATE_FAIL':
            return {
                ...state,
                isFetching: false,
                error: true,
                success: false,
                message: "Error al actualizar el estado"
            }
        case 'REQUEST_STATE_CLEAR':
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

export default DeliveryReducer