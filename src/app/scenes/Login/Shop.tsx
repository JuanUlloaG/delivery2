import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ShopNavProps } from '../../types/ShopParamList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native'
import { getShopItems } from '../../actions/ShopAction'
import { getHomeItems, takeOrderAction } from '../../actions/HomeListAction'
import { updateShop } from '../../actions/AuthActions'
import Loading from '../Loading/Loading'
import store from '../../store/Store';
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from '../../components/CustomButton';
import { CustomPicker } from '../../components/CustomPicker';

interface ShopProps {
    navigation: any,
    auth: object,
    home: { isFetching: boolean, data: [any] },
    shop: { isFetching: boolean, data: [{ _id: string, address: string, number: string }] },
    fetchData: () => {}
    fetchDataHome: () => {}
    setShop: (shop: { key: string, description: string }) => {}
}

interface State {
    value: string,
    error: boolean
}

class Shop extends React.Component<ShopProps, State> {

    constructor(props: ShopProps) {
        super(props)
        this.state = {
            value: "",
            error: false,
        }
    }

    componentDidMount() {
        this.props.fetchData()
        this.props.fetchDataHome()
        
    }

    setShop() {
        if (this.state.value) {
            let name = ""
            this.props.shop.data.map((row) => {
                if (row._id == this.state.value) name = row.number
            })
            let shop = { key: this.state.value, description: name }
            this.props.setShop(shop)
            this.props.navigation.navigate("AppTab")
        } else {
            this.setState({ error: true })
        }
    }

    onChangeValue(value: string) {
        this.setState({ value, error: false })
    }


    render() {
        const data = this.props.shop.data
        // if (this.props.shop.data.length <= 0 && !this.props.shop.isFetching){this.props.fetchData()}
        return (
            <Center>
                <ScrollView contentContainerStyle={styles.scrollView} >
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>Ahora selecciona el local</Text>
                        <CustomPicker value={this.state.value} options={data} onValueChange={this.onChangeValue.bind(this)} />
                        <View style={{ width: wp(100), marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <CustomButton onPress={this.setShop.bind(this)} size={"l"}>
                                <Text style={{
                                    fontFamily: fonts.primaryFontTitle,
                                    fontSize: RFValue(Size(56)),
                                    color: colors.white
                                }}>Continuar</Text>
                            </CustomButton>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            this.state.error &&
                            <View style={{ width: wp(95), backgroundColor: colors.mediumRed, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                <Text style={{
                                    fontFamily: fonts.primaryFont,
                                    fontSize: RFValue(21)
                                }}>Debes seleccionar un local</Text>
                            </View>
                        }
                    </View>

                </ScrollView>
            </Center>
        );
    }
}









const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(20),
        color: colors.black
    },
    passwordForget: {
        fontFamily: 'AvenirNextRegular',
        fontSize: RFValue(22)
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});



const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    shop: state.shop
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchData: () => dispatch(getShopItems()),
    fetchDataHome: () => dispatch(getHomeItems()),
    setShop: (shop: any) => dispatch(updateShop(shop))
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)