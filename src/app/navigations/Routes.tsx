import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Center } from '../components/Center';
import { AuthContext } from "../providers/AuthProvider";
import { AppTab } from './AppTab';
import { AuthStack, ShopStack } from './AuthStack';
import store from '../store/Store';

interface RoutesProps {

}


export const Routes: React.FC<RoutesProps> = ({ }) => {
    const { user, login, getToken, getShop } = useContext(AuthContext)
    const [loading, setloading] = useState(true);
    const isLoading = store.getState().auth.isFetching
    useEffect(() => {
        AsyncStorage.getItem('user').then(userString => {
            if (getToken()) {
                // work with them
                login()
            }
            setloading(false)

        }).catch(error => {
            setloading(false)
        })
    }, [])
    if (loading || isLoading) {
        return (
            <Center>
                <ActivityIndicator size='large' />
            </Center>
        )
    }

    return (
        <NavigationContainer>
            {getToken() ? <ShopStack /> : <AuthStack />}
        </NavigationContainer>
    );
}