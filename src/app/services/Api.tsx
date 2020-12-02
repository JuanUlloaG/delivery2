import AsyncStorage from "@react-native-community/async-storage";
import axios, { AxiosResponse } from "axios";
import store from "../store/Store";

let config = {
    headers: {
        'access-token': ''
    }
}

const devURL_ = 'https://pickingserver.azurewebsites.net'
const devURL = 'http://192.168.1.100:3000'

const getRoute = (profile: string) => {
    switch (profile) {
        case 2:
            return "/orders"
        case 3:
            return "/orders/delivery"
        case 4:
            return "/orders/delivery"

        default:
            return "/orders"
    }
}

export const HomeList = async () => {
    config.headers["access-token"] = store.getState().auth.token
    let route = "orders"
    route = getRoute(store.getState().auth.profile.key)
    console.log(store.getState().auth.company.id);
    let request = { profile: store.getState().auth.profile.key, company: store.getState().auth.company.id }
    return axios.post(devURL + '/orders', request, config).then((response: AxiosResponse) => {
        console.log(response);
        if (response.status == 200) {
            if (response.data.success) {
                return response.data.data;
            } else {
                return []
            }
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("HomeListBag: ", error.message);
    })
}

export const HomeListBag = async () => {
    config.headers["access-token"] = store.getState().auth.token
    let route = "orders"
    route = getRoute(store.getState().auth.profile.key)
    let request = { shopId: store.getState().auth.shop.key, deliveryId: store.getState().auth.id }
    return axios.post(devURL + '/orderBags/list', request, config).then((response: AxiosResponse) => {

        if (response.status == 200) {
            return response.data.data;
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("HomeListBag: ", error.message);
    })
}

export const HomeListBagTake = async () => {
    config.headers["access-token"] = store.getState().auth.token
    let route = "orders"
    route = getRoute(store.getState().auth.profile.key)
    let request = { shopId: store.getState().auth.shop.key }
    return axios.post(devURL + '/orderBags/listTake', request, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            return response.data;
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("HomeListBagTake: ", error.message);
    })
}

export const UpdateBag = async (id: string, orderId: string) => {
    config.headers["access-token"] = store.getState().auth.token
    let request = { id: id, deliveryId: store.getState().auth.id, orderId: orderId }
    return axios.post(devURL + '/orderBags/update', request, config).then((response: AxiosResponse) => {

        if (response.status == 200) {
            return response.data.success;
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("UpdateBag: ", error.message);
    })
}

export const UpdateOrderState = async (id: string, state: string) => {
    config.headers["access-token"] = store.getState().auth.token
    let request = { id: id, state: state }
    return axios.post(devURL + '/order/update/state', request, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            if (response.data.success) {
                return response.data.success;
            } else {
                return response.data.success;
            }
        }
        else {
            return false;
        }
    }).catch((error: Error) => {
        console.log("UpdateOrderState: ", error.message);
    })
}

export const takeOrder = async (id: string) => {
    config.headers["access-token"] = store.getState().auth.token
    let request = { id: id, pickerId: store.getState().auth.id, shopId: store.getState().auth.shop.key }
    return axios.post(devURL + '/orders/take', request, config).then((response: AxiosResponse) => {
        console.log("take:", response.data, devURL);
        if (response.status == 200) {
            return response.data.success;
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("takeOrder: ", error.message);
    })
}

export const leaveOrder = async (id: string) => {
    config.headers["access-token"] = store.getState().auth.token
    let request = { id: id }
    return axios.post(devURL + '/orders/leave', request, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            return response.data.success;
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("leaveOrder: ", error.message);
    })
}

export const getOrderByNumber = async (number: string) => {
    config.headers["access-token"] = store.getState().auth.token
    let request = { number: number }
    let responseCustom = { success: false, data: {}, message: "" }
    return axios.post(devURL + '/orderBags/list/all', request, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            if (response.data.success) {
                responseCustom.data = response.data
                responseCustom.success = response.data.success
                responseCustom.message = response.data.message
                return responseCustom;
            } else {
                responseCustom.data = response.data
                responseCustom.success = response.data.success
                responseCustom.message = response.data.message
                return responseCustom;
            }
        }
        else {
            return responseCustom;
        }
    }).catch((error: Error) => {
        console.log("getOrderByNumber: ", error.message);
    })
}

export const UpdateBagReceived = async (id: string, orderId: string, comment: string, received: string) => {
    config.headers["access-token"] = store.getState().auth.token
    let request = { id: id, orderId: orderId, comment: comment, received: received }
    return axios.post(devURL + '/orderBags/update/received', request, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            return response.data.success;
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("UpdateBagReceived: ", error.message);
    })
}

export const ShopList = async () => {
    config.headers["access-token"] = store.getState().auth.token
    let route = "orders"
    route = getRoute(store.getState().auth.profile.key)
    let query = { profile: store.getState().auth.profile.key, userCompany: store.getState().auth.company.id }
    return axios.post(devURL + '/shop/user', query, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            return response.data.data;
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("ShopList: ", error.message);
    })
}

export const PostBags = async (bags: any) => {
    config.headers["access-token"] = store.getState().auth.token
    let query = { profile: store.getState().auth.profile.key, userCompany: store.getState().auth.company.id }
    return axios.post(devURL + '/orderBags/save', bags, config).then((response: AxiosResponse) => {
        let res = { message: "", error: false, success: false }
        if (response.status == 200) {
            if (response.data.success) {
                res.message = response.data.message
                res.error = response.data.success
                res.success = response.data.success
                return res;
            } else {
                res.message = response.data.message
                res.error = response.data.success
                res.success = response.data.success
                return res;
            }
        }
        else {
            res.message = response.data.message
            res.error = response.data.success
            res.success = response.data.success
            return res;
        }
    }).catch((error: Error) => {
        console.log("PostBags: ", error.message);
    })
}

export const updateUser = async (state: boolean) => {
    config.headers["access-token"] = store.getState().auth.token
    let request = { id: getRoute(store.getState().auth.id), state: state }
    let user = { state: state, message: "" }
    return axios.post(devURL + '/users/updateState', request, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            if (response.data.success) {
                user.state = response.data.state
                user.message = response.data.message
                return user;
            } else {
                user.state = response.data.state
                user.message = response.data.message
                return user;
            }
        }
        else {
            return [];
        }
    }).catch((error: Error) => {
        console.log("updateUser: ", error.message);
    })
}


export const login = async (user: string, password: string) => {
    let params: {} = {
        "user": user,
        "password": password
    }
    config.headers["access-token"] = store.getState().auth.token
    let fakeuser = { name: user, id: "", email: user, token: "", profile: {}, company: { id: "", name: "" }, message: "", state: false }
    return axios.post(devURL + '/users/auth', params).then((response: AxiosResponse) => {
        if (response.status == 200) {
            if (response.data.success) {
                fakeuser.name = response.data.name
                fakeuser.email = response.data.email
                fakeuser.token = response.data.token
                fakeuser.profile = response.data.profile
                fakeuser.company = response.data.company
                fakeuser.message = response.data.message
                fakeuser.state = response.data.state
                fakeuser.id = response.data.id
                return { fakeuser: fakeuser, success: true };
            } else {
                fakeuser.message = response.data.message
                return { fakeuser: fakeuser, success: false };
            }
        }
        else {
            fakeuser.message = response.data.message
            return { fakeuser: fakeuser, success: false };
        }
    }).catch((error: Error) => {
        console.log("login: ", error.message);
    })
}



