import { UpdateShop, AuthClear as ClearState, AuthUnverifiedUserAction, AuthVerifyUserAction, AuthLogOutUserAction, AuthLoginUserAction, AuthLoginAction, AuthLoginActionSuccess, AuthLoginActionFail, AuthClearError, UpdateState } from "../types/AuthParamLIst";
import { login, updateUser } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";

export type AuthType = AuthUnverifiedUserAction | UpdateShop | ClearState | AuthVerifyUserAction | AuthLogOutUserAction | AuthLoginUserAction | AuthLoginAction | AuthLoginActionSuccess | AuthLoginActionFail | AuthClearError | UpdateState;

export const loginAction = (user: { user: string, password: string }) => {
    return (dispatch: Dispatch<Action>) => {
        let fakeUser = { user: user.user, password: user.password };
        login(user.user, user.password).then((response: any) => {
            if (response.success)
                dispatch(loginUserSuccess(response.fakeuser.name, response.fakeuser.id, response.fakeuser.email, response.fakeuser.token, response.fakeuser.profile, response.fakeuser.company, "", response.fakeuser.message, response.fakeuser.state));
            else {
                dispatch(loginUserFail(response.fakeuser.message));
            }
        });
    };
}

export const updateStateAction = (state: boolean) => {
    return (dispatch: Dispatch<Action>) => {
        updateUser(state).then((response: any) => {
            if (response.success)
                dispatch(loginUserSuccess(response.fakeuser.name, response.fakeuser.id, response.fakeuser.email, response.fakeuser.token, response.fakeuser.profile, response.fakeuser.company, "", response.fakeuser.message, response.fakeuser.state));
            else {
                dispatch(loginUserFail(response.fakeuser.message));
            }
        });
    };
}

export const unverifiedUser = (email: string): AuthUnverifiedUserAction => ({
    type: 'UNVERIFIED_USER',
    email: email
});


export const updateShop = (shop: { key: string, description: string }): UpdateShop => ({
    type: 'UPDATE_SHOP',
    shop: shop
});

export const updateState = (state: boolean): UpdateState => ({
    type: 'UPDATE_STATE',
    state: state
});

export const AuthClear = (): AuthClearError => ({
    type: 'CLEAR_ERROR',
});

export const AuthClearState = (): ClearState => ({
    type: 'CLEAR_STATE',
});

export const verifyUser = (name: string): AuthVerifyUserAction => ({
    type: 'VERIFY_USER',
    name: name
});

export const loginUser = (
    name: string,
    id: string,
    email: string,
    token: string,
    profile: { key: string, description: string },
    company: { id: string, name: string },
    shop: { key: string, description: string },
    message: string, state: boolean
): AuthLoginUserAction => ({
    type: 'LOGIN_USER',
    data: { name: name, id: id, email: email, token: token, profile: profile, company: company, shop: shop, message: message, state: state }
});

export const logOutUser = (): AuthLogOutUserAction => ({
    type: 'LOGOUT_USER',
    data: { name: "", id: "", email: "", token: "", profile: { key: "", description: "" }, company: { id: '', name: '' }, shop: { key: '', description: '' }, message: "", state: false }
});

export const loginFetch = (): AuthLoginAction => ({
    type: 'FETCHING_LOGIN',
});

export const loginUserSuccess = (
    name: string,
    id: string,
    email: string,
    token: string,
    profile: { key: string, description: string },
    company: { id: string, name: string },
    shop: { key: string, description: string },
    message: string,
    state: boolean
): AuthLoginActionSuccess => ({
    type: 'FETCHING_LOGIN_SUCCESS',
    data: { name: name, id: id, email: email, token: token, profile: profile, company: company, shop: shop, message: message, state: state }
});

export const loginUserFail = (error: string): AuthLoginActionFail => ({
    type: 'FETCHING_LOGIN_FAIL',
    data: { name: "", id: "", email: "", token: "", profile: { key: "", description: "" }, company: { id: '', name: '' }, shop: { key: '', description: '' }, error: true, message: error, state: false }
});