import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fonts from '../assets/Fonts';
import colors from '../assets/Colors';




interface CountDownProps {
    date: string,
}


export default function CountDown(props: CountDownProps) {
    // let date = moment(props.date, "YYYY-MM-DD HH:mm:ss")
    // let initMinute = date.minutes()
    // let finishMinute = date.add(15, "minute").minute()
    // let minute = (initMinute - initMinute)
    const [minutes, setMinutes] = useState(59)
    const [seconds, setSeconds] = useState(59)
    const [finish, setfinish] = useState(false)

    useEffect(() => {
        let timer = 0
        if (seconds > 0) {
            timer = setInterval(() => setSeconds(seconds - 1), 1000);
        }
        if (timer == 0 && minutes > 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
        }
        if (seconds == 0 && minutes == 0) setfinish(true)

        return () => clearInterval(timer);
    }, [seconds]);

    let sec = seconds < 10 ? "0" + seconds : seconds

    return (
        <View>
            {
                finish ?
                    <Text style={styles.textFinish}>{"Tiempo restante: "}<Text style={styles.warning}> Agotado </Text> </Text> :
                    <Text style={styles.text}>{"Tiempo restante: " + minutes + " : " + sec + "s"}</Text>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: RFValue(15),
        fontFamily: fonts.primaryFont
    },
    textFinish: {
        fontSize: RFValue(15),
        fontFamily: fonts.primaryFont,
        // backgroundColor:colors.mediumRed
    },
    warning: {
        fontSize: RFValue(15),
        fontFamily: fonts.primaryFont,
        backgroundColor: colors.mediumRed
    }
})