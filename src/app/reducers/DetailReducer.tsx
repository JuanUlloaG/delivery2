import { SendBagToOrder, SendBagToOrderFail, SendBagToOrderSuccess, Restart } from "../types/DetailParamList";

type DetailAction =
    | SendBagToOrder
    | SendBagToOrderFail
    | SendBagToOrderSuccess
    | Restart


interface State {
    message: String
    isFetching: Boolean;
    success: Boolean;
    error: Boolean
}


const defaultState: State = {
    message: "",
    isFetching: false,
    success: false,
    error: false,
};

const DetailReducer = (state: State = defaultState, action: DetailAction): State => {
    switch (action.type) {
        case 'REQUEST_BAG':
            return {
                ...state,
                message: "",
                isFetching: true,
                success: false,
                error: false
            }
        case 'REQUEST_BAG_SUCCESS':
            return {
                ...state,
                message: action.data.message,
                isFetching: false,
                success: true,
                error: false
            }
        case 'REQUEST_BAG_FAIL':
            return {
                ...state,
                message: action.data.message,
                isFetching: false,
                success: false,
                error: true
            }
        case 'REQUEST_BAG_RESTART':
            return {
                ...state,
                message: "",
                isFetching: false,
                success: false,
                error: false
            }
        default:
            return state
    }
};

export default DetailReducer