import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from '../types/AuthParamLIst';
import { Login } from '../scenes/Login/Login';
import Shop from '../scenes/Login/Shop';
import { Register } from '../scenes/Register/Register';
import { AuthContext } from '../providers/AuthProvider';
import { StackActions } from '@react-navigation/native';
import { AppTab } from './AppTab';

interface AuthStackProps {

}

const Stack = createStackNavigator<AuthParamList>()

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
    const { logout, getProfile, getShop, getToken } = useContext(AuthContext)

    const getComponent = () => {
        if (getShop() == "" && getToken()) return Shop
        return Login
    }
    const getTitle = () => {
        if (getShop() == "" && getToken()) return 'Login'
        return 'Login'
    }
    const getName = () => {
        if (getShop() == "" && getToken()) return 'Shop'
        return 'Login'
    }
    const component = getComponent()
    const title = getTitle()
    const name = getName()


    return (
        <Stack.Navigator initialRouteName={name}>
            <Stack.Screen options={{ headerTitle: "Login" }} name={"Login"} component={Login} />
            <Stack.Screen options={{ headerTitle: "Register" }} name="Register" component={Register} />
        </Stack.Navigator>
    );
}

interface ShopStackProps {

}

const ShopStackCreator = createStackNavigator<AuthParamList>()

export const ShopStack: React.FC<ShopStackProps> = ({ }) => {
    const { logout, getProfile, getShop, getToken } = useContext(AuthContext)

    return (
        <ShopStackCreator.Navigator initialRouteName={"Shop"} headerMode={"none"}>
            <ShopStackCreator.Screen options={{ headerTitle: "Tienda" }} name={"Shop"} component={Shop} />
            <ShopStackCreator.Screen component={AppTab} name={"AppTab"} />
        </ShopStackCreator.Navigator>
    );
}