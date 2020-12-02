import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from '../types/AppParamList';
import Ionicons from "react-native-vector-icons/Ionicons";
import Antdesing from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Feather";
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStack';
import Search from '../scenes/Search/Search';

import { DeliveryStack } from './DeliveryStack';

import { useIsFocused } from '@react-navigation/native';

import colors from '../assets/Colors';
import { AuthContext } from "../providers/AuthProvider";
import { SearchStack } from './SearchStack';

interface AppTabProps {

}

const Tabs = createBottomTabNavigator<AppParamList>()

export const AppTab: React.FC<AppTabProps> = ({ }) => {
    const { logout, getProfile } = useContext(AuthContext)

    const returnParams = () => {
        switch (getProfile().toString()) {
            case "2":
                return "search1"
            case "3":
                return "shoppingcart"

            default:
                return "search1"
        }
    }
    const getname = () => {
        switch (getProfile().toString()) {
            case "2":
                return "Pickear"
            case "3":
                return "Recepción"

            default:
                return "Pickear"
        }
    }


    return (
        <Tabs.Navigator initialRouteName="Pickear"
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Pickear') {
                        iconName = 'shopping-basket'
                        return <FontAwesome name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Buscar') {
                        iconName = returnParams();
                        return <Antdesing name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'user' : 'user';
                        return <Antdesing name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Entrega') {
                        iconName = returnParams();
                        return <Antdesing name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Recepción') {
                        iconName = "shopping-bag"
                        return <Icon name={iconName} size={size} color={color} />;
                    }
                    // You can return any component that you like here!
                },
            })}

            tabBarOptions={{
                activeTintColor: colors.darkYellow,
                inactiveTintColor: colors.gray,
                keyboardHidesTabBar: true,
                style: { backgroundColor: '#f9f9f9' }


            }}
        >
            <Tabs.Screen name={getname()} component={HomeStack} />
            {
                getProfile() == "2" ?
                    <Tabs.Screen name='Buscar' component={SearchStack} /> :
                    <Tabs.Screen name='Entrega' component={DeliveryStack} />
            }
            <Tabs.Screen name='Perfil' component={ProfileStack} />
        </Tabs.Navigator>
    );
}