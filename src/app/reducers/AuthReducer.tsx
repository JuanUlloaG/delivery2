import { AuthUnverifiedUserAction, AuthClear, UpdateShop, AuthVerifyUserAction, AuthLogOutUserAction, AuthLoginUserAction, AuthLoginAction, AuthLoginActionSuccess, AuthLoginActionFail, AuthClearError, UpdateState } from "../types/AuthParamLIst";

type AuthAction =
    | AuthUnverifiedUserAction
    | AuthVerifyUserAction
    | UpdateShop
    | AuthLogOutUserAction
    | AuthLoginAction
    | AuthLoginActionSuccess
    | AuthLoginActionFail
    | AuthClearError
    | UpdateState
    | AuthClear
    | AuthLoginUserAction;


export interface State {
    name: string;
    id: string
    email: string;
    token: string;
    profile: { key: string, description: string };
    isFetching: boolean;
    error: boolean,
    shop: { key: string, description: string },
    state: boolean,
    success: boolean,
    company: { id: string, name: string },
    message: string
}


const defaultState: State = {
    name: '',
    id: '',
    email: '',
    token: '',
    profile: { key: '', description: '' },
    shop: { key: '', description: '' },
    company: { id: "", name: "" },
    message: '',
    state: false,
    success: false,
    isFetching: false,
    error: false
};

const authReducer = (state: State = defaultState, action: AuthAction): State => {
    switch (action.type) {
        case 'VERIFY_USER':
            return state
        case 'LOGIN_USER':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                state: action.data.state,
                shop: { key: '', description: '' },
                message: "",
                isFetching: true,
                success: false,
                error: false
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                shop: action.data.shop,
                message: action.data.message,
                state: action.data.state,
                isFetching: false,
                success: false,
                error: false
            }
        case 'UPDATE_SHOP':
            return {
                ...state,
                shop: action.shop
            }
        case 'UPDATE_STATE':
            return {
                ...state,
                state: action.state,
                success: true
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: false
            }
        case 'CLEAR_STATE':
            return {
                ...state,
                success: false,
                isFetching: false,
                error: false
            }
        case 'UNVERIFIED_USER':
            return state;
        case 'FETCHING_LOGIN':
            return {
                ...state,
                name: "",
                id: "",
                email: "",
                token: "",
                profile: { key: '', description: '' },
                company: { id: "", name: "" },
                shop: { key: '', description: '' },
                message: "",
                isFetching: true,
                error: false,
                success: false,
                state: false
            }
        case 'FETCHING_LOGIN_SUCCESS':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                isFetching: false,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                state: action.data.state,
                shop: { key: '', description: '' },
                message: action.data.message,
                error: false,
                success: false
            }
        case 'FETCHING_LOGIN_FAIL':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                isFetching: false,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                shop: action.data.shop,
                state: action.data.state,
                message: action.data.message,
                error: action.data.error,
                success: false,
            }
        default:
            return state;
    }
};

export default authReducer