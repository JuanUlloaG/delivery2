import React, { useContext } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Antdesing from "react-native-vector-icons/AntDesign";
import { DetailParamList } from '../types/DetailParamList';
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

interface DetailStackProps {

}

const Stack = createStackNavigator<DetailParamList>()

export const DetailStack: React.FC<DetailStackProps> = ({ navigation, route }) => {
    const { logout, getProfile } = useContext(AuthContext)
    const platform = Platform.OS
    const mode = platform === "ios" ? "modal" : "card"
    const scOptions = platform === "ios" ? {
        ...TransitionPresets.ModalPresentationIOS,
        gestureEnabled: true,
        cardOverlayEnabled: true,
    } : {}



    const getComponent = () => {
        switch (getProfile()) {
            case (2).toString():
                return Detail
            case (3).toString():
                return DeliveryDetail
            case (4).toString():
                return DetailAddres
            default:
                return Detail
        }
    }
    const getTitle = () => {
        switch (getProfile()) {
            case (2).toString():
                return "Detalle"
            case (3).toString():
                return "Ordenes a despachar"
            case (4).toString():
                return "Detalle"
            default:
                return "Detalle"
        }
    }
    const getName = () => {
        switch (getProfile()) {
            case (2).toString():
                return "Detail"
            case (2).toString():
                return "Detail"
            case (2).toString():
                return "Detail"
            default:
                return "Detail"
        }
    }
    const component = getComponent()
    const title = getTitle()
    const name = getName()
    return (
        <Stack.Navigator mode={mode} screenOptions={scOptions}>
            <Stack.Screen name={"DeliveryDetail"} component={DeliveryDetail} options={(navigation) => ({
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
                headerTitle: "Detalles",
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
            <Stack.Screen name={"Detail"} component={Detail} options={(navigation) => ({
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
                headerTitle: "Detalle",
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
            {/* <Stack.Screen name={"HomeAddres"} component={HomeAddres} options={(navigation) => ({
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
            } /> */}
            <Stack.Screen name={"DetailAddToBag"} component={DetailAddToBag} options={(navigation) => ({
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
                headerTitle: "Detalle",
                // headerLeft: () => (
                //     // platform == "ios" &&
                //     <TouchableOpacity onPress={() => navigation.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                //         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                //             <Antdesing name='left' size={24} color={colors.white} />
                //         </View>
                //     </TouchableOpacity>
                // )
            })
            } />
            <Stack.Screen name={"ResumeDetail"} component={ResumeDetail} options={(navigation) => ({
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
                headerTitle: "Detalle",
                // headerLeft: () => (
                //     // platform == "ios" &&
                //     <TouchableOpacity onPress={() => navigation.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                //         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                //             <Antdesing name='left' size={24} color={colors.white} />
                //         </View>
                //     </TouchableOpacity>
                // )
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
            <Stack.Screen name={"Delivery"} component={Delivery} options={(navigation) => ({
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
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
    );
}