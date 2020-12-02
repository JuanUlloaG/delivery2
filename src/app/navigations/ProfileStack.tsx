import React, { useContext } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ProfileParamList } from '../types/ProfileParamList';
import { Platform } from 'react-native';
import ProfileVIew from '../scenes/Profile/Profile';
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';
import { Size } from '../services/Service';
import { AuthContext } from '../providers/AuthProvider';

interface ProfileStackProps {

}

const Profile = createStackNavigator<ProfileParamList>()

export const ProfileStack: React.FC<ProfileStackProps> = ({ navigation, route }) => {
    const { logout, getProfile } = useContext(AuthContext)
    const platform = Platform.OS
    const mode = platform === "ios" ? "modal" : "card"
    const scOptions = platform === "ios" ? {
        ...TransitionPresets.ModalPresentationIOS,
        gestureEnabled: true,
        cardOverlayEnabled: true,
    } : {}


    return (
        <Profile.Navigator mode={mode} screenOptions={scOptions} initialRouteName={"Perfil"}>
            <Profile.Screen name={"Perfil"} component={ProfileVIew} options={(navigation) => ({
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
                headerTitle: "Perfil"
            })
            } />
        </Profile.Navigator>
    );
}
