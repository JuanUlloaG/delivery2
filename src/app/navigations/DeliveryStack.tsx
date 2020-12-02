import React, { useContext } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Antdesing from "react-native-vector-icons/AntDesign";
import { DeliveryParamList } from '../types/DeliveryParamList';
import { Button, View, Text, Platform } from 'react-native';
import Detail from '../scenes/Detail/Detail';
import ResumeDetail from '../scenes/Detail/ResumeDetail';
import DetailAddToBag from '../scenes/Detail/DetailAddToBag';
import DetailAddres from '../scenes/Detail/DetailAddres';
import DeliveryDetail from '../scenes/Detail/DeliveryDetail';
import DetailMap from '../scenes/Detail/DetailMap';
import HomeAddres from '../scenes/Delivery/HomeAddres';
import Delivery from '../scenes/Detail/Delivery';
import { Edit } from '../scenes/Edit/Edit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';
import { Size } from '../services/Service';
import { AuthContext } from '../providers/AuthProvider';
import DeliveryReception from '../scenes/Delivery/DeliveryReception';

interface DetailStackProps {

}

const Stack = createStackNavigator<DeliveryParamList>()

export const DeliveryStack: React.FC<DetailStackProps> = ({ navigation, route }) => {
    const { logout, getProfile } = useContext(AuthContext)
    const platform = Platform.OS
    const mode = platform === "ios" ? "modal" : "card"
    const scOptions = platform === "ios" ? {
        ...TransitionPresets.ModalPresentationIOS,
        gestureEnabled: true,
        cardOverlayEnabled: true,
    } : {}


    return (
        <Stack.Navigator mode={mode} screenOptions={scOptions} initialRouteName={"HomeAddres"}>
            <Stack.Screen name={"HomeAddres"} component={HomeAddres} options={(navigation) => ({
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
                headerStatusBarHeight: Platform.OS == 'ios' ? Size(150) : Size(35),
                headerTitle: "Entrega"
            })
            } />


            <Stack.Screen name={"DetailAddres"} component={DetailAddres} options={(navigation) => ({
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    marginRight: 50,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
                headerStatusBarHeight: Platform.OS == 'ios' ? Size(150) : Size(35),
                headerTitle: "Delivery",
                // headerRight: () => (

                // ),
                headerLeft: () => (
                    // platform == "ios" &&
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Antdesing name='left' size={24} color={colors.white} />
                        </View>
                    </TouchableOpacity>
                )
            })
            } />

            <Stack.Screen name={"DetailMap"} component={DetailMap} options={(navigation) => ({
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    marginRight: 50,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
                headerStatusBarHeight: Platform.OS == 'ios' ? Size(150) : Size(35),
                headerTitle: "Mapa",
                // headerRight: () => (

                // ),
                headerLeft: () => (
                    // platform == "ios" &&
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Antdesing name='left' size={24} color={colors.white} />
                        </View>
                    </TouchableOpacity>
                )
            })
            } />
            <Stack.Screen name={"Delivery"} component={Delivery} options={(navigation) => ({
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitle: "Detalle Delivery",
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    marginRight: 50,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
                headerStatusBarHeight: Platform.OS == 'ios' ? Size(150) : Size(35),
                // headerRight: () => (

                // ),
                headerLeft: () => (
                    // platform == "ios" &&
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Antdesing name='left' size={24} color={colors.white} />
                        </View>
                    </TouchableOpacity>
                )
            })
            } />
            <Stack.Screen name={"DeliveryReception"} component={DeliveryReception} options={(navigation) => ({
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    marginRight: 50,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
                headerStatusBarHeight: Platform.OS == 'ios' ? Size(150) : Size(35),
                headerTitle: "Detalle Delivery",
                // headerRight: () => (

                // ),
                headerLeft: () => (
                    // platform == "ios" &&
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Antdesing name='left' size={24} color={colors.white} />
                        </View>
                    </TouchableOpacity>
                )
            })
            } />
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
    );
}
