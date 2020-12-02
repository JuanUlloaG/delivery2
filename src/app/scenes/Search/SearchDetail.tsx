import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet, Animated } from 'react-native';
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface Props {
    navigation: any,
    auth: object,
    route: any,
}

interface State {
}

class SearchDetail extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
    }
    componentDidMount() {
    }

    render() {

        if (Object.keys(this.props.route.params.bagContent).length) {
            let { products } = this.props.route.params.bagContent
            return (
                <Center>
                    <View style={{ flex: 1, width: wp(100) }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: Size(73), marginTop: 20 }}>
                            <FlatList
                                data={products}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={
                                            {
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: 'center',
                                                paddingTop: 0,
                                                // "width": wp(65),
                                                height: hp(24),
                                                flex: 1,
                                                marginHorizontal: 4,
                                                marginVertical: 5,
                                                borderRadius: 14,
                                                backgroundColor: colors.grayHeader,
                                                shadowColor: "#BCBCBC",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 3,
                                                },
                                                shadowOpacity: 0.27,
                                                shadowRadius: 2.65,
                                                elevation: 3,
                                            }
                                        } >
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: Size(73) }} >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Producto: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{item.product}</Text>
                                                </View>

                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>SKU: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{item.id}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Barra: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{item.barcode}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Cantidad Pickeada: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{item.unitsPicked}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Descripción: </Text>
                                                    {/* <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{item.description}</Text> */}
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(15),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{item.description}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>

                </Center >

            );
        }

        return (
            <Center></Center>
        )

    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    bags: state.bags
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetail)
