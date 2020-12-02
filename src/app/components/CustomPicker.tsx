import React from 'react'
import { View, Text, Dimensions, TextInput, Picker, StyleSheet } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface CustomPickerProps {
    options: [{ _id: string, address: string, number: string }],
    onValueChange: (itemValue: string, itemIndex: number) => any,
    value: string
}

export const CustomPicker: React.FC<CustomPickerProps> = (props) => {
    return (
        <View style={styles.pickerContainer}>
            <MaterialCommunityIcons name={"map-marker"} size={24} color={colors.lightgray} />
            <Picker
                mode='dropdown'
                itemStyle={{ color: 'red' }}
                selectedValue={props.value}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) => { props.onValueChange(itemValue, itemIndex) }}
            >
                <Picker.Item label="Seleccionar" value="" />
                {
                    props.options.map((row, index) => {
                        return (
                            <Picker.Item key={index} label={row.address + " - " + row.number} value={row._id} />
                        )
                    })
                }
            </Picker>
        </View>
    );
}


const styles = StyleSheet.create({
    pickerContainer: {
        alignItems: 'center',
        width: wp(100) - Size(95),
        height: Size(117),
        borderRadius: Size(27),
        borderWidth: Size(1),
        borderColor: "rgba(117, 117, 117, 255)",
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: Size(66),
        flexDirection: 'row'
    },
    pickerStyle: {
        height: Size(117),
        width: wp(100) - Size(220),
        marginRight: 10
    }
});