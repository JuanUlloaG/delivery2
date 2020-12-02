import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, TouchableOpacity, FlatList, Button, View, Platform } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { HomeParamList, HomeNavProps } from '../types/HomeParamaList';
import Home from '../scenes/Home/Home';
import HomeAddres from '../scenes/Delivery/HomeAddres';
import HomeDelivery from '../scenes/Home/HomeDelivery';
import { DetailStack } from './DetailStack';
import { Size } from '../services/Service';
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';


interface HomeStackProps {

}

const Stack = createStackNavigator<HomeParamList>()
const Stack2 = createStackNavigator<HomeParamList>()

function HomeNavigator({ navigation, route }) {
    const { logout, getProfile, getShop } = useContext(AuthContext)

    const getComponent = () => {
        switch (getProfile()) {
            case (2).toString():
                return Home
            case (3).toString():
                return HomeDelivery
            case (4).toString():
                return HomeDelivery
            default:
                return Home
        }
    }
    const getTitle = () => {
        switch (getProfile()) {
            case (2).toString():
                return "Lista de pedidos"
            case (3).toString():
                return "Recepcion de pedidos"
            case (4).toString():
                return "Delivery"
            default:
                return "Lista de pedidos"
        }
    }
    const getName = () => {
        switch (getProfile()) {
            case (2).toString():
                return "Home"
            case (3).toString():
                return "HomeAddres"
            case (4).toString():
                return "HomeDelivery"
            default:
                return "Home"
        }
    }
    const component = getComponent()
    const title = getTitle()
    const name = getName()

    return (
        <Stack2.Navigator initialRouteName={name}>
            <Stack2.Screen name={name} component={component} options={(navigation) => ({
                headerTitle: title,
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
                headerStatusBarHeight: Platform.OS == 'ios' ? Size(150) : Size(35)
            })
            } />
        </Stack2.Navigator>
    )
}


export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const { logout } = useContext(AuthContext)
    return (
        <Stack.Navigator initialRouteName='Home' headerMode='none'>
            <Stack.Screen name='Home' component={HomeNavigator} />
            <Stack.Screen name="Detail" component={DetailStack} />
        </Stack.Navigator>
    );
}