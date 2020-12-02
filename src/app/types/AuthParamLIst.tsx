import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type AuthParamList = {
    Login: undefined
    Register: undefined,
    Started: undefined,
    Shop: undefined,
}

export interface AuthUnverifiedUserAction {
    type: 'UNVERIFIED_USER';
    email: string;
}
export interface UpdateShop {
    type: 'UPDATE_SHOP';
    shop: { key: string, description: string };
}

export interface UpdateState {
    type: 'UPDATE_STATE';
    state: boolean;
}

export interface AuthPass {
    user: { uuser: string, password: string }
}

export interface AuthVerifyUserAction {
    type: 'VERIFY_USER';
    name: string;
}

export interface AuthClearError {
    type: 'CLEAR_ERROR';
}

export interface AuthClear {
    type: 'CLEAR_STATE';
}

export interface AuthLoginUserAction {
    type: 'LOGIN_USER';
    data: { name: string, id: string, email: string, token: string, profile: { key: string, description: string }, company: { id: string, name: string }, shop: { key: string, description: string }, message: string, state: boolean };
}
export interface AuthLogOutUserAction {
    type: 'LOGOUT_USER';
    data: { name: string, id: string, email: string, token: string, profile: { key: string, description: string }, company: { id: string, name: string }, shop: { key: string, description: string }, message: string, state: boolean };
}


export interface AuthLoginAction {
    type: 'FETCHING_LOGIN';
}

export interface AuthLoginActionSuccess {
    type: 'FETCHING_LOGIN_SUCCESS';
    data: { name: string, id: string, email: string, token: string, profile: { key: string, description: string }, company: { id: string, name: string }, shop: { key: string, description: string }, message: string, state: boolean };
}

export interface AuthLoginActionFail {
    type: 'FETCHING_LOGIN_FAIL';
    data: { name: string, id: string, email: string, token: string, profile: { key: string, description: string }, company: { id: string, name: string }, shop: { key: string, description: string }, message: string, error: boolean, state: boolean };
}

export type AuthNavProps<T extends keyof AuthParamList> = {
    navigation: StackNavigationProp<AuthParamList, T>;
    route: RouteProp<AuthParamList, T>;
}