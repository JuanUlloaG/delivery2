import React from 'react'
import { Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Size } from '../services/Service';
import colors from '../assets/Colors';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type size = "xs" | "s" | "m" | "l"

interface CustomButtonProps {
    onPress: () => any,
    disable?: boolean,
    size?: size,
    color?: string
}

const defaultProps: CustomButtonProps = {
    onPress: () => { },
    disable: false,
    size: "m",
    color: colors.lightBlue
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const propss = Object.assign({}, defaultProps, props);
    let width
    let height
    let fontsize
    switch (props.size) {
        case "xs":
            width = (wp(100) - Size(95)) / 5
            height = hp(8) * 0.75
            fontsize = Size(51)
            break;
        case "s":
            width = (wp(100) - Size(95)) / 3
            height = hp(8) * 0.80
            fontsize = Size(51)
            break;
        case "m":
            width = (wp(100) - Size(95)) / 2
            height = hp(8) * 0.80
            fontsize = Size(51)
            break;
        case "l":
            width = wp(100) - Size(95)
            height = hp(8)
            break;

        default:
            width = 24
            fontsize = Size(39)
            break;
    }

    let buttonStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        borderRadius: Size(32),
        backgroundColor: propss.color,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
    }

    return (
        <TouchableOpacity style={[styles.buttonContainer, buttonStyle]} disabled={propss.disable} onPress={() => { props.onPress() }}>
            {props.children}
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        // marginTop: 36,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: wp(100) - Size(95),
        // height: hp(8),
        // borderRadius: Size(32),
        // backgroundColor: colors.lightBlue
    },
    buttonText: {
        fontFamily: "AvenirNextBold",
        fontSize: RFValue(Size(56)),
        color: "rgba(0, 0, 0, 255)"
    }
});