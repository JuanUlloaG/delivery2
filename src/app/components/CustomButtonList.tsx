import React from 'react'
import { View, Text, Dimensions, TextInput, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';

type size = "M" | "L" | "S" | "XL"

interface CustomButtonLisProps {
    onPress: () => any,
    title: string,
    disable: boolean,
    size?: size
}

export const CustomButtonList: React.FC<CustomButtonLisProps> = (props) => {
    let width = 30
    let fontsize = Size(51)
    switch (props.size) {
        case "M":
            width = 30
            fontsize = Size(51)
            break;
        case "L":
            width = 38
            fontsize = Size(60)
            break;
        case "XL":
            width = 46
            fontsize = Size(60)
            break;

        default:
            width = 24
            fontsize = Size(39)
            break;
    }

    return (
        <TouchableOpacity style={[styles.buttonContainer, { width: wp(width), backgroundColor: !props.disable ? colors.lightBlue : colors.lightgrayDisabled }]} >
            <Text onPress={() => { !props.disable && props.onPress() }} style={[styles.buttonText, { fontSize: RFValue(fontsize), }]} > {props.title} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(6),
        borderRadius: Size(32),
    },
    buttonText: {
        fontFamily: fonts.primaryFontTitle,
        color: colors.mediumGray
    }
});