import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../assets/Colors';

interface CenterProps {

}

export const Center: React.FC<CenterProps> = ({ children }) => {
    return (
        <SafeAreaView style={styles.center}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    }
})