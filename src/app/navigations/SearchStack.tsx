import React, { useContext } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Antdesing from "react-native-vector-icons/AntDesign";
import { SearchParamList } from '../types/SearchParamaList';
import { Button, View, Text, Platform } from 'react-native';
import Detail from '../scenes/Detail/Detail';
import ResumeDetail from '../scenes/Detail/ResumeDetail';
import DetailAddToBag from '../scenes/Detail/DetailAddToBag';
import DetailAddres from '../scenes/Detail/DetailAddres';
import DeliveryDetail from '../scenes/Detail/DeliveryDetail';
import DetailMap from '../scenes/Detail/DetailMap';
import Search from '../scenes/Search/Search';
import SearchDetail from '../scenes/Search/SearchDetail';
import HomeAddres from '../scenes/Delivery/HomeAddres';
import Delivery from '../scenes/Detail/Delivery';
import { Edit } from '../scenes/Edit/Edit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';
import { Size } from '../services/Service';
import { AuthContext } from '../providers/AuthProvider';
import DeliveryReception from '../scenes/Delivery/DeliveryReception';

interface SearchStackProps {

}

const Stack = createStackNavigator<SearchParamList>()

export const SearchStack: React.FC<SearchStackProps> = ({ navigation, route }) => {
    const { logout, getProfile } = useContext(AuthContext)
    const platform = Platform.OS
    const mode = platform === "ios" ? "modal" : "card"
    const scOptions = platform === "ios" ? {
        ...TransitionPresets.ModalPresentationIOS,
        gestureEnabled: true,
        cardOverlayEnabled: true,
    } : {}


    return (
        <Stack.Navigator mode={mode} screenOptions={scOptions} initialRouteName={"Buscar"}>
            <Stack.Screen name={"Buscar"} component={Search} options={(navigation) => ({
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
                headerTitle: "Consulta"
            })
            } />
            <Stack.Screen name={"Detalle"} component={SearchDetail} options={(navigation) => ({
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    alignSelf: 'center',
                    color: colors.white,
                    marginRight: 50,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
                headerStatusBarHeight: Platform.OS == 'ios' ? Size(150) : Size(35),
                headerTitle: "Detalle Del Bulto",
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
        </Stack.Navigator>
    );
}
